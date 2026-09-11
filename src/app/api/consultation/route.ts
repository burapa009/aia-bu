import "server-only";
import { createAdminClient } from "@supabase/server/core";
import { validateConsultation } from "@/lib/consultation";

export const runtime = "nodejs";

type Database = {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: {
      submit_consultation: {
        Args: { p_name: string; p_phone: string; p_interest: string; p_message: string };
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

const reply = (body: object, status: number) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return reply({ message: "กรุณาส่งข้อมูลจากแบบฟอร์มบนเว็บไซต์นี้" }, 403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return reply({ message: "รูปแบบข้อมูลไม่ถูกต้อง" }, 415);
  // Bound the actual stream, not just the client-supplied Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return reply({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" }, 400);
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  let input: unknown;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 16_384) { await reader.cancel(); return reply({ message: "ข้อมูลยาวเกินไป กรุณาย่อข้อความ" }, 413); }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch { return reply({ message: "อ่านข้อมูลไม่สำเร็จ กรุณาลองใหม่" }, 400); }
  const { data, errors } = validateConsultation(input);
  if (!data) return reply({ message: "กรุณาตรวจสอบข้อมูลที่ระบุ", errors }, 400);
  if ((input as Record<string, unknown>).website) return reply({ message: "ไม่สามารถส่งข้อมูลได้ กรุณาติดต่อทางโทรศัพท์หรือ LINE" }, 400);
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!process.env.SUPABASE_URL || !key || key.includes("•")) {
    return reply({ message: "แบบฟอร์มยังไม่พร้อมรับข้อมูล กรุณาโทร 063-5167015 หรือ LINE: burapas" }, 503);
  }
  try {
    const supabase = createAdminClient<Database>();
    const { error } = await supabase.rpc("submit_consultation", {
      p_name: data.name, p_phone: data.phone, p_interest: data.interest, p_message: data.message,
    }).abortSignal(AbortSignal.timeout(8000));
    if (error?.code === "P0001") return reply({ message: "เบอร์นี้ส่งคำขอแล้ว กรุณารอ 10 นาทีก่อนส่งอีกครั้ง หรือติดต่อทางโทรศัพท์ได้ทันที" }, 429);
    if (error) return reply({ message: "ยังบันทึกข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง หรือโทร 063-5167015" }, 503);
    return reply({ message: "ขอบคุณที่ไว้วางใจครับ ได้รับคำขอของคุณแล้ว ผมจะติดต่อกลับเพื่อรับฟังและช่วยวางแผนให้เหมาะกับคุณ" }, 201);
  } catch {
    return reply({ message: "ยังบันทึกข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง หรือโทร 063-5167015" }, 503);
  }
}
