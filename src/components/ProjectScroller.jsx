import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectScroller() {
  const container = useRef(null);
  const texts = useRef([]);

  const images = [
    "/images/testimage-1.jpg",
    "/images/testimage-2.jpg",
    "/images/testimage-3.jpg",
  ];

  const projects = [
    "Project 1 Webstore",
    "Project 2 Audio Player",
    "Project 3 Flags api fetcher",
  ];

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "+=1200",
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    });

    ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "+=1200",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const index = Math.min(Math.floor(progress * projects.length), projects.length - 1);

        texts.current.forEach((text, i) => {
          if (text) text.style.color = i === index ? "#2494ff" : "#6b7280";
        });

        if (container.current) {
          container.current.style.backgroundImage = `url(${images[index]})`;
        }
      },
    });
  }, []);

  return (
    <>
      <div className="h-screen" />

      <section
        ref={container}
        className="h-screen flex items-center justify-center bg-black bg-cover bg-center"
        style={{ backgroundImage: `url(${images[0]})` }}
      >
        <div className="max-w-4xl mx-auto px-8 text-center space-y-20">
          {projects.map((title, i) => (
            <p
              key={i}
              ref={(el) => (texts.current[i] = el)}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-500"
            >
              {title}
            </p>
          ))}
        </div>
      </section>

      <div className="h-screen" />
    </>
  );
}