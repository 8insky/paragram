import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const TESTIMONIALS = [
  {
    name: "Anna Nowak",
    role: "chuj wie kto to",
    quote:
      "Gra Słów to hit każdego spotkania! Łączy zabawę z kreatywnym myśleniem.",
    rating: 5,
  },
  {
    name: "Jan Kowalski",
    role: "developer",
    quote:
      "Rozgrywka jest dynamiczna, zasady proste, a śmiechu co nie miara!",
    rating: 4,
  },
  {
    name: "Ewa Wiśniewska",
    role: "kurwisko jakich malo",
    quote:
      "Wreszcie coś, co bawi zarówno dzieci, jak i dorosłych. Idealna na rodzinne wieczory.",
    rating: 5,
  },
  {
    name: "Tomasz Zieliński",
    role: "alkoholik",
    quote:
      "Ćwiczy język, bawi i uczy! Kapitalna rozrywka dla fanów słów i skojarzeń.",
    rating: 5,
  },
];

function Star({ filled }) {
  return (
    <svg
      className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.196 3.683a1 1 0 00.95.69h3.873c.969 0 1.371 1.24.588 1.81l-3.134 2.276a1 1 0 00-.364 1.118l1.196 3.683c.3.921-.755 1.688-1.538 1.118L10 13.347l-3.134 2.276c-.783.57-1.838-.197-1.538-1.118l1.196-3.683a1 1 0 00-.364-1.118L3.026 9.11c-.783-.57-.38-1.81.588-1.81h3.873a1 1 0 00.95-.69l1.196-3.683z" />
    </svg>
  );
}

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
      {initials}
    </div>
  );
}

function TestimonialCard({ name, role, quote, rating, cardRef }) {
  return (
    <div
      ref={cardRef}
      className="bg-white p-8 rounded-3xl shadow-xl max-w-2xl w-full text-center border border-gray-100 flex flex-col justify-center absolute"
      style={{ minHeight: "320px" }}
    >
      <div className="flex justify-center mb-4">
        <Avatar name={name} />
      </div>
      <p className="text-gray-800 italic font-medium text-lg mb-4">
        “{quote}”
      </p>
      <div className="flex justify-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} filled={i < rating} />
        ))}
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  );
}

export default function TestimonialCarousel() {
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const timeoutRef = useRef(null);
  const currentCardRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const startTransition = (newIndex, direction = "left") => {
    if (transitioning || newIndex === displayedIndex) return;
    setTransitioning(true);

    const xOut = direction === "left" ? -50 : 50;
    const xIn = direction === "left" ? 50 : -50;

    gsap.to(currentCardRef.current, {
      opacity: 0,
      x: xOut,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setDisplayedIndex(newIndex);
        gsap.fromTo(
          currentCardRef.current,
          { opacity: 0, x: xIn },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => setTransitioning(false),
          }
        );
      },
    });
  };

  const handleNext = () => {
    const nextIndex = (displayedIndex + 1) % TESTIMONIALS.length;
    startTransition(nextIndex, "left");
  };

  const handlePrev = () => {
    const prevIndex = (displayedIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    startTransition(prevIndex, "right");
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      const nextIndex = (displayedIndex + 1) % TESTIMONIALS.length;
      startTransition(nextIndex, "left");
    }, 6000);

    return () => clearTimeout(timeoutRef.current);
  }, [displayedIndex]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) handleNext();
    else if (distance < -50) handlePrev();
  };

  return (
    <section
      className="w-full min-h-[60vh] relative flex flex-col items-center justify-center bg-gradient-to-b from-white to-[#f0fbfc] py-12 px-4 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full flex justify-center items-center" style={{ minHeight: "320px" }}>
        <TestimonialCard {...TESTIMONIALS[displayedIndex]} cardRef={currentCardRef} />
        
      </div>
      <div className="mt-6 flex gap-2">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i === displayedIndex) return;
              const direction = i > displayedIndex ? "left" : "right";
              startTransition(i, direction);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              i === displayedIndex ? "bg-cyan-500" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
