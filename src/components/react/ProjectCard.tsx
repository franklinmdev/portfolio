import { ArrowUpRightIcon } from "@phosphor-icons/react"
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
  openLabel: string
  /** Accessible label for the link, "{title}" replaced with the title. */
  viewLabel: string
  /** Accessible label for the non-link card, "{title}" replaced. */
  cardLabel: string
  /** Light-theme product screenshot. When absent, the icon is shown instead. */
  screenshot?: string | undefined
  /** Dark-theme screenshot, swapped in under the `.dark` class. */
  screenshotDark?: string | undefined
  screenshotAlt?: string
  href?: string
  className?: string
  isHidden?: boolean
}

function ProjectCard({
  title,
  description,
  icon,
  iconColor,
  openLabel,
  viewLabel,
  cardLabel,
  screenshot,
  screenshotDark,
  screenshotAlt = "",
  href,
  className = "",
  isHidden = false,
}: ProjectCardProps) {
  const baseProps: HTMLAttributes<HTMLElement> = {
    className: [
      "panel group flex flex-col overflow-hidden sm:min-h-[13rem] sm:flex-row",
      "transition-all duration-300 ease-out",
      "hover:-translate-y-1 hover:border-primary/40",
      isHidden ? "hidden" : "",
      className,
    ]
      .filter(Boolean)
      .join(" "),
  }

  const content = (
    <ProjectCardContent
      title={title}
      description={description}
      icon={icon}
      iconColor={iconColor}
      openLabel={openLabel}
      screenshot={screenshot}
      screenshotDark={screenshotDark}
      screenshotAlt={screenshotAlt}
    />
  )

  if (href) {
    const linkProps: ComponentPropsWithoutRef<"a"> = {
      ...baseProps,
      href,
      "aria-label": viewLabel.replace("{title}", title),
    }

    return <a {...linkProps}>{content}</a>
  }

  const divProps: ComponentPropsWithoutRef<"div"> = {
    ...baseProps,
    role: "article",
    "aria-label": cardLabel.replace("{title}", title),
  }

  return <div {...divProps}>{content}</div>
}

/**
 * Internal component for the card content to avoid duplication
 */
function ProjectCardContent({
  title,
  description,
  icon,
  iconColor,
  openLabel,
  screenshot,
  screenshotDark,
  screenshotAlt,
}: Pick<
  ProjectCardProps,
  | "title"
  | "description"
  | "icon"
  | "iconColor"
  | "openLabel"
  | "screenshot"
  | "screenshotDark"
  | "screenshotAlt"
>) {
  const hasScreenshot = Boolean(screenshot)

  return (
    <>
      {/* Media rail: product screenshot, or the project icon framed as a
          tile (matching the project page's icon treatment). */}
      {hasScreenshot ? (
        <div className="border-border bg-secondary relative aspect-[16/10] w-full shrink-0 overflow-hidden border-b sm:aspect-auto sm:w-2/5 sm:border-r sm:border-b-0">
          <img
            src={screenshot}
            alt={screenshotAlt ?? ""}
            className={`absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02] ${
              screenshotDark ? "dark:hidden" : ""
            }`}
            loading="lazy"
            decoding="async"
          />
          {screenshotDark && (
            <img
              src={screenshotDark}
              alt={screenshotAlt ?? ""}
              className="absolute inset-0 hidden h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02] dark:block"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
      ) : (
        <div className="border-border flex w-full shrink-0 items-center justify-center border-b p-8 sm:w-2/5 sm:border-r sm:border-b-0">
          <div className="icon-container">
            <div
              className={`size-12 sm:size-14 ${iconColor}`}
              aria-hidden="true"
            >
              {icon}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {hasScreenshot && (
              <div className="icon-container shrink-0">
                <div
                  className={`size-5 sm:size-6 ${iconColor}`}
                  aria-hidden="true"
                >
                  {icon}
                </div>
              </div>
            )}
            <h3 className="text-foreground group-hover:text-primary text-lg leading-tight font-semibold transition-colors sm:text-xl">
              {title}
            </h3>
          </div>
          <span className="text-muted-foreground group-hover:text-primary group-focus-within:text-primary inline-flex items-center gap-1 font-mono text-[0.625rem] tracking-wide uppercase opacity-0 transition-all group-focus-within:opacity-100 group-hover:opacity-100">
            {openLabel}
            <ArrowUpRightIcon
              weight="bold"
              className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
          {description}
        </p>
      </div>
    </>
  )
}
export default memo(ProjectCard)

export { ProjectCard }
