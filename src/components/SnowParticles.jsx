import { useEffect, useRef } from 'react';

export default function SnowParticles() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        let particles = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        const createParticles = () => {
            particles = [];
            const count = Math.floor((canvas.width * canvas.height) / 15000);
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    r: Math.random() * 2 + 0.5,
                    speed: Math.random() * 0.5 + 0.1,
                    drift: (Math.random() - 0.5) * 0.3,
                    opacity: Math.random() * 0.4 + 0.1,
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 210, 230, ${p.opacity})`;
                ctx.fill();

                p.y += p.speed;
                p.x += p.drift;

                if (p.y > canvas.height) {
                    p.y = -5;
                    p.x = Math.random() * canvas.width;
                }
                if (p.x > canvas.width) p.x = 0;
                if (p.x < 0) p.x = canvas.width;
            });
            animId = requestAnimationFrame(animate);
        };

        resize();
        createParticles();
        animate();

        window.addEventListener('resize', () => {
            resize();
            createParticles();
        });

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
        />
    );
}
