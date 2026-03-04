import { Link } from 'react-router';
import { motion } from 'framer-motion';
import products from '../data/products';

export default function ProductCard({ product, index = 0 }) {
    const p = product || products[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <Link to={`/product/${p.id}`} className="group block cursor-hover-target">
                {/* Image */}
                <div className="relative overflow-hidden bg-charcoal aspect-[3/4] mb-4">
                    <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/0 via-deep-navy/0 to-deep-navy/40 z-10" />

                    {/* Placeholder gradient image */}
                    <div
                        className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{
                            background: `linear-gradient(135deg, #111827 0%, #0A192F 40%, ${p.colors?.[0]?.hex || '#111827'} 100%)`,
                        }}
                    />

                    {/* Limited badge */}
                    {p.isLimited && (
                        <div className="absolute top-3 left-3 z-20 bg-cold-teal/10 border border-cold-teal/30 px-3 py-1">
                            <span className="text-[0.6rem] font-heading tracking-[0.15em] text-cold-teal">LIMITED</span>
                        </div>
                    )}

                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 shadow-[inset_0_0_60px_rgba(0,180,216,0.08)]" />
                </div>

                {/* Info */}
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-heading text-[0.75rem] tracking-[0.1em] text-mist-gray/80 group-hover:text-mist-gray transition-colors">
                            {p.name}
                        </h3>
                        <p className="text-[0.65rem] text-mist-gray/30 mt-1 tracking-wider font-heading">{p.category}</p>
                    </div>
                    <span className="text-sm text-mist-gray/50">${p.price}</span>
                </div>
            </Link>
        </motion.div>
    );
}
