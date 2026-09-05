import { Leaf } from "lucide-react";
import { siteConfig } from "../../config/site";
import juanabinLogo from "../../assets/juanabin-logo.png";

export default function Footer() {
  const { links } = siteConfig;

  return (
    <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={juanabinLogo}
                alt="JuanaBin PH"
                className="w-8 h-8"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">{siteConfig.name}</span>
                <span className="text-xs text-emerald-400 font-medium leading-tight">
                  {siteConfig.team}
                </span>
              </div>
            </div>
            <p className="text-slate-400">{siteConfig.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a
                    href={links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Official Website
                  </a>
                </li>
                <li>
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    GitHub Repository
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a
                    href={links.stellarExplorer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Stellar Explorer
                  </a>
                </li>
                <li>
                  <a
                    href={links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href={links.contact}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Email Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>© 2026 {siteConfig.name} / Buslo Builders. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
