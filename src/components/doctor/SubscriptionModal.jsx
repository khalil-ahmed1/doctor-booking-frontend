import { useState } from "react";

const SubscriptionModal = ({ open, onClose, onContinue, loading }) => {
  const [plan, setPlan] = useState("monthly");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Choose Subscription Plan
        </h2>

        <div className="space-y-4">
          <label className="border rounded-xl p-4 flex justify-between cursor-pointer">
            <div>
              <input
                type="radio"
                checked={plan === "monthly"}
                onChange={() => setPlan("monthly")}
              />
              <span className="ml-3 font-semibold">Monthly</span>
            </div>

            <span>₹499</span>
          </label>

          <label className="border rounded-xl p-4 flex justify-between cursor-pointer bg-blue-50">
            <div>
              <input
                type="radio"
                checked={plan === "quarterly"}
                onChange={() => setPlan("quarterly")}
              />
              <span className="ml-3 font-semibold">Quarterly ⭐</span>
            </div>

            <span>₹1299</span>
          </label>

          <label className="border rounded-xl p-4 flex justify-between cursor-pointer">
            <div>
              <input
                type="radio"
                checked={plan === "yearly"}
                onChange={() => setPlan("yearly")}
              />
              <span className="ml-3 font-semibold">Yearly 💎</span>
            </div>

            <span>₹4499</span>
          </label>
        </div>

        <div className="flex gap-3 mt-8">
          <button onClick={onClose} className="flex-1 border rounded-xl py-3">
            Cancel
          </button>

          <button
            onClick={() => onContinue(plan)}
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl py-3"
          >
            {loading ? "Processing..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
