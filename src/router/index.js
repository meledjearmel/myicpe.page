import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LegalPageView from '@/views/LegalPageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0, behavior: 'instant' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/mentions-legales',
      name: 'mentions-legales',
      component: LegalPageView,
      meta: {
        title: 'Mentions légales',
        lead:
          'Cette page sera complétée avec les informations légales officielles (éditeur, hébergeur, propriété intellectuelle, etc.).',
      },
    },
    {
      path: '/confidentialite',
      name: 'confidentialite',
      component: LegalPageView,
      meta: {
        title: 'Politique de confidentialité',
        lead:
          'Cette page décrira le traitement des données personnelles conformément à la réglementation applicable. Contenu à venir.',
      },
    },
    {
      path: '/cgu',
      name: 'cgu',
      component: LegalPageView,
      meta: {
        title: "Conditions générales d'utilisation",
        lead:
          'Les conditions d’utilisation du site et des services associés seront publiées ici. Contenu à venir.',
      },
    },
  ],
})

router.afterEach((to) => {
  if (to.name === 'home') {
    document.title = 'MyICPE — Application mobile CIAPOL'
  } else if (to.meta?.title) {
    document.title = `${to.meta.title} · MyICPE`
  } else {
    document.title = 'MyICPE — Application mobile CIAPOL'
  }
})

export default router
