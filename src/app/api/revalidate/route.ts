import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_WEBHOOK_SECRET;

    if (!secret) {
      return NextResponse.json(
        { message: "SANITY_WEBHOOK_SECRET not configured" },
        { status: 500 }
      );
    }

    const { isValidSignature, body } = await parseBody<{
      _type?: string;
      slug?: { current?: string };
    }>(req, secret);

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      );
    }

    // Revalidate blog listing pages
    revalidatePath("/de/blog");
    revalidatePath("/en/blog");

    // Revalidate homepage (blog preview section)
    revalidatePath("/de");
    revalidatePath("/en");

    // Revalidate the specific article page if slug is provided
    if (body?.slug?.current) {
      revalidatePath(`/de/blog/${body.slug.current}`);
      revalidatePath(`/en/blog/${body.slug.current}`);
    }

    return NextResponse.json({
      revalidated: true,
      slug: body?.slug?.current || null,
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: (err as Error).message },
      { status: 500 }
    );
  }
}
