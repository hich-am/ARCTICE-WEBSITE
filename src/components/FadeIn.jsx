import { motion } from 'framer-motion';

export default function FadeIn({ children, delay = 0, direction = 'up', className = '', ...props }) {
    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { y: 0, x: 40 },
        right: { y: 0, x: -40 },
    };

    const d = directions[direction] || directions.up;

    return (
        <motion.div
            initial={{ opacity: 0, x: d.x, y: d.y }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}
