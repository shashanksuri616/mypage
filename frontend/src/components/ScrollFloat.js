import { useEffect, useRef, useState } from "react";

// Helper for getting point at length on a path
function getPointAtLength(path, length) {
  const pt = path.getPointAtLength(length);
  return { x: pt.x, y: pt.y };
}

const ScrollFloat = () => {
  const pathRef = useRef();
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const prog = Math.min(scrollY / docHeight, 1);
      setProgress(prog);
      const path = pathRef.current;
      if (path) {
        const length = path.getTotalLength();
        const pos = getPointAtLength(path, prog * length);
        setDotPos(pos);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // X factor: dot wiggles horizontally as you scroll, and rotates
  const wiggle = Math.sin(progress * Math.PI * 6) * 12; // 3 wiggles
  const rotation = progress * 360;

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
      {/* Straight vertical path */}
      <path
        ref={pathRef}
        d="M40,20 L40,400"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="4"
        opacity="0.5"
      />
      {/* Follower dot with wiggle and rotation */}
      <g
        style={{
          transform: `translate(${wiggle}px, 0px) rotate(${rotation}deg)`,
          transformOrigin: `${dotPos.x}px ${dotPos.y}px`,
          transition: "transform 0.1s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <circle
          cx={dotPos.x}
          cy={dotPos.y}
          r="13"
          fill="#fff"
          opacity="0.7"
        />
        <circle
          cx={dotPos.x}
          cy={dotPos.y}
          r="10"
          fill="#fbbf24"
          stroke="#fff"
          strokeWidth="3"
          style={{ filter: "drop-shadow(0 2px 8px #fbbf24aa)" }}
        />
        {/* X factor: a sparkle/star that rotates with the dot */}
        <polygon
          points={`
            ${dotPos.x},${dotPos.y - 7}
            ${dotPos.x + 2},${dotPos.y}
            ${dotPos.x},${dotPos.y + 7}
            ${dotPos.x - 2},${dotPos.y}
          `}
          fill="#a78bfa"
          opacity="0.8"
        />
      </g>
    </svg>
  );
};

export default ScrollFloat;