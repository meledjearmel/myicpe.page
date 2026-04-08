<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section
    id="top"
    class="relative overflow-hidden scroll-mt-24 pb-16 pt-10 sm:pb-24 sm:pt-14"
  >
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,color-mix(in_oklch,var(--color-primary),transparent_75%),transparent)] opacity-90"
    />
    <div class="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 text-center sm:px-6 lg:flex-row lg:items-center lg:text-left">
      <div class="motion-safe:animate-[fadeInUp_0.7s_ease-out_both] max-w-xl flex-1">
        <p class="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">CIAPOL · ICPE</p>
        <h1 class="mb-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Pilotez le suivi des ICPE : entreprises, inspections, taxes et indicateurs, au même endroit.
        </h1>
        <p class="text-base-content/85 mb-6 text-lg leading-relaxed">
          L’outil mobile du Centre Ivoirien Anti-Pollution pour cartographier, inspecter et suivre la conformité
          environnementale des installations classées.
        </p>
        <p class="text-base-content/75 mb-8 text-base leading-relaxed">
          Tableau de bord, cartographie, planning d’inspections, redevances et synchronisation des données — conçu pour
          les équipes qui contrôlent et accompagnent les installations classées.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <RouterLink
            :to="{ path: '/', hash: '#telechargement' }"
            class="btn btn-primary btn-lg shadow-lg shadow-primary/25 motion-safe:transition motion-safe:hover:scale-[1.02]"
          >
            Télécharger
          </RouterLink>
          <RouterLink
            :to="{ path: '/', hash: '#fonctionnalites' }"
            class="btn btn-outline btn-lg border-primary/40"
          >
            Découvrir les fonctionnalités
          </RouterLink>
        </div>
        <p class="text-base-content/70 mt-6 text-sm">
          <strong class="text-base-content">Hors ligne :</strong>
          les données déjà synchronisées restent consultables sans connexion pour le terrain.
        </p>
      </div>
      <div class="motion-safe:animate-[fadeInUp_0.85s_ease-out_both] flex flex-1 justify-center">
        <img
          src="@/assets/logo.svg"
          alt="Logo MyICPE"
          class="h-auto w-full max-w-[280px] drop-shadow-2xl motion-safe:duration-[2.5s] motion-safe:animate-[floatY_4s_ease-in-out_infinite] sm:max-w-[320px]"
          width="320"
          height="320"
        />
      </div>
    </div>
  </section>
</template>
