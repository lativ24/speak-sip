import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Speak or Sip",
  description: "Pronounce it right... or take the drink.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
