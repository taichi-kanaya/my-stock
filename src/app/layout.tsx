import type { Metadata } from "next";
import { ReactNode } from "react";
import "@/app/tailwind.css";
import Header from "@/components/common/header.server";
import Footer from "@/components/common/footer.server";

export const metadata: Metadata = {
  title: "My Stocks",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>
          <div className="container mx-auto p-4">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
