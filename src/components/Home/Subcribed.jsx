const Subcribed = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    if (!email) return;

    console.log("Subscribed:", email);

    e.target.reset();
  };

  return (
    <section className="w-full border-y border-gray-100 bg-white px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        {/* Heading */}
        <h2 className="text-2xl font-medium tracking-tight text-[#181818] sm:text-3xl">
          Subscribe to the Journal
        </h2>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-xl text-xs leading-5 text-gray-500 sm:text-sm">
          Receive private notices of new artisan collection launches, interior
          care journals, and custom invitations to studio viewing events.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-6 flex max-w-[430px] flex-col gap-2 sm:flex-row"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
            className="h-10 flex-1 border border-[#e7e1dd] bg-[#faf9f7] px-3 text-xs text-gray-800 outline-none placeholder:text-gray-400 focus:border-[#b85b32] focus:ring-1 focus:ring-[#b85b32]"
          />

          <button
            type="submit"
            className="h-10 bg-[#b85b32] px-6 text-xs font-medium text-white transition duration-300 hover:bg-[#994923]"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Subcribed;
