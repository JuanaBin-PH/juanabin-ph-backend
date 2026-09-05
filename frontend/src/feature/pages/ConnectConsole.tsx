import { useState } from "react";
import { Link } from "react-router-dom";
import { Wallet, X, HelpCircle, ExternalLink } from "lucide-react";

interface WalletOption {
  name: string;
  icon: string;
  installed?: boolean;
  installUrl?: string;
}

export default function ConnectConsole() {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [walletError, setWalletError] = useState(false);

  const handleConnectWallet = () => {
    setShowWalletModal(true);
    setWalletError(false);
  };

  const handleWalletClick = (walletName: string) => {
    // Simulate wallet connection attempt
    // In a real app, this would try to connect to the actual wallet
    setWalletError(true);
    setShowWalletModal(false);
  };

  const wallets: WalletOption[] = [
    { name: "Albedo", icon: "🔷", installed: true, installUrl: "https://albedo.link" },
    { name: "xBull", icon: "🌑", installed: true, installUrl: "https://xbull.app" },
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

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Initial Connect Card */}
      {!showWalletModal && (
        <div className="max-w-md w-full">
          {/* Error Toast */}
          {walletError && (
            <div className="mb-4 bg-white rounded-lg shadow-lg p-4 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Wallet error</p>
                  <p className="text-sm text-slate-600">Wallet request failed</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Connect to Dashboard
            </h2>
            <p className="text-slate-600 mb-6">
              Log in to manage your smart bins, view waste analytics,
              <br />
              track reward points, and monitor environmental impact.
            </p>

            {/* Error Message inside card */}
            {walletError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-red-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm">
                    <p className="font-semibold">Wallet Error</p>
                    <p className="text-xs">Wallet request failed</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleConnectWallet}
              className="w-full px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </button>
          </div>

          <Link
            to="/"
            className="block text-center mt-6 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            ← Back to Landing Page
          </Link>
        </div>
      )}

      {/* Wallet Selection Modal */}
      {showWalletModal && (
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <HelpCircle className="w-5 h-5 text-slate-600" />
            </button>
            <h2 className="text-2xl font-bold text-slate-900">Connect Wallet</h2>
            <button
              onClick={() => setShowWalletModal(false)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Wallet List */}
          <div className="p-6 max-h-[500px] overflow-y-auto">
            <div className="space-y-2">
              {wallets.map((wallet) => (
                <div
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
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors text-sm font-medium"
                    >
                      {wallet.installed ? "Connect" : "Install"}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
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
      )}
    </div>
  );
}
