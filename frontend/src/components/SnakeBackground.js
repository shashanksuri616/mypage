import { useState, useRef, useEffect } from "react";

const NUM_SNAKES = 2;
const SEGMENTS = 60;
const SNAKE_LENGTH = Math.min(window.innerWidth, window.innerHeight) / 3.2;
const SEGMENT_LENGTH = 6;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

const COLORS = [
  "hsl(270, 90%, 70%)",
  "hsl(48, 98%, 65%)"
];

const SnakeBackground = () => {
  const canvasRef = useRef(null);
  const snakesRef = useRef([]);
  const [target, setTarget] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [idle, setIdle] = useState(false);

  const aiTarget = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    angle: Math.random() * Math.PI * 2,
    speed: 1.5,
    lastUpdate: Date.now(),
  });

  // Handle idle detection and smooth input
  useEffect(() => {
    let idleTimeout;
    let lastMove = 0;

    const handleMove = (e) => {
      const now = Date.now();
      if (now - lastMove < 16) return;
      lastMove = now;

      setTarget({ x: e.clientX, y: e.clientY });
      setIdle(false);
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => setIdle(true), 1800);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Initialize snakes
  useEffect(() => {
    const center = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    snakesRef.current = [];
    for (let i = 0; i < NUM_SNAKES; i++) {
      const color = COLORS[i % COLORS.length];
      snakesRef.current.push({
        points: Array.from({ length: SEGMENTS }, (_, j) => ({
          x: center.x + j * SEGMENT_LENGTH,
          y: center.y + i * 30,
        })),
        color,
        phase: Math.random() * Math.PI * 2,
        sparkle: i % 2 === 0,
      });
    }
  }, []);

  // AI movement for idle mode
  useEffect(() => {
    let animationFrame;
    const updateAITarget = () => {
      const now = Date.now();
      const ai = aiTarget.current;
      if (now - ai.lastUpdate > 2000 + Math.random() * 2000) {
        ai.angle += (Math.random() - 0.5) * Math.PI / 1.5;
        ai.speed = 1 + Math.random() * 2;
        ai.lastUpdate = now;
      }

      ai.x += Math.cos(ai.angle) * ai.speed;
      ai.y += Math.sin(ai.angle) * ai.speed;

      if (ai.x < 40 || ai.x > window.innerWidth - 40) ai.angle = Math.PI - ai.angle;
      if (ai.y < 40 || ai.y > window.innerHeight - 40) ai.angle = -ai.angle;

      ai.x = Math.max(40, Math.min(window.innerWidth - 40, ai.x));
      ai.y = Math.max(40, Math.min(window.innerHeight - 40, ai.y));

      if (idle) setTarget({ x: ai.x, y: ai.y });
      animationFrame = requestAnimationFrame(updateAITarget);
    };

    updateAITarget();
    return () => cancelAnimationFrame(animationFrame);
  }, [idle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    let idleAngle = 0;

    function animate() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      idleAngle += idle ? 0.018 : 0;

      snakesRef.current.forEach((snake, sIdx) => {
        let headTarget = { ...target };

        if (idle) {
          const radius = SNAKE_LENGTH / 2 + sIdx * 18;
          headTarget.x += Math.cos(idleAngle + snake.phase + sIdx) * radius * 0.13;
          headTarget.y += Math.sin(idleAngle + snake.phase - sIdx) * radius * 0.13;
        }

        const HEAD_LERP = idle ? 0.07 : 0.15;
        snake.points[0].x = lerp(snake.points[0].x, headTarget.x, HEAD_LERP);
        snake.points[0].y = lerp(snake.points[0].y, headTarget.y, HEAD_LERP);

        for (let i = 1; i < SEGMENTS; i++) {
          const prev = snake.points[i - 1];
          const pt = snake.points[i];
          let dx = pt.x - prev.x;
          let dy = pt.y - prev.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          let desiredX = prev.x + (dx / (dist || 1)) * SEGMENT_LENGTH;
          let desiredY = prev.y + (dy / (dist || 1)) * SEGMENT_LENGTH;

          const t = (Date.now() / 900 + i * 0.18 + snake.phase + sIdx) % (Math.PI * 2);
          const wiggle = Math.sin(t) * 10 * (1 - i / SEGMENTS);
          const angle = Math.atan2(desiredY - prev.y, desiredX - prev.x) + wiggle * 0.04;

          desiredX = prev.x + Math.cos(angle) * SEGMENT_LENGTH;
          desiredY = prev.y + Math.sin(angle) * SEGMENT_LENGTH;

          const TAIL_LERP = 0.33;
          pt.x = lerp(pt.x, desiredX, TAIL_LERP);
          pt.y = lerp(pt.y, desiredY, TAIL_LERP);
        }

        ctx.save();
        for (let i = SEGMENTS - 1; i > 0; i--) {
          const p1 = snake.points[i];
          const p2 = snake.points[i - 1];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = snake.color;
          ctx.lineWidth = 7 * (1 - i / SEGMENTS) + 2;
          ctx.globalAlpha = 0.8 * (1 - i / SEGMENTS) + 0.1;
          ctx.shadowColor = snake.color;
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        const head = snake.points[0];
        ctx.beginPath();
        ctx.arc(head.x, head.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.globalAlpha = 0.92;
        ctx.shadowColor = snake.color;
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(head.x, head.y, 9, 0, Math.PI * 2);
        ctx.fillStyle = snake.color;
        ctx.globalAlpha = 1;
        ctx.fill();

        // Enhanced sparkle and animated face for one snake
        if (snake.sparkle) {
          ctx.save();
          ctx.translate(head.x, head.y);
          ctx.rotate(Date.now() / 600);

          // Sparkle rays
          for (let j = 0; j < 8; j++) {
            ctx.beginPath();
            ctx.moveTo(0, -14);
            ctx.lineTo(0, -22 - Math.sin(Date.now() / 400 + j) * 2);
            ctx.strokeStyle = "rgba(168,139,250,0.7)";
            ctx.lineWidth = 2.1;
            ctx.globalAlpha = 0.7;
            ctx.stroke();
            ctx.rotate(Math.PI / 4);
          }

          // Cute animated face (eyes blink)
          ctx.rotate(-Date.now() / 600); // reset rotation
          ctx.beginPath();
          ctx.arc(-4, -2, 1.5, 0, Math.PI * 2);
          ctx.arc(4, -2, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "#222";
          ctx.globalAlpha = 0.9 - 0.5 * Math.abs(Math.sin(Date.now() / 400));
          ctx.fill();

          // Smile
          ctx.beginPath();
          ctx.arc(0, 3, 3, 0, Math.PI, false);
          ctx.lineWidth = 1.2;
          ctx.strokeStyle = "#333";
          ctx.globalAlpha = 0.7;
          ctx.stroke();

          ctx.restore();
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [target, idle]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        opacity: 0.6,
        transition: "opacity 0.5s ease-in-out",
      }}
    />
  );
};

export default SnakeBackground;
