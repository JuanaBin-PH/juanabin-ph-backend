import { motion } from "framer-motion";
import { siteConfig } from "../../../config/site";
import { useScrollToSection } from "../../../hooks/useScrollToSection";

export default function FinalCTA() {
  const scrollToSection = useScrollToSection();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Ready to make every kilogram count?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Bring transparent waste rewards to your barangay.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("#activity")}
              className="px-8 py-4 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
            >
              Launch Pilot Dashboard
            </button>
            <a
              href={siteConfig.links.contact}
              className="px-8 py-4 rounded-lg border border-slate-300 text-slate-900 font-semibold hover:bg-slate-50 transition-colors"
            >
              Contact Buslo Builders
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
