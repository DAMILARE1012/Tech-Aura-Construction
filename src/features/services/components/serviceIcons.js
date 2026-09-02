import {
  Building2,
  ClipboardCheck,
  DraftingCompass,
  Droplets,
  Factory,
  Hammer,
  TrafficCone,
  Wrench,
  Zap,
} from 'lucide-react'

/**
 * Maps the `icon` string on each service record to a component.
 * An explicit map keeps the bundle tree-shakeable, unlike a namespace import.
 */
export const serviceIcons = {
  Building2,
  TrafficCone,
  Factory,
  Zap,
  Droplets,
  Wrench,
  DraftingCompass,
  ClipboardCheck,
}

export const fallbackServiceIcon = Hammer
