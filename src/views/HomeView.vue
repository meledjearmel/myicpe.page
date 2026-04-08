<script setup>
import AppNavbar from '@/components/landing/AppNavbar.vue'
import HeroSection from '@/components/landing/HeroSection.vue'
import AudienceSection from '@/components/landing/AudienceSection.vue'
import ScreenshotsSection from '@/components/landing/ScreenshotsSection.vue'
import FeaturesSection from '@/components/landing/FeaturesSection.vue'
import TrustSection from '@/components/landing/TrustSection.vue'
import RoadmapSection from '@/components/landing/RoadmapSection.vue'
import DownloadSection from '@/components/landing/DownloadSection.vue'
import FAQSection from '@/components/landing/FAQSection.vue'
import AppFooter from '@/components/landing/AppFooter.vue'
</script>

<template>
  <div class="bg-base-100 text-base-content min-h-screen">
    <AppNavbar />
    <main>
      <HeroSection />
      <AudienceSection />
      <ScreenshotsSection />
      <FeaturesSection />
      <TrustSection />
      <RoadmapSection />
      <DownloadSection />
      <FAQSection />
    </main>
    <AppFooter />
  </div>
</template>
