import { NextResponse } from 'next/server';
import { UrlShortnerService } from '@/services/UrlShortnerService';
import { cache } from 'react';


const fetchUrls = cache(async () => {
    const shortenerService = new UrlShortnerService();
    const response = await shortenerService.getAllUrls();
    return response;
})
export async function GET(){
    const urls = await fetchUrls();
    const response = NextResponse.json({urls});
    response.headers.set("Cache-Control", "public, max-age=180 s-maxage=180, stale-while-revalidate=59");
    return response;
}