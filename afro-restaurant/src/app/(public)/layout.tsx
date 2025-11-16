import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0502] to-black">
      <SiteHeader sticky />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
