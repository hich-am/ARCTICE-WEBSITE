import { Link } from 'react-router';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-deep-navy">
            <div className="max-w-[1400px] mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <h3 className="font-heading text-xl tracking-[0.2em] text-mist-gray mb-4">ARCTIC WAVE</h3>
                        <p className="text-sm text-mist-gray/40 max-w-sm leading-relaxed">
                            Born between ice and ocean. Designed for movement. Engineered for impact. Technical streetwear for those who move through the cold.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-heading text-[0.7rem] tracking-[0.2em] text-mist-gray/50 mb-5">NAVIGATE</h4>
                        <div className="flex flex-col gap-3">
                            {[
                                { to: '/shop', label: 'Shop' },
                                { to: '/drop', label: 'Drop 01' },
                                { to: '/about', label: 'About' },
                                { to: '/cart', label: 'Cart' },
                            ].map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="text-sm text-mist-gray/40 hover:text-cold-teal transition-colors duration-300 cursor-hover-target"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Info */}
                    <div>
                        <h4 className="font-heading text-[0.7rem] tracking-[0.2em] text-mist-gray/50 mb-5">INFO</h4>
                        <div className="flex flex-col gap-3">
                            {['Size Guide', 'Shipping', 'Returns', 'Contact'].map((item) => (
                                <span key={item} className="text-sm text-mist-gray/40 hover:text-cold-teal transition-colors duration-300 cursor-pointer cursor-hover-target">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[0.7rem] text-mist-gray/30 tracking-widest font-heading">
                        © 2026 ARCTIC WAVE. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-6">
                        {['Instagram', 'Twitter', 'TikTok'].map((social) => (
                            <span
                                key={social}
                                className="text-[0.7rem] text-mist-gray/30 hover:text-cold-teal transition-colors tracking-widest font-heading cursor-pointer cursor-hover-target"
                            >
                                {social.toUpperCase()}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
