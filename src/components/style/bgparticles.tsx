import { useEffect, useRef } from "react";
const BackgroundParticles: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        interface Particle {
            x: number;
            y: number;
            r: number;
            vx: number;
            vy: number;
        }

        const particles: Particle[] = Array.from({ length: 300 }).map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1 + 1,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        }));

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 1);
                ctx.fillStyle = "rgba(255,255,255,0.7)";
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 w-screen h-screen"
        />
        
    );
};

export default BackgroundParticles;
