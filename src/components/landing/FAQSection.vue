<script setup>
const faqs = [
  {
    q: 'L’application est-elle réservée aux agents du CIAPOL ?',
    a: 'MyICPE s’adresse aux équipes du CIAPOL et partenaires en charge du contrôle et de l’accompagnement des installations classées, sur la base d’une licence associée à votre structure.',
  },
  {
    q: 'Que se passe-t-il si aucune licence n’est trouvée ?',
    a:
      'L’application reste consultable pendant l’activation. Si aucune licence n’est détectée, une alerte s’affiche avec une fenêtre de grâce de 48 h avant tout blocage — largement de quoi régulariser sans interrompre le travail sur le terrain.',
  },
  {
    q: 'Que peut-on consulter hors ligne ?',
    a:
      'Les fiches déjà synchronisées (entreprises, inspections, redevances) restent disponibles sans réseau. Zones, régions, secteurs et classes sont mis à jour dès que la connexion revient, avec un écran de synchronisation qui affiche la progression en temps réel.',
  },
  {
    q: 'Comment fonctionne la vérification des redevances ?',
    a:
      'Un scan de QR code, en flux plein écran, permet de vérifier une taxe et de retrouver son historique. Le calcul du montant suit directement le barème officiel par classe ICPE, sans valeur codée en dur.',
  },
  {
    q: 'Comment sont protégées les données si le téléphone est perdu ou change de mains ?',
    a:
      'L’application se verrouille par code PIN, avec déverrouillage rapide par empreinte digitale ou Face ID, et un délai de verrouillage automatique configurable dans les Paramètres.',
  },
  {
    q: 'Comment recevoir les prochaines mises à jour ?',
    a:
      'MyICPE se met à jour automatiquement via AppStation : aucune action n’est nécessaire pour recevoir les prochaines versions.',
  },
  {
    q: 'Où trouver les mentions légales et la confidentialité ?',
    a: 'Des pages dédiées sont disponibles sur ce site : mentions légales, confidentialité et conditions générales d’utilisation.',
  },
]
</script>

<template>
  <section id="faq" class="landing-section scroll-mt-24 pb-20 pt-16 sm:pb-28 sm:pt-20">
    <div class="mx-auto max-w-3xl px-4 sm:px-6">
      <p class="text-primary mb-2 text-center text-sm font-semibold uppercase tracking-wider">FAQ</p>
      <h2 class="mb-8 text-center text-3xl font-bold tracking-tight sm:text-4xl">Questions fréquentes</h2>
      <div class="space-y-2">
        <div
          v-for="(item, i) in faqs"
          :key="i"
          class="collapse collapse-arrow border border-base-300 bg-base-100"
        >
          <input type="radio" name="faq-accordion" :checked="i === 0" />
          <div class="collapse-title font-semibold">{{ item.q }}</div>
          <div class="collapse-content text-base-content/80 text-sm leading-relaxed">
            <p>{{ item.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
