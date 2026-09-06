<script setup>
import { computed } from 'vue'
import { useAppStationRelease } from '@/composables/useAppStationRelease.js'
import { formatBytes } from '@/utils/downloadFormat.js'
import { renderReleaseNotes } from '@/utils/markdownLite.js'

const { status, release, softwareUrl } = useAppStationRelease()

const hasNotes = computed(() => status.value === 'ready' && Boolean(release.value?.release_notes))
const notesHtml = computed(() => renderReleaseNotes(release.value?.release_notes ?? ''))
const platformLabel = computed(() => {
  const p = release.value?.platform
  return p ? p.charAt(0).toUpperCase() + p.slice(1) : null
})
</script>

<template>
  <section v-if="hasNotes" id="nouveautes" class="landing-section scroll-mt-24 py-16 sm:py-20">
    <div class="mx-auto max-w-3xl px-4 sm:px-6">
      <p class="text-primary mb-2 text-center text-sm font-semibold uppercase tracking-wider">Nouveautés</p>
      <h2 class="mb-2 text-center text-3xl font-bold tracking-tight sm:text-4xl">
        Notes de version — v{{ release.version }}
      </h2>
      <p class="text-base-content/60 mb-10 text-center text-sm">
        <template v-if="platformLabel">{{ platformLabel }} · </template>
        <template v-if="release.file_size">{{ formatBytes(release.file_size) }} · </template>
        Diffusé via
        <a :href="softwareUrl" target="_blank" rel="noopener noreferrer" class="link link-primary">AppStation</a>
      </p>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="rounded-box border border-base-300 bg-base-100 p-6 sm:p-8" v-html="notesHtml" />
    </div>
  </section>
</template>
