import { NextRequest, NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request: Request, context: any) {
  const { params } = context
  const key = process.env.MAPS_KEY
  
  const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${params.query}&key=${key}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  // console.log(JSON.stringify(await res.json(), null, '\t'))
  const addresses = await res.json()
  return Response.json({ addresses })
}

// To handle a POST request to /api
export async function POST(request: Request) {
  return Response.json({ message: "Hello World" }, { status: 200 });
}