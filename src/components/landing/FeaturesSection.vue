<script setup>
const features = [
  {
    title: 'Consultation hors ligne',
    text:
      'Les données déjà synchronisées restent consultables sans connexion — utile en zone blanche ou lorsque le réseau est instable.',
    highlight: true,
  },
  {
    title: 'Tableau de bord',
    text: 'Indicateurs clés, graphiques et filtres (direction, année) pour suivre l’activité et les tendances.',
  },
  {
    title: 'Entreprises et carte',
    text: 'Liste et carte des installations : repérage géographique, filtres par type et zone, détail au clic.',
  },
  {
    title: 'Inspections',
    text: 'Organisation et suivi des contrôles (liste, planification selon les écrans de l’application).',
  },
  {
    title: 'Taxes / redevances',
    text:
      'Aide à la détermination des montants, historique et vérification par scan QR code ou saisie d’URL (vue web intégrée lorsque la connexion est disponible).',
  },
  {
    title: 'Synchronisation',
    text: 'Mise à jour des jeux de données pour travailler sur une base alignée avec le référentiel central.',
  },
  {
    title: 'Sécurité d’accès',
    text: 'Connexion avec identifiants CIAPOL et code PIN pour verrouiller l’accès au quotidien.',
  },
  {
    title: 'Pollution',
    text: 'Module dédié, généralement réservé aux profils habilités (ex. administrateurs).',
    muted: true,
  },
]
</script>

<template>
  <section id="fonctionnalites" class="landing-section scroll-mt-24 py-16 sm:py-20">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <p class="text-primary mb-2 text-center text-sm font-semibold uppercase tracking-wider">Fonctionnalités</p>
      <h2 class="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">Une vue unifiée du périmètre ICPE</h2>
      <p class="text-base-content/80 mx-auto mb-12 max-w-2xl text-center">
        Des réponses concrètes aux irritants du terrain : données centralisées, carte lisible, redevances et mode hors
        ligne pour rester efficace partout.
      </p>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(f, i) in features"
          :key="f.title"
          class="rounded-box border p-5 motion-safe:animate-[fadeInUp_0.55s_ease-out_both]"
          :class="[
            f.highlight
              ? 'border-primary/50 bg-primary/5 shadow-md shadow-primary/10'
              : 'border-base-300 bg-base-100',
            f.muted ? 'opacity-90' : '',
          ]"
          :style="{ animationDelay: `${i * 0.04}s` }"
        >
          <div v-if="f.highlight" class="badge badge-primary badge-sm mb-2">Essentiel</div>
          <h3 class="mb-2 text-lg font-bold">{{ f.title }}</h3>
          <p class="text-base-content/80 text-sm leading-relaxed">{{ f.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
