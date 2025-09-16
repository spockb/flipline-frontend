import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth-context";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(email, password);
      if (res) {
        navigate("/properties");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen p-4">
        <div className="w-full max-w-md shadow-sm card bg-base-100">
          <div className="items-center text-center card-body">
            <h2 className="card-title">Login</h2>
            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}

            {/* Demo Accounts */}
            <div className="w-full space-y-4">
              <div className="alert">
                <div className="flex flex-col w-full gap-2">
                  <div className="font-semibold">Demo Accounts</div>
                  <div className="text-sm opacity-80">
                    Use these to explore. Tap Autofill to prefill the form.
                  </div>

                  <div className="flex flex-row items-center justify-between text-sm sm:flex-col">
                    <div>
                      <span className="font-medium">Member</span>:
                      <span className="opacity-80">
                        {import.meta.env.VITE_DEMO_MEMBER_EMAIL ||
                          "member@example.com"}
                        /
                        {import.meta.env.VITE_DEMO_MEMBER_PASSWORD ||
                          "member123"}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs"
                      onClick={() => {
                        setEmail(
                          import.meta.env.VITE_DEMO_MEMBER_EMAIL ||
                            "member@example.com"
                        );
                        setPassword(
                          import.meta.env.VITE_DEMO_MEMBER_PASSWORD ||
                            "member123"
                        );
                      }}
                    >
                      Autofill
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-between text-sm sm:flex-col">
                    <div>
                      <span className="font-medium">Admin</span>:
                      <span className="opacity-80">
                        {import.meta.env.VITE_DEMO_ADMIN_EMAIL ||
                          "admin@example.com"}
                        /
                        {import.meta.env.VITE_DEMO_ADMIN_PASSWORD || "admin123"}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs"
                      onClick={() => {
                        setEmail(
                          import.meta.env.VITE_DEMO_ADMIN_EMAIL ||
                            "admin@example.com"
                        );
                        setPassword(
                          import.meta.env.VITE_DEMO_ADMIN_PASSWORD || "admin123"
                        );
                      }}
                    >
                      Autofill
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <form
              className="justify-center w-full card-actions"
              onSubmit={onSubmit}
            >
              <div className="w-full space-y-4">
                <label className="input validator">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input
                    type="email"
                    placeholder="mail@site.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                </label>
                <div className="hidden validator-hint">
                  Enter valid email address
                </div>

                <label className="input validator">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                      <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                    minLength="8"
                    className="w-full"
                  />
                </label>
                <p className="hidden validator-hint">
                  Must be more than 8 characters
                </p>

                <button
                  type="submit"
                  className="btn btn-primary w-full min-h-[44px]"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
