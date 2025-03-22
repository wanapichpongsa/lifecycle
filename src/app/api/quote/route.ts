"use server";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // send email
  // call
  return NextResponse.json({ status: 200, message: "Hello, world!" });
}