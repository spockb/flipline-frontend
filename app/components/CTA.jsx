const CTA = () => {
  return (
    <section className="w-full bg-primary py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="mb-4 text-3xl font-bold text-primary-content">
          Ready to Start Investing?
        </h2>
        <p className="mb-8 max-w-2xl mx-auto text-primary-content/80">
          Join our community of successful investors and get access to curated,
          high-potential flip opportunities in Los Angeles.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/signup"
            className="btn btn-outline btn-lg text-primary-content border-primary-content hover:bg-primary-content hover:text-primary"
          >
            Sign Up Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
