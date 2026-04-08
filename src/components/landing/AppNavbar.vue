<script setup>
import { RouterLink } from 'vue-router'
import ThemeToggle from '@/components/landing/ThemeToggle.vue'

const navLinks = [
  { label: 'Accueil', hash: '#top' },
  { label: 'Pour qui', hash: '#pour-qui' },
  { label: 'Aperçu', hash: '#apercu' },
  { label: 'Fonctionnalités', hash: '#fonctionnalites' },
  { label: 'FAQ', hash: '#faq' },
]

const download = { label: 'Télécharger', hash: '#telechargement' }
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-base-300/60 bg-base-100/80 backdrop-blur-md motion-safe:transition-[background,box-shadow] motion-safe:duration-300"
  >
    <div class="navbar mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div class="navbar-start gap-2">
        <div class="dropdown lg:hidden">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle" aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul
            tabindex="-1"
            class="menu dropdown-content menu-sm z-[60] mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
          >
            <li v-for="item in navLinks" :key="item.hash">
              <RouterLink :to="{ path: '/', hash: item.hash }">{{ item.label }}</RouterLink>
            </li>
          </ul>
        </div>
        <RouterLink to="/" class="flex items-center gap-2 text-lg font-bold tracking-tight">
          <img src="@/assets/logo.svg" alt="MyICPE" class="h-9 w-9 rounded-lg object-cover sm:h-10 sm:w-10" width="40" height="40" />
          <span class="hidden sm:inline"><span class="text-gray-900 dark:text-white">My</span><span class="text-primary">ICPE</span></span>
        </RouterLink>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal menu-sm gap-1 px-1">
          <li v-for="item in navLinks" :key="item.hash">
            <RouterLink
              class="rounded-btn px-3 font-medium motion-safe:transition-colors motion-safe:duration-200 hover:bg-base-200"
              :to="{ path: '/', hash: item.hash }"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="navbar-end flex items-center gap-2">
        <RouterLink
          :to="{ path: '/', hash: download.hash }"
          class="btn btn-primary btn-sm shrink-0 gap-2 px-3 font-semibold shadow-sm shadow-primary/25 motion-safe:transition motion-safe:hover:brightness-110"
          :aria-label="download.label"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          <span class="hidden sm:inline">{{ download.label }}</span>
        </RouterLink>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
