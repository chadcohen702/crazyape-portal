import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Support Portal",
  description: "Support, deposits, redeems, rewards, referrals and account management."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
