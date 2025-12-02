import { NextResponse } from "next/server";
import Airtable from "airtable";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    phone: z.string().optional(),
    instagram: z.string().optional(),
    tiktok: z.string().optional(),
    x: z.string().optional(),
    twitch: z.string().optional(),
    comments: z.string().optional(),
    privacyPolicy: z.literal(true),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = formSchema.parse(body);

        const apiKey = process.env.AIRTABLE_ACCESS_TOKEN;
        const baseId = process.env.AIRTABLE_BASE_ID;
        const tableName = process.env.AIRTABLE_TABLE_NAME || "Beta Signups";

        if (!apiKey || !baseId) {
            console.error("Missing Airtable configuration. API Key present:", !!apiKey, "Base ID present:", !!baseId);
            return NextResponse.json(
                { error: "Server configuration error: Missing API Key or Base ID" },
                { status: 500 }
            );
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
                    X: validatedData.x,
                    Twitch: validatedData.twitch,
                    Comments: validatedData.comments,
                },
            },
        ]);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error submitting to Airtable:", error);
        // Return more specific error if available
        const errorMessage = error?.message || "Failed to submit form";
        const errorType = error?.error || "Unknown Error";
        return NextResponse.json(
            { error: `Airtable Error: ${errorType} - ${errorMessage}` },
            { status: 500 }
        );
    }
}
