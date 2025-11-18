import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({
  text = "",
  font = "",
  className = "",
}) {
  const containerRef = useRef(null);
  const maskRef = useRef(null);

  useGSAP(
    () => {
      const mask = maskRef.current;
      if (!mask) return;

      gsap.set(mask, { scaleX: 1, transformOrigin: "left" });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
        animation: gsap.to(mask, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.2,
          ease: "power2.inOut",
        }),
      });
    },
    { scope: containerRef }
  );

  return (
    <p
      ref={containerRef}
      className={`reveal-text relative inline-block overflow-hidden ${font} ${className}`}
    >
      <span className="inline-block">{text}</span>
      <span ref={maskRef} className="mask" />
    </p>
  );
}