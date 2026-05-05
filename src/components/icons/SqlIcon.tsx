import { cn } from "@/lib/utils";

export function SqlIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={cn("w-6 h-6", className)}
      fill="currentColor"
    >
      <ellipse cx="32" cy="16" rx="20" ry="8" stroke="currentColor" fill="none" strokeWidth="2"/>
      <path d="M12 16v24c0 4 8 8 20 8s20-4 20-8V16" stroke="currentColor" fill="none" strokeWidth="2"/>
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        fontSize="16"
        fontWeight="bold"
        fill="currentColor"
      >
        SQL
      </text>
    </svg>
  );
}
