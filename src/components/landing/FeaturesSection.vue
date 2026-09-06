<script setup>
const features = [
  {
    title: 'Licence & connexion',
    text:
      'Détection automatique de la licence associée à l’appareil, sans ressaisie de clé. En son absence, l’application reste consultable le temps de l’activation, avec 48 h de grâce avant tout blocage.',
    highlight: true,
  },
  {
    title: 'Verrouillage de l’application',
    text:
      'Code PIN avec déverrouillage rapide par empreinte digitale ou Face ID, et délai de verrouillage automatique configurable dans les Paramètres.',
  },
  {
    title: 'Notifications & rappels',
    text:
      'Rappels de synchronisation à heures fixes (2h, 10h, 14h, 18h), alertes avant chaque inspection programmée, statut de licence et de synchronisation toujours visible sur le tableau de bord.',
  },
  {
    title: 'Redevances',
    text:
      'Calcul sourcé directement depuis la table officielle des classes ICPE, vérification d’une taxe par scan de QR code, historique et détail consultables hors ligne.',
  },
  {
    title: 'Entreprises et carte',
    text:
      'Fiches entreprise repensées (secteur, zone, direction, classe en un coup d’œil), carte interactive au choix via Google Maps ou Mapbox, création simplifiée avec les valeurs officielles proposées.',
  },
  {
    title: 'Synchronisation',
    text:
      'Fonctionne d’abord en local puis se met à jour dès que le réseau revient ; zones, régions, secteurs et classes alimentés depuis le serveur, avec suivi de progression en temps réel.',
  },
  {
    title: 'Interface',
    text:
      'Navigation par onglets — Accueil, Entreprises, Inspections, Pollutions, Redevances, Paramètres — tableau de bord en plein écran, thème clair/sombre adaptatif et photo de profil personnalisable.',
  },
]
</script>

<template>
  <section id="fonctionnalites" class="landing-section scroll-mt-24 py-16 sm:py-20">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <p class="text-primary mb-2 text-center text-sm font-semibold uppercase tracking-wider">Fonctionnalités</p>
      <h2 class="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">Ce qu’apporte la version 1.0.0</h2>
      <p class="text-base-content/80 mx-auto mb-12 max-w-2xl text-center">
        Un accès par licence fiable, l’application verrouillable comme un dossier confidentiel, des rappels qui ne
        laissent plus rien passer, et une interface repensée à l’usage sur le terrain.
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
