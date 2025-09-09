const FAQ = ({ imageSrc, imageAlt, reverse }) => {
  return (
    <section className={`w-full py-16 px-4`}>
      <div
        className={`container mx-auto flex flex-col-reverse items-center gap-12 md:flex-row ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={imageSrc}
            alt={imageAlt || heading}
            className="w-full h-auto shadow rounded-xl"
          />
        </div>

        {/* FAQ */}
        <div>
          <h2 className="mb-4 text-3xl font-bold">
            Frequently Asked Questions
          </h2>
          <div className="join join-vertical bg-base-100">
            {/* Q1 */}
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" defaultChecked />
              <div className="collapse-title font-semibold">
                How do I access the real estate investment listings?
              </div>
              <div className="collapse-content text-sm">
                All property listings on FlipLine are private and available only
                to registered users. After signing up and securely logging in,
                you'll gain access to the full database of investment properties
                through a streamlined React interface.
              </div>
            </div>

            {/* Q2 */}
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title font-semibold">
                Who can upload properties to the platform?
              </div>
              <div className="collapse-content text-sm">
                Only admin users, such as the verified real estate agent
                managing the listings, can post new properties. This role-based
                access control ensures data integrity and a professional
                property management workflow.
              </div>
            </div>

            {/* Q3 */}
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title font-semibold">
                Is there a cost to join FlipLine?
              </div>
              <div className="collapse-content text-sm">
                Creating a member account is free. The platform was designed to
                demonstrate secure authentication, protected routes, and
                scalable subscription models — future versions may include
                premium features like custom alerts and investor-only insights.
              </div>
            </div>

            {/* Q4 */}
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title font-semibold">
                How frequently are new investment properties added?
              </div>
              <div className="collapse-content text-sm">
                Listings are updated regularly by the admin using a full-stack
                workflow (Express + PostgreSQL backend). This keeps the content
                fresh and ensures members always have access to the latest
                opportunities.
              </div>
            </div>

            {/* Q5 */}
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title font-semibold">
                Can I save or favorite properties for later?
              </div>
              <div className="collapse-content text-sm">
                Yes. Members can easily favorite properties and manage their
                saved listings. This feature highlights personalized user
                experience and state management within the React front end.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FAQ;
