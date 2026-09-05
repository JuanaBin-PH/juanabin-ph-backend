import { Link } from "react-router-dom";
import { siteConfig } from "../../../config/site";

const transactions = [
  {
    time: "21:42",
    user: "Juan Dela Cruz",
    binId: "BIN-014",
    type: "Clear PET Bottle",
    quantity: "15 pcs",
    points: 150,
    phpValue: "₱15.00",
    co2Saved: 0.6,
  },
  {
    time: "21:37",
    user: "Maria Santos",
    binId: "BIN-009",
    type: "Colored PET Bottle",
    quantity: "20 pcs",
    points: 140,
    phpValue: "₱14.00",
    co2Saved: 0.7,
  },
  {
    time: "21:31",
    user: "Carlo Reyes",
    binId: "BIN-021",
    type: "Clear PET Bottle",
    quantity: "25 pcs",
    points: 250,
    phpValue: "₱25.00",
    co2Saved: 1.0,
  },
  {
    time: "21:25",
    user: "Ana Lim",
    binId: "BIN-006",
    type: "Plastic Sachet Bundle",
    quantity: "100 pcs",
    points: 150,
    phpValue: "₱15.00",
    co2Saved: 0.5,
  },
  {
    time: "21:18",
    user: "Demo User",
    binId: "BIN-003",
    type: "Food Waste",
    quantity: "1 kg",
    points: 15,
    phpValue: "₱1.50",
    co2Saved: 0.5,
  },
];

function TransactionLink() {
  return (
    <Link
      to="/connect"
      className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline"
    >
      View
    </Link>
  );
}

export default function LiveActivity() {
  return (
    <section id="activity" className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-3 h-3 bg-emerald-500 rounded-full" />
            <span className="text-xs font-semibold text-emerald-700">
              Smart Bins Live
            </span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Live Smart Bin Activity
          </h2>
          <p className="text-lg text-slate-600">
            Real-time data from JuanaBin PH smart bins across the Philippines,
            automatically detecting and validating waste disposal.
          </p>
        </div>
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b">
                  {[
                    "Time",
                    "User",
                    "Bin ID",
                    "Waste Type",
                    "Quantity",
                    "Points",
                    "CO₂ Saved",
                    "Details",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-6 py-4 text-left text-xs font-semibold text-slate-600"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, idx) => (
                  <tr
                    key={`${tx.time}-${tx.binId}-${idx}`}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 text-sm text-slate-900">
                      {tx.time}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                      {tx.user}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                      {tx.binId}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {tx.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {tx.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">
                      {tx.points} pts
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                      {tx.co2Saved} kg
                    </td>
                    <td className="px-6 py-4">
                      <TransactionLink />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden p-4 space-y-4">
            {transactions.map((tx, idx) => (
              <div
                key={`${tx.time}-${tx.binId}-${idx}`}
                className="bg-slate-50 rounded-lg p-4 border"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500">
                    {tx.time}
                  </span>
                  <TransactionLink />
                </div>
                <p className="font-semibold text-slate-900 mb-1">{tx.user}</p>
                <p className="text-sm text-slate-600 mb-2">{tx.type}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-xs text-slate-500">Quantity:</span>
                    <p className="text-slate-900">{tx.quantity}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">Points:</span>
                    <p className="font-semibold text-emerald-600">{tx.points} pts</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">CO₂ Saved:</span>
                    <p className="font-semibold text-blue-600">{tx.co2Saved} kg</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">Value:</span>
                    <p className="text-slate-900">{tx.phpValue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600 mb-2">
            <strong>Total Impact:</strong> 705 points (₱70.50) • 3.3 kg CO₂ saved
          </p>
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
            AWS CAPSTONE 2026 DEMO DATA
          </span>
        </div>
      </div>
    </section>
  );
}
