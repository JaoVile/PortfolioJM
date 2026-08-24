import { Smartphone } from 'lucide-react';
import { Language } from '@/lib/translations';

const COPY = {
  en: {
    title: 'Please rotate your screen',
    text: 'This site is built for portrait viewing.',
  },
  pt: {
    title: 'Por favor, vire a tela',
    text: 'Este site foi otimizado para visualização na vertical.',
  },
} as const;

export const RotationLock = ({ lang }: { lang: Language }) => {
  const c = COPY[lang];
  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm items-center justify-center text-white text-center p-8 hidden landscape:lg:hidden landscape:flex flex-col gap-4">
      <Smartphone size={48} className="animate-bounce" />
      <h2 className="text-2xl font-bold">{c.title}</h2>
      <p className="max-w-xs text-white/80">{c.text}</p>
    </div>
  );
};
