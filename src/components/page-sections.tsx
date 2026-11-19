import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

const tones = {
  white: "bg-background text-foreground",
  cream: "bg-secondary text-foreground",
  green: "bg-foreground text-background",
} as const;

type Tone = keyof typeof tones;
type Destination = "/contact" | "/team" | "/support" | "/projects" | "/services" | "/information";

/**
 * Returns the visitor to the page they came from. Falls back to a sensible
 * parent route when the tab has no history to go back to (e.g. a direct link).
 */
export function BackLink({ fallback, label = "Back" }: { fallback: Destination; label?: string }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
          window.history.back();
        } else {
          navigate({ to: fallback });
        }
      }}
      className="inline-flex items-center gap-1.5 rounded-full text-sm font-bold text-primary transition-colors hover:underline"
    >
      <ArrowLeft className="size-4" aria-hidden />
      {label}
    </button>
  );
}

export function Kicker({
  children,
  light = false,
  className = "",
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2 text-[13px] font-bold tracking-[0.02em] ${light ? "text-accent" : "text-primary"} ${className}`}
    >
      <span className={`size-1.5 rotate-45 ${light ? "bg-accent" : "bg-primary"}`} aria-hidden />
      {children}
    </p>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  action,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  action?: ReactNode;
}) {
  return (
    <section aria-label={eyebrow} className="relative overflow-hidden bg-secondary">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full border-[26px] border-primary/10 lg:size-80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-14 hidden h-28 w-44 rounded-t-full bg-butter/80 lg:block"
      />
      <div className="site-container relative py-12 md:py-16 lg:py-20">
        <Kicker>{eyebrow}</Kicker>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-12">
          <h1 className="max-w-4xl text-[2.35rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-balance md:text-5xl lg:text-[3.6rem]">
            {title}
          </h1>
          <div className="lg:pb-2">
            <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-[17px]">
              {intro}
            </p>
            {action && <div className="mt-6">{action}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Section({
  tone = "white",
  label,
  className = "",
  innerClassName = "",
  children,
}: {
  tone?: Tone;
  label?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section aria-label={label} className={`${tones[tone]} ${className}`}>
      <div className={`site-container py-14 md:py-20 ${innerClassName}`}>{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  link,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  link?: { label: string; to: string };
}) {
  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        {eyebrow && <Kicker>{eyebrow}</Kicker>}
        <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-balance md:text-[2.5rem]">
          {title}
        </h2>
        {intro && (
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{intro}</p>
        )}
      </div>
      {link && (
        <Button variant="outline" className="shrink-0 self-start md:self-auto" asChild>
          <Link to={link.to as "/services"}>
            {link.label}
            <ArrowUpRight />
          </Link>
        </Button>
      )}
    </div>
  );
}

export function CTA({
  title,
  text,
  primary = "Book an appointment",
  to = "/contact",
  secondary,
}: {
  title: string;
  text: string;
  primary?: string;
  to?: Destination;
  secondary?: { label: string; to: Destination };
}) {
  return (
    <section aria-label={title} className="bg-background">
      <div className="site-container py-14 md:py-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-foreground px-6 py-10 text-background sm:px-10 md:py-12 lg:px-14">
          <div
            aria-hidden
            className="absolute -left-16 -top-24 size-72 rounded-full bg-[radial-gradient(circle,oklch(0.45_0.08_155/0.5),transparent_65%)]"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 right-6 size-56 rotate-12 rounded-[45%_55%_50%_50%] border-[18px] border-accent/15"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.25fr_auto] lg:items-end">
            <div>
              <Kicker light>Next step</Kicker>
              <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-balance text-white md:text-[2.5rem]">
                {title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-background/75">{text}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {to === "/contact" ? (
                <Button size="lg" asChild>
                  <Link to="/contact" search={{ type: "appointment" }}>
                    {primary}
                    <ArrowRight />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" asChild>
                  <Link to={to}>
                    {primary}
                    <ArrowRight />
                  </Link>
                </Button>
              )}
              {secondary && (
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:border-white/50 hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <Link to={secondary.to}>{secondary.label}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
