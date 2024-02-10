import type { Metadata } from "next";
import { ReactNode } from "react";
import "@/app/tailwind.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

export const metadata: Metadata = {
  title: "My Stocks",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
