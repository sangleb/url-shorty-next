import { UrlShortnerService } from "@/services/UrlShortnerService";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const { originalUrl } = await req.json();
    const shortenerService = new UrlShortnerService();
    const shortUrl = await shortenerService.shortenUrl(originalUrl);
    return NextResponse.json({shortUrl}, {status: 201});
}

export async function GET(){
    const shortenerService = new UrlShortnerService();
    const response = await shortenerService.getAllUrls();
    return NextResponse.json({response});
}