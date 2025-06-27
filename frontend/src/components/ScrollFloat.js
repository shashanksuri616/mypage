import { useEffect, useRef, useState } from "react";

// Helper for getting point at length on a path
function getPointAtLength(path, length) {
  const pt = path.getPointAtLength(length);
  return { x: pt.x, y: pt.y };
}

const ScrollFloat = () => {
  const pathRef = useRef();
  const [dotPos, setDotPos] = useState({ x: 40, y: 20 });
  const [progress, setProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const lastProgress = useRef(0);

  // Smooth scroll animation using requestAnimationFrame
  useEffect(() => {
    let lastTime = performance.now();
    let animFrame;
    let targetProg = 0;
    let currentProg = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      targetProg = Math.min(scrollY / docHeight, 1);
    };

    const animate = () => {
      // Smoothly interpolate progress
      currentProg += (targetProg - currentProg) * 0.18;
      setProgress(currentProg);

      // Velocity calculation
      const now = performance.now();
      const dt = Math.max(now - lastTime, 1);
      const v = (currentProg - lastProgress.current) / (dt / 1000);
      setVelocity(v);
      lastProgress.current = currentProg;
      lastTime = now;

      const path = pathRef.current;
      if (path) {
        const length = path.getTotalLength();
        const pos = getPointAtLength(path, currentProg * length);
        setDotPos(pos);
      }
      animFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    animate();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  // Enhanced animation: dot pulses, rotates, and leaves a fading, color-shifting trail
  const wiggle = Math.sin(progress * Math.PI * 8) * 16;
  const rotation = progress * 540;
  const pulse = 1 + Math.abs(Math.sin(progress * Math.PI * 4 + velocity * 10)) * 0.18 + Math.min(Math.abs(velocity) * 2, 0.3);
  const scaleY = pulse;
  const scaleX = 1 - (pulse - 1) * 0.5;

  // Trail effect: faded, color-shifting dots behind the main dot
  const trail = [];
  for (let t = 0.1; t <= 0.5; t += 0.1) {
    const trailProg = Math.max(progress - t, 0);
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      const pos = getPointAtLength(pathRef.current, trailProg * length);
      const hue = 48 + t * 180;
      trail.push(
        <circle
          key={t}
          cx={pos.x}
          cy={pos.y}
          r={8 - t * 6}
          fill={`hsl(${hue}, 92%, 60%)`}
          opacity={0.12 + (0.13 * (1 - t * 2))}
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
        opacity: 0.97,
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
        <radialGradient id="dotPulse" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffbe9" />
          <stop offset="100%" stopColor="#fbbf24" />
        </radialGradient>
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
      {/* Follower dot with enhanced animation */}
      <g
        style={{
          transform: `translate(${wiggle}px, 0px) rotate(${rotation}deg) scale(${scaleX},${scaleY})`,
          transformOrigin: `${dotPos.x}px ${dotPos.y}px`,
          transition: "transform 0.12s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <circle
          cx={dotPos.x}
          cy={dotPos.y}
          r="15"
          fill="url(#dotPulse)"
          opacity="0.8"
        />
        <circle
          cx={dotPos.x}
          cy={dotPos.y}
          r="10"
          fill="#fbbf24"
          stroke="#fff"
          strokeWidth="3"
          style={{ filter: "drop-shadow(0 2px 12px #fbbf24bb)" }}
        />
        {/* Sparkle/star */}
        <polygon
          points={`
            ${dotPos.x},${dotPos.y - 8}
            ${dotPos.x + 2.5},${dotPos.y}
            ${dotPos.x},${dotPos.y + 8}
            ${dotPos.x - 2.5},${dotPos.y}
          `}
          fill="#a78bfa"
          opacity="0.85"
        />
      </g>
    </svg>
  );
};

export default ScrollFloat;