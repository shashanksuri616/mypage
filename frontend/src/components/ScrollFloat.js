import { useEffect, useRef, useState } from "react";

function getPointAtLength(path, length) {
  const pt = path.getPointAtLength(length);
  return { x: pt.x, y: pt.y };
}

const ScrollFloat = () => {
  const pathRef = useRef();
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / docHeight, 1);
      const path = pathRef.current;
      if (path) {
        const length = path.getTotalLength();
        const pos = getPointAtLength(path, progress * length);
        setDotPos(pos);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <svg
      width="80"
      height="420"
      style={{
        position: "fixed",
        top: "12vh",
        left: "2vw",
        zIndex: 5,
        pointerEvents: "none",
        opacity: 0.95,
      }}
      className="lg:block"
    >
      {/* Vertical wavy path hugging the left edge */}
      <path
        ref={pathRef}
        d="M40,20 Q10,120 40,220 Q70,320 40,400"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="4"
        opacity="0.5"
      />
      {/* Follower dot */}
      <circle
        cx={dotPos.x}
        cy={dotPos.y}
        r="11"
        fill="#fbbf24"
        stroke="#fff"
        strokeWidth="3"
        style={{ filter: "drop-shadow(0 2px 8px #fbbf24aa)" }}
      />
    </svg>
  );
};

export default ScrollFloat;