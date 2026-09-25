import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data.filter((product) => product.newArrival)))
      .catch((error) => console.error("New arrivals loading error:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#fcfbf9] text-[#181818]">
      <section className="bg-[#e9eee9]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mb-5 flex gap-2 text-[9px] text-gray-500"><Link to="/" className="hover:text-[#b85b32]">Home</Link><span>/</span><span>New Arrivals</span></div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#b85b32]">Just landed</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-medium leading-tight sm:text-5xl">Fresh pieces for <em className="font-serif font-normal text-[#b85b32]">everyday living.</em></h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-gray-600">Meet the newest additions to our collection—thoughtful objects made for quiet, beautiful spaces.</p>
          <Link to="/shop" className="mt-7 inline-flex bg-[#b85b32] px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#984821]">Explore the collection <span className="ml-3">→</span></Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-7 border-b border-gray-100 pb-4"><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#b85b32]">The latest edit</p><h2 className="mt-2 text-xl font-medium sm:text-2xl">New to Lumire</h2></div>
        {loading ? <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{[1,2,3,4].map((item) => <div key={item} className="aspect-square animate-pulse bg-[#f0ece7]" />)}</div> : products.length === 0 ? <p className="py-16 text-center text-sm text-gray-500">New arrivals are coming soon.</p> : <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">{products.map((product) => <Link to={`/shop/${product.id}`} key={product.id} className="group"><div className="relative aspect-square overflow-hidden bg-[#f5f3ef]"><img src={product.thumbnail} alt={product.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 text-[8px] uppercase tracking-wider text-gray-600">New</span>{product.discountPercentage > 0 && <span className="absolute left-2 top-2 bg-[#b85b32] px-2 py-1 text-[9px] text-white">-{product.discountPercentage}%</span>}</div><p className="mt-3 text-[9px] uppercase tracking-wider text-gray-400">{product.category}</p><h3 className="mt-1 text-xs font-medium">{product.name}</h3><div className="mt-2 flex gap-2"><span className="text-xs font-semibold">৳{(product.discountPrice || product.price).toLocaleString()}</span>{product.discountPrice !== product.price && <span className="text-[10px] text-gray-400 line-through">৳{product.price.toLocaleString()}</span>}</div></Link>)}</div>}
      </section>
    </main>
  );
};

export default NewArrivals;
