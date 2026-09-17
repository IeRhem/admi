"use client";

import { logo, navLinks } from "@/lib/info";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  useGSAP(() => {
    gsap.set(".header", { y: -100, opacity: 0 });

    const headerTween = gsap.timeline({
      scrollTrigger: {
        trigger: ".header",
        start: "bottom top",
        toggleActions: "play none none reverse",
      },
    });

    headerTween.to(".header", {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "expo.out",
    });
  }, []);

  return (
    <header className="header opacity-0 sticky top-0 left-0 z-100 w-full py-3">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="shrink-0">
          <Image src={logo} width="50" height="50" alt="ADMI" />
        </Link>

        <nav
          className={cn(
            "nav hidden gap-2 rounded-lg p-2 font-medium text-white transition-colors duration-300 md:flex",
            scrolled && "bg-primary",
          )}
        >
          {navLinks.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-md px-4 py-2 transition-colors duration-200",
                  isActive
                    ? "bg-white text-black"
                    : "text-white hover:bg-foreground hover:text-black",
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/"
            className={buttonVariants({
              size: "lg",
              className:
                "bg-primary-foreground! py-5! px-6! text-primary! rounded-lg! border-4!",
            })}
          >
            Give
          </Link>
          <Link
            href="/"
            className={buttonVariants({
              size: "lg",
              className:
                "bg-[#FF0000]! py-5! px-6! text-white! rounded-lg! border-4!",
            })}
          >
            Watch Online
          </Link>
        </div>

        <Button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 bg-primary text-white transition-colors hover:bg-primary/90 md:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {menuOpen && (
        <div className="mx-4 mt-3 rounded-2xl border border-white/10 bg-foreground p-3 shadow-lg backdrop-blur-md md:hidden">
          <div className="mb-3 flex gap-2">
            <Link
              href="/"
              onClick={handleLinkClick}
              className={buttonVariants({
                size: "lg",
                className:
                  "bg-primary-foreground! h-12! flex-1! justify-center! px-5! text-primary! rounded-lg! border-2! border-primary! text-base!",
              })}
            >
              Give
            </Link>
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={buttonVariants({
                size: "lg",
                className:
                  "bg-[#FF0000]! h-12! flex-1! justify-center! px-5! text-white! rounded-lg! border-2! border-background! text-base!",
              })}
            >
              Watch Live
            </Link>
          </div>

          <nav className="flex flex-col gap-2 text-background">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-md px-4 py-3 text-left transition-colors duration-200",
                    isActive
                      ? "bg-background text-foreground"
                      : "hover:bg-background hover:text-foreground",
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
