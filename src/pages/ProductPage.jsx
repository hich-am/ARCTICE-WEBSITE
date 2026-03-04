import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import FadeIn from '../components/FadeIn';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

export default function ProductPage() {
    const { id } = useParams();
    const product = products.find((p) => p.id === Number(id));
    const { addItem } = useCart();

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || '');
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);

    if (!product) {
        return (
            <main className="min-h-screen pt-28 pb-24 px-6 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-heading text-2xl tracking-widest mb-4">PRODUCT NOT FOUND</h1>
                    <Link to="/shop" className="btn-primary text-xs cursor-hover-target">BACK TO SHOP</Link>
                </div>
            </main>
        );
    }

    const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

    const handleAdd = () => {
        if (!selectedSize) return;
        addItem(product, selectedSize, selectedColor, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const stars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? 'text-cold-teal' : 'text-mist-gray/20'}>★</span>
        ));
    };

    return (
        <main className="min-h-screen pt-28 pb-24 px-6">
            <div className="max-w-[1400px] mx-auto">
                {/* Breadcrumb */}
                <FadeIn>
                    <div className="flex items-center gap-2 text-[0.7rem] text-mist-gray/30 font-heading tracking-wider mb-12">
                        <Link to="/shop" className="hover:text-cold-teal transition-colors cursor-hover-target">SHOP</Link>
                        <span>/</span>
                        <span className="text-mist-gray/50">{product.name}</span>
                    </div>
                </FadeIn>

                {/* Main grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left — Images */}
                    <FadeIn direction="left">
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-charcoal">
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: `linear-gradient(160deg, #111827 0%, #0A192F 40%, ${product.colors.find(c => c.name === selectedColor)?.hex || product.colors[0].hex}40 100%)`,
                                    }}
                                />
                                {product.isLimited && (
                                    <div className="absolute top-4 left-4 z-10 bg-cold-teal/10 border border-cold-teal/30 px-3 py-1">
                                        <span className="text-[0.6rem] font-heading tracking-[0.15em] text-cold-teal">LIMITED</span>
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 z-10 text-[0.6rem] font-heading tracking-[0.15em] text-mist-gray/30">
                                    {product.dropLabel}
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="grid grid-cols-3 gap-2">
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className="aspect-square bg-charcoal overflow-hidden cursor-hover-target">
                                        <div
                                            className="w-full h-full hover:scale-105 transition-transform duration-300"
                                            style={{
                                                background: `linear-gradient(${120 + i * 40}deg, #111827 0%, #0A192F ${40 + i * 10}%, rgba(0,180,216,${0.05 + i * 0.03}) 100%)`,
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    {/* Right — Info */}
                    <FadeIn direction="right" delay={0.15}>
                        <div className="lg:sticky lg:top-32">
                            <p className="text-[0.65rem] tracking-[0.3em] text-cold-teal/60 font-heading mb-4">{product.category}</p>
                            <h1 className="font-heading text-3xl md:text-4xl tracking-[0.08em] mb-3">{product.name}</h1>
                            <p className="text-xl text-mist-gray/50 mb-8">${product.price}</p>

                            {/* Color selector */}
                            <div className="mb-8">
                                <p className="text-[0.65rem] tracking-[0.2em] text-mist-gray/40 font-heading mb-3">
                                    COLOR — {selectedColor}
                                </p>
                                <div className="flex gap-3">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color.name)}
                                            className={`w-10 h-10 rounded-full border-2 transition-all cursor-hover-target ${selectedColor === color.name
                                                    ? 'border-cold-teal scale-110'
                                                    : 'border-white/10 hover:border-white/30'
                                                }`}
                                            style={{ backgroundColor: color.hex }}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Size selector */}
                            <div className="mb-8">
                                <p className="text-[0.65rem] tracking-[0.2em] text-mist-gray/40 font-heading mb-3">SIZE</p>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`min-w-[48px] h-12 px-4 border text-sm font-heading tracking-wider transition-all cursor-hover-target ${selectedSize === size
                                                    ? 'border-cold-teal text-cold-teal bg-cold-teal/5'
                                                    : 'border-white/10 text-mist-gray/50 hover:border-white/30'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                {!selectedSize && (
                                    <p className="text-[0.65rem] text-mist-gray/30 mt-2">Select a size</p>
                                )}
                            </div>

                            {/* Quantity */}
                            <div className="mb-8">
                                <p className="text-[0.65rem] tracking-[0.2em] text-mist-gray/40 font-heading mb-3">QUANTITY</p>
                                <div className="flex items-center gap-0">
                                    <button
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                        className="w-12 h-12 border border-white/10 flex items-center justify-center text-lg hover:border-cold-teal/50 transition-colors cursor-hover-target"
                                    >
                                        −
                                    </button>
                                    <span className="w-14 h-12 border-y border-white/10 flex items-center justify-center text-sm font-heading">
                                        {qty}
                                    </span>
                                    <button
                                        onClick={() => setQty(qty + 1)}
                                        className="w-12 h-12 border border-white/10 flex items-center justify-center text-lg hover:border-cold-teal/50 transition-colors cursor-hover-target"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart */}
                            <motion.button
                                onClick={handleAdd}
                                whileTap={{ scale: 0.97 }}
                                disabled={!selectedSize}
                                className={`w-full py-4 font-heading text-sm tracking-[0.15em] font-bold transition-all cursor-hover-target ${!selectedSize
                                        ? 'bg-charcoal text-mist-gray/30 cursor-not-allowed'
                                        : added
                                            ? 'bg-green-600 text-white'
                                            : 'btn-primary'
                                    }`}
                            >
                                {added ? '✓ ADDED TO CART' : 'ADD TO CART'}
                            </motion.button>

                            {/* Details */}
                            <div className="mt-12 space-y-6 border-t border-white/5 pt-8">
                                <div>
                                    <h3 className="text-[0.65rem] tracking-[0.2em] text-mist-gray/40 font-heading mb-2">DESCRIPTION</h3>
                                    <p className="text-sm text-mist-gray/60 leading-relaxed">{product.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-[0.65rem] tracking-[0.2em] text-mist-gray/40 font-heading mb-2">FABRIC</h3>
                                        <p className="text-sm text-mist-gray/60">{product.fabric}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-[0.65rem] tracking-[0.2em] text-mist-gray/40 font-heading mb-2">FIT</h3>
                                        <p className="text-sm text-mist-gray/60">{product.fit}</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-[0.65rem] tracking-[0.2em] text-mist-gray/40 font-heading mb-2">COLD RATING</h3>
                                    <div className="text-lg tracking-wider">{stars(product.coldRating)}</div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Related */}
                {related.length > 0 && (
                    <section className="mt-32 border-t border-white/5 pt-16">
                        <FadeIn>
                            <h2 className="font-heading text-2xl tracking-[0.1em] mb-12">YOU MAY ALSO LIKE</h2>
                        </FadeIn>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {related.map((p, i) => (
                                <ProductCard key={p.id} product={p} index={i} />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Mobile sticky add to cart */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[900] glass p-4">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-heading text-xs tracking-wider truncate">{product.name}</p>
                        <p className="text-cold-teal text-sm">${product.price}</p>
                    </div>
                    <button
                        onClick={handleAdd}
                        disabled={!selectedSize}
                        className={`px-6 py-3 font-heading text-xs tracking-widest font-bold flex-shrink-0 ${!selectedSize ? 'bg-charcoal text-mist-gray/30' : added ? 'bg-green-600 text-white' : 'btn-primary'
                            }`}
                    >
                        {added ? '✓ ADDED' : 'ADD TO CART'}
                    </button>
                </div>
            </div>
        </main>
    );
}
