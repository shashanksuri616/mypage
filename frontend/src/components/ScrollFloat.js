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
  const [velocity, setVelocity] = useState(0);
  const lastProgress = useRef(0);

  useEffect(() => {
    let lastTime = performance.now();
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const prog = Math.min(scrollY / docHeight, 1);
      setProgress(prog);

      // Velocity calculation
      const now = performance.now();
      const dt = Math.max(now - lastTime, 1);
      const v = (prog - lastProgress.current) / (dt / 1000);
      setVelocity(v);
      lastProgress.current = prog;
      lastTime = now;

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

  // Velocity-based scaling for stretch/squash
  const scaleY = 1 + Math.min(Math.abs(velocity) * 2, 0.4);
  const scaleX = 1 - Math.min(Math.abs(velocity) * 1.2, 0.2);

  // Trail effect: render faded dots behind the main dot
  const trail = [];
  for (let t = 0.1; t <= 0.5; t += 0.1) {
    const trailProg = Math.max(progress - t, 0);
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      const pos = getPointAtLength(pathRef.current, trailProg * length);
      trail.push(
        <circle
          key={t}
          cx={pos.x}
          cy={pos.y}
          r="8"
          fill="#fbbf24"
          opacity={0.15 + (0.15 * (1 - t * 2))}
        />
      );
    }
  }

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
      {/* Animated gradient path */}
      <defs>
        <linearGradient id="scrollPathGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset={`${progress * 100}%`} stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d="M40,20 L40,400"
        fill="none"
        stroke="url(#scrollPathGrad)"
        strokeWidth="5"
        opacity="0.7"
        style={{ transition: "stroke 0.3s" }}
      />
      {/* Trail */}
      {trail}
      {/* Follower dot with wiggle, rotation, and stretch/squash */}
      <g
        style={{
          transform: `translate(${wiggle}px, 0px) rotate(${rotation}deg) scale(${scaleX},${scaleY})`,
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
        {/* Sparkle/star */}
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