"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { testimonies, type Testimony } from "@/lib/testimonies";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  ImageIcon,
  Pause,
  Play,
} from "lucide-react";
import gsap from "gsap";
import { Button, buttonVariants } from "../ui/button";

const categoryColors: Record<Testimony["category"], string> = {
  Healing: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  Breakthroughs:
    "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  Deliverance:
    "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  Salvation:
    "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  Provision:
    "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
};

export function TestimonySlide({ testimony }: { testimony: Testimony }) {
  const hasImages = testimony.images && testimony.images.length > 0;

  return (
    <div className="testimony-slide shrink-0 w-[85vw] sm:w-100 md:w-110 px-2.5 py-4">
      <div className="relative h-full rounded-2xl bg-card border border-border shadow-sm hover:shadow-md p-8 flex flex-col justify-between overflow-hidden group transition-all duration-300">
        {/* Subtle Background Watermark Quote */}
        <Quote className="absolute -top-4 -left-2 size-32 text-primary/4 rotate-6 pointer-events-none group-hover:text-primary/6 transition-colors duration-500" />

        <div className="relative z-10">
          {/* Category Badge & Image Indicator */}
          <div className="mb-6 flex items-center justify-between">
            <span
              className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${categoryColors[testimony.category]}`}
            >
              {testimony.category}
            </span>
            {hasImages && (
              <div
                className="flex items-center gap-1.5 text-muted-foreground bg-muted px-2 py-1 rounded-md"
                title="This testimony includes images"
              >
                <ImageIcon className="size-3.5" />
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                  Images
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-heading font-semibold text-foreground mb-4 leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {testimony.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[15px] text-muted-foreground leading-relaxed line-clamp-4 italic">
            {testimony.excerpt}
          </p>
        </div>

        {/* Bottom section */}
        <div className="relative z-10 mt-8 pt-6 border-t border-border/50 flex items-center justify-between">
          {/* Author */}
          <div className="flex items-center gap-2">
            {testimony.author.avatar ? (
              <Image
                src={testimony.author.avatar}
                alt={testimony.author.name}
                width={40}
                height={40}
                className="rounded-full object-cover size-10 border border-border"
              />
            ) : (
              <div className="size-10 h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground border border-border">
                {testimony.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-foreground leading-tight">
                {testimony.author.name}
              </p>
              <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                {testimony.author.location}
              </p>
            </div>
          </div>

          {/* Read More */}
          <Link
            href={`/testimonies/${testimony.id}`}
            className="text-xs font-bold text-primary hover:underline underline-offset-4 whitespace-nowrap"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}

export function TestimonySlideshow() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sort by newest and limit to 10
  const latestTestimonies = [...testimonies]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const total = latestTestimonies.length;
  const [visibleCount, setVisibleCount] = useState(1);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // How many cards visible at once
  const getVisibleCount = useCallback(() => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }, []);

  useEffect(() => {
    const updateVisibleCount = () => setVisibleCount(getVisibleCount());
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [getVisibleCount]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  const maxIndex = useCallback(() => {
    return Math.max(0, total - visibleCount);
  }, [total, visibleCount]);

  const slideTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;

      const clamped = Math.max(0, Math.min(index, maxIndex()));
      const slides = track.querySelectorAll<HTMLElement>(".testimony-slide");
      if (!slides[clamped]) return;

      const offset = slides[clamped].offsetLeft;

      gsap.to(track, {
        x: -offset,
        duration: 0.5,
        ease: "power2.out",
      });

      setCurrent(clamped);
    },
    [maxIndex],
  );

  const next = useCallback(() => {
    setCurrent((prev) => {
      const newIndex = prev >= maxIndex() ? 0 : prev + 1;
      slideTo(newIndex);
      return newIndex;
    });
  }, [maxIndex, slideTo]);

  const prev = useCallback(() => {
    setCurrent((prev) => {
      const newIndex = prev <= 0 ? maxIndex() : prev - 1;
      slideTo(newIndex);
      return newIndex;
    });
  }, [maxIndex, slideTo]);

  useEffect(() => {
    const clamped = Math.min(current, maxIndex());
    slideTo(clamped);
  }, [visibleCount, maxIndex, slideTo, current]);

  // Autoplay
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(next, 5000);
  }, [next]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!autoplayPaused && !prefersReducedMotion) startAutoplay();
    else stopAutoplay();
    return stopAutoplay;
  }, [autoplayPaused, prefersReducedMotion, startAutoplay, stopAutoplay]);

  const handlePrev = () => {
    prev();
    stopAutoplay();
    if (!autoplayPaused && !prefersReducedMotion) startAutoplay();
  };

  const handleNext = () => {
    next();
    stopAutoplay();
    if (!autoplayPaused && !prefersReducedMotion) startAutoplay();
  };

  const toggleAutoplay = () => {
    if (autoplayPaused) {
      setAutoplayPaused(false);
    } else {
      stopAutoplay();
      setAutoplayPaused(true);
    }
  };

  return (
    <div className="relative">
      {/* Overflow wrapper */}
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex will-change-transform">
          {latestTestimonies.map((testimony) => (
            <TestimonySlide key={testimony.id} testimony={testimony} />
          ))}
        </div>
      </div>

      {/* Controls: arrows + dots */}
      <div className="flex items-center justify-between px-4 md:px-10 mt-8">
        {/* View All Link */}
        <div className="flex gap-2 items-center">
          <Link
            href="/testify"
            className={
              "bg-foreground text-background p-1 px-4 rounded-md border-2"
            }
          >
            Share Yours
          </Link>
          <Link
            href="/testimonies"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            See More
          </Link>
        </div>

        {/* Dot Indicators */}
        <div className="flex-1 justify-center gap-1.5 mx-4 hidden md:flex">
          {Array.from({ length: maxIndex() + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                slideTo(i);
                stopAutoplay();
                if (!autoplayPaused && !prefersReducedMotion) startAutoplay();
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-2">
          <Button
            onClick={toggleAutoplay}
            className="size-10 rounded-full border border-border bg-card hover:bg-muted flex items-center justify-center transition-colors cursor-pointer"
            aria-label={
              autoplayPaused
                ? "Resume testimony autoplay"
                : "Pause testimony autoplay"
            }
          >
            {autoplayPaused ? (
              <Play className="size-5 text-foreground" />
            ) : (
              <Pause className="size-5 text-foreground" />
            )}
          </Button>
          <Button
            onClick={handlePrev}
            className="size-10 rounded-full border border-border bg-card hover:bg-muted flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous testimony"
          >
            <ChevronLeft className="size-5 text-foreground" />
          </Button>
          <Button
            onClick={handleNext}
            className="size-10 rounded-full border border-border bg-card hover:bg-muted flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next testimony"
          >
            <ChevronRight className="size-5 text-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
}
