<script setup>
import { useTheme } from '@/composables/useTheme.js'

const { isDark, toggle } = useTheme()
</script>

<template>
  <button
    type="button"
    class="btn btn-ghost btn-circle btn-sm sm:btn-md"
    :aria-pressed="isDark"
    aria-label="Basculer entre thème clair et sombre"
    @click="toggle($event)"
  >
    <svg
      v-if="isDark"
      class="h-6 w-6 fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M12 18a6 6 0 110-12 6 6 0 010 12zm0-2a4 4 0 100-8 4 4 0 000 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.12zm-13.435.001l2.121-2.121 1.414 1.414-2.121 2.121-1.414-1.414zM22 12h-3v-2h3v2zM5 12H2v-2h3v2zM18.364 5.636L16.95 4.222l1.414-1.414 1.414 1.414-1.414 1.414z"
      />
    </svg>
    <svg
      v-else
      class="h-6 w-6 fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  </button>
</template>
