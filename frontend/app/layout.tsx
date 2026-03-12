import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "API Portal",
  description: "API Documentation Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

