<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: false },
  siteName: { type: String, required: false, default: 'pkowalczyk.dev' },
})
</script>

<template>
  <div
    class="relative w-full h-full flex flex-col justify-between p-[64px] text-white"
    style="background: linear-gradient(135deg, #071611 0%, #0d241c 55%, #071611 100%); font-family: 'Inter';"
  >
    <div
      class="absolute inset-0"
      style="background: radial-gradient(circle at 15% 10%, rgba(46, 204, 113, 0.24), transparent 55%);"
    />

    <div class="relative text-[26px] font-medium" style="color: rgba(255,255,255,0.55);">
      {{ siteName }}
    </div>

    <div class="relative flex flex-col gap-8 max-w-[1000px]">
      <h1
        class="font-extrabold m-0"
        style="font-size: 68px; line-height: 1.15; letter-spacing: -0.02em; display: block; line-clamp: 3; text-overflow: ellipsis;"
      >
        {{ title }}
      </h1>
      <p
        v-if="description"
        class="m-0"
        style="font-size: 30px; line-height: 1.5; color: rgba(255,255,255,0.68); display: block; line-clamp: 2; text-overflow: ellipsis;"
      >
        {{ description }}
      </p>
    </div>

    <div
      class="relative flex items-center px-6 py-2 rounded-full text-[24px] font-semibold self-start"
      style="background: rgba(46, 204, 113, 0.16); color: #6ee7a8; border: 2px solid rgba(110, 231, 168, 0.35);"
    >
      Przemek Kowalczyk
    </div>
  </div>
</template>
