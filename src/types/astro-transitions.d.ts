import type { AstroComponent, TransitionAnimation } from "astro"

declare module "astro:transitions" {
  /**
   * Client-side router component that enables View Transitions.
   * See https://docs.astro.build/en/reference/modules/astro-transitions/
   */
  export const ClientRouter: AstroComponent

  /** Fade transition helper */
  export function fade(opts?: {
    duration?: string | number
  }): TransitionAnimation
  /** Slide transition helper */
  export function slide(opts?: {
    duration?: string | number
  }): TransitionAnimation
}
