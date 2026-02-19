'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let raf = 0;
        let x = 0,
            y = 0;
        let tx = 0,
            ty = 0;

        const onMove = (e: MouseEvent) => {
            tx = e.clientX;
            ty = e.clientY;
            if (!raf) raf = requestAnimationFrame(loop);
        };

        const loop = () => {
            x += (tx - x) * 0.18;
            y += (ty - y) * 0.18;
            el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
            raf = requestAnimationFrame(loop);
        };

        const onOver = (e: Event) => {
            const t = e.target as HTMLElement | null;
            if (!t) return;
            if (t.closest('a, button, [role="button"], input, textarea, select')) setIsHover(true);
        };

        const onOut = () => setIsHover(false);

        window.addEventListener('mousemove', onMove);
        document.addEventListener('mouseover', onOver);
        document.addEventListener('mouseout', onOut);

        return () => {
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onOver);
            document.removeEventListener('mouseout', onOut);
            cancelAnimationFrame(raf);
        };
    }, []);

    return <div ref={ref} className={`custom-cursor ${isHover ? 'is-hover' : ''}`} />;
}