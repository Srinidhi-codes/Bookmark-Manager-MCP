import { NextRequest, NextResponse } from "next/server";
import { createBookmark, getUserBookmarks, searchUserBookmarks } from "@/lib/bookmark-utils";
import { auth } from "@clerk/nextjs/server";


export async function GET(request: NextRequest){
    try {
        const {userId} = await auth();
        if(!userId){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        const { searchParams } = new URL(request.url);
        const q = searchParams.get("q") || searchParams.get("title") || "";
        const bookmarks = q
            ? await searchUserBookmarks(userId, q)
            : await getUserBookmarks(userId);
        return NextResponse.json(bookmarks,{status: 200});
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
    }
}

export async function POST(request: NextRequest){
    try {
        const {userId} = await auth();
        if(!userId){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        const body = await request.json();
        const {url, title, notes} = body;
        if(!url || !title){
            return NextResponse.json({error: "URL and title are required"}, {status: 400});
        }
        const bookmark = await createBookmark(userId, {url, title, notes});
        return NextResponse.json(bookmark,{status: 200});
    } catch (error) {
        console.error("Error creating bookmarks:", error);
    }
}
