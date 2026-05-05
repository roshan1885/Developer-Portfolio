import { cn } from "@/lib/utils";

export function HtmlCssIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={cn("w-6 h-6", className)}
      fill="currentColor"
    >
      <path d="M12 2h40l-6 52-14 8-14-8-6-52z" fill="currentColor" />
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="white"
      >
        HTML
      </text>
    </svg>
  );
}
