import { motion } from "framer-motion";
import juanabinLogo from "../../../assets/juanabin-logo.png";

export default function HowItWorks() {
  const steps = [
    {
      title: "Approach the Bin",
      description:
        "Walk up to the JuanaBin PH smart bin with your segregated waste. We focus on 3 categories: PET bottles, plastic sachets, and food waste - materials our community partners transform into valuable products instead of sending to landfills.",
    },
    {
      title: "Shoot Like Basketball",
      description:
        '"Shoot" your trash toward the basketball-hoop opening. AI sensors detect the waste type in real-time. Sort right? The hoop opens and you score. Sort wrong? The bin stays closed - no penalty, just try the correct bin.',
    },
    {
      title: "Earn QR Rewards",
      description:
        "Get instant QR code rewards redeemable like cash at partner convenience stores (7-11). All rewards are verified on Stellar blockchain for transparency. Repeated correct action builds automatic habits. Over time, segregation becomes natural.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            How JuanaBin PH Works
          </h2>
          <p className="text-lg text-slate-600">
            A simple three-step process: segregate at home, let our smart bin
            validate with Camera IoT, and earn instant rewards.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-50 to-emerald-50 rounded-xl p-8 hover:shadow-lg transition-shadow relative"
              >
                {/* JuanaBin Logo in Circle */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg p-2 border-2 border-emerald-200">
                    <img 
                      src={juanabinLogo} 
                      alt="JuanaBin PH" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-emerald-50 rounded-xl p-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            {[
              "Approach Bin",
              "Shoot Trash 🏀",
              "AI Detects",
              "Hoop Opens",
              "Earn QR Reward",
            ].map((label, idx) => (
              <div key={label} className="contents">
                <div
                  className={`text-sm font-semibold ${idx === 4 ? "text-emerald-600" : "text-slate-700"}`}
                >
                  {label}
                </div>
                {idx < 4 && (
                  <div className="text-slate-300 text-2xl hidden md:block">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Circular Economy - Waste to Products */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-8 border-2 border-emerald-200"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-2 text-center">
            ♻️ Circular Economy: Your Waste Becomes Valuable Products
          </h3>
          <p className="text-center text-slate-600 mb-8 max-w-3xl mx-auto">
            We partner with local communities to transform collected waste into raw materials for new products.
            Your trash never goes to landfills - it becomes something useful!
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4 text-center">🍾</div>
              <h4 className="text-lg font-bold text-blue-600 mb-2 text-center">
                PET Bottles → Clothes
              </h4>
              <p className="text-sm text-slate-600 text-center leading-relaxed">
                Clear and colored PET bottles are collected and transformed into sustainable fashion and clothing by our community partners.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 text-center">
                  <strong>10 points</strong> per clear bottle • <strong>7 points</strong> per colored
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4 text-center">🪑</div>
              <h4 className="text-lg font-bold text-purple-600 mb-2 text-center">
                Sachets → Furniture
              </h4>
              <p className="text-sm text-slate-600 text-center leading-relaxed">
                Plastic sachets are upcycled into eco-furniture like tables, chairs, and bags instead of polluting our rivers.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 text-center">
                  <strong>1 point</strong> per sachet • <strong>75 points</strong> for 50 pcs bundle
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4 text-center">🌱</div>
              <h4 className="text-lg font-bold text-green-600 mb-2 text-center">
                Food Waste → Organic Fertilizer
              </h4>
              <p className="text-sm text-slate-600 text-center leading-relaxed">
                Food scraps are composted into organic fertilizer for local farmers, closing the loop from kitchen to farm.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 text-center">
                  <strong>15 points</strong> per kg of compostable waste
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg p-4 border-l-4 border-emerald-600">
            <p className="text-sm text-slate-700">
              <strong className="text-emerald-700">🌍 Zero Landfill Goal:</strong> By focusing on these 3 categories, we partner with community artisans and manufacturers to ensure collected waste becomes raw materials for new products - not landfill trash!
            </p>
          </div>
        </motion.div>

        {/* Stellar Blockchain Integration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border-2 border-purple-200"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              ⭐ Stellar Blockchain: Transparent Reward Verification
            </h3>
            <p className="text-slate-600 max-w-3xl mx-auto">
              Every reward point you earn is recorded and verified on the Stellar blockchain, ensuring transparency and preventing fraud.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🔗</span>
                </div>
                <h4 className="font-bold text-slate-900">Blockchain Verified</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                All transactions are recorded on Stellar Testnet, creating an immutable audit trail of your waste disposal and rewards earned.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">✅</span>
                </div>
                <h4 className="font-bold text-slate-900">Transparent & Secure</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                No double-spending, no fake points. Stellar ensures every reward is legitimate and can be tracked publicly on the blockchain explorer.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-purple-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-semibold text-purple-900 mb-1">AWS Capstone 2026 Demo</p>
                <p className="text-xs text-slate-600">
                  <strong>50+ verified transactions</strong> recorded on Stellar Testnet • <strong>1,009 points</strong> earned by 5 demo users
                </p>
              </div>
              <a
                href="https://stellar.expert/explorer/testnet"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
              >
                View on Stellar Explorer →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
