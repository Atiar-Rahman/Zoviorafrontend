const stats = [
  ["Total revenue", "৳2,48,500", "+12.8%", "This month"],
  ["Orders", "186", "+8.4%", "This month"],
  ["Customers", "1,248", "+16.2%", "This month"],
  ["Conversion rate", "4.86%", "+2.1%", "This month"],
];
const orders = [
  ["#LM-1048", "Nadia Rahman", "2 items", "৳12,499", "Paid"],
  ["#LM-1047", "Arif Hossain", "1 item", "৳8,299", "Paid"],
  ["#LM-1046", "Samia Karim", "3 items", "৳24,998", "Pending"],
  ["#LM-1045", "Tanvir Ahmed", "2 items", "৳15,499", "Paid"],
];
const products = [
  ["Oak Lounge Chair", "Furniture", "৳15,999", "18"],
  ["Ceramic Table Vase", "Home Decor", "৳2,499", "32"],
  ["Modern Pendant Light", "Lighting", "৳6,999", "8"],
];

const DashBoard = () => (
  <section className="mx-auto max-w-[1600px] px-5 py-7 sm:px-8 lg:px-10">
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
          Friday, 25 September 2026
        </p>
        <h2 className="mt-2 text-2xl font-medium tracking-tight">
          Good morning, Admin <span aria-hidden="true">✦</span>
        </h2>
        <p className="mt-2 text-xs text-gray-500">
          Here is what is happening with your store today.
        </p>
      </div>
      <button
        type="button"
        className="w-fit bg-[#b85b32] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-white hover:bg-[#984821]"
      >
        + Add product
      </button>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(([label, value, change, period]) => (
        <div key={label} className="border border-gray-100 bg-white p-5">
          <div className="flex items-start justify-between">
            <p className="text-[10px] uppercase tracking-wider text-gray-400">
              {label}
            </p>
            <span className="text-lg text-[#b85b32]">◌</span>
          </div>
          <p className="mt-5 text-2xl font-medium">{value}</p>
          <p className="mt-2 text-[10px]">
            <span className="text-green-600">↗ {change}</span>
            <span className="ml-1 text-gray-400">vs last month</span>
          </p>
        </div>
      ))}
    </div>
    <div className="mt-7 grid gap-7 xl:grid-cols-[1.5fr_1fr]">
      <div className="border border-gray-100 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h3 className="text-sm font-medium">Recent orders</h3>
            <p className="mt-1 text-[10px] text-gray-400">
              Latest activity from your store
            </p>
          </div>
          <button
            type="button"
            className="text-[9px] uppercase tracking-wider text-[#b85b32]"
          >
            View all →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left">
            <thead>
              <tr className="text-[9px] uppercase tracking-wider text-gray-400">
                <th className="px-5 py-3 font-medium">Order</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Items</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order[0]} className="border-t border-gray-50 text-xs">
                  <td className="px-5 py-4 font-medium">{order[0]}</td>
                  <td className="px-5 py-4 text-gray-600">{order[1]}</td>
                  <td className="px-5 py-4 text-gray-500">{order[2]}</td>
                  <td className="px-5 py-4 font-medium">{order[3]}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2 py-1 text-[9px] ${order[4] === "Paid" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}
                    >
                      {order[4]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="border border-gray-100 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h3 className="text-sm font-medium">Top products</h3>
            <p className="mt-1 text-[10px] text-gray-400">
              Best performers this month
            </p>
          </div>
          <span className="text-lg text-[#b85b32]">↗</span>
        </div>
        <div className="divide-y divide-gray-50">
          {products.map(([name, category, price, stock], index) => (
            <div key={name} className="flex items-center gap-3 px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center bg-[#f1ece6] text-sm text-[#b85b32]">
                0{index + 1}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium">{name}</p>
                <p className="mt-1 text-[10px] text-gray-400">
                  {category} · {stock} in stock
                </p>
              </div>
              <p className="text-xs font-medium">{price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
export default DashBoard;
