<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: false },
  tag: { type: String, required: false },
  author: { type: String, required: false },
  avatar: { type: String, required: false },
  date: { type: String, required: false },
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
      style="background: radial-gradient(circle at 85% 15%, rgba(46, 204, 113, 0.28), transparent 55%);"
    />

    <div class="relative flex items-center justify-between">
      <div
        v-if="tag"
        class="flex items-center px-6 py-2 rounded-full text-[26px]"
        style="background: rgba(46, 204, 113, 0.16); color: #6ee7a8; border: 2px solid rgba(110, 231, 168, 0.35); font-weight: 700; font-family: 'Inter';"
      >
        {{ tag }}
      </div>
      <div v-else />

      <div class="text-[26px]" style="color: rgba(255,255,255,0.55); font-weight: 400; font-family: 'Inter';">
        {{ siteName }}
      </div>
    </div>

    <div class="relative flex flex-col gap-8 max-w-[1000px]">
      <h1
        class="m-0"
        style="font-size: 64px; line-height: 1.15; letter-spacing: -0.02em; display: block; line-clamp: 3; text-overflow: ellipsis; font-weight: 700; font-family: 'Inter';"
      >
        {{ title }}
      </h1>
      <p
        v-if="description"
        class="m-0"
        style="font-size: 28px; line-height: 1.5; color: rgba(255,255,255,0.68); display: block; line-clamp: 2; text-overflow: ellipsis; font-weight: 400; font-family: 'Inter';"
      >
        {{ description }}
      </p>
    </div>

    <div class="relative flex items-center gap-5">
      <div
        v-if="avatar"
        class="flex overflow-hidden"
        style="width: 72px; height: 72px; border-radius: 50%; border: 3px solid rgba(110, 231, 168, 0.45);"
      >
        <img
          :src="avatar"
          alt=""
          class="w-full h-full"
          style="object-fit: cover;"
        >
      </div>
      <div class="flex flex-col">
        <span v-if="author" class="text-[28px]" style="font-weight: 700; font-family: 'Inter';">{{ author }}</span>
        <span v-if="date" class="text-[24px]" style="color: rgba(255,255,255,0.5); font-weight: 400; font-family: 'Inter';">{{ date }}</span>
      </div>
    </div>
  </div>
</template>
