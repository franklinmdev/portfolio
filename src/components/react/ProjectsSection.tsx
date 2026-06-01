import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CaretDownIcon, QuestionIcon } from "@phosphor-icons/react"
import React, { memo, useCallback, useMemo, useState } from "react"
import ProjectCard from "./ProjectCard"

interface Project {
  id: string
  title: string
  description: string
  iconAsset?: { src: string; width?: number; height?: number }
  imageAsset?: { src: string; width?: number; height?: number }
  imageAssetDark?: { src: string; width?: number; height?: number }
  featured: boolean
  href: string
}

interface Translations {
  title: string
  moduleLabel: string
  viewAllBtn: string
  showLessBtn: string
  openLabel: string
  viewLabel: string
  cardLabel: string
  screenshotAlt: string
}

interface ProjectsSectionProps {
  projects: Project[]
  translations: Translations
}

const parseIcon = (project: Project): React.ReactNode => {
  const iconMeta = project.iconAsset

  if (iconMeta?.src) {
    const { src, width, height } = iconMeta as {
      src: string
      width?: number
      height?: number
    }

    return (
      <img
        src={src}
        alt={`${project.title} logo`}
        width={width ?? 64}
        height={height ?? 64}
        className="h-full w-full object-contain"
        loading="lazy"
        decoding="async"
      />
    )
  }

  return (
    <QuestionIcon className="h-full w-full" weight="bold" aria-hidden="true" />
  )
}

function ProjectsSection({ projects, translations }: ProjectsSectionProps) {
  const [showAll, setShowAll] = useState(false)

  const { visibleProjects, additionalProjects } = useMemo(() => {
    const featured = projects.filter((p) => p.featured)
    const others = projects.filter((p) => !p.featured)
    const all = [...featured, ...others]

    return {
      visibleProjects: showAll ? all : all.slice(0, 3),
      additionalProjects: all.slice(3),
    }
  }, [projects, showAll])

  const handleToggle = useCallback(() => {
    setShowAll((prev) => !prev)
  }, [])

  // One project per row: full-width horizontal cards, no two-up grid.
  return (
    <section id="projects" className="scroll-mt-24 py-8 lg:py-12">
      <span className="module-label">{translations.moduleLabel}</span>
      <h2 className="module-title text-foreground mt-3 mb-8">
        {translations.title}
      </h2>

      <div className="flex flex-col gap-6">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            icon={parseIcon(project)}
            iconColor="text-muted-foreground"
            href={project.href}
            screenshot={project.imageAsset?.src}
            screenshotDark={project.imageAssetDark?.src}
            screenshotAlt={translations.screenshotAlt.replace(
              "{title}",
              project.title
            )}
            openLabel={translations.openLabel}
            viewLabel={translations.viewLabel}
            cardLabel={translations.cardLabel}
          />
        ))}

        {!showAll &&
          additionalProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              icon={parseIcon(project)}
              iconColor="text-muted-foreground"
              href={project.href}
              screenshot={project.imageAsset?.src}
              screenshotDark={project.imageAssetDark?.src}
              screenshotAlt={translations.screenshotAlt.replace(
                "{title}",
                project.title
              )}
              openLabel={translations.openLabel}
              viewLabel={translations.viewLabel}
              cardLabel={translations.cardLabel}
              className="hidden"
            />
          ))}
      </div>

      {additionalProjects.length > 0 && (
        <div className="mt-8 text-center">
          <Button variant="ghostDark" onClick={handleToggle} className="gap-2">
            {showAll ? translations.showLessBtn : translations.viewAllBtn}
            <CaretDownIcon
              weight="bold"
              className={cn(
                "size-4 transition-transform duration-200",
                showAll && "rotate-180"
              )}
              aria-hidden="true"
            />
          </Button>
        </div>
      )}
    </section>
  )
}

export default memo(ProjectsSection)
