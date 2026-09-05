import { motion } from "framer-motion";
import { AnimatedCounter } from "../../../components/ui/AnimatedCounter";

const metrics = [
  { label: "Waste Diverted", value: 15.4, suffix: " kg" },
  { label: "On-Chain Transactions", value: 50, suffix: "+" },
  { label: "Active Pilot Households", value: 10, suffix: "+" },
  { label: "CO2e Estimated Avoided", value: 32.5, suffix: " kg" },
];

export default function MetricsTicker() {
  return (
    <section className="bg-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-3xl sm:text-4xl font-bold text-emerald-700 mb-2">
                <AnimatedCounter
                  end={String(metric.value)}
                  suffix={metric.suffix}
                />
              </p>
              <p className="text-sm text-slate-600">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
