<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import AppNavbar from '@/components/landing/AppNavbar.vue'
import AppFooter from '@/components/landing/AppFooter.vue'

const route = useRoute()

const title = computed(() => route.meta.title ?? 'Page')
const lead = computed(() => route.meta.lead ?? '')
</script>

<template>
  <div class="bg-base-100 text-base-content flex min-h-screen flex-col">
    <AppNavbar />
    <main class="flex-1 px-4 py-12 sm:px-6">
      <article class="mx-auto max-w-3xl">
        <p class="mb-8">
          <RouterLink to="/" class="link link-primary text-sm font-medium">← Retour à l’accueil</RouterLink>
        </p>
        <h1 class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{{ title }}</h1>
        <p class="text-base-content/85 mb-6 text-lg leading-relaxed">{{ lead }}</p>
        <p class="text-base-content/70 text-sm leading-relaxed">
          Le contenu définitif sera publié prochainement. Pour toute question, contactez le service communication ou le
          support du CIAPOL.
        </p>
      </article>
    </main>
    <AppFooter />
  </div>
</template>
