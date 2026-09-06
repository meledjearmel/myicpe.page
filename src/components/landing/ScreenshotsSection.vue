<script setup>
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import PhoneScreenshot from '@/components/landing/PhoneScreenshot.vue'
import { captureScreenshots } from '@/data/captures.js'

const carouselEl = useTemplateRef('carouselEl')

const currentIndex = ref(0)
const autoplayPaused = ref(false)

const count = computed(() => captureScreenshots.length)

let autoplayTimer = null

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function scrollBehavior() {
  return prefersReducedMotion() ? 'auto' : 'smooth'
}

function getItems() {
  const root = carouselEl.value
  if (!root) return []
  return [...root.querySelectorAll('.carousel-item')]
}

function scrollToIndex(i) {
  const root = carouselEl.value
  const items = getItems()
  if (!root || !items.length) return
  const clamped = ((i % items.length) + items.length) % items.length
  const target = items[clamped]
  root.scrollTo({ left: target.offsetLeft, behavior: scrollBehavior() })
  currentIndex.value = clamped
}

function goNext() {
  scrollToIndex(currentIndex.value + 1)
}

function goPrev() {
  scrollToIndex(currentIndex.value - 1)
}

function syncIndexFromScroll() {
  const root = carouselEl.value
  const items = getItems()
  if (!root || !items.length) return
  const x = root.scrollLeft
  let best = 0
  let bestDist = Infinity
  items.forEach((item, i) => {
    const d = Math.abs(item.offsetLeft - x)
    if (d < bestDist) {
      bestDist = d
      best = i
    }
  })
  currentIndex.value = best
}

function startAutoplay() {
  stopAutoplay()
  if (prefersReducedMotion() || count.value <= 1) return
  autoplayTimer = window.setInterval(() => {
    if (!autoplayPaused.value) goNext()
  }, 5000)
}

function stopAutoplay() {
  if (autoplayTimer != null) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

function onCarouselScroll() {
  syncIndexFromScroll()
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <section id="apercu" class="landing-section scroll-mt-24 py-16 sm:py-20">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <p class="text-primary mb-2 text-center text-sm font-semibold uppercase tracking-wider">Aperçu</p>
      <h2 class="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">L’application en images</h2>
      <p class="text-base-content/80 mx-auto mb-12 max-w-2xl text-center text-base">
        Tableau de bord, entreprises, inspections, pollutions et redevances — en thème clair ou sombre, au choix.
      </p>

      <template v-if="captureScreenshots.length">
        <div
          class="relative mx-auto px-10 w-full max-w-[min(100%,320px)] lg:max-w-6xl"
          @mouseenter="autoplayPaused = true"
          @mouseleave="autoplayPaused = false"
        >
          <div
            ref="carouselEl"
            class="carousel w-full items-center py-8"
            @scroll.passive="onCarouselScroll"
          >
            <div
              v-for="(shot, i) in captureScreenshots"
              :key="shot.name"
              class="carousel-item w-full shrink-0 justify-center px-2 py-3 lg:w-[calc((100%-3rem)/3)] lg:max-w-none"
            >
              <PhoneScreenshot :src="shot.src" :alt="shot.alt" />
            </div>
          </div>

          <div
            v-if="count > 1"
            class="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-1 sm:px-2"
          >
            <button
              type="button"
              class="btn btn-circle pointer-events-auto shadow-md"
              aria-label="Capture précédente"
              @click.prevent="goPrev"
            >
              ❮
            </button>
            <button
              type="button"
              class="btn btn-circle pointer-events-auto shadow-md"
              aria-label="Capture suivante"
              @click.prevent="goNext"
            >
              ❯
            </button>
          </div>
        </div>
      </template>
      <div v-else class="alert alert-info">
        <span>Aucune capture pour le moment. Ajoutez des images dans <code class="text-xs">src/assets/images/captures/</code>.</span>
      </div>
    </div>
  </section>
</template>
