import { useState } from "react";
import { motion } from "framer-motion";

const wasteTypes = [
  {
    key: "clearPet",
    label: "Clear PET Bottles",
    unit: "bottles",
    max: 50,
    pointsPerItem: 10,
    co2PerItem: 0.04, // kg CO2e saved per bottle recycled
    initial: 10,
  },
  {
    key: "coloredPet",
    label: "Colored PET Bottles",
    unit: "bottles",
    max: 50,
    pointsPerItem: 7,
    co2PerItem: 0.035, // kg CO2e saved
    initial: 5,
  },
  {
    key: "sachet",
    label: "Plastic Sachets",
    unit: "pieces",
    max: 100,
    pointsPerItem: 1,
    co2PerItem: 0.005, // kg CO2e - small but adds up
    initial: 50,
  },
  {
    key: "foodWaste",
    label: "Food Waste (compostable)",
    unit: "kg",
    max: 10,
    pointsPerItem: 15,
    co2PerItem: 0.5, // kg CO2e - methane avoidance from landfill
    initial: 2,
  },
  {
    key: "cardboard",
    label: "Cardboard/Paper",
    unit: "kg",
    max: 10,
    pointsPerItem: 8,
    co2PerItem: 0.9, // kg CO2e - high savings from paper recycling
    initial: 1,
  },
  {
    key: "glass",
    label: "Glass Bottles",
    unit: "bottles",
    max: 20,
    pointsPerItem: 5,
    co2PerItem: 0.15, // kg CO2e - energy saved vs new glass
    initial: 3,
  },
  {
    key: "metal",
    label: "Metal Cans (Aluminum)",
    unit: "cans",
    max: 30,
    pointsPerItem: 8,
    co2PerItem: 0.2, // kg CO2e - aluminum recycling saves 95% energy
    initial: 5,
  },
];

export default function Calculator() {
  const [weights, setWeights] = useState(
    Object.fromEntries(wasteTypes.map(({ key, initial }) => [key, initial])),
  );
  const totalPoints = wasteTypes.reduce(
    (total, waste) => total + weights[waste.key] * waste.pointsPerItem,
    0,
  );
  const totalCO2 = wasteTypes.reduce(
    (total, waste) => total + weights[waste.key] * waste.co2PerItem,
    0,
  );

  const updateWeight = (key: string, value: string) =>
    setWeights((current) => ({ ...current, [key]: Number(value) }));

  return (
    <section
      id="calculator"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-50"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Rewards Calculator
          </h2>
          <p className="text-lg text-slate-600">
            See how many points you can earn and CO₂ you can save by properly segregating waste.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="space-y-8 mb-12">
            {wasteTypes.map((waste) => (
              <div key={waste.key}>
                <div className="flex justify-between mb-3">
                  <label
                    htmlFor={`${waste.key}-weight`}
                    className="text-sm font-semibold text-slate-900"
                  >
                    {waste.label}
                  </label>
                  <span className="text-sm font-bold text-emerald-600">
                    {weights[waste.key]} {waste.unit}
                  </span>
                </div>
                <input
                  id={`${waste.key}-weight`}
                  type="range"
                  min="0"
                  max={waste.max}
                  step={waste.unit === "kg" ? "0.5" : "1"}
                  value={weights[waste.key]}
                  onChange={(event) =>
                    updateWeight(waste.key, event.target.value)
                  }
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between mt-2 text-xs text-slate-500">
                  <span className="font-medium text-emerald-600">{waste.pointsPerItem} pts per {waste.unit === "kg" ? "kg" : waste.unit === "bottles" ? "bottle" : waste.unit === "cans" ? "can" : "piece"}</span>
                  <span>{(waste.co2PerItem * 1000).toFixed(0)}g CO₂ saved each</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm font-semibold text-amber-900 mb-1">💡 Bonus Tip</p>
            <p className="text-xs text-amber-800">
              <strong>Plastic Sachet Bundle:</strong> Collect 50 sachets = 75 points (₱7.50) — incentivizes bulk collection!
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 pt-8 border-t">
            <motion.div
              key={totalPoints}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6"
            >
              <p className="text-sm text-slate-600 mb-2">
                Total Points Earned
              </p>
              <p className="text-4xl font-bold text-emerald-600">
                {totalPoints.toFixed(0)} pts
              </p>
              <p className="text-xs text-slate-500 mt-2">
                = ₱{(totalPoints / 10).toFixed(2)} redeemable at 7-11
              </p>
            </motion.div>
            <motion.div
              key={totalCO2}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6"
            >
              <p className="text-sm text-slate-600 mb-2">
                🌍 CO₂ Saved
              </p>
              <p className="text-4xl font-bold text-blue-600">
                {totalCO2.toFixed(2)} kg
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Carbon footprint offset
              </p>
            </motion.div>
          </div>
          
          {/* Carbon Footprint Breakdown */}
          <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              🌱 Carbon Footprint Breakdown
            </h3>
            <div className="space-y-3">
              {wasteTypes.map((waste) => {
                const co2Saved = weights[waste.key] * waste.co2PerItem;
                const percentage = totalCO2 > 0 ? (co2Saved / totalCO2) * 100 : 0;
                return co2Saved > 0 ? (
                  <div key={waste.key} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-700 font-medium">{waste.label}</span>
                      <span className="text-green-700 font-bold">{co2Saved.toFixed(2)} kg CO₂</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500">
                      {weights[waste.key]} {waste.unit} × {(waste.co2PerItem * 1000).toFixed(0)}g/unit = {percentage.toFixed(1)}% of total
                    </p>
                  </div>
                ) : null;
              })}
            </div>
            
            <div className="mt-6 pt-4 border-t border-green-300">
              <p className="text-xs text-slate-600 mb-2">
                <strong>Environmental Impact Context:</strong>
              </p>
              <ul className="text-xs text-slate-600 space-y-1 ml-4">
                <li>• {totalCO2.toFixed(2)} kg CO₂ = driving {(totalCO2 * 4.3).toFixed(1)} km in a gasoline car</li>
                <li>• Equivalent to {(totalCO2 / 0.5).toFixed(1)} meals saved from landfill methane</li>
                <li>• Same impact as planting {(totalCO2 / 21).toFixed(1)} trees (annual CO₂ absorption)</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-6 text-center">
            Points redemption: 10 points = ₱1.00 at 7-11, GCash, Maya. Clear PET (10pts), Colored PET (7pts), Sachets (1pt each, 50pcs bundle = 75pts), Food Waste (15pts/kg), Cardboard (8pts/kg), Glass (5pts), Metal Cans (8pts).
          </p>
        </div>
      </div>
    </section>
  );
}
