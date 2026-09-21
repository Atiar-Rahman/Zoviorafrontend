import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Grid } from "lucide-react";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/data/categorycollection.json")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to load categories:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-[#FAF8F5] min-h-screen py-12 lg:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C86D51]">
            <Grid size={13} />
            Explore All Collections
          </span>
                    <h1 className="mt-3 text-3xl font-serif font-medium tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
                        Categories
                    </h1>
                    <p className="mt-4 text-sm sm:text-base leading-relaxed text-stone-600">
                        Discover our curated selection of timeless designs crafted for modern everyday living.
                    </p>
                </div>

                {/* Categories Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="h-[360px] w-full animate-pulse rounded-2xl bg-stone-200/60"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {categories.map((item) => (
                            <Link
                                key={item.id}
                                to={item.primaryButton?.link || "/shop"}
                                className="group relative block overflow-hidden rounded-2xl bg-stone-100 shadow-xs transition-all duration-500 hover:shadow-xl"
                            >
                                {/* Image Container */}
                                <div className="relative h-[380px] w-full overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-white">
                                        {/* Category Subtitle Badge */}
                                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/90">
                      {item.subtitle || item.category || "Category"}
                    </span>

                                        {/* Title */}
                                        <h2 className="mt-2 text-2xl font-serif font-medium leading-snug text-white">
                                            {item.title}
                                        </h2>

                                        {/* Description */}
                                        {item.description && (
                                            <p className="mt-2 text-xs leading-relaxed text-stone-300 line-clamp-2">
                                                {item.description}
                                            </p>
                                        )}

                                        {/* CTA Link Indicator */}
                                        <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-white transition-all duration-300 group-hover:text-amber-200">
                      <span className="underline underline-offset-4">
                        {item.primaryButton?.text || "Explore Collection"}
                      </span>
                                            <ArrowUpRight
                                                size={15}
                                                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Categories;