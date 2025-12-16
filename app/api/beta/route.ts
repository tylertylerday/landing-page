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

        // Write to Google Sheets
        await writeToGoogleSheets(validatedData);

        return NextResponse.json({ success: true });
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
