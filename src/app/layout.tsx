import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FullCalendar 테스트",
  description: "FullCalendar 테스트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
