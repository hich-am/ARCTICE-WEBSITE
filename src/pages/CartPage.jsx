import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import FadeIn from '../components/FadeIn';

export default function CartPage() {
    const { items, removeItem, updateQty, subtotal, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <main className="min-h-screen pt-28 pb-24 px-6 flex items-center justify-center">
                <FadeIn>
                    <div className="text-center">
                        <h1 className="font-heading text-3xl tracking-[0.15em] mb-4">YOUR CART IS EMPTY</h1>
                        <p className="text-sm text-mist-gray/40 mb-8">Add some pieces to get started.</p>
                        <Link to="/shop" className="btn-primary cursor-hover-target text-xs">
                            CONTINUE SHOPPING
                        </Link>
                    </div>
                </FadeIn>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-28 pb-24 px-6">
            <div className="max-w-[1000px] mx-auto">
                <FadeIn>
                    <h1 className="font-heading text-3xl md:text-4xl tracking-[0.1em] mb-16">YOUR CART</h1>
                </FadeIn>

                {/* Header */}
                <div className="hidden md:grid grid-cols-[1fr_120px_120px_80px] gap-6 pb-4 border-b border-white/5 text-[0.65rem] tracking-[0.2em] text-mist-gray/30 font-heading">
                    <span>PRODUCT</span>
                    <span className="text-center">QUANTITY</span>
                    <span className="text-right">TOTAL</span>
                    <span />
                </div>

                {/* Items */}
                <div className="divide-y divide-white/5">
                    {items.map((item, idx) => (
                        <motion.div
                            key={`${item.id}-${item.size}-${item.color}-${idx}`}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            className="grid grid-cols-1 md:grid-cols-[1fr_120px_120px_80px] gap-4 md:gap-6 py-6 items-center"
                        >
                            {/* Product */}
                            <div className="flex gap-4">
                                <div className="w-20 h-24 bg-charcoal flex-shrink-0 rounded" />
                                <div>
                                    <h3 className="font-heading text-sm tracking-wider">{item.name}</h3>
                                    <p className="text-[0.7rem] text-mist-gray/40 mt-1">{item.size} / {item.color}</p>
                                    <p className="text-sm text-mist-gray/50 mt-1">${item.price}</p>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center justify-center gap-2">
                                <button
                                    onClick={() => updateQty(item.id, item.size, item.color, item.qty - 1)}
                                    className="w-8 h-8 border border-white/10 flex items-center justify-center text-sm hover:border-cold-teal transition-colors cursor-hover-target"
                                >
                                    −
                                </button>
                                <span className="w-8 text-center text-sm">{item.qty}</span>
                                <button
                                    onClick={() => updateQty(item.id, item.size, item.color, item.qty + 1)}
                                    className="w-8 h-8 border border-white/10 flex items-center justify-center text-sm hover:border-cold-teal transition-colors cursor-hover-target"
                                >
                                    +
                                </button>
                            </div>

                            {/* Total */}
                            <p className="text-right font-heading tracking-wider">
                                ${(item.price * item.qty).toFixed(2)}
                            </p>

                            {/* Remove */}
                            <button
                                onClick={() => removeItem(item.id, item.size, item.color)}
                                className="text-sm text-mist-gray/30 hover:text-red-400 transition-colors cursor-hover-target justify-self-end"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Summary */}
                <FadeIn>
                    <div className="mt-12 border-t border-white/5 pt-8">
                        <div className="flex flex-col items-end gap-4">
                            <div className="flex items-center gap-8">
                                <span className="text-sm text-mist-gray/50">Subtotal</span>
                                <span className="font-heading text-2xl tracking-wider">${subtotal.toFixed(2)}</span>
                            </div>
                            <p className="text-[0.7rem] text-mist-gray/30">Shipping calculated at checkout</p>
                            <div className="flex gap-4 mt-4">
                                <button onClick={clearCart} className="btn-secondary text-xs cursor-hover-target">
                                    CLEAR CART
                                </button>
                                <button className="btn-primary cursor-hover-target text-xs">
                                    PROCEED TO CHECKOUT
                                </button>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* Continue shopping */}
                <div className="mt-12 text-center">
                    <Link to="/shop" className="text-[0.7rem] tracking-[0.15em] text-mist-gray/30 hover:text-cold-teal transition-colors font-heading cursor-hover-target">
                        ← CONTINUE SHOPPING
                    </Link>
                </div>
            </div>
        </main>
    );
}
