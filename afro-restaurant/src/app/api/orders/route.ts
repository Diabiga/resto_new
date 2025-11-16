import { NextResponse } from "next/server";
import { createQrOrder } from "@/server/orders";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await createQrOrder(data);
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Impossible de créer la commande" },
      { status: 500 },
    );
  }
}
