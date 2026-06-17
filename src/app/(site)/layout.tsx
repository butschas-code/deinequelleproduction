import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AmbientShell } from "@/components/ambient/AmbientShell";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-1 flex-col overflow-x-hidden font-sans">
      <SiteHeader />
      <div className="relative z-0 flex flex-1 flex-col">
        <AmbientShell />
        <div className="relative z-[2] flex flex-1 flex-col">{children}</div>
      </div>
      <SiteFooter />
    </div>
  );
}
