import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router';

export default function CartDrawer({ open, onClose }) {
    const { items, removeItem, updateQty, subtotal } = useCart();

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1100]"
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-deep-navy border-l border-white/5 z-[1200] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                            <h2 className="font-heading text-sm tracking-[0.2em]">YOUR CART</h2>
                            <button onClick={onClose} className="text-mist-gray/50 hover:text-mist-gray transition-colors cursor-hover-target">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <p className="text-mist-gray/30 text-sm mb-6">Your cart is empty</p>
                                    <Link to="/shop" onClick={onClose} className="btn-primary text-xs">
                                        SHOP NOW
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-6">
                                    {items.map((item, idx) => (
                                        <div key={`${item.id}-${item.size}-${item.color}-${idx}`} className="flex gap-4 pb-6 border-b border-white/5">
                                            {/* Placeholder image */}
                                            <div className="w-20 h-24 bg-charcoal rounded flex-shrink-0" />

                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-heading text-xs tracking-wider truncate">{item.name}</h3>
                                                <p className="text-[0.7rem] text-mist-gray/40 mt-1">
                                                    {item.size} / {item.color}
                                                </p>
                                                <p className="text-sm text-cold-teal mt-1">${item.price}</p>

                                                <div className="flex items-center gap-3 mt-3">
                                                    <button
                                                        onClick={() => updateQty(item.id, item.size, item.color, item.qty - 1)}
                                                        className="w-7 h-7 border border-white/10 text-xs flex items-center justify-center hover:border-cold-teal transition-colors"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="text-sm w-5 text-center">{item.qty}</span>
                                                    <button
                                                        onClick={() => updateQty(item.id, item.size, item.color, item.qty + 1)}
                                                        className="w-7 h-7 border border-white/10 text-xs flex items-center justify-center hover:border-cold-teal transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                    <button
                                                        onClick={() => removeItem(item.id, item.size, item.color)}
                                                        className="ml-auto text-mist-gray/30 hover:text-red-400 transition-colors text-xs"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="px-6 py-5 border-t border-white/5">
                                <div className="flex justify-between mb-4">
                                    <span className="text-sm text-mist-gray/50">Subtotal</span>
                                    <span className="font-heading tracking-wider">${subtotal.toFixed(2)}</span>
                                </div>
                                <Link
                                    to="/cart"
                                    onClick={onClose}
                                    className="btn-primary block text-center w-full text-xs"
                                >
                                    VIEW CART
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
