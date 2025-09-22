import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth-context";

const SignUp = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(email, password, name);
      if (!res.ok) {
        navigate("/properties");
      } else {
        console.error("Signup failed");
      }
    } catch {
      console.error("Signup failed");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen p-4 sm:p-6">
        <div className="w-full max-w-md shadow-sm card bg-base-100 rounded-xl">
          <div className="items-center text-center card-body gap-4 sm:gap-6">
            <h2 className="card-title">Create an account</h2>
            {/* <h3 className="card-title">{location.state.message}</h3> */}

            <form
              className="justify-center w-full card-actions"
              onSubmit={onSubmit}
            >
              <label className="input validator min-h-[48px]">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                >
                  <path
                    data-name="layer1"
                    d="M46 26c0 6.1-3.4 11.5-7 14.8V44c0 2 1 5.1 11 7a15.5 15.5 0 0 1 12 11H2a13.4 13.4 0 0 1 11-11c10-1.8 12-5 12-7v-3.2c-3.6-3.3-7-8.6-7-14.8v-9.6C18 6 25.4 2 32 2s14 4 14 14.4z"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="5"
                    fill="none"
                    stroke="currentColor"
                  ></path>
                </svg>
                <input
                  type="text"
                  placeholder="John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full text-base min-h-[44px]"
                  autoComplete="name"
                  autoCapitalize="words"
                  autoCorrect="off"
                />
              </label>
              <div className="hidden validator-hint">
                Enter valid email address
              </div>
              <label className="input validator min-h-[48px]">
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
                  className="w-full text-base min-h-[44px]"
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                />
              </label>
              <div className="hidden validator-hint">
                Enter valid email address
              </div>

              <label className="input validator min-h-[48px]">
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
                  className="w-full text-base min-h-[44px]"
                  autoComplete="new-password"
                  autoCapitalize="none"
                  autoCorrect="off"
                />
              </label>
              <p className="hidden validator-hint">
                Must be more than 8 characters
              </p>

              <button
                type="submit"
                className="btn btn-primary w-full min-h-[48px] text-base"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
