import { cn } from "@/lib/utils";

export function PythonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={cn("w-6 h-6", className)}
    >
      <path
        d="M32 2c-8 0-14 6-14 14v10h14v-6h14V16c0-8-6-14-14-14zM18 38c0 8 6 14 14 14h14c8 0 14-6 14-14V28H46v6H32v4H18z"
        fill="currentColor"
      />
    </svg>
  );
}
