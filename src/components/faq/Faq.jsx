import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ChevronDown({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-5 h-5 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const FAQ_DATA = [
  {
    question: "Dla kogo jest Gra Słów?",
    answer: "Gra Słów została zaprojektowana z myślą o dzieciach, dorosłych i całych rodzinach. Świetnie sprawdzi się zarówno na imprezie, jak i w domowym zaciszu."
  },
  {
    question: "Ile osób może grać?",
    answer: "Gra przeznaczona jest dla 2–6 graczy. Można jednak modyfikować zasady, aby bawiło się więcej osób!"
  },
  {
    question: "Jak długo trwa jedna rozgrywka?",
    answer: "Standardowa gra trwa około 20–30 minut, ale to zależy od liczby graczy i intensywności śmiechu 😉."
  },
  {
    question: "Czy dzieci mogą w to grać?",
    answer: "Tak! Gra zawiera zasady dostosowane do młodszych graczy (8+), a także trudniejsze warianty dla dorosłych."
  },
  {
    question: "Czy potrzebuję aplikacji lub telefonu?",
    answer: "Nie! Gra jest w pełni analogowa – wystarczy rozłożyć elementy i zacząć zabawę."
  }
];

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(iconRef.current, {
        rotate: 180,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        paddingTop: 0,
        paddingBottom: 0,
        duration: 0.3,
        ease: "power2.in"
      });
      gsap.to(iconRef.current, {
        rotate: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [isOpen]);

  return (
    <div
      className="w-full max-w-2xl mx-auto p-4 bg-white rounded-2xl shadow-md mb-4 transition-colors hover:bg-gray-50 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{question}</h3>
        <div ref={iconRef}>
          <ChevronDown className="text-gray-500 transition-transform" />
        </div>
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden text-gray-700 text-sm"
        style={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
      >
        <div>{answer}</div>
      </div>
    </div>
  );
}

export default function FAQList() {
  return (
    <div className="space-y-4">
      {FAQ_DATA.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}
