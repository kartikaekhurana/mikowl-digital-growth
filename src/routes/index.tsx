import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowDown, ArrowRight, BarChart3, ChevronRight, CircleCheck, CircleAlert, ExternalLink, Linkedin, Loader2, Menu, Search, ShieldCheck, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { submitAudit, submitContact } from "@/lib/submissions.functions";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "MikOwl — Digital Transformation for Healthcare Practices" },
    { name: "description", content: "MikOwl helps dentists, doctors and healthcare practices improve visibility, trust, patient journeys and digital ROI." },
    { property: "og:title", content: "MikOwl — The Digital Growth Layer for Your Practice" },
    { property: "og:description", content: "Digital transformation for healthcare practices that want to be found, trusted and chosen." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

const services = [
  ["01", "Digital Audit", "We examine your complete digital footprint and identify what’s helping—or holding back—your practice.", "Google profile · Website · Reviews · Competitors"],
  ["02", "Google & Local Visibility", "Make it easier for people searching for your services nearby to discover your practice.", "Local SEO · Location strategy · Search visibility"],
  ["03", "Practice Website", "A personalised website built around the doctor, specialty, practice and patient journey.", "Custom design · Mobile · Technical SEO · CTAs"],
  ["04", "Search Growth", "A long-term organic search strategy shaped around what prospective patients actually search for.", "Service content · Search intent · Opportunity mapping"],
  ["05", "Reputation & Trust", "Build a stronger digital trust layer across every point where a patient evaluates your practice.", "Reviews · Credentials · Content · Practice story"],
  ["06", "Growth & Analytics", "Measure the actions that matter and continuously identify the next best opportunity.", "Visibility · Enquiries · Engagement · Conversion"],
];

const projects = [
  ["Credible Dental", "Dental practice", "Practice website and digital presence", "https://www.credibledental.com/"],
  ["PD Pedodent", "Pediatric dentistry", "Website experience and digital foundation", "https://www.pd-pedodent.com/"],
  ["Evergreen Web Studio", "Digital studio", "Brand and web experience", "https://www.evergreenwebstudio.ca/"],
  ["It’s The Pastry Portal", "Hospitality", "Digital storefront and web presence", "https://www.itsthepastryportal.com/"],
];

function ArrowLink({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-2">{children}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 30); f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  const links = [["What We Do", "#services"], ["How It Works", "#method"], ["Why MikOwl", "#why"], ["Work", "#work"], ["About", "#about"], ["Contact", "#contact"]];
  return <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-border bg-background/90 py-2 backdrop-blur-xl" : "py-4"}`}>
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
      <a href="#top" className="font-display text-xl font-bold">Mik<span className="text-primary">Owl</span><span className="text-primary">.</span></a>
      <nav className="hidden items-center gap-7 lg:flex">{links.map(([l,h]) => <a key={l} href={h} className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">{l}</a>)}</nav>
      <Button asChild size="sm" className="hidden lg:inline-flex"><a href="#audit"><ArrowLink>Get Your Digital Audit</ArrowLink></a></Button>
      <Button aria-label={open ? "Close menu" : "Open menu"} variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </div>
    {open && <div className="border-t border-border bg-background px-5 py-6 lg:hidden"><nav className="flex flex-col">{links.map(([l,h]) => <a key={l} href={h} onClick={() => setOpen(false)} className="border-b border-border py-4 font-display text-2xl font-semibold">{l}</a>)}<Button asChild className="mt-6"><a href="#audit">Get Your Digital Audit <ArrowRight /></a></Button></nav></div>}
  </header>;
}

function DigitalSystem() {
  const nodes = ["Google Profile", "Website", "Reviews", "Local SEO", "Patient Journey", "Analytics"];
  return <div className="relative mx-auto aspect-square w-full max-w-[570px] animate-float-soft">
    <div className="absolute inset-[13%] rounded-full border border-primary/20" />
    <div className="absolute inset-[25%] rounded-full border border-dashed border-border" />
    <div className="absolute inset-[36%] grid place-items-center rounded-full border border-primary/30 bg-card shadow-xl"><div className="text-center"><div className="mx-auto mb-2 grid size-10 place-items-center rounded-full bg-primary text-primary-foreground"><Sparkles className="size-5" /></div><b className="font-display text-lg">Your Practice</b><p className="text-xs text-muted-foreground">Digital growth layer</p></div></div>
    {nodes.map((n,i) => { const pos = [["left-0","top-[22%]"],["right-0","top-[22%]"],["left-[2%]","bottom-[22%]"],["right-[2%]","bottom-[22%]"],["left-[34%]","top-0"],["left-[38%]","bottom-0"]][i] ?? []; return <div key={n} className={`absolute ${pos.join(" ")} rounded-md border border-border bg-card px-3 py-2 text-xs font-semibold shadow-sm transition-transform hover:-translate-y-1`}>{n}</div>})}
    <div className="absolute left-[18%] right-[18%] top-1/2 h-px animate-pulse-line bg-primary" />
  </div>;
}

function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="max-w-3xl"><p className="mb-5 text-xs font-bold uppercase text-primary">{eyebrow}</p><h2 className="text-4xl font-semibold leading-[1.08] md:text-6xl">{title}</h2>{copy && <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">{copy}</p>}</div>;
}

function Index() {
  return <main id="top"><Header />
    <section className="min-h-[92vh] border-b border-border pt-32 md:pt-40"><div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 lg:grid-cols-[1.08fr_.92fr] lg:px-8">
      <div><p className="mb-7 flex items-center gap-3 text-xs font-bold uppercase text-primary"><span className="h-px w-8 bg-primary" />Digital transformation for healthcare practices</p><h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl xl:text-[5.4rem]">Your practice is good.<br/><span className="text-muted-foreground">Your digital presence should prove it.</span></h1><p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">MikOwl helps dentists, doctors and healthcare practices transform their digital presence—from Google visibility and local SEO to personalised websites and conversion-focused patient journeys.</p><div className="mt-9 flex flex-wrap gap-3"><Button asChild size="lg"><a href="#audit"><ArrowLink>Get a Digital Audit</ArrowLink></a></Button><Button asChild size="lg" variant="outline"><a href="#method">See how MikOwl works <ArrowDown className="size-4" /></a></Button></div><p className="mt-8 flex items-center gap-2 text-sm font-medium"><CircleCheck className="size-4 text-primary" /> Built for practices that are great offline—and ready to compete online.</p></div><DigitalSystem />
    </div></section>

    <section id="why" className="py-24 md:py-36"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="The digital gap" title="Your patients are already searching. The question is what they find." copy="You are an expert in healthcare. You shouldn’t have to become an expert in digital growth too."/><div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2"><Journey bad/><Journey /></div></div></section>

    <section id="services" className="bg-foreground py-24 text-background md:py-36"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="What MikOwl does" title="We fix the entire digital journey." copy="From first discovery to measurable action, every part of your digital presence should work as one connected system."/><div className="mt-16 grid border-l border-t border-background/15 md:grid-cols-2 lg:grid-cols-3">{services.map(([n,t,c,tags]) => <article key={n} className="group min-h-72 border-b border-r border-background/15 p-7 transition-colors hover:bg-background/5"><span className="text-xs text-background/50">{n}</span><h3 className="mt-12 text-2xl font-semibold">{t}</h3><p className="mt-4 text-sm leading-6 text-background/65">{c}</p><p className="mt-6 text-xs leading-5 text-background/45">{tags}</p></article>)}</div></div></section>

    <section id="method" className="py-24 md:py-36"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="The MikOwl method" title="Not another website. A system."/><div className="mt-16 grid gap-8 md:grid-cols-3 lg:grid-cols-6">{[["Audit","Understand where you are."],["Diagnose","Find what holds you back."],["Strategy","Build the roadmap."],["Build","Create the foundation."],["Optimise","Improve visibility and conversion."],["Grow","Track, learn and improve."]].map(([t,c],i)=><div key={t} className="relative border-t border-border pt-6"><div className="absolute -top-1.5 left-0 size-3 rounded-full bg-primary"/><p className="text-xs text-primary">0{i+1}</p><h3 className="mt-5 text-lg font-semibold">{t}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{c}</p></div>)}</div></div></section>

    <section className="border-y border-border bg-card py-24 md:py-32"><div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.85fr_1.15fr] lg:px-8"><div><SectionTitle eyebrow="Our signature diagnostic" title="The MikOwl Digital Practice Score™" copy="We evaluate your digital foundation across visibility, trust, experience, conversion and competition."/><Button asChild className="mt-8"><a href="#audit"><ArrowLink>Request your audit</ArrowLink></a></Button></div><ScoreGrid /></div></section>

    <section className="py-24 md:py-36"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid items-end gap-8 lg:grid-cols-2"><SectionTitle eyebrow="The local landscape" title="Your competition isn’t standing still. Neither should your digital presence."/><p className="max-w-xl text-muted-foreground">We look beyond your website to understand local visibility, review presence, content depth and the full conversion experience around your practice.</p></div><div className="relative mt-16 overflow-hidden border border-border bg-card p-6 md:p-10"><div className="absolute inset-y-0 left-1/3 w-px animate-pulse-line bg-primary/40"/><div className="grid gap-6 lg:grid-cols-[1fr_auto_1.3fr]"><div className="border border-primary bg-background p-6"><p className="text-xs text-primary">YOUR PRACTICE</p><h3 className="mt-10 text-2xl font-semibold">Current digital footprint</h3></div><div className="grid place-items-center text-xs text-muted-foreground">VERSUS</div><div className="grid grid-cols-2 gap-3">{["Google visibility","Website experience","Review presence","Content depth","Local SEO","Conversion"].map(x=><div key={x} className="border border-border bg-background p-4 text-xs font-medium">{x}<div className="mt-3 h-1 bg-secondary"><div className="h-full w-2/3 bg-muted-foreground/40"/></div></div>)}</div></div></div></div></section>

    <section className="bg-foreground py-24 text-background md:py-36"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Commercial focus" title="Because traffic isn’t the goal. Growth is." copy="A beautiful website is useful only when it contributes to business outcomes. We focus on measurable digital actions—not vanity metrics."/><div className="mt-16 flex flex-wrap items-center gap-3">{["Search","Profile / Website","Trust","Enquiry","Appointment","Patient","Long-term value"].map((x,i)=><div key={x} className="flex items-center gap-3"><span className="border border-background/20 px-4 py-3 text-sm">{x}</span>{i<6&&<ArrowRight className="size-4 text-primary"/>}</div>)}</div></div></section>

    <section id="work" className="py-24 md:py-36"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Selected work" title="A few businesses we’ve helped build digitally."/><div className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">{projects.map(([name,cat,scope,url],i)=><a key={name} href={url} target="_blank" rel="noreferrer" className="group bg-card p-7 md:p-9"><div className="mb-12 flex h-40 items-end border border-border bg-secondary p-5 transition-transform duration-500 group-hover:-translate-y-1"><span className="font-display text-3xl font-semibold text-muted-foreground/60">{String(i+1).padStart(2,"0")}</span></div><p className="text-xs uppercase text-primary">{cat}</p><div className="mt-3 flex items-center justify-between"><h3 className="text-2xl font-semibold">{name}</h3><ExternalLink className="size-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"/></div><p className="mt-3 text-sm text-muted-foreground">{scope}</p></a>)}</div></div></section>

    <section id="about" className="border-y border-border bg-card py-24 md:py-36"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-16 lg:grid-cols-2"><div><SectionTitle eyebrow="Healthcare specialisation" title="Built around the way healthcare practices actually work." copy="Practitioners bring the clinical expertise. MikOwl handles the digital layer, so patients get a clearer journey and practices can focus on the work that matters."/><div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">{["Doctor — Healthcare expertise","MikOwl — Digital expertise","Patient — Better journey"].map((x,i)=><div key={x} className="flex items-center gap-3"><span className="border border-border bg-background px-4 py-3 text-xs font-semibold">{x}</span>{i<2&&<ArrowRight className="hidden size-4 text-primary sm:block"/>}</div>)}</div></div><div className="border-l border-border pl-7 md:pl-12"><p className="text-xs font-bold uppercase text-primary">Founder</p><div className="mt-8 grid aspect-[4/3] place-items-center bg-foreground text-background"><div className="text-center"><span className="text-5xl font-semibold">KK</span><p className="mt-3 text-xs text-background/50">Founder portrait forthcoming</p></div></div><h3 className="mt-7 text-3xl font-semibold">Built by Kartikae Khurana.</h3><p className="mt-2 text-sm text-muted-foreground">Founder, MikOwl Software Solutions</p><blockquote className="mt-6 text-lg leading-8">“Technology shouldn’t make business owners feel more complicated. It should make their business work better.”</blockquote><p className="mt-5 text-sm leading-6 text-muted-foreground">MikOwl was created around a simple observation: many great businesses have strong real-world services but an underdeveloped digital presence. MikOwl exists to close that gap.</p><a href="https://in.linkedin.com/in/kartikae-khurana-631679164" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><Linkedin className="size-4"/> Connect on LinkedIn<ArrowRight className="size-3.5"/></a></div></div></div></section>

    <section id="audit" className="py-24 md:py-36"><div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8"><SectionTitle eyebrow="Digital audit" title="Wondering how your practice looks online?" copy="Let’s find the gaps before your competitors do."/><AuditForm/></div></section>

    <section id="contact" className="border-t border-border py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-10 lg:grid-cols-2"><SectionTitle eyebrow="Start a conversation" title="Let’s make your digital presence work harder." copy="No hard sell. Just a clear look at where your digital presence stands."/><div className="grid gap-4 sm:grid-cols-2">{["Name","Email","Practice / Business","Website","Location","What do you want to improve?"].map((x,i)=><label key={x} className={i===5?"sm:col-span-2":""}><span className="mb-2 block text-xs font-semibold">{x}</span>{i===5?<textarea className="min-h-28 w-full border border-input bg-card p-3 outline-none focus:border-primary"/>:<input className="h-12 w-full border border-input bg-card px-3 outline-none focus:border-primary"/>}</label>)}<Button className="mt-2 sm:col-span-2">Start the conversation <ArrowRight/></Button></div></div></div></section>

    <section className="bg-primary py-24 text-primary-foreground md:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-8"><p className="text-xs font-bold uppercase text-primary-foreground/70">The digital side, handled</p><h2 className="mt-6 max-w-5xl text-5xl font-semibold leading-[1.05] md:text-7xl">Your practice already does the hard part.<br/><span className="text-primary-foreground/65">Let MikOwl build the digital side.</span></h2><Button asChild size="lg" className="mt-10 bg-background text-foreground hover:bg-background/90"><a href="#audit"><ArrowLink>Get Your Digital Audit</ArrowLink></a></Button></div></section>
    <footer className="bg-foreground py-14 text-background"><div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-3 lg:px-8"><div><p className="font-display text-xl font-bold">Mik<span className="text-primary">Owl.</span></p><p className="mt-4 max-w-sm text-sm leading-6 text-background/55">Digital transformation for practices that want to be found, trusted and chosen.</p></div><div className="text-sm text-background/55"><p className="font-semibold text-background">Kartikae Khurana</p><p>Founder, MikOwl Software Solutions</p></div><p className="text-sm text-background/45 md:text-right">© 2026 MikOwl Software Solutions.</p></div></footer>
  </main>;
}

function Journey({ bad=false }: { bad?: boolean }) { const steps=bad?["Google listing","Generic website","Patient leaves","No visibility"]:["Search","Discover","Trust","Explore","Enquire","Book"]; return <div className="bg-card p-7 md:p-10"><p className="text-xs font-bold uppercase text-muted-foreground">{bad?"The traditional practice":"The MikOwl practice"}</p><div className="mt-8 flex flex-wrap items-center gap-3">{steps.map((x,i)=><div key={x} className="flex items-center gap-3"><span className={`px-3 py-2 text-sm ${bad?"bg-secondary text-muted-foreground":"bg-accent text-accent-foreground"}`}>{x}</span>{i<steps.length-1&&<ChevronRight className="size-4 text-muted-foreground"/>}</div>)}</div></div> }

function ScoreGrid() {
  const scores = [
    ["Visibility", "Can people find you?", Search],
    ["Trust", "Does your presence inspire confidence?", ShieldCheck],
    ["Experience", "Is your practice easy to understand?", Sparkles],
    ["Conversion", "Can visitors easily take the next step?", ChevronRight],
    ["Competition", "How do you compare nearby?", BarChart3],
  ] as const;
  return <div className="grid gap-3 sm:grid-cols-2">{scores.map(([title, copy, Icon], i) => <div key={title} className={`border border-border bg-background p-5 ${i === 4 ? "sm:col-span-2" : ""}`}><Icon className="size-5 text-primary"/><h3 className="mt-6 font-semibold">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{copy}</p><div className="mt-5 h-1 overflow-hidden bg-secondary"><div className="h-full bg-primary" style={{ width: `${58 + i * 7}%` }}/></div></div>)}</div>;
}

function AuditForm() { const fields=["Name","Practice name","Website","City","Specialty","Email"]; return <form onSubmit={e=>e.preventDefault()} className="grid gap-4 border border-border bg-card p-6 shadow-sm md:grid-cols-2 md:p-8">{fields.map(x=><label key={x}><span className="mb-2 block text-xs font-semibold">{x}</span><input required={x==="Name"||x==="Email"} type={x==="Email"?"email":"text"} className="h-12 w-full border border-input bg-background px-3 outline-none transition-colors focus:border-primary"/></label>)}<Button type="submit" size="lg" className="mt-2 md:col-span-2">Analyse my presence <ArrowRight/></Button><p className="text-xs text-muted-foreground md:col-span-2">A focused diagnostic, not a generic sales form.</p></form> }