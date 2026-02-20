import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Vagdevi Vidya Mandir — Best School in Visakhapatnam with Skating, Karate, Dance & Sports";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

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
          background: "linear-gradient(135deg, #3e4e3b 0%, #2d3a2e 60%, #1a251a 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -60,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
          }}
        />

        {/* School name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#e9e9e9",
              letterSpacing: "-1px",
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            Vagdevi Vidya Mandir
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 20,
              color: "rgba(233,233,233,0.6)",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              marginTop: 8,
            }}
          >
            A Place Where Knowledge Meets Excellence
          </div>

          {/* Divider */}
          <div
            style={{
              width: 80,
              height: 3,
              background: "linear-gradient(90deg, transparent, #F4C97E, transparent)",
              borderRadius: 2,
              marginTop: 20,
              marginBottom: 20,
            }}
          />

          {/* Features */}
          <div
            style={{
              display: "flex",
              gap: 32,
              alignItems: "center",
              fontSize: 16,
              color: "rgba(233,233,233,0.7)",
            }}
          >
            <span>Skating</span>
            <span style={{ color: "rgba(233,233,233,0.3)" }}>|</span>
            <span>Karate & Boxing</span>
            <span style={{ color: "rgba(233,233,233,0.3)" }}>|</span>
            <span>Dance</span>
            <span style={{ color: "rgba(233,233,233,0.3)" }}>|</span>
            <span>Sports</span>
            <span style={{ color: "rgba(233,233,233,0.3)" }}>|</span>
            <span>Green Campus</span>
          </div>

          {/* Location */}
          <div
            style={{
              fontSize: 15,
              color: "rgba(233,233,233,0.45)",
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Anandapuram, Visakhapatnam — Since 2002 — 25+ Years of Excellence
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
