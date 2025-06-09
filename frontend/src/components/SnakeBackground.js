import { useState, useRef, useEffect } from "react";

const NUM_SNAKES = 2;
const SEGMENTS = 48;
const SNAKE_LENGTH = Math.min(window.innerWidth, window.innerHeight) / 4;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

const SnakeBackground = () => {
  const canvasRef = useRef(null);
  const snakesRef = useRef([]);
  const [target, setTarget] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [idle, setIdle] = useState(false);

  // Idle detection
  useEffect(() => {
    let idleTimeout;
    const handleMove = (e) => {
      setTarget({ x: e.clientX, y: e.clientY });
      setIdle(false);
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => setIdle(true), 1800);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Initialize snakes only once
  useEffect(() => {
    const center = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    snakesRef.current = [];
    for (let i = 0; i < NUM_SNAKES; i++) {
      const color = `hsl(${220 + i * 30}, 80%, 70%)`;
      snakesRef.current.push({
        points: Array.from({ length: SEGMENTS }, (_, j) => ({
          x: center.x + Math.cos((j / SEGMENTS) * Math.PI * 2) * (SNAKE_LENGTH / 2),
          y: center.y + Math.sin((j / SEGMENTS) * Math.PI * 2) * (SNAKE_LENGTH / 2),
        })),
        color,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let idleAngle = 0;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      idleAngle += idle ? 0.025 : 0;

      snakesRef.current.forEach((snake, sIdx) => {
        // Head target
        let headTarget = { ...target };
        if (idle) {
          // Loop around cursor in idle
          const radius = SNAKE_LENGTH / 2 + sIdx * 18;
          headTarget.x += Math.cos(idleAngle + snake.phase) * radius;
          headTarget.y += Math.sin(idleAngle + snake.phase) * radius;
        }

        // Move head
        snake.points[0].x = lerp(snake.points[0].x, headTarget.x, 0.18);
        snake.points[0].y = lerp(snake.points[0].y, headTarget.y, 0.18);

        // Move rest of body
        for (let i = 1; i < SEGMENTS; i++) {
          const prev = snake.points[i - 1];
          const pt = snake.points[i];
          // Wiggly offset
          const t = (Date.now() / 600 + i * 0.18 + snake.phase) % (Math.PI * 2);
          const wiggle = Math.sin(t) * 8 * (1 - i / SEGMENTS);
          const dx = prev.x - pt.x;
          const dy = prev.y - pt.y;
          const angle = Math.atan2(dy, dx) + wiggle * 0.01;
          const dist = 16;
          pt.x = lerp(pt.x, prev.x - Math.cos(angle) * dist, 0.35);
          pt.y = lerp(pt.y, prev.y - Math.sin(angle) * dist, 0.35);
        }

        // Draw snake
        ctx.save();
        ctx.strokeStyle = snake.color;
        ctx.lineWidth = 4;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.moveTo(snake.points[0].x, snake.points[0].y);
        for (let i = 1; i < SEGMENTS; i++) {
          ctx.lineTo(snake.points[i].x, snake.points[i].y);
        }
        ctx.stroke();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    // Resize canvas
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [target, idle]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{
        position: "absolute",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.7,
      }}
    />
  );
};

export default SnakeBackground;