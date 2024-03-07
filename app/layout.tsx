import type { Metadata } from "next";
import { EdgeStoreProvider } from "../lib/edgestore";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Classify Images",
  description: "Classify images using a pre-trained model.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <EdgeStoreProvider>
        <body className={inter.className}>{children}</body>
      </EdgeStoreProvider>
    </html>
  );
}
