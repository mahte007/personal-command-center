import { MobileNav } from "./mobile-nav";

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center border-b border-border bg-background px-4 md:hidden">
      <MobileNav />

      <span className="ml-3 font-semibold">Orbit</span>
    </header>
  );
}
