import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const deviceId = searchParams.get("deviceId");

    if (!deviceId) {
        return NextResponse.json({ message: "Missing deviceId" }, { status: 400 });
    }

    try {
        // const today = new Date().toISOString().split("T")[0];
        const today = "2025-09-25";

        const response = await fetch(
            `https://api.scalefusion.com/api/v1/devices/${deviceId}/locations.json?date=${today}`,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Token ${process.env.SCALEFUSION_API_KEY}`,
                },
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { message: `Scalefusion API error: ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        const latest = data.reduce((a, b) => (a.date_time > b.date_time ? a : b));
        return NextResponse.json(latest, { status: 200 });
    } catch (error) {
        console.error("Scalefusion proxy error:", error);
        return NextResponse.json(
            { message: "Failed to fetch from Scalefusion" },
            { status: 500 }
        );
    }
}
