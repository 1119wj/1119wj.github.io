import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "1119wj — blog";

const pretendardBold = await readFile(join(process.cwd(), "assets/og/Pretendard-Bold.otf"));

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          background: "#08080f",
          color: "#f0eef5",
          fontFamily: "Pretendard",
        }}
      >
        <div style={{ display: "flex", fontSize: 120, fontWeight: 700, letterSpacing: "-0.03em" }}>
          1119WJ
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#b4acfa" }}>
          building things on the web
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Pretendard", data: pretendardBold, style: "normal", weight: 700 }],
    },
  );
}
