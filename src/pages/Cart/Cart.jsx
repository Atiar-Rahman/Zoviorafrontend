import { Link } from "react-router-dom";

const Cart = ({ items = [] }) => {
  const itemCount = items.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );
  const subtotal = items.reduce(
    (total, item) =>
      total +
      (item.product?.discountPrice || item.product?.price || 0) *
        (item.quantity || 1),
    0,
  );

  return (
    <main className="min-h-screen bg-[#fcfbf9] text-[#181818]">
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-center gap-2 text-[9px] text-gray-400">
            <Link to="/" className="transition hover:text-[#b85b32]">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-600">Cart</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#b85b32]">
                Your selection
              </p>
              <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
                Shopping cart
              </h1>
            </div>
            {items.length > 0 && (
              <p className="text-xs text-gray-400">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {items.length === 0 ? (
          <div className="mx-auto max-w-2xl text-center">
            <div
              className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-[#f3eee8] text-4xl text-[#b85b32]"
              aria-hidden="true"
            >
              🛒
            </div>
            <h2 className="text-xl font-medium sm:text-2xl">
              Your cart is waiting for something beautiful
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              Take a look around and discover thoughtful pieces made to bring
              warmth to everyday spaces.
            </p>
            <Link
              to="/shop"
              className="mt-7 inline-flex items-center justify-center bg-[#b85b32] px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#984821]"
            >
              Continue shopping <span className="ml-3 text-sm">→</span>
            </Link>
            <div className="mt-12 grid gap-4 border-t border-gray-100 pt-7 text-left sm:grid-cols-3">
              <div>
                <p className="mb-1 text-lg text-[#b85b32]">✦</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider">
                  Curated design
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Quiet, considered pieces for your home.
                </p>
              </div>
              <div>
                <p className="mb-1 text-lg text-[#b85b32]">♢</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider">
                  Easy returns
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Shop with confidence, always.
                </p>
              </div>
              <div>
                <p className="mb-1 text-lg text-[#b85b32]">✓</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider">
                  Secure checkout
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Your details are safe with us.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            <div className="divide-y divide-gray-100 border-y border-gray-100 bg-white">
              {items.map(({ product, quantity = 1 }) => (
                <div key={product.id} className="flex gap-4 p-4 sm:p-6">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="h-28 w-24 object-cover bg-[#f5f3ef] sm:h-36 sm:w-32"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="text-[9px] uppercase tracking-[0.14em] text-gray-400">
                      {product.category}
                    </p>
                    <h2 className="mt-1 text-sm font-medium">{product.name}</h2>
                    <p className="mt-auto text-xs text-gray-500">
                      Qty: {quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">
                    ৳
                    {(
                      (product.discountPrice || product.price || 0) * quantity
                    ).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <aside className="h-fit bg-white p-6">
              <h2 className="text-sm font-medium">Order summary</h2>
              <div className="mt-6 flex justify-between border-b border-gray-100 pb-4 text-xs text-gray-500">
                <span>Subtotal</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="mt-4 flex justify-between text-sm font-semibold">
                <span>Total</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              <button
                type="button"
                className="mt-6 w-full bg-[#b85b32] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#984821]"
              >
                Proceed to checkout
              </button>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
};

export default Cart;
