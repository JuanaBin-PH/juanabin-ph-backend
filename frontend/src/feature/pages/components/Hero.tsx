import { motion } from "framer-motion";
import { siteConfig } from "../../../config/site";
import { useScrollToSection } from "../../../hooks/useScrollToSection";

export default function Hero() {
  const scrollToSection = useScrollToSection();

  return (
    <section id="top" className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <span className="text-xs font-semibold text-emerald-600 tracking-wide">
                AI-POWERED • GAMIFIED SMART BIN
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Basket of Hope.
              <br />
              Sort Right. Shoot Like a Champion.
            </h1>

            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              JuanaBin PH turns waste disposal into a game. "Shoot" your trash like basketball,
              AI sensors detect if it's correct, the hoop opens, and you earn rewards
              redeemable at stores like 7-11. Building habits through fun, not fines.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection("#activity")}
                className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                Start on Testnet
                <span>→</span>
              </button>
              <a
                href={siteConfig.links.stellarExplorer}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg border border-slate-300 text-slate-900 font-medium hover:bg-slate-50 transition-colors text-center"
              >
                View Stellar Explorer
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-emerald-50 to-slate-50 rounded-2xl p-8 border border-emerald-100">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-xs font-semibold text-emerald-600 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                  🏀 SHOT SCORED!
                </div>

                <div className="mb-6">
                  <p className="text-sm text-slate-500 mb-2">WASTE DETECTED</p>
                  <p className="text-4xl font-bold text-slate-900">850g</p>
                  <p className="text-sm text-slate-600 mt-1">PET Bottle ✓</p>
                </div>

                <div className="pt-6 border-t">
                  <p className="text-sm text-slate-500 mb-2">
                    QR REWARD EARNED
                  </p>
                  <p className="text-3xl font-bold text-emerald-600">
                    + 85 pts
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Use like cash at 7-11</p>
                </div>

                <div className="mt-6">
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-2 text-xs text-emerald-600"
                  >
                    <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                    AI validated • Hoop opened • Habit formed
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
