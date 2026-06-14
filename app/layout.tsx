import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PathForge AI",
  description:
    "AI-powered career readiness, personalized assignments, and opportunity matching for students."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
