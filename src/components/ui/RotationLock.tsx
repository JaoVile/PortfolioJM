import { Smartphone } from 'lucide-react';

export const RotationLock = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm items-center justify-center text-white text-center p-8 hidden landscape:lg:hidden landscape:flex flex-col gap-4">
      <Smartphone size={48} className="animate-bounce" />
      <h2 className="text-2xl font-bold">Por favor, vire a tela</h2>
      <p className="max-w-xs text-white/80">
        Este site foi otimizado para visualização na vertical.
      </p>
    </div>
  );
};