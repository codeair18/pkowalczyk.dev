<template>
  <nav class="fixed h-auto w-screen z-50">
    <div class="flex md:justify-between p-5 items-center gap-2">
      <div class="lang_switcher" role="group" aria-label="Language">
        <button
          type="button"
          class="lang_switcher__option"
          :class="{ 'is-active': locale === 'pl' }"
          :aria-pressed="locale === 'pl'"
          @click="setLocale('pl')"
        >
          PL
        </button>
        <button
          type="button"
          class="lang_switcher__option"
          :class="{ 'is-active': locale === 'en' }"
          :aria-pressed="locale === 'en'"
          @click="setLocale('en')"
        >
          EN
        </button>
      </div>
    </div>
  </nav>
  <div id="radial-gradient"></div>
  <ClientOnly>
    <day-night2/>
  </ClientOnly>
  <main class="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-16 font-sans md:px-12 md:py-24 lg:py-32">
    <header>
      <div>
        <button
          type="button"
          class="avatar-button relative mb-5 inline-block"
          :aria-label="$t('chatOpen')"
          @click="openChat"
        >
          <UAvatar
            src="/android-chrome-512x512.png"
            alt="Avatar"
            size="3xl"
          />
          <Transition name="badge-pop">
            <span v-if="showChatBadge && !chatOpen" class="chat-badge" aria-hidden="true">+1</span>
          </Transition>
        </button>
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
          <a href="/">Przemek Kowalczyk</a>
        </h1>
        <h2 class="mt-3 text-lg font-medium tracking-tight sm:text-xl">
          {{ $t('tagline') }}
        </h2>
<!--        <p class="mt-4 max-w-md">{{ $t('aboutMe') }}</p>-->
      </div>
      <ul class="experience__tech my-5 lg:mt-2 flex flex-wrap">
        <li
          v-for="skill in skills"
          class="mr-1.5 mt-2"
        >
          <div
            class="flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5">
            {{ skill }}
          </div>
        </li>
      </ul>
      <ul class="ml-1 mt-8 flex items-center flex-wrap" aria-label="Social media">
        <li class="mr-5 text-xs shrink-0 cursor-pointer">
          <a
            href="https://github.com/codeair18/PersonalBrand"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub (opens in a new tab)"
            title="GitHub">
            <span class="sr-only">GitHub</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                 class="h-6 w-6"
                 aria-hidden="true">
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </a>
        </li>
        <li class="mr-5 text-xs shrink-0 cursor-pointer">
          <a
            href="https://www.linkedin.com/in/pekowal"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn (opens in a new tab)"
            title="LinkedIn"><span
            class="sr-only">LinkedIn</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                 class="h-6 w-6"
                 aria-hidden="true">
              <path
                d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
          </a></li>
        <li class="mr-5 text-xs shrink-0 cursor-pointer"><a
          href="https://www.instagram.com/przem.kowalczyk"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Instagram (opens in a new tab)"
          title="Instagram"><span
          class="sr-only">Instagram</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" fill="currentColor"
               class="h-6 w-6"
               aria-hidden="true">
            <path
              d="M295.42,6c-53.2,2.51-89.53,11-121.29,23.48-32.87,12.81-60.73,30-88.45,57.82S40.89,143,28.17,175.92c-12.31,31.83-20.65,68.19-23,121.42S2.3,367.68,2.56,503.46,3.42,656.26,6,709.6c2.54,53.19,11,89.51,23.48,121.28,12.83,32.87,30,60.72,57.83,88.45S143,964.09,176,976.83c31.8,12.29,68.17,20.67,121.39,23s70.35,2.87,206.09,2.61,152.83-.86,206.16-3.39S799.1,988,830.88,975.58c32.87-12.86,60.74-30,88.45-57.84S964.1,862,976.81,829.06c12.32-31.8,20.69-68.17,23-121.35,2.33-53.37,2.88-70.41,2.62-206.17s-.87-152.78-3.4-206.1-11-89.53-23.47-121.32c-12.85-32.87-30-60.7-57.82-88.45S862,40.87,829.07,28.19c-31.82-12.31-68.17-20.7-121.39-23S637.33,2.3,501.54,2.56,348.75,3.4,295.42,6m5.84,903.88c-48.75-2.12-75.22-10.22-92.86-17-23.36-9-40-19.88-57.58-37.29s-28.38-34.11-37.5-57.42c-6.85-17.64-15.1-44.08-17.38-92.83-2.48-52.69-3-68.51-3.29-202s.22-149.29,2.53-202c2.08-48.71,10.23-75.21,17-92.84,9-23.39,19.84-40,37.29-57.57s34.1-28.39,57.43-37.51c17.62-6.88,44.06-15.06,92.79-17.38,52.73-2.5,68.53-3,202-3.29s149.31.21,202.06,2.53c48.71,2.12,75.22,10.19,92.83,17,23.37,9,40,19.81,57.57,37.29s28.4,34.07,37.52,57.45c6.89,17.57,15.07,44,17.37,92.76,2.51,52.73,3.08,68.54,3.32,202s-.23,149.31-2.54,202c-2.13,48.75-10.21,75.23-17,92.89-9,23.35-19.85,40-37.31,57.56s-34.09,28.38-57.43,37.5c-17.6,6.87-44.07,15.07-92.76,17.39-52.73,2.48-68.53,3-202.05,3.29s-149.27-.25-202-2.53m407.6-674.61a60,60,0,1,0,59.88-60.1,60,60,0,0,0-59.88,60.1M245.77,503c.28,141.8,115.44,256.49,257.21,256.22S759.52,643.8,759.25,502,643.79,245.48,502,245.76,245.5,361.22,245.77,503m90.06-.18a166.67,166.67,0,1,1,167,166.34,166.65,166.65,0,0,1-167-166.34"></path>
          </svg>
        </a></li>
