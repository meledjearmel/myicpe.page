<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="border-t border-base-300 bg-base-200/50">
    <div class="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div class="flex items-center gap-3">
        <img src="@/assets/logo.svg" alt="" class="h-10 w-10 rounded-lg object-cover" width="40" height="40" />
        <div>
          <p class="font-bold">MyICPE</p>
          <p class="text-base-content/70 text-sm">Application mobile du CIAPOL pour le suivi ICPE.</p>
        </div>
      </div>
      <nav class="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Liens de pied de page">
        <!-- Pas de smooth scroll : navigation vers des routes dédiées -->
        <RouterLink to="/mentions-legales" class="link link-hover">Mentions légales</RouterLink>
        <RouterLink to="/confidentialite" class="link link-hover">Confidentialité</RouterLink>
        <RouterLink to="/cgu" class="link link-hover">CGU</RouterLink>
      </nav>
    </div>
    <div class="border-t border-base-300/80 py-4 text-center text-xs text-base-content/60">
      © {{ new Date().getFullYear() }} MyICPE — CIAPOL. Tous droits réservés.
    </div>
  </footer>
</template>
