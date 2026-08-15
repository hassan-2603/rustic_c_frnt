import { Tag, Percent, Sparkles } from "lucide-react";
import type { Offer } from "../types";

interface OffersSectionProps {
  offers: Offer[];
}

export default function OffersSection({ offers }: OffersSectionProps) {
  const activeOffers = offers.filter((o) => o.isActive !== false);

  if (activeOffers.length === 0) return null;

  return (
    <div id="offers-section" className="w-full bg-white border border-light-gray/60 rounded-3xl p-5 shadow-sm mb-6 lg:mb-0 animate-fade-in self-start">
      <div className="flex items-center gap-2 mb-4 text-olive font-serif border-b border-light-gray/40 pb-3">
        <Tag size={18} className="text-gold animate-bounce" />
        <h3 className="font-bold text-sm tracking-wider uppercase text-charcoal flex items-center gap-2">
          Special Offers
          <span className="bg-gold/20 text-olive text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
            {activeOffers.length}
          </span>
        </h3>
      </div>
      
      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1 scrollbar-thin">
        {activeOffers.map((offer) => (
          <div
            key={offer.id}
            className="p-4 bg-[#F9F6F0] border border-light-gray/40 rounded-2xl hover:border-gold/60 hover:shadow-xs transition-all duration-300 relative overflow-hidden group"
          >
            {/* Decorative background watermark */}
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-300">
              <Percent size={64} className="text-olive" />
            </div>

            <div className="flex justify-between items-start gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={12} className="text-gold" />
                  <h4 className="font-bold text-sm text-charcoal font-serif tracking-wide">
                    {offer.title}
                  </h4>
                </div>
                {offer.description && (
                  <p className="text-xs text-soft-gray leading-relaxed whitespace-pre-line">
                    {offer.description}
                  </p>
                )}
              </div>
              {offer.discountTag && (
                <span className="flex-shrink-0 bg-gold text-olive text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-2xs">
                  {offer.discountTag}
                </span>
              )}
            </div>

            {offer.code && (
              <div className="mt-3 flex items-center justify-between gap-2 border-t border-light-gray/30 pt-3">
                <span className="text-[10px] text-soft-gray uppercase tracking-widest font-semibold">
                  Promo Code:
                </span>
                <span className="bg-white border border-dashed border-gold text-olive text-xs font-mono font-bold px-2.5 py-1 rounded-lg select-all shadow-3xs cursor-pointer">
                  {offer.code}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
