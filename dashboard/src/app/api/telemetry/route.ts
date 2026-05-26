import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate incoming telemetry data structure
    const { deviceId, heartRate, motion, timestamp } = data;

    if (!deviceId) {
      return NextResponse.json(
        { error: "Missing deviceId" },
        { status: 400 }
      );
    }

    // TODO: In Phase 2, connect this to a Time-Series Database (e.g., InfluxDB)
    // and route data to the AI anomaly detection engine.

    console.log(`[TELEMETRY] Device ${deviceId} | HR: ${heartRate}bpm | Motion: ${motion} | TS: ${timestamp}`);

    return NextResponse.json({
      success: true,
      message: "Telemetry ingested successfully.",
      status: "safe", // Mocked response from AI detection
    });

  } catch (error) {
    console.error("[API Error] Failed to process telemetry payload:", error);
    return NextResponse.json(
      { error: "Invalid payload structure" },
      { status: 400 }
    );
  }
}
