import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import ProductCard from '../components/ProductCard';
import SnowParticles from '../components/SnowParticles';
import products from '../data/products';

export default function HomePage() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const featured = products.filter((p) => p.isLimited).slice(0, 4);
    const collection = products.slice(0, 6);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
        }
    };

    return (
        <main>
            {/* ═══════════ HERO ═══════════ */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(ellipse at 30% 50%, rgba(0,180,216,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(0,180,216,0.05) 0%, transparent 50%), linear-gradient(180deg, #0A192F 0%, #0d1b2a 50%, #111827 100%)',
                        }}
                    />
                    {/* Glow orbs */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cold-teal/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-cold-teal/3 rounded-full blur-[100px]" />
                </div>

                <SnowParticles />

                {/* Content */}
                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="font-heading text-[0.65rem] tracking-[0.4em] text-cold-teal/70 mb-6">
                            DROP 01 / WINTER 26
                        </p>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="font-heading text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.15em] text-mist-gray mb-4"
                    >
                        ARCTIC WAVE
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="font-heading text-sm md:text-base tracking-[0.3em] text-mist-gray/40 mb-10"
                    >
                        BUILT FOR THE COLD
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Link to="/shop" className="btn-primary cursor-hover-target">
                            SHOP DROP
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[0.6rem] tracking-[0.3em] text-mist-gray/20 font-heading">SCROLL</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-[1px] h-6 bg-gradient-to-b from-mist-gray/20 to-transparent"
                    />
                </motion.div>
            </section>

            {/* ═══════════ FEATURED DROP ═══════════ */}
            <section className="py-24 px-6">
                <div className="max-w-[1400px] mx-auto">
                    <FadeIn>
                        <div className="flex items-end justify-between mb-16">
                            <div>
                                <p className="text-[0.65rem] tracking-[0.3em] text-cold-teal/60 font-heading mb-3">FEATURED</p>
                                <h2 className="font-heading text-3xl md:text-4xl tracking-[0.1em]">THE DROP</h2>
                            </div>
                            <Link to="/shop" className="text-[0.7rem] tracking-[0.15em] text-mist-gray/40 hover:text-cold-teal transition-colors font-heading cursor-hover-target">
                                VIEW ALL →
                            </Link>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featured.map((p, i) => (
                            <ProductCard key={p.id} product={p} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ BRAND MANIFESTO ═══════════ */}
            <section className="py-24 px-6 border-t border-white/5">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeIn direction="left">
                            <div>
                                <p className="text-[0.65rem] tracking-[0.3em] text-cold-teal/60 font-heading mb-6">THE MOVEMENT</p>
                                <h2 className="font-heading text-3xl md:text-5xl tracking-[0.08em] leading-tight mb-8">
                                    BORN BETWEEN<br />ICE AND OCEAN
                                </h2>
                                <div className="space-y-4 text-mist-gray/50 text-sm leading-relaxed max-w-lg">
                                    <p>
                                        Born between ice and ocean. Designed for movement. Engineered for impact.
                                    </p>
                                    <p>
                                        Arctic Wave exists at the intersection of technical performance and minimal design. Every piece is built to withstand, to endure, to move through conditions that demand excellence.
                                    </p>
                                    <p>
                                        We don't follow seasons. We engineer for them.
                                    </p>
                                </div>
                                <Link to="/about" className="btn-secondary inline-block mt-8 cursor-hover-target text-xs">
                                    OUR STORY
                                </Link>
                            </div>
                        </FadeIn>

                        <FadeIn direction="right" delay={0.2}>
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: 'linear-gradient(160deg, #111827 0%, #0A192F 30%, rgba(0,180,216,0.15) 70%, #0A192F 100%)',
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/60 to-transparent" />
                                {/* Geometric element */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-cold-teal/10 rotate-45" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-cold-teal/20 rotate-45" />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ═══════════ COLLECTION GRID ═══════════ */}
            <section className="py-24 px-6 border-t border-white/5">
                <div className="max-w-[1400px] mx-auto">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <p className="text-[0.65rem] tracking-[0.3em] text-cold-teal/60 font-heading mb-3">WINTER 26</p>
                            <h2 className="font-heading text-3xl md:text-4xl tracking-[0.1em]">FULL COLLECTION</h2>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {collection.map((p, i) => (
                            <ProductCard key={p.id} product={p} index={i} />
                        ))}
                    </div>

                    <FadeIn>
                        <div className="text-center mt-16">
                            <Link to="/shop" className="btn-secondary cursor-hover-target text-xs">
                                EXPLORE ALL
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ═══════════ GALLERY ═══════════ */}
            <section className="py-24 px-6 border-t border-white/5">
                <div className="max-w-[1400px] mx-auto">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <p className="text-[0.65rem] tracking-[0.3em] text-cold-teal/60 font-heading mb-3">@ARCTICWAVE</p>
                            <h2 className="font-heading text-3xl md:text-4xl tracking-[0.1em]">IN THE FIELD</h2>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {[...Array(8)].map((_, i) => (
                            <FadeIn key={i} delay={i * 0.05}>
                                <div className="relative aspect-square overflow-hidden group cursor-hover-target">
                                    <div
                                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                                        style={{
                                            background: `linear-gradient(${45 + i * 30}deg, #111827 0%, #0A192F ${30 + i * 5}%, rgba(0,180,216,${0.05 + i * 0.02}) 100%)`,
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-deep-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-mist-gray/60">
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ NEWSLETTER ═══════════ */}
            <section className="py-24 px-6 border-t border-white/5">
                <div className="max-w-xl mx-auto text-center">
                    <FadeIn>
                        <p className="text-[0.65rem] tracking-[0.3em] text-cold-teal/60 font-heading mb-3">STAY COLD</p>
                        <h2 className="font-heading text-2xl md:text-3xl tracking-[0.1em] mb-4">JOIN THE MOVEMENT</h2>
                        <p className="text-sm text-mist-gray/40 mb-8">
                            Be the first to know about drops, restocks, and exclusive access.
                        </p>

                        {subscribed ? (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-cold-teal text-sm tracking-wider font-heading"
                            >
                                YOU'RE IN. WELCOME TO THE WAVE.
                            </motion.p>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="EMAIL ADDRESS"
                                    required
                                    className="flex-1 bg-transparent border border-white/10 px-5 py-3.5 text-sm text-mist-gray tracking-wider placeholder:text-mist-gray/20 focus:outline-none focus:border-cold-teal/50 transition-colors font-heading text-[0.8rem]"
                                />
                                <button type="submit" className="btn-primary cursor-hover-target whitespace-nowrap text-xs">
                                    SUBSCRIBE
                                </button>
                            </form>
                        )}
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
