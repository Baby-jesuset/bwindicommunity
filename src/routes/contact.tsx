import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowUpRight, CheckCircle2, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Kicker, PageHero, Section } from "@/components/page-sections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contact, services } from "@/lib/bch-content";
import { supabase } from "@/integrations/supabase/client";

const contactSearchSchema = z.object({ type: z.enum(["appointment", "contact"]).catch("contact") });

export const Route = createFileRoute("/contact")({
  validateSearch: contactSearchSchema,
  head: () => ({
    meta: [
      { title: "Contact & Appointments — Bwindi Community Hospital" },
      {
        name: "description",
        content:
          "Contact BCH, request an appointment and get directions to the hospital in Kanungu.",
      },
      { property: "og:title", content: "Contact Bwindi Community Hospital" },
      { property: "og:description", content: "Phone, email, appointments and directions for BCH." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { type } = Route.useSearch();
  const [mode, setMode] = useState<"appointment" | "contact">(type);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      request_type: mode,
      full_name: String(form.get("full_name") ?? ""),
      phone: String(form.get("phone") ?? "") || null,
      email: String(form.get("email") ?? "") || null,
      service: mode === "appointment" ? String(form.get("service") ?? "") || null : null,
      preferred_date:
        mode === "appointment" ? String(form.get("preferred_date") ?? "") || null : null,
      message: String(form.get("message") ?? ""),
    };
    const { error } = await supabase.from("website_requests").insert(payload);
    if (error) {
      setStatus("error");
      return;
    }
    formElement.reset();
    setStatus("sent");
  }

  return (
    <>
      <PageHero
        eyebrow="Contact BCH"
        title="We’re here to help."
        intro="Call for urgent care, request a routine appointment, or send a general message to the hospital team."
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <ContactRow icon={Phone} label="Hospital phone">
                <a
                  href={contact.phoneHref}
                  className="text-base font-bold text-primary hover:underline"
                >
                  {contact.phoneDisplay}
                </a>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  For urgent and routine hospital enquiries.
                </p>
              </ContactRow>
              <ContactRow icon={Mail} label="Email" className="mt-5 border-t border-border pt-5">
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm font-bold text-primary [overflow-wrap:anywhere] hover:underline"
                >
                  {contact.email}
                </a>
              </ContactRow>
              <ContactRow
                icon={MapPin}
                label="Address"
                className="mt-5 border-t border-border pt-5"
              >
                <p className="text-sm font-semibold">{contact.address}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Bwindi Community Hospital, Buhoma, Kanungu District, Uganda.
                </p>
              </ContactRow>
            </div>

            <div className="rounded-2xl bg-secondary p-5 sm:p-6">
              <ContactRow icon={Clock3} label="Published outpatient hours">
                <p className="text-sm leading-6">
                  Monday–Saturday: 8:00 am–5:00 pm
                  <br />
                  Sunday: 10:00 am–5:00 pm
                  <br />
                  Emergency services: open 24 hours
                </p>
              </ContactRow>
              <p className="mt-4 border-t border-foreground/10 pt-4 text-xs leading-5 text-muted-foreground">
                BCH’s contact page states that email messages are answered within 24 hours. Call the
                hospital for urgent enquiries.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-foreground/50">BCH on social media</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  ["Twitter", "https://twitter.com/Bwinditweets"],
                  ["Facebook", "https://www.facebook.com/BwindiCommunityHospital/"],
                  ["YouTube", "https://www.youtube.com/watch?v=doAMnLoh9rg"],
                  ["Flickr", "https://www.flickr.com/photos/bwindihospital/"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {label}
                    <ArrowUpRight className="size-3" />
                  </a>
                ))}
              </div>
            </div>

            <Button className="w-full" size="lg" asChild>
              <a href={contact.phoneHref}>
                <Phone />
                Call Bwindi Community Hospital
              </a>
            </Button>
          </aside>

          <div className="rounded-[2rem] border border-border bg-card p-5 shadow-[0_24px_44px_-44px_rgba(21,61,49,0.5)] sm:p-7 md:p-8">
            <Kicker>Send a request</Kicker>
            <div className="mt-4 grid grid-cols-2 gap-1.5 rounded-full bg-secondary p-1.5">
              {(
                [
                  ["appointment", "Appointment"],
                  ["contact", "General message"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={mode === value}
                  onClick={() => {
                    setMode(value);
                    setStatus("idle");
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    mode === value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {status === "sent" ? (
              <div className="py-16 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-mint text-emerald-700">
                  <CheckCircle2 className="size-7" />
                </span>
                <h2 className="mt-5 text-2xl font-extrabold tracking-[-0.02em]">
                  Request received
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                  Thank you. The BCH team will review your message and use your contact details to
                  respond.
                </p>
                <Button className="mt-6" onClick={() => setStatus("idle")}>
                  Send another request
                </Button>
              </div>
            ) : (
              <form className="mt-6 space-y-5" onSubmit={submit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name">
                    <Input
                      name="full_name"
                      required
                      minLength={2}
                      autoComplete="name"
                      className="h-11 rounded-xl"
                    />
                  </Field>
                  <Field label="Phone number">
                    <Input name="phone" type="tel" autoComplete="tel" className="h-11 rounded-xl" />
                  </Field>
                </div>
                <Field label="Email address">
                  <Input
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="h-11 rounded-xl"
                  />
                </Field>
                {mode === "appointment" && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Service">
                      <select
                        name="service"
                        className="h-11 w-full rounded-xl border border-input bg-transparent px-3 text-sm"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service.name}>{service.name}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Preferred date">
                      <Input
                        name="preferred_date"
                        type="date"
                        className="h-11 rounded-xl"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </Field>
                  </div>
                )}
                <Field label={mode === "appointment" ? "Tell us what care you need" : "Message"}>
                  <Textarea
                    name="message"
                    required
                    minLength={5}
                    maxLength={2000}
                    className="min-h-32 rounded-xl"
                  />
                </Field>
                <p className="rounded-xl bg-secondary px-4 py-3 text-xs leading-5 text-muted-foreground">
                  Do not use this form for an emergency. Call {contact.phoneDisplay} directly.
                </p>
                {status === "error" && (
                  <p role="alert" className="text-sm font-semibold text-destructive">
                    Your request could not be sent. Please call or email BCH instead.
                  </p>
                )}
                <Button size="lg" className="w-full" disabled={status === "sending"}>
                  {status === "sending"
                    ? "Sending…"
                    : mode === "appointment"
                      ? "Send appointment request"
                      : "Send message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Section>

      <Section tone="cream" label="Location">
        <Kicker>Location</Kicker>
        <h2 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[2.5rem]">
          Find us in Buhoma, Kanungu
        </h2>
        <div className="relative mt-8 grid min-h-80 place-items-center overflow-hidden rounded-[2rem] border border-border bg-card p-8 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(0.939_0.043_41/0.9),transparent_60%)]"
          />
          <div className="relative">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-peach text-primary">
              <MapPin className="size-7" aria-hidden />
            </span>
            <p className="mt-4 text-lg font-bold">Bwindi Community Hospital</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Near Bwindi Impenetrable Forest, southwestern Uganda
            </p>
            <Button className="mt-5" asChild>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Bwindi+Community+Hospital"
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps
                <ArrowUpRight />
              </a>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
  className = "",
}: {
  icon: typeof Phone;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="flex items-center gap-2 text-xs font-bold text-foreground/50">
        <Icon className="size-3.5 text-primary" aria-hidden />
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold">{label}</span>
      {children}
    </label>
  );
}
