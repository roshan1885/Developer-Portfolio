import { cn } from "@/lib/utils";

export function NodeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={cn("w-6 h-6", className)}
    >
      <path
        d="M32 2l28 16v28l-28 16-28-16V18z"
        fill="currentColor"
      />
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fill="white"
      >
        Node
      </text>
    </svg>
  );
}
