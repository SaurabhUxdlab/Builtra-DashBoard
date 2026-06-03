import logo from "../../public/builtraa-logo.png";

export function Logo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src={logo} alt="Builtraa" width={36} height={36} className="h-9 w-9 rounded-lg" />
      {showText && <span className="text-xl font-bold tracking-tight">Builtraa</span>}
    </div>
  );
}