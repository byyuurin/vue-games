import type { UserShortcuts } from 'unocss'
import button from './button'

export function createShortcuts<T extends UserShortcuts>(appends: T) {
  return [
    ...button,
    appends
  ]
}
