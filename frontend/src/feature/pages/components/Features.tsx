import { motion } from "framer-motion";
import {
  Smartphone,
  Battery,
  Wind,
  Database,
  Volume2,
  Lightbulb,
  Package,
  Recycle,
  Gauge,
  Sparkles,
  Wifi,
  Settings,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Settings,
      title: "Automatic Lid",
      description:
        "Digital trash bins equipped with sensors for touchless, hygienic waste disposal.",
    },
    {
      icon: Recycle,
      title: "Waste Segregation",
      description:
        "Built-in separate compartments or containers for different types of waste materials.",
    },
    {
      icon: Gauge,
      title: "Compaction",
      description:
        "Built-in compactors reduce waste volume, maximizing bin capacity and collection efficiency.",
    },
    {
      icon: Wind,
      title: "Odor Control",
      description:
        "Advanced odor management system keeps the surrounding area fresh and clean.",
    },
    {
      icon: Smartphone,
      title: "Mobile App Integration",
      description:
        "Real-time monitoring and management through intuitive mobile application.",
    },
    {
      icon: Volume2,
      title: "Voice Activation",
      description:
        "Hands-free operation with voice commands for enhanced accessibility and convenience.",
    },
    {
      icon: Lightbulb,
      title: "Lead Indicators",
      description:
        "Visual status indicators showing bin capacity, operational status, and alerts.",
    },
    {
      icon: Database,
      title: "Data Collection",
      description:
        "Camera IoT technology gathers waste data, weight, and usage patterns for analytics.",
    },
    {
      icon: Battery,
      title: "Power Options",
      description:
        "Flexible power solutions: Battery, Solar, or Grid connection for any location.",
    },
    {
      icon: Sparkles,
      title: "Design and Aesthetics",
      description:
        "Modern, attractive design that enhances community spaces and encourages proper waste disposal.",
    },
    {
      icon: Package,
      title: "Self Sealing Bags",
      description:
        "Automatic bag sealing system for clean, efficient waste removal and transport.",
    },
    {
      icon: Wifi,
      title: "Energy Efficiency",
      description:
        "Smart power management and solar integration minimize energy consumption and costs.",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Smart Bin Features
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              JuanaBin PH combines cutting-edge IoT technology with practical waste
              management features to create the most advanced smart waste
              solution for Philippine communities.
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-200"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl p-8 border-2 border-emerald-200"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Functions & Benefits
          </h3>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <p className="text-slate-700">
                  <strong>Integrates technology to enhance waste disposal in a fun way</strong> - Making proper waste segregation enjoyable and rewarding for everyone.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>Smart functions include:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                  <li>Automatic lid opening/closing with waste type detection</li>
                  <li>Intelligent waste segregation validation</li>
                  <li>Real-time apps monitoring and management</li>
                  <li><strong>Smart validation:</strong> If you put waste in the wrong bin, the lid will not open. Put it in the right bin and the lid opens automatically.</li>
                  <li><strong>Reward system:</strong> Earn reward points that can be exchanged as cash to purchase items in convenience stores like 7-11.</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <p className="text-slate-700">
                  <strong>Hygiene:</strong> Touchless operation reduces contact with trash, promoting better sanitation and health.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <p className="text-slate-700">
                  <strong>Reduced contact with trash:</strong> Automated lid operation minimizes direct handling of waste materials.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <p className="text-slate-700">
                  <strong>Efficient waste sorting:</strong> Since waste is already properly sorted, it can be directly transformed into new products like recyclable paper into paper towels, PET bottles into new furniture like tables, chairs, and cabinets.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                6
              </div>
              <div>
                <p className="text-slate-700">
                  <strong>Potential waste reduction through data-driven insights:</strong> Analytics help communities understand waste patterns and optimize collection strategies.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-3">
            Experience the Future of Waste Management
          </h3>
          <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
            Our smart bins leverage Camera IoT technology, AI-powered waste
            detection, and real-time data collection to revolutionize how
            communities manage waste.
          </p>
          <button className="px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
            Learn More About Our Technology
          </button>
        </motion.div>
      </div>
    </section>
  );
}
