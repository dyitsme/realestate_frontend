import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });
const openSans = Open_Sans({
  subsets: ['latin'],
})
inter.className

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>{children}</body>
    </html>
  );
}
