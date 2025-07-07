import {
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  memo,
  type ReactNode,
} from "react"

interface ProjectCardProps {
  title: string
  description: string
  icon: ReactNode
  iconColor: string
  href?: string
  className?: string
  isHidden?: boolean
}

function ProjectCard({
  title,
  description,
  icon,
  iconColor,
  href,
  className = "",
  isHidden = false,
}: ProjectCardProps) {
  const baseProps: HTMLAttributes<HTMLElement> = {
    className: [
      "group cursor-pointer rounded-lg border border-zinc-700 bg-transparent",
      "p-4 transition-all duration-300 ease-out",
      "hover:-translate-y-1 hover:border-violet-400 hover:bg-zinc-900/50",
      "sm:p-5 lg:p-6",
      isHidden ? "hidden" : "",
      className,
    ]
      .filter(Boolean)
      .join(" "),
  }

  if (href) {
    const linkProps: ComponentPropsWithoutRef<"a"> = {
      ...baseProps,
      href,
      role: "button",
      tabIndex: 0,
      "aria-label": `View project: ${title}`,
    }

    return (
      <a {...linkProps}>
        <ProjectCardContent
          title={title}
          description={description}
          icon={icon}
          iconColor={iconColor}
        />
      </a>
    )
  }

  const divProps: ComponentPropsWithoutRef<"div"> = {
    ...baseProps,
    role: "article",
    "aria-label": `Project: ${title}`,
  }

  return (
    <div {...divProps}>
      <ProjectCardContent
        title={title}
        description={description}
        icon={icon}
        iconColor={iconColor}
      />
    </div>
  )
}

/**
 * Internal component for the card content to avoid duplication
 */
function ProjectCardContent({
  title,
  description,
  icon,
  iconColor,
}: Pick<ProjectCardProps, "title" | "description" | "icon" | "iconColor">) {
  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="icon-container flex-shrink-0">
        <div
          className={`size-6 sm:size-7 lg:size-8 ${iconColor}`}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="mb-2 text-lg leading-tight font-bold text-white sm:text-xl">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
          {description}
        </p>
      </div>
    </div>
  )
}
export default memo(ProjectCard)

export { ProjectCard }
