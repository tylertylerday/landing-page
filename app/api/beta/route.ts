import { NextResponse } from "next/server";
import Airtable from "airtable";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    phone: z.string().optional(),
    instagram: z.string().optional(),
    tiktok: z.string().optional(),
    youtube: z.string().optional(),
    twitch: z.string().optional(),
    comments: z.string().optional(),
    privacyPolicy: z.literal(true),
});

type FormData = z.infer<typeof formSchema>;

/**
 * Helper function to sync contact to ActiveCampaign and add to list
 */
async function syncToActiveCampaign(data: FormData): Promise<void> {
    const apiUrl = process.env.ACTIVECAMPAIGN_API_URL;
    const apiToken = process.env.ACTIVECAMPAIGN_API_TOKEN;
    const listId = process.env.ACTIVECAMPAIGN_LIST_ID;

    if (!apiUrl || !apiToken || !listId) {
        throw new Error("Missing ActiveCampaign configuration");
    }

    // Split name into first and last name
    const nameParts = data.name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // First, check if contact already exists by email
    let contactId: string | undefined;
    
    const searchResponse = await fetch(`${apiUrl}/api/3/contacts?email=${encodeURIComponent(data.email)}`, {
        method: "GET",
        headers: {
            "Api-Token": apiToken,
            "Content-Type": "application/json",
        },
    });

    if (searchResponse.ok) {
        const searchResult = await searchResponse.json();
        contactId = searchResult.contacts?.[0]?.id || searchResult.contact?.id;
        
        if (contactId && process.env.NODE_ENV === 'development') {
            console.log(`Contact already exists with ID: ${contactId}, skipping creation`);
        }
    }

    // Only create contact if it doesn't exist
    if (!contactId) {
        const contactData = {
            contact: {
                email: data.email,
                firstName: firstName,
                lastName: lastName,
                phone: data.phone || "",
            },
        };

        const contactResponse = await fetch(`${apiUrl}/api/3/contacts`, {
            method: "POST",
            headers: {
                "Api-Token": apiToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contactData),
        });

        if (!contactResponse.ok) {
            const errorText = await contactResponse.text();
            throw new Error(`ActiveCampaign contact creation failed: ${contactResponse.status} - ${errorText}`);
        }

        const contactResult = await contactResponse.json();
        
        // Log the full response for debugging (only in development)
        if (process.env.NODE_ENV === 'development') {
            console.log("ActiveCampaign contact response:", JSON.stringify(contactResult, null, 2));
        }
        
        // Try different possible response structures
        contactId = contactResult.contact?.id || 
                   contactResult.id || 
                   (contactResult.contacts && contactResult.contacts[0]?.id);

        if (!contactId) {
            throw new Error(`ActiveCampaign did not return contact ID. Response structure: ${JSON.stringify(Object.keys(contactResult))}`);
        }
    }

    // Add contact to list
    const listResponse = await fetch(`${apiUrl}/api/3/contactLists`, {
        method: "POST",
        headers: {
            "Api-Token": apiToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contactList: {
                list: listId,
                contact: contactId,
                status: 1, // Active status
            },
        }),
    });

    if (!listResponse.ok) {
        const errorText = await listResponse.text();
        // If contact is already in list, that's okay - don't throw error
        if (listResponse.status !== 422) {
            throw new Error(`ActiveCampaign list addition failed: ${listResponse.status} - ${errorText}`);
        }
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = formSchema.parse(body);

        // Prepare both integration promises
        const airtablePromise = (async () => {
            const apiKey = process.env.AIRTABLE_ACCESS_TOKEN;
            const baseId = process.env.AIRTABLE_BASE_ID;
            const tableName = process.env.AIRTABLE_TABLE_NAME || "Beta Signups";

            if (!apiKey || !baseId) {
                throw new Error("Missing Airtable configuration. API Key present: " + !!apiKey + ", Base ID present: " + !!baseId);
            }

            const base = new Airtable({ apiKey }).base(baseId);

            await base(tableName).create([
                {
                    fields: {
                        Name: validatedData.name,
                        Email: validatedData.email,
                        Phone: validatedData.phone,
                        Instagram: validatedData.instagram,
                        TikTok: validatedData.tiktok,
                        Youtube: validatedData.youtube,
                        Twitch: validatedData.twitch,
                        Comments: validatedData.comments,
                    },
                },
            ]);
        })();

        const activeCampaignPromise = syncToActiveCampaign(validatedData);

        // Run both integrations in parallel
        const results = await Promise.allSettled([airtablePromise, activeCampaignPromise]);

        // Check results
        const airtableResult = results[0];
        const activeCampaignResult = results[1];

        // Log any errors but don't fail the request if at least one succeeded
        if (airtableResult.status === "rejected") {
            const error = airtableResult.reason;
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error("Airtable submission error:", errorMessage);
        }

        if (activeCampaignResult.status === "rejected") {
            const error = activeCampaignResult.reason;
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error("ActiveCampaign submission error:", errorMessage);
        }

        // Return success if at least one integration succeeded
        if (airtableResult.status === "fulfilled" || activeCampaignResult.status === "fulfilled") {
            return NextResponse.json({ success: true });
        }

        // If both failed, return error
        const airtableError = airtableResult.status === "rejected" ? airtableResult.reason?.message || "Unknown error" : null;
        const activeCampaignError = activeCampaignResult.status === "rejected" ? activeCampaignResult.reason?.message || "Unknown error" : null;

        return NextResponse.json(
            {
                error: "Failed to submit form",
                details: {
                    airtable: airtableError,
                    activeCampaign: activeCampaignError,
                },
            },
            { status: 500 }
        );
    } catch (error: any) {
        const errorMessage = error instanceof Error ? error.message : String(error || "Failed to submit form");
        console.error("Error processing form submission:", errorMessage);
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
