import { NextRequest, NextResponse } from "next/server";
import { deleteUserBookmark } from "@/lib/bookmark-utils";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // 👈 Match Next.js typing
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Await the params since it's now typed as a Promise
    const { id } = await context.params;

    await deleteUserBookmark(userId, id);

    return NextResponse.json(
      { message: "Bookmark deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
