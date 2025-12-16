import { NextResponse } from "next/server";
import { google } from "googleapis";
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
 * Helper function to POST form data to n8n webhook
 */
async function postToN8nWebhook(data: FormData): Promise<void> {
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
        throw new Error("Missing n8n webhook URL configuration");
    }

    // Split name into first and last name
    const nameParts = data.name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name, // Keep full name for backward compatibility
                first_name: firstName,
                last_name: lastName,
                email: data.email,
                phone: data.phone || "",
                instagram: data.instagram || "",
                tiktok: data.tiktok || "",
                youtube: data.youtube || "",
                twitch: data.twitch || "",
                comments: data.comments || "",
                privacy_policy: data.privacyPolicy,
                timestamp: new Date().toISOString(),
            }),
        });

        if (!response.ok) {
            const errorText = await response.text().catch(() => "Unknown error");
            throw new Error(`n8n webhook failed: ${response.status} - ${errorText}`);
        }
    } catch (error: any) {
        const errorMessage = error?.message || String(error);
        throw new Error(`Failed to send to n8n webhook: ${errorMessage}`);
    }
}

/**
 * Helper function to write form data to Google Sheets
 */
async function writeToGoogleSheets(data: FormData): Promise<void> {
    const serviceAccountEmail = process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "Sheet1";

    if (!serviceAccountEmail || !privateKey || !spreadsheetId) {
        throw new Error("Missing Google Sheets configuration");
    }

    // Log service account email in development for debugging
    if (process.env.NODE_ENV === 'development') {
        console.log("Using service account:", serviceAccountEmail);
        console.log("Spreadsheet ID:", spreadsheetId);
    }

    // Authenticate with service account
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: serviceAccountEmail,
            private_key: privateKey,
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Prepare row data with timestamp
    const timestamp = new Date().toISOString();
    const rowData = [
        timestamp,
        data.name,
        data.email,
        data.phone || "",
        data.instagram || "",
        data.tiktok || "",
        data.youtube || "",
        data.twitch || "",
        data.comments || "",
        data.privacyPolicy ? "Yes" : "No", // Privacy Policy agreement
    ];

    try {
        // Append row to sheet
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${sheetName}!A:J`,
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",
            requestBody: {
                values: [rowData],
            },
        });
    } catch (error: any) {
        const errorMessage = error?.message || String(error);
        // Provide more specific error messages
        if (errorMessage.includes("Unable to parse range")) {
            throw new Error(`Sheet "${sheetName}" not found. Please check the sheet name.`);
        }
        if (errorMessage.includes("PERMISSION_DENIED") || errorMessage.includes("403") || errorMessage.includes("does not have permission")) {
            throw new Error(`Permission denied. Please share your Google Sheet with the service account email: ${serviceAccountEmail}. The service account needs "Editor" permissions.`);
        }
        if (errorMessage.includes("UNAUTHENTICATED") || errorMessage.includes("401")) {
            throw new Error("Authentication failed. Please check your service account credentials.");
        }
        throw new Error(`Failed to write to Google Sheets: ${errorMessage}`);
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = formSchema.parse(body);

        // Prepare both integration promises
        const googleSheetsPromise = writeToGoogleSheets(validatedData);
        const n8nWebhookPromise = postToN8nWebhook(validatedData);

        // Run both integrations in parallel
        const results = await Promise.allSettled([googleSheetsPromise, n8nWebhookPromise]);

        // Check results
        const googleSheetsResult = results[0];
        const n8nWebhookResult = results[1];

        // Log any errors but don't fail the request if at least one succeeded
        if (googleSheetsResult.status === "rejected") {
            const error = googleSheetsResult.reason;
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error("Google Sheets submission error:", errorMessage);
        }

        if (n8nWebhookResult.status === "rejected") {
            const error = n8nWebhookResult.reason;
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error("n8n webhook submission error:", errorMessage);
        }

        // Return success if at least one integration succeeded
        if (googleSheetsResult.status === "fulfilled" || n8nWebhookResult.status === "fulfilled") {
            return NextResponse.json({ success: true });
        }

        // If both failed, return error
        const googleSheetsError = googleSheetsResult.status === "rejected" ? googleSheetsResult.reason?.message || "Unknown error" : null;
        const n8nWebhookError = n8nWebhookResult.status === "rejected" ? n8nWebhookResult.reason?.message || "Unknown error" : null;

        return NextResponse.json(
            {
                error: "Failed to submit form",
                details: {
                    googleSheets: googleSheetsError,
                    n8nWebhook: n8nWebhookError,
                },
            },
            { status: 500 }
        );
    } catch (error: any) {
        const errorMessage = error instanceof Error ? error.message : String(error || "Failed to submit form");
        
        // Log detailed error for debugging (only in development)
        if (process.env.NODE_ENV === 'development') {
            console.error("Error processing form submission:", {
                message: errorMessage,
                error: error,
            });
        } else {
            console.error("Error processing form submission:", errorMessage);
        }
        
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