<!--        <li class="mr-5 text-xs shrink-0 cursor-pointer">-->
<!--          <a class="block"-->
<!--             target="_blank"-->
<!--             rel="noreferrer noopener"-->
<!--             aria-label="X (opens in a new tab)"-->
<!--             title="X"><span class="sr-only">Twitter</span>-->
<!--            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" fill="none" class="h-5 w-5"-->
<!--                 aria-hidden="true">-->
<!--              <path-->
<!--                d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"-->
<!--                fill="currentColor"></path>-->
<!--            </svg>-->
<!--          </a>-->
<!--        </li>-->
        <li class="mr-5 text-xs shrink-0 cursor-pointer">
          <NuxtLink
            to="/certifications"
            aria-label="Certifications"
            title="Certifications">
            <span class="sr-only">Certifications</span>
            <UIcon name="i-ph-certificate" class="h-6 w-6 opacity-80 hover:opacity-100 transition-opacity"/>
          </NuxtLink>
        </li>
        <li class="mr-5 text-xs shrink-0 cursor-pointer">
          <NuxtLink
            to="/blog"
            aria-label="Blog"
            title="Blog">
            <span class="sr-only">Blog</span>
            <UIcon name="i-ph-article" class="h-6 w-6 opacity-80 hover:opacity-100 transition-opacity"/>
          </NuxtLink>
        </li>
        <li class="mr-5 text-xs shrink-0 cursor-pointer">
          <a
            class="cursor-pointer"
            @click="contactMe"
          >
            kontakt@pkowalczyk.dev
          </a>
        </li>
      </ul>
    </header>
    <section class="mt-12 w-full">
      <button
        type="button"
        class="chat-toggle inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
        :aria-expanded="chatOpen"
        aria-controls="agent-chat-panel"
        @click="chatOpen = !chatOpen"
      >
        <UIcon
          name="i-ph-chat-circle-dots"
          class="h-5 w-5 transition-transform duration-300"
          :class="chatOpen ? 'rotate-12' : ''"
        />
        <span>{{ chatOpen ? $t('chatClose') : $t('chatOpen') }}</span>
        <UIcon
          name="i-ph-caret-down"
          class="h-4 w-4 transition-transform duration-300"
          :class="chatOpen ? 'rotate-180' : ''"
        />
      </button>

      <Transition name="chat-reveal">
        <div v-show="chatOpen" id="agent-chat-panel" class="chat-panel mt-4">
          <h2 class="text-lg font-medium mb-3">{{ $t('chatHeading') }}</h2>
          <ClientOnly>
            <AgentChat/>
          </ClientOnly>
        </div>
      </Transition>
    </section>
  </main>
</template>

<script setup lang="ts">
import DayNight2 from "~/components/switcher/DayNight2.vue";

useHead({
  meta: [
    {charset: 'utf-8'},
    {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    {property: 'og:title', content: 'Przemek Kowalczyk - Developer'},
    {
      property: 'og:description',
      content: 'Pomagam w tworzeniu rozwiązań skrojonych na miarę biznesu oraz optymalizuje procesy ich wdrażania.'
    },
    {property: 'og:image', content: 'https://pkowalczyk.dev/static/preview.png'},
    {property: 'og:url', content: 'https://pkowalczyk.dev'},
    {property: 'og:type', content: 'website'}
  ],
  title: 'Przemek Kowalczyk — Full-Stack Developer & Software Consultant',

})

const {x, y} = useMouse()
const {locale, setLocale} = useI18n()

const horizontalPixels = computed(() => {
  return x.value + 'px'
})

const verticalPixels = computed(() => {
  return y.value + 'px'
})

const chatOpen = ref(false)
const showChatBadge = ref(false)

let badgeTimer: ReturnType<typeof setTimeout> | undefined

// Mirrors the key AgentChat.vue persists its history under.
const CHAT_STORAGE_KEY = 'agent-chat:v1:messages'

const hasStoredConversation = () => {
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY)
    if (!raw) return false
    const msgs = JSON.parse(raw)
    return Array.isArray(msgs) && msgs.some((m) => m?.role === 'user')
  } catch {
    return false
  }
}

onMounted(() => {
  // An existing conversation: reopen the chat and skip the attention badge.
  if (hasStoredConversation()) {
    chatOpen.value = true
    return
  }
  badgeTimer = setTimeout(() => {
    if (!chatOpen.value) showChatBadge.value = true
  }, 3000)
})

