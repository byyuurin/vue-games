<route lang="yaml">
meta:
  title: Vue Games
</route>

<template>
  <div
    class="children:active:scale-110"
    p="x-8 y-24" flex="~ wrap gap-4" justify-center items-center
  >
    <router-link
      btn="solid-gray hover:solid" text-2xl flex="~ col gap-2" items-center
      to="/minesweeper"
    >
      <i i-mdi-mine text-6xl />
      Minesweeper
    </router-link>
    <router-link
      btn="solid-gray hover:solid" text-2xl flex="~ col-reverse gap-2" items-center
      to="/n-puzzle"
    >
      <i i-fluent-puzzle-cube-piece-20-filled text-6xl />
      N-Puzzle
    </router-link>
  </div>
</template>
