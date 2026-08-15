import { useState, useEffect } from "react";
import { ChefHat, KeyRound, Eye, EyeOff, CheckCircle2, ShieldCheck } from "lucide-react";
import { getKitchenCredentials, updateKitchenPassword } from "../../services/kitchenService";

export default function Kitchen() {
  const [kitchenId, setKitchenId] = useState("kitchen");
  const [password, setPassword] = useState("0000");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadCreds() {
      try {
        const creds = await getKitchenCredentials();
        setKitchenId(creds.id);
        setPassword(creds.password);
      } catch (err) {
        console.error("Failed to load kitchen credentials", err);
      } finally {
        setFetching(false);
      }
    }
    loadCreds();
  }, []);

  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!password.trim()) {
      alert("Password cannot be empty");
      return;
    }

    setLoading(true);
    try {
      await updateKitchenPassword(password);
      setSuccessMessage("Kitchen password updated successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err: any) {
      console.error(err);
      alert("Failed to update password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b">
          <div className="p-3 bg-yellow-100 text-yellow-800 rounded-xl">
            <ChefHat size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Kitchen Account Settings
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Manage credentials and login access for the Kitchen Dashboard.
            </p>
          </div>
        </div>

        {fetching ? (
          <div className="py-12 text-center text-gray-500">
            <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading kitchen account settings...
          </div>
        ) : (
          <div className="max-w-xl space-y-6">
            {/* Account Info Card */}
            <div className="bg-gray-50 border rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">Account ID</p>
                  <p className="text-lg font-bold text-gray-900 mt-0.5">{kitchenId}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                Active Portal
              </span>
            </div>

            {/* Success Toast */}
            {successMessage && (
              <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-2xl flex items-center gap-3 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Password Update Form */}
            <form onSubmit={handleSavePassword} className="space-y-5 bg-white border rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <KeyRound size={20} className="text-yellow-600" />
                Change Kitchen Password
              </h2>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1.5">
                  Default password is <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-gray-800">0000</code>.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-xl transition shadow-md active:scale-98 disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Save Password</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
