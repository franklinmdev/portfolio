import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronDown, HelpCircle } from "lucide-react"
import React, { memo, useCallback, useMemo, useState } from "react"
import ProjectCard from "./ProjectCard"

interface Project {
  id: string
  title: string
  description: string
  icon?: { src: string; width?: number; height?: number }
  iconAsset?: { src: string; width?: number; height?: number }
  featured: boolean
  href: string
}

interface Translations {
  title: string
  viewAllBtn: string
  showLessBtn: string
}

interface ProjectsSectionProps {
  projects: Project[]
  translations: Translations
}

const parseIcon = (project: Project): React.ReactNode => {
  const iconMeta = project.iconAsset ?? project.icon

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

  return <HelpCircle className="h-full w-full" aria-hidden="true" />
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

  return (
    <section id="projects" className="scroll-mt-24 py-8 lg:py-12">
      <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-100">
        {translations.title}
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:gap-8">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            icon={parseIcon(project)}
            iconColor="text-violet-400"
            href={project.href}
          />
        ))}

        {!showAll &&
          additionalProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              icon={parseIcon(project)}
              iconColor="text-violet-400"
              href={project.href}
              className="hidden"
            />
          ))}
      </div>

      {additionalProjects.length > 0 && (
        <div className="mt-8 text-center">
          <Button variant="ghostDark" onClick={handleToggle} className="gap-2">
            {showAll ? translations.showLessBtn : translations.viewAllBtn}
            <ChevronDown
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
