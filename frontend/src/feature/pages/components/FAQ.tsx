import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How does the basketball hoop mechanic work?",
    answer:
      'You "shoot" your trash toward the bin like a basketball shot. AI sensors detect the waste type in real-time. If you sort correctly, the hoop opens and you score points. If you sort wrong, the bin stays closed with no penalty - just a gentle nudge to try the right bin.',
  },
  {
    question: "What rewards do I get and where can I use them?",
    answer:
      "You earn QR code rewards redeemable like cash at partner convenience stores such as 7-11. The rewards provide instant positive reinforcement that builds automatic segregation habits over time.",
  },
  {
    question: "Why use gamification instead of fines and rules?",
    answer:
      "Because habits aren't built through rules - they're built through repetition, feedback, and reward. Fines and instructions haven't worked. Making segregation fun and rewarding creates automatic behavior that lasts. Over time, the reward becomes optional. The habit is the real product.",
  },
  {
    question: "What waste types does JuanaBin PH sort?",
    answer:
      "JuanaBin PH sorts waste into three categories mirroring RA 9003 compliance: biodegradable, non-biodegradable, and food waste, with focused detection on high-value recyclables like PET bottles, plastics, and sachets.",
  },
  {
    question: "How does this help solve the Philippines' waste problem?",
    answer:
      "Contaminated recyclables raise sorting costs for LGUs. Plastics end up in rivers instead of being recovered. Every LGU must implement segregation under RA 9003 but most struggle. JuanaBin PH makes compliance automatic through habit formation, not enforcement.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span className="text-left font-semibold text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-600 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t px-6 py-4 bg-slate-50">
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
