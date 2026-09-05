import { useState } from "react";
import { Link } from "react-router-dom";
import { X, HelpCircle, ExternalLink } from "lucide-react";

interface WalletOption {
  name: string;
  icon: string;
  installed?: boolean;
  installUrl?: string;
}

export default function ConnectWallet() {
  const [showModal, setShowModal] = useState(true);

  const wallets: WalletOption[] = [
    { name: "Albedo", icon: "🔷", installed: true },
    { name: "xBull", icon: "🌑", installed: true },
    { name: "Freighter", icon: "🔑", installUrl: "https://freighter.app" },
    { name: "Fordefi", icon: "🔵", installUrl: "https://fordefi.com" },
    { name: "Rabet", icon: "💎", installUrl: "https://rabet.io" },
    { name: "LOBSTR", icon: "🦞", installUrl: "https://lobstr.co" },
    { name: "Hana Wallet", icon: "🌸", installUrl: "https://hanawallet.io" },
    { name: "Klever Wallet", icon: "💜", installUrl: "https://klever.io" },
    { name: "OneKey Wallet", icon: "🟢", installUrl: "https://onekey.so" },
    { name: "Bitget Wallet", icon: "💠", installUrl: "https://bitget.com" },
    { name: "Cactus Link", icon: "🔵", installUrl: "https://cactus.link" },
  ];

  if (!showModal) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <HelpCircle className="w-5 h-5 text-slate-600" />
          </button>
          <h2 className="text-2xl font-bold text-slate-900">Connect Wallet</h2>
          <Link to="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-600" />
          </Link>
        </div>

        {/* Wallet List */}
        <div className="p-6 max-h-[500px] overflow-y-auto">
          <div className="space-y-2">
            {wallets.map((wallet) => (
              <button
                key={wallet.name}
                className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-2xl">
                    {wallet.icon}
                  </div>
                  <span className="text-lg font-semibold text-slate-900">
                    {wallet.name}
                  </span>
                </div>
                {wallet.installUrl && (
                  <a
                    href={wallet.installUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors text-sm font-medium"
                  >
                    Install
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50">
          <p className="text-center text-sm text-slate-600">
            Powered by{" "}
            <a
              href="https://stellar.org/developers/tools/wallets"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-900 hover:text-emerald-600 transition-colors underline"
            >
              Stellar Wallets Kit
            </a>
          </p>
        </div>
      </div>

      {/* Back to Landing Link */}
      <Link
        to="/"
        className="fixed bottom-8 left-1/2 -translate-x-1/2 text-sm text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1"
      >
        ← Back to Landing Page
      </Link>
    </div>
  );
}
