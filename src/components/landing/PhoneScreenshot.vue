<script setup>
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'Capture d’écran MyICPE' },
})
</script>

<template>
  <div
    class="mockup-phone rounded-xl mx-auto w-[min(100%,280px)] border-[#0D1A3C] motion-safe:transition-transform motion-safe:duration-500 motion-safe:hover:scale-[1.02] motion-safe:hover:shadow-xl"
  >
    <div class="mockup-phone-display rounded-xl overflow-hidden bg-neutral-700">
      <img :src="src" :alt="alt" class="block h-full w-full object-cover object-top" loading="lazy" decoding="async" />
    </div>
  </div>
</template>
