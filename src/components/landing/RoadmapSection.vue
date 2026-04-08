<script setup>
const items = [
  {
    title: 'Pré-création d’entreprise',
    text: 'Anticiper l’enregistrement des futurs dossiers ICPE depuis le terrain ou l’accueil.',
  },
  {
    title: 'Gestion des déchets',
    text: 'Structurer le suivi de la dimension déchets dans le périmètre ICPE et le contrôle.',
  },
  {
    title: 'Fiche environnementale sur place',
    text: 'Compléter la fiche synthétique de la situation environnementale directement sur site.',
  },
]
</script>

<template>
  <section id="avenir" class="landing-section scroll-mt-24 py-16 sm:py-20">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <p class="text-primary mb-2 text-center text-sm font-semibold uppercase tracking-wider">À venir</p>
      <h2 class="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">La feuille de route</h2>
      <p class="text-base-content/80 mx-auto mb-10 max-w-2xl text-center text-sm">
        Les priorités peuvent évoluer avec le CIAPOL et le porteur produit — voici des axes envisagés.
      </p>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="item in items"
          :key="item.title"
          class="rounded-box border border-dashed border-primary/30 bg-base-200/50 p-5 motion-safe:transition motion-safe:hover:border-primary/50"
        >
          <div class="badge badge-outline badge-primary badge-sm mb-2">Prévu</div>
          <h3 class="mb-2 font-bold">{{ item.title }}</h3>
          <p class="text-base-content/75 text-sm leading-relaxed">{{ item.text }}</p>
        </div>
        <div class="rounded-box border border-base-300 bg-base-100 p-5">
          <div class="badge badge-ghost badge-sm mb-2">Suite</div>
          <h3 class="mb-2 font-bold">Autres évolutions</h3>
          <p class="text-base-content/75 text-sm leading-relaxed">
            D’autres modules pour renforcer le contrôle et l’accompagnement des installations classées.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
