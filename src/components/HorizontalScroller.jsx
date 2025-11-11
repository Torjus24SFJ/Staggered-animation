import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroller() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const itemsRef = useRef([]);

  useGSAP(
    () => {
      const track = trackRef.current;
      const items = itemsRef.current;
      if (!track || items.length === 0) return;

      const totalWidth = track.scrollWidth;

      gsap.to(items, {
        x: () => -(totalWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="overflow-hidden bg-linear-to-b from-purple-900 to-blue-900">
      <div className="h-screen flex items-center">
        <div
          ref={trackRef}
          className="flex gap-8 px-8"
          style={{ width: "fit-content" }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
              className="shrink-0 w-80 h-80 bg-linear-to-br from-pink-500 to-yellow-500 rounded-3xl shadow-2xl flex items-center justify-center text-6xl font-bold text-white"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}