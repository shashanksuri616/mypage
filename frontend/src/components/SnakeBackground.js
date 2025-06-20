/*import { useState, useRef, useEffect } from "react";

const NUM_SNAKES = 1;
const SEGMENTS = 72;
const SNAKE_LENGTH = Math.min(window.innerWidth, window.innerHeight) / 4;
const SEGMENT_LENGTH = 4;

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

  // "AI" movement state
  const aiTarget = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    angle: Math.random() * Math.PI * 2,
    speed: 1.5,
    lastUpdate: Date.now(),
  });

  // Idle/mouse detection
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
          x: center.x + j * SEGMENT_LENGTH,
          y: center.y + i * 30,
        })),
        color,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }, []);

  // AI movement logic
  useEffect(() => {
    let animationFrame;
    function updateAITarget() {
      const now = Date.now();
      const ai = aiTarget.current;
      // Every 2-4 seconds, pick a new random direction and speed
      if (now - ai.lastUpdate > 2000 + Math.random() * 2000) {
        ai.angle += (Math.random() - 0.5) * Math.PI / 1.5;
        ai.speed = 1 + Math.random() * 2;
        ai.lastUpdate = now;
      }
      // Move AI target in its current direction
      ai.x += Math.cos(ai.angle) * ai.speed;
      ai.y += Math.sin(ai.angle) * ai.speed;
      // Bounce off edges
      if (ai.x < 40 || ai.x > window.innerWidth - 40) ai.angle = Math.PI - ai.angle;
      if (ai.y < 40 || ai.y > window.innerHeight - 40) ai.angle = -ai.angle;
      ai.x = Math.max(40, Math.min(window.innerWidth - 40, ai.x));
      ai.y = Math.max(40, Math.min(window.innerHeight - 40, ai.y));
      // If idle, update the target to follow the AI
      if (idle) setTarget({ x: ai.x, y: ai.y });
      animationFrame = requestAnimationFrame(updateAITarget);
    }
    updateAITarget();
    return () => cancelAnimationFrame(animationFrame);
  }, [idle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let idleAngle = 0;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      idleAngle += idle ? 0.018 : 0;

      snakesRef.current.forEach((snake, sIdx) => {
        // Head target
        let headTarget = { ...target };
        if (idle) {
          // Optionally, add a little idle wiggle
          const radius = SNAKE_LENGTH / 2 + sIdx * 18;
          headTarget.x += Math.cos(idleAngle + snake.phase) * radius * 0.1;
          headTarget.y += Math.sin(idleAngle + snake.phase) * radius * 0.1;
        }

        // Move head
        snake.points[0].x = lerp(snake.points[0].x, headTarget.x, 0.18);
        snake.points[0].y = lerp(snake.points[0].y, headTarget.y, 0.18);

        // Inverse kinematics for smooth, natural snake body
        for (let i = 1; i < SEGMENTS; i++) {
          const prev = snake.points[i - 1];
          const pt = snake.points[i];

          // Calculate direction from prev to current
          let dx = pt.x - prev.x;
          let dy = pt.y - prev.y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          // Desired position at fixed segment length
          let desiredX = prev.x + (dx / (dist || 1)) * SEGMENT_LENGTH;
          let desiredY = prev.y + (dy / (dist || 1)) * SEGMENT_LENGTH;

          // Add wiggle
          const t = (Date.now() / 900 + i * 0.18 + snake.phase) % (Math.PI * 2);
          const wiggle = Math.sin(t) * 8 * (1 - i / SEGMENTS);
          const angle = Math.atan2(desiredY - prev.y, desiredX - prev.x) + wiggle * 0.04;
          desiredX = prev.x + Math.cos(angle) * SEGMENT_LENGTH;
          desiredY = prev.y + Math.sin(angle) * SEGMENT_LENGTH;

          // Smoothly move segment to desired position
          pt.x = lerp(pt.x, desiredX, 0.45);
          pt.y = lerp(pt.y, desiredY, 0.45);
        }

        // Draw snake body with gradient and rounded "head"
        ctx.save();
        for (let i = SEGMENTS - 1; i > 0; i--) {
          const p1 = snake.points[i];
          const p2 = snake.points[i - 1];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = snake.color;
          ctx.lineWidth = 8 * (1 - i / SEGMENTS) + 2;
          ctx.globalAlpha = 0.7 * (1 - i / SEGMENTS) + 0.2;
          ctx.stroke();
        }
        // Draw head as a circle
        ctx.beginPath();
        ctx.arc(snake.points[0].x, snake.points[0].y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.globalAlpha = 0.9;
        ctx.shadowColor = snake.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(snake.points[0].x, snake.points[0].y, 8, 0, Math.PI * 2);
        ctx.fillStyle = snake.color;
        ctx.fill();
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

export default SnakeBackground;*/
import { useState, useRef, useEffect } from "react";

const NUM_SNAKES = 1;
const SEGMENTS = 72;
const SNAKE_LENGTH = Math.min(window.innerWidth, window.innerHeight) / 4;
const SEGMENT_LENGTH = 4;

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
      if (now - lastMove < 16) return; // ~60fps cap
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
      const color = `hsl(${220 + i * 30}, 80%, 70%)`;
      snakesRef.current.push({
        points: Array.from({ length: SEGMENTS }, (_, j) => ({
          x: center.x + j * SEGMENT_LENGTH,
          y: center.y + i * 30,
        })),
        color,
        phase: Math.random() * Math.PI * 2,
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
          headTarget.x += Math.cos(idleAngle + snake.phase) * radius * 0.1;
          headTarget.y += Math.sin(idleAngle + snake.phase) * radius * 0.1;
        }

        const HEAD_LERP = idle ? 0.08 : 0.16;
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

          const t = (Date.now() / 900 + i * 0.18 + snake.phase) % (Math.PI * 2);
          const wiggle = Math.sin(t) * 8 * (1 - i / SEGMENTS);
          const angle = Math.atan2(desiredY - prev.y, desiredX - prev.x) + wiggle * 0.04;

          desiredX = prev.x + Math.cos(angle) * SEGMENT_LENGTH;
          desiredY = prev.y + Math.sin(angle) * SEGMENT_LENGTH;

          const TAIL_LERP = 0.35;
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
          ctx.lineWidth = 6 * (1 - i / SEGMENTS) + 2;
          ctx.globalAlpha = 0.8 * (1 - i / SEGMENTS) + 0.1;
          ctx.shadowColor = snake.color;
          ctx.shadowBlur = 6;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        const head = snake.points[0];
        ctx.beginPath();
        ctx.arc(head.x, head.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.globalAlpha = 0.9;
        ctx.shadowColor = snake.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(head.x, head.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = snake.color;
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
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
