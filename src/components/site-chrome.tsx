import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Heart, Mail, MapPin, Menu, Phone, Search, X } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { contact, services } from "@/lib/bch-content";

const nav = [
  { label: "Home", to: "/" },
  {
    label: "About",
    to: "/about",
    children: [
      { label: "Our story", to: "/about" },
      { label: "Our Team", to: "/team" },
      { label: "BCH information archive", to: "/information" },
    ],
  },
  {
    label: "Care",
    to: "/services",
    children: [
      { label: "Services", to: "/services" },
      { label: "Departments", to: "/departments" },
      { label: "Our Team", to: "/team" },
    ],
  },
  {
    label: "Community",
    to: "/community-health",
    children: [
      { label: "Community Health", to: "/community-health" },
      { label: "Projects", to: "/projects" },
      { label: "Education & Training", to: "/education" },
    ],
  },
  {
    label: "Stories",
    to: "/news",
    children: [
      { label: "News & Events", to: "/news" },
      { label: "Gallery", to: "/gallery" },
    ],
  },
  { label: "Support", to: "/support" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteChrome({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const searchResults = useMemo(
    () =>
      services.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())).slice(0, 6),
    [query],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="border-b border-foreground/10 bg-background">
        <div className="site-container flex h-8 items-center justify-between gap-4 text-xs">
          <p className="flex min-w-0 items-center gap-2 font-semibold text-foreground/75">
            <span className="size-1.5 shrink-0 rotate-45 bg-primary" aria-hidden />
            <span className="truncate">A Church of Uganda not-for-profit hospital</span>
          </p>
          <div className="flex shrink-0 items-center gap-4 text-foreground/60">
            <a
              href={contact.phoneHref}
              className="hidden items-center gap-1.5 font-semibold hover:text-primary sm:flex"
            >
              <Phone className="size-3.5" aria-hidden />
              {contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="hidden items-center gap-1.5 hover:text-primary md:flex"
            >
              <Mail className="size-3.5" aria-hidden />
              <span className="max-w-[16rem] truncate">{contact.email}</span>
            </a>
            <span className="hidden items-center gap-1.5 lg:flex">
              <MapPin className="size-3.5" aria-hidden />
              {contact.address}
            </span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-forest text-white shadow-[0_16px_36px_-30px_rgba(21,61,49,0.8)]">
        <div className="site-container flex h-[70px] items-center justify-between gap-4">
          <Link
            to="/"
            className="flex shrink-0 items-center rounded-2xl bg-white px-2.5 py-1.5 shadow-sm transition-transform hover:-translate-y-0.5"
            onClick={() => setMenuOpen(false)}
            aria-label="Bwindi Community Hospital home"
          >
            <img
              src="/bch-assets/images/images-BCH-logo.png"
              alt="Bwindi Community Hospital"
              width={259}
              height={60}
              className="h-7 w-auto sm:h-8"
            />
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  to={item.to}
                  className={`relative flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors after:content-[''] hover:bg-white/10 hover:text-white ${pathname === item.to ? "text-white after:absolute after:inset-x-3.5 after:bottom-0.5 after:h-0.5 after:rounded-full after:bg-white" : "text-primary-foreground/90"}`}
                >
                  {item.label}
                  {"children" in item && <ChevronDown className="size-3.5 opacity-70" />}
                </Link>
                {"children" in item && (
                  <div className="invisible absolute left-0 top-full z-50 w-60 translate-y-2 pt-2 opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="rounded-2xl border border-border bg-card p-2 text-foreground shadow-xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="block rounded-xl px-3.5 py-2.5 text-sm font-medium hover:bg-secondary hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Search site"
              onClick={() => setSearchOpen(true)}
              className="grid size-9 place-items-center rounded-full bg-white text-primary shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <Search className="size-4" />
            </button>
            <Button
              className="hidden bg-white text-foreground shadow-sm hover:bg-secondary hover:text-foreground sm:inline-flex"
              asChild
            >
              <Link to="/support">
                <Heart className="fill-primary text-primary" />
                Donate now
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-white/15 hover:text-white lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {menuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="max-h-[70vh] overflow-y-auto border-t border-white/15 bg-background py-4 text-foreground lg:hidden"
          >
            <div className="site-container">
              {nav.map((item) => (
                <div key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-border py-3 text-[15px] font-bold"
                  >
                    {item.label}
                  </Link>
                  {"children" in item &&
                    item.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        onClick={() => setMenuOpen(false)}
                        className="block py-2 pl-4 text-sm text-muted-foreground hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                </div>
              ))}
            </div>
          </nav>
        )}
      </header>

      {searchOpen && (
        <div
          className="fixed inset-0 z-[80] bg-foreground/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Site search"
        >
          <div className="mx-auto mt-20 max-w-2xl overflow-hidden rounded-3xl bg-background p-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <Search className="size-5 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search services…"
                className="h-12 flex-1 bg-transparent text-lg outline-none"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <X />
              </Button>
            </div>
            {query && (
              <div className="mt-4 border-t border-border pt-3">
                {searchResults.length ? (
                  searchResults.map((result) => (
                    <Link
                      key={result.name}
                      to="/services"
                      onClick={() => setSearchOpen(false)}
                      className="block rounded-xl px-3 py-3 hover:bg-secondary"
                    >
                      <span className="font-semibold">{result.name}</span>
                      <span className="block text-sm text-muted-foreground">
                        {result.description}
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="px-3 py-5 text-muted-foreground">
                    No matching services found. Try a shorter word, or call the hospital on{" "}
                    {contact.phoneDisplay}.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <main id="main-content">{children}</main>

      <footer className="bg-foreground pb-24 pt-16 text-background md:pb-16">
        <div className="site-container grid gap-12 lg:grid-cols-[1.15fr_2fr]">
          <div>
            <span className="inline-flex rounded-2xl bg-white px-3 py-2">
              <img
                src="/bch-assets/images/images-BCH-logo.png"
                alt="Bwindi Community Hospital"
                width={259}
                height={60}
                className="h-9 w-auto"
              />
            </span>
            <p className="mt-5 max-w-sm text-sm leading-6 text-background/70">
              A private, not-for-profit hospital of the Church of Uganda, Diocese of Kinkiizi,
              serving communities in Kanungu and patients from across Uganda.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-accent">
              <Heart className="size-3.5" aria-hidden />
              We treat, God heals.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-[1fr_1fr_1.4fr]">
            <FooterColumn
              title="Care"
              links={[
                ["Services", "/services"],
                ["Departments", "/departments"],
                ["Our Team", "/team"],
              ]}
            />
            <FooterColumn
              title="Discover"
              links={[
                ["Community Health", "/community-health"],
                ["Education & Training", "/education"],
                ["Projects", "/projects"],
                ["News & Events", "/news"],
                ["Gallery", "/gallery"],
              ]}
            />
            <div>
              <p className="text-sm font-bold text-accent">Contact</p>
              <a
                href={contact.phoneHref}
                className="mt-4 block text-sm font-semibold tabular-nums hover:text-accent"
              >
                {contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="mt-2 block text-[12.5px] leading-5 text-background/70 hover:text-accent [overflow-wrap:anywhere]"
              >
                {contact.email}
              </a>
              <p className="mt-2 text-sm leading-6 text-background/70">{contact.address}</p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-background hover:text-accent"
              >
                Get directions
              </Link>
            </div>
          </div>
        </div>
        <div className="site-container mt-12 flex flex-col gap-4 border-t border-background/10 pt-6 text-xs text-background/55 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Bwindi Community Hospital</span>
          <span className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/information" className="hover:text-background">
              Information archive
            </Link>
            <Link to="/support" className="hover:text-background">
              Ways to give
            </Link>
            <Link to="/contact" className="hover:text-background">
              Contact
            </Link>
          </span>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-background/95 backdrop-blur md:hidden">
        <MobileAction to="/contact" label="Book" />
        <a
          href={contact.phoneHref}
          className="flex flex-col items-center gap-1 py-3 text-[10px] font-semibold"
        >
          <span className="size-2 rounded-full bg-destructive" />
          Emergency
        </a>
        <MobileAction to="/services" label="Services" />
        <MobileAction to="/support" label="Donate" />
      </div>
    </div>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly (readonly [string, string])[];
}) {
  return (
    <div>
      <p className="text-sm font-bold text-accent">{title}</p>
      {links.map(([label, to]) => (
        <Link
          key={to}
          to={to}
          className="mt-4 block text-sm text-background/70 hover:text-background"
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

function MobileAction({ to, label }: { to: "/contact" | "/services" | "/support"; label: string }) {
  return (
    <Link to={to} className="flex flex-col items-center gap-1 py-3 text-[10px] font-semibold">
      <span className="size-2 rounded-full bg-primary" />
      {label}
    </Link>
  );
}
