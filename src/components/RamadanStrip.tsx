import { useScrollVisibility } from "@/hooks/useScrollVisibility";

const RamadanStrip = () => {
  const visible = useScrollVisibility();

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-primary/20 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="overflow-hidden py-2">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-primary font-semibold text-sm">
          <span>🌙 رمضان كريم 🌙</span>
          <span>🕌 كل عام وأنتم بخير 🕌</span>
          <span>🏮 عروض رمضان حتى 50% 🏮</span>
          <span>🌙 رمضان كريم 🌙</span>
          <span>🕌 كل عام وأنتم بخير 🕌</span>
          <span>🏮 عروض رمضان حتى 50% 🏮</span>
          <span>🌙 رمضان كريم 🌙</span>
          <span>🕌 كل عام وأنتم بخير 🕌</span>
        </div>
      </div>
    </div>
  );
};

export default RamadanStrip;
