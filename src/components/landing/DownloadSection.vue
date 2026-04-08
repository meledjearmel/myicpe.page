<script setup>
import { computed, ref } from 'vue'
import { appEnv } from '@/config/env.js'
import playStoreImg from '@/assets/images/stores/play-store.png'
import appStoreImg from '@/assets/images/stores/app-store.png'
import androidIcon from '@/assets/images/stores/android.svg'
import DirectDownloadModal from '@/components/landing/DirectDownloadModal.vue'

const hasDirect = computed(() => Boolean(appEnv.directDownloadUrl))
const hasPlay = computed(() => Boolean(appEnv.playStoreUrl))
const hasAppStore = computed(() => Boolean(appEnv.appStoreUrl))

const directModalRef = ref(null)

function openDirectDownload() {
  directModalRef.value?.open()
}
</script>

<template>
  <section id="telechargement" class="landing-section bg-base-200/40 scroll-mt-24 py-16 sm:py-20">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <p class="text-primary mb-2 text-center text-sm font-semibold uppercase tracking-wider">Téléchargement</p>
      <h2 class="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">Obtenir MyICPE</h2>
      <p class="text-base-content/80 mx-auto mb-10 max-w-2xl text-center">
        Les magasins d’applications seront mis à jour dès la publication. En attendant, un lien direct pourra être
        proposé pour les distributions hors stores.
      </p>

      <div class="mx-auto flex max-w-3xl flex-col items-center gap-8">
        <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <!-- Google Play -->
          <div class="relative w-full max-w-[260px]">
            <a
              v-if="hasPlay"
              :href="appEnv.playStoreUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="block motion-safe:transition motion-safe:hover:opacity-95"
            >
              <img :src="playStoreImg" alt="Disponible sur Google Play" class="w-full rounded-lg" />
            </a>
            <div v-else class="relative">
              <img
                :src="playStoreImg"
                alt="Google Play — bientôt disponible"
                class="w-full rounded-lg opacity-55 grayscale"
              />
              <span
                class="badge badge-neutral absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap shadow-lg"
              >
                Bientôt disponible
              </span>
            </div>
          </div>

          <!-- App Store -->
          <div class="relative w-full max-w-[260px]">
            <a
              v-if="hasAppStore"
              :href="appEnv.appStoreUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="block motion-safe:transition motion-safe:hover:opacity-95"
            >
              <img :src="appStoreImg" alt="Télécharger dans l’App Store" class="w-full rounded-lg" />
            </a>
            <div v-else class="relative">
              <img
                :src="appStoreImg"
                alt="App Store — bientôt disponible"
                class="w-full rounded-lg opacity-55 grayscale"
              />
              <span
                class="badge badge-neutral absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap shadow-lg"
              >
                Bientôt disponible
              </span>
            </div>
          </div>
        </div>

        <div class="divider">ou</div>

        <div class="flex w-full max-w-md flex-col items-center gap-3">
          <p class="text-base-content/70 text-center text-sm">Téléchargement direct (APK ou fichier hors stores)</p>
          <template v-if="hasDirect">
            <DirectDownloadModal ref="directModalRef" :url="appEnv.directDownloadUrl" />
            <button
                aria-label="Télécharger l’APK"
                @click="openDirectDownload"
                class="inline-flex items-center gap-3 px-7 py-3.5 bg-[#87C527] rounded-2xl cursor-pointer
               shadow-[0_4px_16px_rgba(135,197,39,0.35)] hover:shadow-[0_8px_24px_rgba(135,197,39,0.45)]
               hover:-translate-y-0.5 active:scale-95 transition-all duration-150 border-0">
              <svg width="40px" height="40px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5915 3.88444C13.6002 3.32107 14.7626 3 16 3C17.2374 3 18.3998 3.32107 19.4085 3.88444L20.1464 3.14645C20.3417 2.95118 20.6583 2.95118 20.8536 3.14645C21.0488 3.34171 21.0488 3.65829 20.8536 3.85355L20.2612 4.44595C21.9266 5.72558 23 7.73743 23 10H9C9 7.73743 10.0734 5.72558 11.7388 4.44595L11.1464 3.85355C10.9512 3.65829 10.9512 3.34171 11.1464 3.14645C11.3417 2.95118 11.6583 2.95118 11.8536 3.14645L12.5915 3.88444ZM14 7C14 7.55228 13.5523 8 13 8C12.4477 8 12 7.55228 12 7C12 6.44772 12.4477 6 13 6C13.5523 6 14 6.44772 14 7ZM19 8C19.5523 8 20 7.55228 20 7C20 6.44772 19.5523 6 19 6C18.4477 6 18 6.44772 18 7C18 7.55228 18.4477 8 19 8Z" fill="#FFF"/>
                <path d="M5 12.5C5 11.6716 5.67157 11 6.5 11C7.32843 11 8 11.6716 8 12.5V18.5C8 19.3284 7.32843 20 6.5 20C5.67157 20 5 19.3284 5 18.5V12.5Z" fill="#FFF"/>
                <path d="M12 24V27.5C12 28.3284 12.6716 29 13.5 29C14.3284 29 15 28.3284 15 27.5V24H17V27.5C17 28.3284 17.6716 29 18.5 29C19.3284 29 20 28.3284 20 27.5V24H21C22.1046 24 23 23.1046 23 22V11H9V22C9 23.1046 9.89543 24 11 24H12Z" fill="#FFF"/>
                <path d="M24 12.5C24 11.6716 24.6716 11 25.5 11C26.3284 11 27 11.6716 27 12.5V18.5C27 19.3284 26.3284 20 25.5 20C24.6716 20 24 19.3284 24 18.5V12.5Z" fill="#FFF"/>
              </svg>
              <div class="flex flex-col items-start">
                <span class="text-[11px] text-white/80 uppercase tracking-widest">Lien direct</span>
                <span class="text-xl font-medium text-white tracking-wide">Télécharger l'APK</span>
              </div>
            </button>
          </template>
          <button v-else type="button" class="btn btn-disabled btn-wide cursor-not-allowed" disabled>
            Lien à venir
          </button>
        </div>

        <p class="text-base-content/60 max-w-xl text-center text-xs">
          Comptes, licence et conditions d’usage : à préciser selon votre offre (accès réservé agents, souscription
          licence, etc.).
        </p>
      </div>
    </div>
  </section>
</template>
