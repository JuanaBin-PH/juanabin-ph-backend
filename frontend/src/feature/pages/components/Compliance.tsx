import { motion } from "framer-motion";
// import jsPDF from "jspdf";

const complianceItems = [
  "Waste diversion records",
  "Household participation tracking",
  "Collection weights and verification",
  "Reward distribution records",
  "Digital audit trails",
  "Exportable reports",
];

const reportRows = [
  ["Reporting Period", "August 2026"],
  ["Total Waste Collected (kg)", "128.4"],
  ["Households Participating", "47"],
  ["Estimated CO2e Avoided (kg)", "214.6"],
  ["JBIN Distributed", "86.7"],
];

function escapeCsvValue(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

function exportReportCsv() {
  const csv = [["Metric", "Value"], ...reportRows]
    .map((row) => row.map(escapeCsvValue).join(","))
    .join("\r\n");
  const blob = new Blob([`\uFEFF${csv}\r\n`], { type: "text/csv;charset=utf-8" });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = "barangay-waste-diversion-report.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(downloadUrl);
}

function generateReportPdf() {
  alert("PDF export will be available soon. Please use CSV export for now.");
  /* 
  const pdfDocument = new jsPDF();
  ... rest of PDF code ...
  */
}

export default function Compliance() {
  return (
    <section id="compliance" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Built for Transparent Barangay Operations
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              JuanaBin PH is designed to help organize waste diversion records,
              household participation, collection weights, reward distribution
              records, digital audit trails, and exportable reports for LGU
              administrators and environmental officers.
            </p>
            <ul className="space-y-4">
              {complianceItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-emerald-600 mt-1">✓</span>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-500 mt-8">
              Designed to support documentation and reporting workflows related
              to RA 9003 and the EPR Act.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-50 to-emerald-50 rounded-2xl p-8 border border-emerald-100"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <p className="text-xs font-semibold text-slate-500 mb-4">
                BARANGAY WASTE DIVERSION REPORT
              </p>
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-slate-500 mb-1">
                    Reporting Period
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    August 2026
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">
                      Total Waste Collected
                    </p>
                    <p className="text-xl font-bold text-slate-900">128.4 kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">
                      Households Participating
                    </p>
                    <p className="text-xl font-bold text-slate-900">47</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">
                      Estimated CO2e Avoided
                    </p>
                    <p className="text-xl font-bold text-slate-900">214.6 kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">
                      JBIN Distributed
                    </p>
                    <p className="text-xl font-bold text-emerald-600">86.7</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={exportReportCsv}
                  className="flex-1 px-3 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Export CSV
                </button>
                <button
                  type="button"
                  onClick={generateReportPdf}
                  className="flex-1 px-3 py-2 bg-slate-200 text-slate-900 text-xs font-semibold rounded-lg hover:bg-slate-300 transition-colors"
                >
                  Generate PDF
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
