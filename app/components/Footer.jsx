import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-base-300 text-base-content">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-10">
          {/* Logo + Description */}
          <div className="min-w-[260px] max-w-xl mr-auto">
            <Link aria-label="go back to home" to="/" className="inline-block">
              <span className="text-3xl font-extrabold tracking-tight">
                <span className="text-primary">Flip</span>Line
              </span>
            </Link>
            <p className="mt-4 text-base text-base-content/80">
              Los Angeles' Best Flip Opportunities Curated for Investors
            </p>
          </div>

          {/* Sitemap */}
          <ul className="list-none p-0 m-0">
            <li className="footer-title">Sitemap</li>
            <li className="mt-2">
              <Link className="link link-hover" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="/properties">
                Properties
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="/favorites">
                Favorites
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          {/* Contact + Social */}
          <ul className="list-none p-0 m-0 ml-auto">
            <li className="footer-title">Contact</li>
            <li className="mt-2">
              <a className="link link-hover" href="tel:123-456-7890">
                (123) 456-7890
              </a>
            </li>
            <li>
              <a className="link link-hover" href="mailto:info@flipline.com">
                info@flipline.com
              </a>
            </li>
            <li className="mt-4">
              <div className="flex gap-3">
                <a
                  className="btn btn-circle btn-sm bg-base-200 hover:bg-primary text-base-content"
                  aria-label="visit google profile"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="h-4 w-4 fill-current"
                  >
                    <path d="M43.6 20.5H42V20H24v8h11.3C33.8 32.4 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.7 2.9l5.7-5.7C33.6 6.3 29.1 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11.5 0 19.6-8.1 19.6-19.6 0-1.3-.1-2.2-.3-3.9z" />
                  </svg>
                </a>
                <a
                  className="btn btn-circle btn-sm bg-base-200 hover:bg-primary text-base-content"
                  aria-label="visit facebook profile"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    className="h-4 w-4 fill-current"
                  >
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06H295V6.26S277.43 4 261.09 4c-73.22 0-121.09 44.38-121.09 124.72v70.62H64v92.66h76v224h92.57v-224z" />
                  </svg>
                </a>
                <a
                  className="btn btn-circle btn-sm bg-base-200 hover:bg-primary text-base-content"
                  aria-label="visit instagram profile"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="h-4 w-4 fill-current"
                  >
                    <path d="M224,202.66A53.34,53.34,0,1,0,277.34,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.6-30.6c-21.17-8.44-71.43-6.5-94.11-6.5s-72.94-1.94-94.11,6.5a54,54,0,0,0-30.6,30.6c-8.44,21.17-6.5,71.43-6.5,94.11s-1.94,72.94,6.5,94.11a54,54,0,0,0,30.6,30.6c21.17,8.44,71.43,6.5,94.11,6.5s72.94,1.94,94.11-6.5a54,54,0,0,0,30.6-30.6c8.44-21.17,6.5-71.43,6.5-94.11S357.15,182.88,348.71,161.71ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.33-148.23a19.2,19.2,0,1,1,19.2-19.2A19.19,19.19,0,0,1,309.33,189.77Z" />
                  </svg>
                </a>
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-10 border-t border-base-200 pt-6 text-sm text-base-content/70">
          <p>© {year} FlipLine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
