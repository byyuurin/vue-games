<route lang="yaml">
meta:
  title: Vue Games
</route>

<template>
  <div
    class="children:active:scale-110"
    p="x-8 y-24" flex="~ wrap gap-4" justify-center items-stretch
  >
    <router-link
      btn="solid-gray hover:solid" text-2xl flex="~ col gap-2" justify-center items-center
      to="/minesweeper"
    >
      <i i-mdi-mine text-6xl />
      <div>
        <span inline-block>Mine</span>
        <span inline-block>sweeper</span>
      </div>
    </router-link>
    <router-link
      btn="solid-gray hover:solid" text-2xl flex="~ col-reverse gap-2" justify-center items-center
      to="/n-puzzle"
    >
      <i i-fluent-puzzle-cube-piece-20-filled text-6xl />
      N-Puzzle
    </router-link>
    <router-link
      btn="solid-gray hover:solid" text-2xl flex="~ col gap-2" justify-center items-center
      class="group"
      to="/2048"
    >
      <div max-w="5rem" flex="~ wrap" justify-center>
        <i m="-3px" text="3xl gray-500/70 group-hover:teal-700/70 group-hover:dark:teal-400/70" i-mdi-numeric-2-box />
        <i m="-3px" text="3xl gray-500/55 group-hover:teal-700/55 group-hover:dark:teal-400/55" i-mdi-numeric-0-box />
        <i m="-3px" text="3xl gray-500/85 group-hover:teal-700/85 group-hover:dark:teal-400/85" i-mdi-numeric-4-box />
        <i m="-3px" text="3xl gray-500/100 group-hover:teal-700/100 group-hover:dark:teal-400/100" i-mdi-numeric-8-box />
      </div>
      2048
    </router-link>
  </div>
</template>
