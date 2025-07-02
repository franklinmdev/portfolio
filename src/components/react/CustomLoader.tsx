interface CustomLoaderProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function CustomLoader({
  size = "md",
  className = "",
}: CustomLoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="relative h-full w-full">
        <div className="absolute inset-0 rounded-full border-2 border-zinc-700 opacity-20"></div>

        <div
          className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-violet-600 bg-clip-border"
          style={{ animation: "spin-smooth 1s linear infinite" }}
        >
          <div className="absolute inset-0.5 rounded-full bg-zinc-900"></div>
        </div>

        <div
          className="absolute inset-2 rounded-full bg-violet-400 opacity-75"
          style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
        ></div>

        <div className="absolute inset-3 rounded-full bg-white"></div>
      </div>
    </div>
  )
}
