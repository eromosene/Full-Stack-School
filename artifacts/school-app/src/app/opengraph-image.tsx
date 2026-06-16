import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Yemsol Private Schools - School Management System";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #EDF9FD 0%, #F1F0FF 50%, #FEFCE8 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Logo & Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px" }}>
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
            <circle cx="45" cy="45" r="45" fill="#CFCEFF" />
            <path d="M45 18 L72 34 L45 50 L18 34 Z" fill="#7c3aed" />
            <path d="M18 34 L18 60 L45 76 L72 60 L72 34 L45 50 Z" fill="#a78bfa" />
            <rect x="70" y="34" width="5" height="24" rx="2.5" fill="#7c3aed" />
            <circle cx="72.5" cy="61" r="5" fill="#7c3aed" />
            <rect x="32" y="52" width="26" height="18" rx="3" fill="white" opacity="0.9" />
            <rect x="36" y="56" width="8" height="2" rx="1" fill="#7c3aed" />
            <rect x="36" y="60" width="14" height="2" rx="1" fill="#7c3aed" />
            <rect x="36" y="64" width="10" height="2" rx="1" fill="#7c3aed" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "52px", fontWeight: "900", color: "#1e1b4b" }}>Yemsol Private Schools</span>
            <span style={{ fontSize: "22px", color: "#7c3aed", fontWeight: "600", marginTop: "-4px" }}>School Management System</span>
          </div>
        </div>

        {/* Tagline */}
        <p style={{ fontSize: "26px", color: "#374151", textAlign: "center", maxWidth: "700px", margin: "0 0 48px", lineHeight: 1.5 }}>
          Connecting admins, teachers, students & parents — all in one place
        </p>

        {/* Role Pills */}
        <div style={{ display: "flex", gap: "16px" }}>
          {[
            { label: "Admin", bg: "#CFCEFF", color: "#5b21b6" },
            { label: "Teacher", bg: "#C3EBFA", color: "#0369a1" },
            { label: "Student", bg: "#FAE27C", color: "#92400e" },
            { label: "Parent", bg: "#bbf7d0", color: "#166534" },
          ].map((r) => (
            <div
              key={r.label}
              style={{
                background: r.bg,
                color: r.color,
                padding: "10px 28px",
                borderRadius: "50px",
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              {r.label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
