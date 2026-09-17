import { navLinks, socialLinks } from "@/lib/info";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

/* ── Inline SVG social icons (Lucide React doesn't ship social icons) ── */

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 1 1-2.882 0 1.441 1.441 0 0 1 2.882 0z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

const socialIconMap: Record<string, React.FC<{ className?: string }>> = {
  YouTube: YouTubeIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
};

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden">
      {/* Glassy top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent dark:via-white/20 pointer-events-none z-20" />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-primary/3 via-transparent to-transparent dark:from-primary/6 pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 pt-16 md:pt-16 pb-6">
        {/* ── Main grid: Location · Socials · Links ── */}
        <div className="flex flex-col-reverse md:grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Location */}
          <div className="flex flex-col">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">
              Our Location
            </h3>
            <p className="text-lg leading-snug mb-5">
              Arrow of Deliverance Ministry,
              <br />
              Jalingo, Taraba State, Nigeria
            </p>
            <Link
              href="https://maps.app.goo.gl/hrqBHLsDPAXc3b8J7"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "w-fit rounded-md",
              )}
            >
              <MapPin className="size-4" />
              Visit Us
            </Link>
          </div>

          {/* Social links */}
          <div className="flex flex-col">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">
              Connect With Us
            </h3>
            <ul className="grid grid-cols-2 gap-3">
              {socialLinks.map(({ name, href }) => {
                const Icon = socialIconMap[name];
                return (
                  <li key={name}>
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social flex items-center gap-3 px-3 py-2.5 rounded-md border border-border bg-foreground/2 hover:bg-foreground/6 dark:bg-white/3 dark:hover:bg-white/8 transition-all duration-200"
                    >
                      {Icon && (
                        <Icon className="size-5 shrink-0 text-muted-foreground group-hover/social:text-foreground transition-colors" />
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium truncate">
                          {name}
                        </span>
                      </div>
                      <ArrowUpRight className="size-3.5 ml-auto shrink-0 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover/social:opacity-60 group-hover/social:translate-y-0 group-hover/social:translate-x-0 transition-all duration-200" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Page links */}
          <div className="flex flex-col md:items-center">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">
              Quick Links
            </h3>
            <nav>
              <ul className="flex flex-col gap-1">
                {navLinks.map(({ name, href }) => (
                  <li key={name}>
                    <Link
                      href={href}
                      className="group/link flex items-center gap-2 py-2 text-base text-foreground/80 hover:text-foreground transition-colors"
                    >
                      <span className="h-px w-0 group-hover/link:w-4 bg-primary transition-all duration-300" />
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* ── Separator ── */}
        <div className="mt-8 mb-8 h-px bg-linear-to-r from-transparent via-border to-transparent" />
        {/* ── Large typographic ministry name ── */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-6xl md:text-8xl leading-[0.85] font-bold font-heading tracking-tight text-foreground/10 dark:text-foreground/10 select-none pointer-events-none">
            Arrow of Deliverance Ministries
          </h2>
          <span className="text-sm text-muted-foreground mt-6">
            © {new Date().getFullYear()} Arrow of Deliverance Ministries
            Int&apos;l. All rights reserved.
          </span>
        </div>

        {/* Bottom spacing */}
        <div className="h-4" />
      </div>
    </footer>
  );
}
