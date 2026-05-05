import { cn } from "@/lib/utils";

export function PhpIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={cn("w-6 h-6", className)}
      fill="currentColor"
    >
      <rect width="64" height="64" rx="8" fill="currentColor" />
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        fontSize="22"
        fontWeight="bold"
        fill="white"
      >
        PHP
      </text>
    </svg>
  );
}
