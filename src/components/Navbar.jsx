import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { totalItems } = useCart();
    const location = useLocation();

    useEffect(() => {
        setMobileOpen(false);
    }, [location]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { to: '/shop', label: 'Shop' },
        { to: '/drop', label: 'Drop' },
        { to: '/about', label: 'About' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${scrolled
                    ? 'bg-[#04080F]/95 backdrop-blur-lg border-b border-white/5 py-4'
                    : 'bg-transparent py-6'
                    }`}
            >
                {/* 3-column grid: logo | nav links | cart — properly centered */}
                <div className="mx-auto max-w-[1400px] px-6 grid grid-cols-[1fr_auto_1fr] items-center">
                    {/* Left — Logo */}
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="font-heading text-lg tracking-[0.2em] font-bold text-[#C9D1DE] hover:text-[#38BDF8] transition-colors duration-300 cursor-hover-target whitespace-nowrap"
                        >
                            ARCTIC WAVE
                        </Link>
                    </div>

                    {/* Center — Nav Links */}
                    <div className="hidden md:flex items-center justify-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="group relative font-heading text-[0.8rem] tracking-[0.15em] font-semibold text-[#C9D1DE]/70 hover:text-[#C9D1DE] transition-colors duration-300 cursor-hover-target uppercase"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#38BDF8] transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Right — Cart + Mobile menu */}
                    <div className="flex items-center justify-end gap-5">
                        {/* Cart */}
                        <button
                            onClick={() => setDrawerOpen(true)}
                            className="relative cursor-hover-target text-[#C9D1DE]/70 hover:text-[#C9D1DE] transition-colors"
                            aria-label="Open cart"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 01-8 0" />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#38BDF8] text-[#04080F] text-[0.6rem] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden flex flex-col gap-[5px] cursor-hover-target"
                            aria-label="Toggle menu"
                        >
                            <span
                                className={`block w-5 h-[1.5px] bg-[#E2E8F0] transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[3.25px]' : ''
                                    }`}
                            />
                            <span
                                className={`block w-5 h-[1.5px] bg-[#C9D1DE] transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[3.25px]' : ''
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[999] bg-[#04080F]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden"
                    >
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.to}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.2 }}
                            >
                                <Link
                                    to={link.to}
                                    className="font-heading text-3xl tracking-[0.2em] text-[#C9D1DE] hover:text-[#38BDF8] transition-colors uppercase"
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cart Drawer */}
            <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
    );
}
