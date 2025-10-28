import { Bookmark, PrismaClient } from "../generated/prisma";
import { CreateBookmarkInput } from "@/types/bookmark";

const prisma = new PrismaClient();

export async function getUserBookmarks(userId:string): Promise<Bookmark[]> {
    try {
        const bookmarks = await prisma.bookmark.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return bookmarks;
    } catch (error) {
        console.error("Error fetching user bookmarks:", error);
        throw error;
    }
}

export async function searchUserBookmarks(
    userId: string,
    query: string
): Promise<Bookmark[]> {
    try {
        const bookmarks = await prisma.bookmark.findMany({
            where: {
                userId,
                OR: [
                    { title: { contains: query, mode: "insensitive" } },
                    { url: { contains: query, mode: "insensitive" } },
                    { notes: { contains: query, mode: "insensitive" } },
                ],
            },
            orderBy: { createdAt: "desc" },
        });
        return bookmarks;
    } catch (error) {
        console.error("Error searching user bookmarks:", error);
        throw error;
    }
}

export async function createBookmark(userId: string, data: CreateBookmarkInput): Promise<Bookmark>{
    try {
        if(!data.url || !data.title){
            throw new Error("URL and title are required");
        }
        const bookmark = await prisma.bookmark.create({
            data: {
               url: data.url,
               title: data.title,
               notes: data.notes,
               userId
            }
        });
        return bookmark;
    } catch (error) {
        console.error("Error creating bookmark:", error);
        throw error;
    }
}


export async function deleteUserBookmark(userId: string, bookmarkId: string): Promise<boolean> {
    try {
        const bookmark = await prisma.bookmark.findFirst({
            where: {
                id: bookmarkId,
                userId
            }
        })

        if (!bookmark) {
            throw new Error("Bookmark not found or access denied");
        }

        await prisma.bookmark.delete(
            {
                where: {id: bookmarkId}
            }
        )
        return true;
    } catch (error) {
        console.error("Error deleting bookmark:", error);
        throw new Error("Failed to delete bookmark");
    }
}