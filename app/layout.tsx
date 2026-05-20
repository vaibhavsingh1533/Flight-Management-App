import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flight Management App",
  description: "Flight booking and management application"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}