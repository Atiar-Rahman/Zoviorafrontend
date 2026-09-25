
import { Link } from 'react-router-dom';

const ProductNotFound = () => {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#fcfbf9] px-4">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Product Not Found
          </p>

          <h1 className="mt-3 text-2xl font-medium text-gray-900">
            We couldn't find this product.
          </h1>

          <Link
            to="/shop"
            className="mt-6 inline-flex bg-black px-6 py-3 text-xs font-medium uppercase tracking-wider text-white transition hover:bg-[#b85b32]"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
};

export default ProductNotFound;