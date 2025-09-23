const CTA = () => {
  return (
    <section className="w-full bg-gradient-to-br from-blue-500 to-blue-600 py-20 relative overflow-hidden">
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-gray-900/20"></div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="mb-6 text-3xl font-bold leading-tight text-white md:text-4xl">
          Ready to Start Investing?
        </h2>
        <p className="mb-12 max-w-2xl mx-auto text-lg leading-relaxed text-white/90 md:text-xl">
          Join our community of successful investors and get access to curated,
          high-potential flip opportunities in Los Angeles.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-blue-600 bg-white border border-transparent rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300"
          >
            Sign Up Today
          </a>
          <a
            href="/about"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-transparent border-2 border-white rounded-lg shadow-sm hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
