import './App.css';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useGSAP(() => {
    gsap.set(itemsRef.current, { opacity: 0, y: 40 });
  }, { scope: containerRef });

  useGSAP(() => {
    itemsRef.current.forEach((el) => {
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
        },
      });
    });
  }, { scope: containerRef });

  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Scroll to Reveal Grid</h2>
        <div ref={containerRef} className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-4">
          {Array.from({ length: 900 }, (_, i) => (
            <div
              key={i}
              ref={el => itemsRef.current[i] = el}
              className="grid-item aspect-square bg-linear-to-br from-blue-500 to-purple-600 rounded-lg opacity-0"
              style={{ transform: 'translateY(40px)' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
