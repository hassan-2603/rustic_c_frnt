import { useState } from "react";
import { Lock, User, ShieldCheck, AlertCircle } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}
export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setError("");
  setIsLoading(true);

  try {
    const email = username.trim();
    const passwordValue = password.trim();

    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email,
        passwordValue
      );

    const tokenResult =
      await userCredential.user.getIdTokenResult(true);

    console.log("Claims:", tokenResult.claims);

    if (!tokenResult.claims.admin) {
      setError("This account is not an administrator.");
      await auth.signOut();
      setIsLoading(false);
      return;
    }

    const idToken = await userCredential.user.getIdToken(true);
    localStorage.setItem("adminToken", idToken);
    localStorage.setItem("adminUid", userCredential.user.uid);

    onLoginSuccess();

  } catch (error: any) {

    console.error(error);

    setError("Invalid email or password.");

  } finally {

    setIsLoading(false);

  }
};

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center p-4">
      {/* Background Decorative Accent */}
      <div className="absolute inset-0 bg-radial from-yellow-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="w-full max-w-md bg-[#1f2937] text-white rounded-2xl shadow-2xl border border-gray-700/60 overflow-hidden relative z-10">
        {/* Top Yellow Accent Bar */}
        <div className="h-1.5 bg-yellow-500 w-full" />

        <div className="p-8 sm:p-10">
          {/* Brand & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 mb-4 shadow-inner">
              <ShieldCheck className="w-9 h-9" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Rustic Charm
            </h1>
            <p className="text-sm text-gray-400 mt-1 uppercase tracking-widest font-medium">
              Admin Portal Authentication
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-sm animate-shake">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                email
              </label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin email"
                  required
                  className="w-full bg-[#111827] border border-gray-700 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="w-full bg-[#111827] border border-gray-700 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl shadow-lg transition duration-200 uppercase tracking-wider text-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-gray-700/50 text-center text-xs text-gray-400">
            Authorized Personnel Only • Rustic Charm Management
          </div>
        </div>
      </div>
    </div>
  );
}
