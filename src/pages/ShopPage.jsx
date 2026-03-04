import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import FadeIn from '../components/FadeIn';
import products from '../data/products';

const categories = ['All', ...new Set(products.map((p) => p.category))];
const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under $100', min: 0, max: 99 },
    { label: '$100 – $250', min: 100, max: 250 },
    { label: '$250 – $400', min: 250, max: 400 },
    { label: '$400+', min: 400, max: Infinity },
];
const sortOptions = [
    { label: 'Newest', fn: () => 0 },
    { label: 'Price: Low → High', fn: (a, b) => a.price - b.price },
    { label: 'Price: High → Low', fn: (a, b) => b.price - a.price },
    { label: 'Name A–Z', fn: (a, b) => a.name.localeCompare(b.name) },
];

export default function ShopPage() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [priceIdx, setPriceIdx] = useState(0);
    const [sortIdx, setSortIdx] = useState(0);
    const [filtersOpen, setFiltersOpen] = useState(false);

    const filtered = useMemo(() => {
        let items = [...products];

        // Search
        if (search) {
            const q = search.toLowerCase();
            items = items.filter(
                (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
            );
        }

        // Category
        if (category !== 'All') {
            items = items.filter((p) => p.category === category);
        }

        // Price
        const range = priceRanges[priceIdx];
        items = items.filter((p) => p.price >= range.min && p.price <= range.max);

        // Sort
        items.sort(sortOptions[sortIdx].fn);

        return items;
    }, [search, category, priceIdx, sortIdx]);

    return (
        <main className="min-h-screen pt-28 pb-24 px-6">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <FadeIn>
                    <div className="mb-16">
                        <p className="text-[0.65rem] tracking-[0.3em] text-cold-teal/60 font-heading mb-3">WINTER 26</p>
                        <h1 className="font-heading text-4xl md:text-5xl tracking-[0.1em]">SHOP ALL</h1>
                    </div>
                </FadeIn>

                {/* Controls */}
                <FadeIn delay={0.1}>
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-12 pb-8 border-b border-white/5">
                        {/* Search */}
                        <div className="relative w-full lg:w-80">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-mist-gray/30" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="SEARCH PRODUCTS..."
                                className="w-full bg-transparent border border-white/10 pl-10 pr-4 py-3 text-sm tracking-wider placeholder:text-mist-gray/20 focus:outline-none focus:border-cold-teal/30 transition-colors font-heading text-[0.75rem]"
                            />
                        </div>

                        <div className="flex items-center gap-4 flex-wrap">
                            {/* Mobile filter toggle */}
                            <button
                                onClick={() => setFiltersOpen(!filtersOpen)}
                                className="lg:hidden btn-secondary text-[0.7rem] px-4 py-2"
                            >
                                FILTERS {filtersOpen ? '−' : '+'}
                            </button>

                            {/* Sort */}
                            <select
                                value={sortIdx}
                                onChange={(e) => setSortIdx(Number(e.target.value))}
                                className="bg-transparent border border-white/10 px-4 py-3 text-[0.75rem] tracking-wider text-mist-gray/60 focus:outline-none focus:border-cold-teal/30 font-heading appearance-none cursor-hover-target"
                            >
                                {sortOptions.map((opt, i) => (
                                    <option key={i} value={i} className="bg-deep-navy">{opt.label}</option>
                                ))}
                            </select>

                            <span className="text-[0.7rem] text-mist-gray/30 tracking-wider font-heading">
                                {filtered.length} PRODUCTS
                            </span>
                        </div>
                    </div>
                </FadeIn>

                <div className="flex gap-12">
                    {/* Sidebar filters — desktop */}
                    <div className={`${filtersOpen ? 'block' : 'hidden'} lg:block w-full lg:w-56 flex-shrink-0`}>
                        <FadeIn direction="left">
                            {/* Category */}
                            <div className="mb-10">
                                <h3 className="text-[0.65rem] tracking-[0.2em] text-mist-gray/40 font-heading mb-4">CATEGORY</h3>
                                <div className="flex flex-col gap-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setCategory(cat)}
                                            className={`text-left text-sm transition-colors cursor-hover-target ${category === cat ? 'text-cold-teal' : 'text-mist-gray/40 hover:text-mist-gray/70'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mb-10">
                                <h3 className="text-[0.65rem] tracking-[0.2em] text-mist-gray/40 font-heading mb-4">PRICE</h3>
                                <div className="flex flex-col gap-2">
                                    {priceRanges.map((range, i) => (
                                        <button
                                            key={range.label}
                                            onClick={() => setPriceIdx(i)}
                                            className={`text-left text-sm transition-colors cursor-hover-target ${priceIdx === i ? 'text-cold-teal' : 'text-mist-gray/40 hover:text-mist-gray/70'
                                                }`}
                                        >
                                            {range.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sizes */}
                            <div>
                                <h3 className="text-[0.65rem] tracking-[0.2em] text-mist-gray/40 font-heading mb-4">SIZE</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                        <span
                                            key={size}
                                            className="w-10 h-10 border border-white/10 flex items-center justify-center text-[0.7rem] text-mist-gray/40 hover:border-cold-teal/50 hover:text-cold-teal transition-colors cursor-hover-target"
                                        >
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Product grid */}
                    <div className="flex-1">
                        {filtered.length === 0 ? (
                            <div className="text-center py-24">
                                <p className="text-mist-gray/30 text-sm mb-2">No products found</p>
                                <p className="text-mist-gray/20 text-xs">Try adjusting your filters</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filtered.map((p, i) => (
                                    <ProductCard key={p.id} product={p} index={i} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
