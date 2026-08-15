import { useState } from "react";
import { ChefHat, Lock, User, Eye, EyeOff, AlertCircle } from "lucide-react";
import { verifyKitchenLogin } from "../services/kitchenService";

interface KitchenLoginProps {
  onLoginSuccess: () => void;
}

export default function KitchenLogin({ onLoginSuccess }: KitchenLoginProps) {
  const [kitchenId, setKitchenId] = useState("kitchen");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!kitchenId.trim()) {
      setError("Please enter Kitchen ID");
      return;
    }
    if (!password) {
      setError("Please enter Password");
      return;
    }

    setLoading(true);
    try {
      const isValid = await verifyKitchenLogin(kitchenId, password);
      if (isValid) {
        sessionStorage.setItem("kitchenAuth", "true");
        onLoginSuccess();
      } else {
        setError("Invalid Kitchen ID or Password");
      }
    } catch (err: any) {
      setError("Failed to verify credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] flex flex-col justify-center items-center p-4 selection:bg-amber-500/20 selection:text-amber-400">
      <div className="w-full max-w-md bg-[#1f2937] rounded-3xl p-8 border border-gray-800 shadow-2xl">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
            <ChefHat className="w-9 h-9" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Kitchen Portal</h1>
          <p className="text-sm text-gray-400 mt-1">Rustic Charm Culinary Management</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-400 text-xs font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">
              Kitchen ID
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={kitchenId}
                onChange={(e) => setKitchenId(e.target.value)}
                placeholder="e.g. kitchen"
                className="w-full bg-[#111827] border border-gray-700 text-white rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-amber-500 transition-colors placeholder:text-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#111827] border border-gray-700 text-white rounded-2xl pl-12 pr-12 py-3.5 text-sm focus:outline-none focus:border-amber-500 transition-colors placeholder:text-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-amber-500/10 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Sign In to Kitchen</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
