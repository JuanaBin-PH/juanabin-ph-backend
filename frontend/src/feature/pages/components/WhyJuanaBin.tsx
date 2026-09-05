import { Target, Gift, Lock, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Target,
    title: "Basketball Hoop Design",
    description:
      'The gamified "shoot your trash" mechanic makes waste disposal fun and memorable. Users naturally want to participate because it feels like play, not a chore.',
  },
  {
    icon: Lock,
    title: "Smart Lock/Unlock System",
    description:
      "Sort right - the hoop opens, you score. Sort wrong - the bin won't open. No penalty, just a gentle nudge to try the right bin. Real-time AI feedback shapes behavior.",
  },
  {
    icon: Gift,
    title: "QR Rewards Like Cash",
    description:
      "Earn QR code rewards redeemable at convenience stores like 7-11. Tangible value for proper disposal creates instant positive reinforcement that builds habits.",
  },
  {
    icon: Lightbulb,
    title: "Habit Formation, Not Rules",
    description:
      "Repetition + Feedback + Reward = Automatic behavior. Over time, the reward becomes optional. The habit is the real product. Segregation becomes second nature.",
  },
];

export default function WhyJuanaBin() {
  return (
    <section id="why-juanabin" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Why JuanaBin PH Works
          </h2>
          <p className="text-lg text-slate-600">
            Because habits aren't built through rules and fines. 
            They're built through repetition, feedback, and reward.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
