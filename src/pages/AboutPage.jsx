import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';

const values = [
    {
        title: 'ENGINEERED',
        desc: 'Every stitch, seam, and fabric choice is deliberate. We test in real conditions — sub-zero winds, freezing rain, alpine terrain.',
    },
    {
        title: 'MINIMAL',
        desc: 'We remove everything unnecessary. What remains is purpose. Clean lines. Functional design. Nothing wasted.',
    },
    {
        title: 'RESILIENT',
        desc: 'Built to endure. Our pieces are designed for years of wear, not seasons of trends. Durability is not optional — it\'s foundational.',
    },
    {
        title: 'CONSCIOUS',
        desc: 'Recycled materials. Responsible manufacturing. We believe performance and sustainability are not opposing forces.',
    },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            {/* Hero */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse at 50% 60%, rgba(0,180,216,0.06) 0%, transparent 60%), linear-gradient(180deg, #0A192F 0%, #111827 100%)',
                    }}
                />
                <div className="relative z-10 text-center px-6">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-[0.65rem] tracking-[0.4em] text-cold-teal/70 font-heading mb-6"
                    >
                        EST. 2024
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="font-heading text-4xl md:text-6xl lg:text-7xl font-black tracking-[0.15em] text-mist-gray"
                    >
                        THE MOVEMENT
                    </motion.h1>
                </div>
            </section>

            {/* Story */}
            <section className="py-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <FadeIn>
                        <div className="space-y-8">
                            <p className="text-lg md:text-xl text-mist-gray/60 leading-relaxed">
                                Arctic Wave was born from an obsession with two things: the raw power of cold environments and the precision of minimal design.
                            </p>
                            <p className="text-mist-gray/40 leading-relaxed">
                                We started in a workshop in Tromsø, Norway — where the Arctic Ocean meets the Nordic wilderness. Our founders, a textile engineer and an industrial designer, shared a simple belief: streetwear should perform as hard as it looks.
                            </p>
                            <p className="text-mist-gray/40 leading-relaxed">
                                Every piece in our collection is tested in real conditions. We don't design for lookbooks — we design for movement, for impact, for the people who refuse to let temperature dictate their lives.
                            </p>
                            <p className="text-mist-gray/40 leading-relaxed">
                                Arctic Wave is not a fashion brand. It's a technical system. A toolkit for navigating the cold with intention.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Manifesto */}
            <section className="py-24 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <p className="text-[0.65rem] tracking-[0.3em] text-cold-teal/60 font-heading mb-12">MANIFESTO</p>
                        <blockquote className="font-heading text-2xl md:text-4xl lg:text-5xl tracking-[0.08em] leading-snug text-mist-gray/70">
                            "Born between ice and ocean.<br />
                            Designed for movement.<br />
                            Engineered for impact."
                        </blockquote>
                    </FadeIn>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 px-6 border-t border-white/5">
                <div className="max-w-[1400px] mx-auto">
                    <FadeIn>
                        <p className="text-[0.65rem] tracking-[0.3em] text-cold-teal/60 font-heading mb-16 text-center">OUR VALUES</p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {values.map((value, i) => (
                            <FadeIn key={value.title} delay={i * 0.1}>
                                <div className="border border-white/5 p-8 hover:border-cold-teal/10 transition-colors duration-500">
                                    <span className="text-[0.6rem] text-cold-teal/40 font-heading tracking-widest">0{i + 1}</span>
                                    <h3 className="font-heading text-xl tracking-[0.15em] mt-3 mb-4">{value.title}</h3>
                                    <p className="text-sm text-mist-gray/40 leading-relaxed">{value.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Image section */}
            <section className="py-24 px-6 border-t border-white/5">
                <div className="max-w-[1400px] mx-auto">
                    <FadeIn>
                        <div className="relative aspect-[21/9] overflow-hidden">
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: 'linear-gradient(135deg, #111827 0%, #0A192F 40%, rgba(0,180,216,0.08) 80%, #111827 100%)',
                                }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="font-heading text-3xl md:text-5xl lg:text-6xl tracking-[0.2em] text-mist-gray/10">
                                    ARCTIC WAVE
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
