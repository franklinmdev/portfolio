import React, { useState } from "react"
import ProjectCard from "./ProjectCard"

interface Project {
  id: string
  title: string
  description: string
  icon: string
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

// Helper function to parse icon from content collections
const parseIcon = (projectId: string): React.ReactElement => {
  // Default icon
  const defaultIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-full w-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )

  // Create the icon based on the project ID
  // This maintains compatibility with the existing ProjectCard component
  const iconMap: Record<string, React.ReactElement> = {
    devflow: defaultIcon,
    kanban: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-full w-full"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    "crypto-dashboard": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-full w-full"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
    "ecommerce-storefront": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-full w-full"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
  }

  return iconMap[projectId] || defaultIcon
}

// Helper function to get icon color based on project ID
const getIconColor = (projectId: string): string => {
  const colorMap: Record<string, string> = {
    devflow: "text-violet-400",
    kanban: "text-blue-400",
    "crypto-dashboard": "text-green-400",
    "ecommerce-storefront": "text-red-400",
  }
  return colorMap[projectId] || "text-violet-400"
}

export default function ProjectsSection({
  projects,
  translations,
}: ProjectsSectionProps) {
  const [showAll, setShowAll] = useState(false)

  // Separate featured projects from others
  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  // Show featured projects first, then others
  const displayProjects = [...featuredProjects, ...otherProjects]
  const visibleProjects = showAll
    ? displayProjects
    : displayProjects.slice(0, 3)
  const additionalProjects = displayProjects.slice(3)

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
            icon={parseIcon(project.id)}
            iconColor={getIconColor(project.id)}
            href={project.href}
          />
        ))}

        {!showAll &&
          additionalProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              icon={parseIcon(project.id)}
              iconColor={getIconColor(project.id)}
              href={project.href}
              className="hidden"
            />
          ))}
      </div>

      {additionalProjects.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-zinc-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
          >
            {showAll ? translations.showLessBtn : translations.viewAllBtn}
            <svg
              className={`size-4 transition-transform duration-200 ${showAll ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
