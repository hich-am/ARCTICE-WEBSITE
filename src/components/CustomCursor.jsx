import { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [expanded, setExpanded] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Don't show on touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const move = (e) => {
            setPos({ x: e.clientX, y: e.clientY });
            if (!visible) setVisible(true);
        };

        const handleOver = (e) => {
            if (e.target.closest('.cursor-hover-target, a, button, [role="button"], input, select, textarea')) {
                setExpanded(true);
            }
        };

        const handleOut = () => setExpanded(false);
        const handleLeave = () => setVisible(false);
        const handleEnter = () => setVisible(true);

        window.addEventListener('mousemove', move);
        document.addEventListener('mouseover', handleOver);
        document.addEventListener('mouseout', handleOut);
        document.addEventListener('mouseleave', handleLeave);
        document.addEventListener('mouseenter', handleEnter);

        return () => {
            window.removeEventListener('mousemove', move);
            document.removeEventListener('mouseover', handleOver);
            document.removeEventListener('mouseout', handleOut);
            document.removeEventListener('mouseleave', handleLeave);
            document.removeEventListener('mouseenter', handleEnter);
        };
    }, [visible]);

    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

    return (
        <div
            className={`custom-cursor ${expanded ? 'expanded' : ''}`}
            style={{
                left: pos.x,
                top: pos.y,
                opacity: visible ? 1 : 0,
            }}
        />
    );
}
