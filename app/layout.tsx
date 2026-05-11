import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Skyltar O Montering – Professionell Skyltmontering & Foliering",
  description:
    "Vi erbjuder professionell skyltmontering, fordonsfoliering och fönsterfoliering i hela regionen. Hög kvalitet, säker installation och erfaret team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={cn("h-full antialiased", figtree.variable)}>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
