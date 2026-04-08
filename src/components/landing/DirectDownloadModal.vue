<script setup>
import { ref, watch, nextTick } from 'vue'
import { useTrackedDownload } from '@/composables/useTrackedDownload.js'
import { formatBytes, formatEtaSeconds } from '@/utils/downloadFormat.js'

const props = defineProps({
  url: { type: String, required: true },
})

const dialogRef = ref(null)

const {
  status,
  loaded,
  total,
  hasKnownSize,
  percent,
  speedLabel,
  etaSeconds,
  errorMessage,
  blobRef,
  filenameRef,
  start,
  cancel,
  reset,
} = useTrackedDownload()

function triggerSave() {
  const blob = blobRef.value
  if (!blob || !(blob instanceof Blob)) return
  const objectUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = objectUrl
  a.download = filenameRef.value || 'téléchargement'
  a.rel = 'noopener'
  a.click()
  setTimeout(() => URL.revokeObjectURL(objectUrl), 2000)
}

function open() {
  reset()
  nextTick(() => {
    dialogRef.value?.showModal()
    start(props.url)
  })
}

function closeDialog() {
  dialogRef.value?.close()
}

function onDialogClose() {
  cancel()
  reset()
}

function cancelAndClose() {
  closeDialog()
}

watch(status, (s) => {
  if (s === 'done') {
    nextTick(() => {
      setTimeout(() => triggerSave(), 380)
    })
  }
})

defineExpose({ open })
</script>

<template>
  <dialog ref="dialogRef" class="modal" @close="onDialogClose">
    <div class="modal-box max-w-md border border-base-300 bg-base-100 p-0 shadow-2xl">
      <div class="border-b border-base-300 px-6 py-4">
        <div class="flex items-start gap-4">
          <div
            class="bg-primary/15 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
            aria-hidden="true"
          >
            ☁️
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="text-lg font-semibold tracking-tight">Téléchargement</h3>
            <p class="text-base-content/70 mt-0.5 truncate text-sm" :title="filenameRef">
              {{ filenameRef }}
            </p>
          </div>
        </div>
      </div>

      <div class="px-6 py-5">
        <template v-if="status === 'loading'">
          <div class="mb-4">
            <div
              class="bg-base-300 relative h-3 w-full overflow-hidden rounded-full"
              role="progressbar"
              :aria-valuenow="hasKnownSize ? Math.round(percent) : undefined"
              :aria-valuemin="0"
              :aria-valuemax="100"
            >
              <div
                v-if="hasKnownSize"
                class="from-primary to-secondary h-full rounded-full bg-gradient-to-r transition-[width] duration-200 ease-out"
                :style="{ width: `${Math.min(100, percent)}%` }"
              />
              <div
                v-else
                class="from-primary to-secondary absolute inset-y-0 left-0 h-full w-[38%] rounded-full bg-gradient-to-r bar-indeterminate"
              />
            </div>
          </div>

          <div class="flex flex-wrap items-baseline justify-between gap-2 text-sm">
            <span class="text-base-content font-semibold tabular-nums">
              <template v-if="hasKnownSize">{{ Math.round(percent) }}%</template>
              <template v-else>—</template>
            </span>
            <span class="text-base-content/80 tabular-nums">{{ speedLabel }}</span>
          </div>

          <div class="text-base-content/60 mt-2 flex flex-wrap justify-between gap-x-4 gap-y-1 text-xs">
            <span>
              <template v-if="hasKnownSize && total">
                {{ formatBytes(loaded) }} / {{ formatBytes(total) }}
              </template>
              <template v-else> {{ formatBytes(loaded) }} reçus </template>
            </span>
            <span v-if="hasKnownSize && etaSeconds != null && percent < 100">
              {{ formatEtaSeconds(etaSeconds) }} restantes
            </span>
            <span v-else-if="hasKnownSize && percent >= 100">Finalisation…</span>
          </div>
        </template>

        <template v-else-if="status === 'done'">
          <div class="mb-4">
            <div class="bg-base-300 relative h-3 w-full overflow-hidden rounded-full">
              <div
                class="from-success to-success/80 h-full w-full rounded-full bg-gradient-to-r transition-[width] duration-500 ease-out"
              />
            </div>
          </div>
          <p class="text-success font-medium">Téléchargement terminé</p>
          <p class="text-base-content/70 mt-1 text-sm">
            Le fichier a été enregistré via la boîte de dialogue du navigateur. Vous pouvez lancer un nouvel
            enregistrement si besoin.
          </p>
        </template>

        <template v-else-if="status === 'cors'">
          <p class="text-base-content/90 text-sm leading-relaxed">{{ errorMessage }}</p>
          <a
            :href="url"
            class="btn btn-primary btn-sm mt-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ouvrir le lien de téléchargement
          </a>
        </template>

        <template v-else-if="status === 'error'">
          <p class="text-error text-sm">{{ errorMessage }}</p>
        </template>
      </div>

      <div class="modal-action border-t border-base-300 flex-wrap gap-2 px-6 py-4">
        <template v-if="status === 'done'">
          <button type="button" class="btn btn-primary btn-sm sm:btn-md" @click="triggerSave">
            Enregistrer à nouveau
          </button>
          <form method="dialog">
            <button type="submit" class="btn btn-ghost btn-sm sm:btn-md">Fermer</button>
          </form>
        </template>
        <template v-else-if="status === 'loading'">
          <button type="button" class="btn btn-ghost btn-sm sm:btn-md" @click="cancelAndClose">Annuler</button>
        </template>
        <template v-else-if="status === 'cors' || status === 'error'">
          <form method="dialog">
            <button type="submit" class="btn btn-ghost btn-sm sm:btn-md">Fermer</button>
          </form>
        </template>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button type="submit" class="text-transparent">fermer</button>
    </form>
  </dialog>
</template>

<style scoped>
.bar-indeterminate {
  animation: download-slide 1.15s ease-in-out infinite;
}

@keyframes download-slide {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(320%);
  }
}
</style>
