<script setup>
const faqs = [
  {
    q: 'L’application est-elle réservée aux agents du CIAPOL ?',
    a: 'Le positionnement institutionnel vise les équipes du CIAPOL et partenaires du contrôle ICPE. Le périmètre exact des comptes (agents uniquement, partenaires, etc.) doit être aligné avec votre politique d’accès.',
  },
  {
    q: 'Que peut-on consulter hors ligne ?',
    a:
      'Les données déjà synchronisées sur l’appareil restent consultables sans réseau. Le détail par écran (entreprises, inspections, tableau de bord, etc.) dépend des jeux de données effectivement mis en cache — à valider côté produit pour la communication publique.',
  },
  {
    q: 'Comment fonctionne la vérification des redevances ?',
    a:
      'Un parcours permet de vérifier l’information via scan QR code ou saisie d’URL, avec affichage dans une vue intégrée lorsque la connexion est disponible.',
  },
  {
    q: 'Où trouver les mentions légales et la confidentialité ?',
    a: 'Des pages dédiées sont prévues sur ce site ; les textes définitifs seront validés par votre service juridique et communication.',
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