onBeforeUnmount(() => {
  if (badgeTimer) clearTimeout(badgeTimer)
})

const openChat = () => {
  showChatBadge.value = false
  chatOpen.value = true
  nextTick(() => {
    document.getElementById('agent-chat-panel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  })
}

const contactMe = () => {
  window.location.href = "mailto:kontakt@pkowalczyk.dev?subject=Kontakt&body=W%20czym%20mogę%20pomóc%3F";
}

const skills = ref([
  'AI Agents', 'LLM Integration', 'Process Automation', 'CRM Systems',
  'SaaS Platforms', 'Cloud Architecture', 'Microservices', 'CI/CD', 'Workflows',
  'Symfony', 'Nuxt', 'Node.js', 'Docker', 'Kubernetes',
  'Google Cloud Platform', 'TypeScript', 'DDD',
])
</script>

<style lang="scss">


:root {
  //--sun-color: #ffbc42;
  --sun-color: rgba(66, 220, 255, 0.4);
  //--sun-link-color: #E4C74D;
  --sun-link-color: green;
  --sun-link-color-hover: seagreen;
  --moon-link-color: #c0b6a0;
  --moon-link-color-hover: rgba(255, 253, 242, 0.4);
  ---bg-color: light-dark(white, #121212);
  --moon-color: rgba(255, 253, 242, 0.4);
}

body {
  background-color: var(---bg-color);
}

//light-dark( <color>, <color> )
.experience__tech {
  div {
    color: var(--sun-link-color);
    background-color: aliceblue;
  }
}

/* Hide scrollbar for IE, Edge and Firefox */
.hidden-scroll {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
}

@media only screen and (max-width: 600px) {
  body {
    background: linear-gradient(184deg, var(---bg-color) 10%, var(--sun-color) 100%);
  }

  .dark body {
    background: linear-gradient(184deg, var(---bg-color) 10%, var(--moon-color) 100%);
  }
}

@media only screen and (min-width: 600px) {
  #radial-gradient {
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    background: radial-gradient(600px at v-bind(horizontalPixels) v-bind(verticalPixels), var(--sun-color), transparent 90%);
    z-index: -100;
  }
}


a {
  color: var(--sun-link-color);

  &:hover {
    color: var(--sun-link-color-hover);
  }
}

.color_switcher span {
  color: var(--sun-color);
}

.dark {
  a {
    color: var(--moon-link-color);

    &:hover {
      color: var(--moon-link-color-hover);
    }
  }

  .experience {
    &__tech div {
      color: #fffdf2;
      background-color: #484848;
    }
  }

  .color_switcher span {
    color: var(--moon-link-color);
  }

}


.dark #radial-gradient {
  background: radial-gradient(600px at v-bind(horizontalPixels) v-bind(verticalPixels), var(--moon-color), transparent 80%);
}

nav {
  transition: background-color 0.4s ease-in-out;

  &.scrolled {
    background-color: white
  }
}

.color_switcher {
  cursor: pointer;
  z-index: 1000;

}

.lang_switcher {
  z-index: 1000;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border-radius: 9999px;
  border: 1px solid currentColor;
  opacity: 0.85;
  backdrop-filter: blur(6px);
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
}

.lang_switcher__option {
  cursor: pointer;
  border: none;
  background: transparent;
  color: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  line-height: 1;
  padding: 0.35rem 0.7rem;
  border-radius: 9999px;
  transition: background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease;
  opacity: 0.55;

  &:hover {
    opacity: 0.9;
  }

  &.is-active {
    opacity: 1;
    background-color: var(--ui-primary, #a3e635);
    color: #1a1a1a;
  }
}

/* Clickable avatar + "+1" message badge */
.avatar-button {
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
  line-height: 0;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.04);
  }

  &:active {
    transform: scale(0.98);
  }
}

.chat-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 1.4rem;
  height: 1.4rem;
  padding: 0 0.35rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: #ef4444;
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  animation: badge-pulse 1.6s ease-in-out infinite;
}

@keyframes badge-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(239, 68, 68, 0);
  }
}

/* Badge pop-in transition */
.badge-pop-enter-active {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease;
}

.badge-pop-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.badge-pop-enter-from,
.badge-pop-leave-to {
  transform: scale(0);
  opacity: 0;
}

/* Chat toggle button */
.chat-toggle {
  cursor: pointer;
  color: var(--sun-link-color);
  background-color: aliceblue;
  border: 1px solid transparent;
  transition: transform 0.2s ease, box-shadow 0.25s ease, background-color 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  }

  &:active {
    transform: translateY(0);
  }
}

.dark .chat-toggle {
  color: #fffdf2;
  background-color: #484848;

  &:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
  }
}

/* Smooth reveal animation for the chat panel */
.chat-panel {
  will-change: opacity, transform, max-height;
}

.chat-reveal-enter-active,
.chat-reveal-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease, max-height 0.4s ease;
  overflow: hidden;
  max-height: 2000px;
}

.chat-reveal-enter-from,
.chat-reveal-leave-to {
  opacity: 0;
  transform: translateY(-12px);
  max-height: 0;
}
</style>
