import { motion } from 'framer-motion';
import { Link } from 'react-router';
import FadeIn from '../components/FadeIn';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

export default function DropPage() {
    const dropProducts = products.filter((p) => p.isLimited);

    return (
        <main className="min-h-screen">
            {/* Hero */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse at 50% 30%, rgba(0,180,216,0.1) 0%, transparent 60%), linear-gradient(180deg, #0A192F 0%, #111827 100%)',
                    }}
                />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-cold-teal/5 rounded-full" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-cold-teal/10 rounded-full" />

                <div className="relative z-10 text-center px-6">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-[0.65rem] tracking-[0.4em] text-cold-teal/70 font-heading mb-6"
                    >
                        LIMITED RELEASE
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="font-heading text-5xl md:text-7xl lg:text-9xl font-black tracking-[0.12em] text-mist-gray mb-4"
                    >
                        DROP 01
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="font-heading text-xl md:text-2xl tracking-[0.3em] text-mist-gray/30"
                    >
                        WINTER 26
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[0.6rem] tracking-[0.3em] text-mist-gray/20 font-heading">EXPLORE</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-[1px] h-6 bg-gradient-to-b from-mist-gray/20 to-transparent"
                    />
                </motion.div>
            </section>

            {/* Lookbook panels */}
            <section className="py-24 px-6">
                <div className="max-w-[1400px] mx-auto">
                    <FadeIn>
                        <div className="text-center mb-24">
                            <p className="text-[0.65rem] tracking-[0.3em] text-cold-teal/60 font-heading mb-3">LOOKBOOK</p>
                            <h2 className="font-heading text-3xl md:text-5xl tracking-[0.08em]">ENGINEERED FOR IMPACT</h2>
                        </div>
                    </FadeIn>

                    {/* Large editorial images */}
                    <div className="space-y-8">
                        {[
                            { aspect: 'aspect-[16/7]', gradient: 'linear-gradient(135deg, #111827 0%, #0A192F 50%, rgba(0,180,216,0.1) 100%)', text: 'MOVE THROUGH THE COLD' },
                            { aspect: 'aspect-[16/9]', gradient: 'linear-gradient(225deg, #111827 0%, #0d1b2a 50%, rgba(0,180,216,0.08) 100%)', text: 'SILENCE. POWER. PRECISION.' },
                        ].map((panel, i) => (
                            <FadeIn key={i} delay={i * 0.15}>
                                <div className={`relative ${panel.aspect} overflow-hidden group`}>
                                    <div className="absolute inset-0 transition-transform duration-[1.2s] group-hover:scale-105" style={{ background: panel.gradient }} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <h3 className="font-heading text-2xl md:text-4xl lg:text-5xl tracking-[0.15em] text-mist-gray/20 group-hover:text-mist-gray/40 transition-colors duration-700">
                                            {panel.text}
                                        </h3>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    {/* Two-column split */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        {[0, 1].map((i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className="relative aspect-[4/5] overflow-hidden group">
                                    <div
                                        className="absolute inset-0 transition-transform duration-[1.2s] group-hover:scale-105"
                                        style={{
                                            background: `linear-gradient(${180 + i * 90}deg, #111827 0%, #0A192F 60%, rgba(0,180,216,${0.06 + i * 0.04}) 100%)`,
                                        }}
                                    />
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Drop products */}
            <section className="py-24 px-6 border-t border-white/5">
                <div className="max-w-[1400px] mx-auto">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <p className="text-[0.65rem] tracking-[0.3em] text-cold-teal/60 font-heading mb-3">LIMITED PIECES</p>
                            <h2 className="font-heading text-3xl md:text-4xl tracking-[0.1em]">SHOP THE DROP</h2>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {dropProducts.map((p, i) => (
                            <ProductCard key={p.id} product={p} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 border-t border-white/5">
                <div className="max-w-xl mx-auto text-center">
                    <FadeIn>
                        <p className="text-mist-gray/30 text-sm mb-6">Limited quantities. When it's gone, it's gone.</p>
                        <Link to="/shop" className="btn-primary cursor-hover-target text-xs">
                            SHOP ALL
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
