import { LuArrowUpRight } from 'react-icons/lu';
import { NAV_LINKS, REPO_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#09090B] py-12">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <span className="font-display text-lg font-bold tracking-tight text-zinc-50">
              Motion Graphic Studio
            </span>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Katalog lengkap gaya visual dari bang-motion dan lemo-opuscar
              beserta studio prompt untuk memproduksi naskah voice over, SFX,
              running text, dan video MP4 melalui Mode Tugas di Gemini Web.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:gap-12">
            <div>
              <h4 className="text-xs font-semibold text-zinc-200">Navigasi</h4>
              <ul className="mt-3 space-y-2 text-zinc-400">
                {NAV_LINKS.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="hover:text-zinc-100">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-zinc-200">
                Sumber Referensi
              </h4>
              <ul className="mt-3 space-y-2 text-zinc-400">
                <li>
                  <a
                    href={REPO_LINKS.bangMotion}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-zinc-100"
                  >
                    <span>bangtutorial/bang-motion</span>
                    <LuArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={REPO_LINKS.lemoOpuscar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-zinc-100"
                  >
                    <span>lemomo-ai/lemo-opuscar</span>
                    <LuArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={REPO_LINKS.geminiWeb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-zinc-100"
                  >
                    <span>Gemini Web</span>
                    <LuArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-zinc-800/80 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Motion Graphic Studio.</p>
          <p>
            Seluruh pemrosesan naskah VO, storyboard, dan render video MP4
            berjalan di Mode Tugas akun Gemini Web pengguna.
          </p>
        </div>
      </div>
    </footer>
  );
}
