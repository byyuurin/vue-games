import random from 'seedrandom'

export function createRandom(seed?: string) {
  return random(seed)
}
