import { ArrowLeft } from "lucide-react";

const RewardsHeader = ({ onBack }) => {
  return (
    <div className="mb-6 mt-12 md:mt-20">
      <div className="flex items-center gap-4 mb-2">
        <button 
          type="button"
          onClick={onBack}
          className="
            /* Background & Blur */
            bg-white/40 backdrop-blur-xl rounded-2xl 
            
            /* Sizing */
            p-2 md:p-2.5 
            
            /* Border & Shadow (Agar menonjol dari awal) */
            border border-white/60 shadow-sm
            
            /* Interaction & Hover */
            hover:bg-white/60 hover:shadow-md hover:border-white/80
            transition-all duration-300 active:scale-95 
            cursor-pointer group
          "
        >
          <ArrowLeft 
            className="w-5 h-5 md:w-6 md:h-6 text-[#0f172a] transition-transform group-hover:-translate-x-1" 
            strokeWidth={2.5}
          />
        </button>
        <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a]">Pusat Rewards</h1>
      </div>
      <p className="text-muted-foreground text-sm md:text-lg ml-1 md:ml-16">
        Tukarkan poin Anda dengan berbagai hadiah menarik
      </p>
    </div>
  );
};

export default RewardsHeader;