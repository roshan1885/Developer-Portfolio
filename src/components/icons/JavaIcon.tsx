import { cn } from "@/lib/utils";

export function JavaIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={cn("w-6 h-6", className)}
      fill="currentColor"
    >
      <path
        d="M32 6c-6 6-2 12 0 16-6-2-12-6-12-12s6-10 12-4zM20 44c0 6 12 10 12 10s12-4 12-10-12-10-12-10-12 4-12 10z"
        fill="currentColor"
      />
      <text
        x="50%"
        y="90%"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fill="currentColor"
      >
        JAVA
      </text>
    </svg>
  );
}
