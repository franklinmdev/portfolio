interface ProjectCardProps {
  title: string
  description: string
  icon: React.ReactNode
  iconColor: string
  href?: string
  className?: string
  isHidden?: boolean
}

export default function ProjectCard({
  title,
  description,
  icon,
  iconColor,
  href,
  className = "",
  isHidden = false,
}: ProjectCardProps) {
  const Component = href ? "a" : "div"

  return (
    <Component
      href={href}
      className={`group cursor-pointer rounded-lg border border-zinc-700 bg-transparent p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-violet-400 hover:bg-zinc-900/50 sm:p-5 lg:p-6 ${isHidden ? "hidden" : ""} ${className}`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Icon Container */}
        <div className="icon-container">
          <div className={`size-6 sm:size-7 lg:size-8 ${iconColor}`}>
            {icon}
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="mb-2 text-lg leading-tight font-bold text-white sm:text-xl">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </Component>
  )
}
