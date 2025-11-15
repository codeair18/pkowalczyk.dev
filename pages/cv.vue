<script setup lang="ts">
const { locale } = useI18n()

const experiencePl = ref([
  {
    jobPosition: 'Lead Fullstack Developer',
    dateInterval: '06.2023 — __.____',
    dateFrom: '06.2023',
    dateTo: 'present',
    companyName: 'Comfino',
    isPartTime: false,
    companyLink: 'https://comfino.pl',
    projects: [
      {
        name: 'Comfino',
        url: 'https://comfino.pl'
      },
    ],
    responsibilities: [
      'Współpraca z interesariuszami w celu <b>analizy wymagań biznesowych i ich implementacji w architekturze systemu.</b>',
      'Mentoring i wsparcie dla zespołu programistycznego, wprowadzanie <b>dobrych praktyk kodowania oraz DevOps.</b>',
      'Odpowiedzialność za <b>stabilność i optymalizację systemów,</b> zapewniając <b>wysoką wydajność oraz bezpieczeństwo.</b>',
      'Tworzenie i rozwój <b>mikroserwisowej architektury</b> w środowisku <b>Docker/Kubernetes</b> na <b>Google Cloud Platform.</b>',
      'Projektowanie i wdrażanie skalowalnych aplikacji webowych opartych na <b>PHP (Symfony), Vue, Nuxt, Node.js.</b>',
    ],
    i8nCode: 'comperiaPay',
    skills: ['PHP', 'Symfony', 'JavaScript', 'Nuxt', 'Docker', 'Kubernetes', 'Google Cloud Platform']
  },
  // {
  //   jobPosition: 'Founder',
  //   dateInterval: '04.2024 — __.____',
  //   dateFrom: '04.2024',
  //   dateTo: 'present',
  //   companyName: 'Cvior',
  //   isPartTime: true,
  //   companyLink: 'https://cvior.com',
  //   projects: [
  //     {
  //       name: 'Cvior',
  //       url: 'https://cvior.com'
  //     },
  //   ],
  //   i8nCode: 'cvior',
  //   responsibilities: [
  //     'Projektowanie, rozwój i utrzymanie aplikacji – zarządzam całym procesem wytwarzania oprogramowania.',
  //     'Optymalizacja infrastruktury, zapewniająca <b>wysoką wydajność i skalowalność.</b>',
  //     'Wdrożenie CI/CD oraz orkiestracja mikroserwisów w Kubernetesie.',
  //   ],
  //   skills: ['JavaScript', 'TypeScript', 'Vue', 'Nuxt', 'Docker', 'Node.js', 'Kubernetes']
  // },
  // {
  //   jobPosition: 'Fullstack Developer',
  //   dateInterval: '01.2023 — 06.2023',
  //   dateFrom: '01.2023',
  //   dateTo: '06.2023',
  //   companyName: 'UmbrellAI',
  //   isPartTime: true,
  //   companyLink: 'https://umbrell.ai',
  //   projectUrl: 'https://umbrell.ai',
  //   projects: [
  //     {
  //       name: 'UmbrellAI',
  //       url: 'https://umbrell.ai'
  //     },
  //   ],
  //   i8nCode: 'umbrellAi',
  //   responsibilities: [
  //     'Rozwój aplikacji agregującej firmy ubezpieczeniowe, umożliwiającej zakup polis online.',
  //     'Projektowanie oraz implementacja nowych funkcjonalności w <b>Vue, Nuxt, Node.js.</b>',
  //     'Optymalizacja procesów backendowych i integracja z API firm ubezpieczeniowych.'
  //   ],
  //   skills: ['JavaScript', 'TypeScript', 'Vue', 'Nuxt', 'Docker', 'Node.js']
  // },
  {
    jobPosition: 'PHP Developer',
    dateInterval: '2022 — 06.2023',
    dateFrom: '2022',
    dateTo: '06.2023',
    companyName: 'SilkyCoders',
    companyLink: 'https://silkycoders.pl',
    projectUrl: 'https://silkycoders.pl',
    i8nCode: 'silkyCoders',
    responsibilities: [
      'Przeprojektowanie <b>starych, mało wydajnych funkcjonalności</b> oraz rozwój systemu zarządzania produktami detalicznymi.',
      'Migrowanie aplikacji na nową architekturę',
      'Konsultowanie rozwiązań technicznych z zespołem na podstawie wymagań.',
    ],
    skills: ["PHP", 'Symfony', 'Docker', 'Kubernetes', 'DDD', 'Scrum']
  },
  // {
  //   jobPosition: 'Founder',
  //   dateInterval: '2019 — 2023',
  //   dateFrom: '2019',
  //   dateTo: '2023',
  //   isPartTime: true,
  //   companyName: 'Fashionly',
  //   companyLink: 'https://www.pkowalczyk.dev',
  //   i8nCode: 'fashionly',
  //   responsibilities: [
  //     'Budowa aplikacji agregującej produkty afiliacyjne z branży odzieżowej.',
  //   ],
  //   skills: ["PHP", 'Symfony', 'JavaScript', 'Vue', 'Nuxt', 'Docker']
  // },
  {
    jobPosition: 'Fullstack Developer',
    dateInterval: '03.2018 — 2022',
    dateFrom: '03.2018',
    dateTo: '2019',
    companyName: 'Comperia',
    companyLink: 'https://comperia.pl',
    projectUrl: 'https://telepolis.pl',
    projects: [
      {
        name: 'Telepolis',
        url: 'https://telepolis.pl'
      },
      {
        name: 'ComperiaRaty',
        url: 'https://comperiaraty.pl'
      },
      {
        name: 'Comfino',
        url: 'https://comfino.pl'
      },
    ],
    i8nCode: 'firstComperia',
    responsibilities: [
      'Migracja portalu Telepolis.pl ze starego autoreskiego systemu na <b>Symfony</b>',
      'Stworzenie <b>chatobota</b> do kontaktu z klientami.',
      'Współpraca techniczna i produktowa nad tworzeniem i rozwojem <b>ComperiaRaty.pl</b> oraz <b>Comfino.pl</b>.',
      'Odpowiedzialność za <b>stabilność i optymalizację systemów,</b> zapewniając <b>wysoką wydajność oraz bezpieczeństwo.</b>',
      'Projektowanie i wdrażanie skalowalnych aplikacji webowych opartych na <b>PHP (Symfony), Vue, Nuxt, Node.js.</b>',
    ],
    skills: ["PHP", 'Symfony', 'JavaScript', 'Nuxt', 'Kubernetes', 'Docker', 'Google Cloud Platform', 'Microservices']
  },
  {
    jobPosition: 'Fullstack Developer',
    dateInterval: '11.2016 - 03.2018',
    dateFrom: '11.2016',
    dateTo: '03.2018',
    companyName: 'Konsult Expert',
    i8nCode: 'konsultExpert',
    responsibilities: [
      'Rozwijanie platformy medycznej do konsultacji online.',
      'Tworzenie nowych funkcjonalności backendowych i frontendowych.',
    ],
    skills: ["PHP", 'Symfony', 'JavaScript']
  }
])

const experienceEn = ref([
  {
    jobPosition: 'Lead Fullstack Developer',
    dateInterval: '06.2023 — __.____',
    dateFrom: '06.2023',
    dateTo: 'present',
    companyName: 'Comfino',
    isPartTime: false,
    companyLink: 'https://comfino.pl',
    projects: [
      {
        name: 'Comfino',
        url: 'https://comfino.pl'
      },
    ],
    responsibilities: [
      'Collaborating with stakeholders to <b>analyze business requirements and implement them within the system architecture.</b>',
      'Mentoring and supporting the development team, introducing <b>best coding and DevOps practices.</b>',
      'Ensuring <b>system stability and optimization</b>, maintaining <b>high performance and security.</b>',
      'Designing and developing <b>microservice architecture</b> in a <b>Docker/Kubernetes</b> environment on <b>Google Cloud Platform.</b>',
      'Designing and implementing scalable web applications using <b>PHP (Symfony), Vue, Nuxt, Node.js.</b>',
    ],
    i8nCode: 'comperiaPay',
    skills: ['PHP', 'Symfony', 'Vue', 'Nuxt', 'Docker', 'Node.js', 'Kubernetes', 'Google Cloud Platform']
  },
  {
    jobPosition: 'Founder',
    dateInterval: '04.2024 — __.____',
    dateFrom: '04.2024',
    dateTo: 'present',
    companyName: 'Cvior',
    isPartTime: true,
    companyLink: 'https://cvior.com',
    projects: [
      {
        name: 'Cvior',
        url: 'https://cvior.com'
      },
    ],
    i8nCode: 'cvior',
    responsibilities: [
      'Designing, developing, and maintaining the application – managing the entire software development lifecycle.',
      'Optimizing infrastructure to ensure <b>high performance and scalability.</b>',
      'Implementing CI/CD and orchestrating microservices with Kubernetes.',
    ],
    skills: ['JavaScript', 'TypeScript', 'Vue', 'Nuxt', 'Docker', 'Node.js', 'Kubernetes']
  },
  {
    jobPosition: 'Fullstack Developer',
    dateInterval: '01.2023 — 06.2023',
    dateFrom: '01.2023',
    dateTo: '06.2023',
    companyName: 'UmbrellAI',
    isPartTime: true,
    companyLink: 'https://umbrell.ai',
    projectUrl: 'https://umbrell.ai',
    projects: [
      {
        name: 'UmbrellAI',
        url: 'https://umbrell.ai'
      },
    ],
    i8nCode: 'umbrellAi',
    responsibilities: [
      'Developing an application aggregating insurance companies, enabling online policy purchases.',
      'Designing and implementing new features in <b>Vue, Nuxt, Node.js.</b>',
      'Optimizing backend processes and integrating with insurance company APIs.'
    ],
    skills: ['JavaScript', 'TypeScript', 'Vue', 'Nuxt', 'Docker', 'Node.js']
  },
  {
    jobPosition: 'Backend Developer',
    dateInterval: '2022 — 06.2023',
    dateFrom: '2022',
    dateTo: '06.2023',
    companyName: 'SilkyCoders',
    companyLink: 'https://silkycoders.pl',
    projectUrl: 'https://silkycoders.pl',
    i8nCode: 'silkyCoders',
    responsibilities: [
      'Redesigning <b>legacy, low-performance functionalities</b> and developing a retail product management system.',
      'Implementing <b>DDD</b> and <b>CQRS</b> to improve performance and data management.',
      'Introducing automated unit and integration tests.'
    ],
    skills: ["PHP", 'Symfony', 'Docker', 'Jenkins', 'DDD', 'Scrum']
  },
  {
    jobPosition: 'Founder',
    dateInterval: '2019 — 2023',
    dateFrom: '2019',
    dateTo: '2023',
    isPartTime: true,
    companyName: 'Fashionly',
    companyLink: 'https://www.pkowalczyk.dev',
    i8nCode: 'fashionly',
    responsibilities: [
      'Building an application aggregating affiliate fashion products.',
    ],
    skills: ["PHP", 'Symfony', 'JavaScript', 'Vue', 'Nuxt', 'Docker']
  },
  {
    jobPosition: 'Fullstack Developer',
    dateInterval: '03.2018 — 2019',
    dateFrom: '03.2018',
    dateTo: '2019',
    companyName: 'Comperia',
    companyLink: 'https://comperia.pl',
    projectUrl: 'https://telepolis.pl',
    projects: [
      {
        name: 'Telepolis',
        url: 'https://telepolis.pl'
      },
      {
        name: 'ComperiaRaty',
        url: 'https://comperiaraty.pl'
      },
      {
        name: 'Comfino',
        url: 'https://comfino.pl'
      },
    ],
    i8nCode: 'firstComperia',
    responsibilities: [
      'Developing and maintaining financial systems, and migrating them to Google Cloud Platform.',
      'Designing microservice architecture and integrating banking APIs.'
    ],
    skills: ["PHP", 'Symfony', 'JavaScript', 'Vue', 'Nuxt', 'K8S', 'Docker', 'Google Cloud Platform', 'Microservices']
  },
  {
    jobPosition: 'Fullstack Developer',
    dateInterval: '11.2016 - 03.2018',
    dateFrom: '11.2016',
    dateTo: '03.2018',
    companyName: 'Konsult Expert',
    i8nCode: 'konsultExpert',
    responsibilities: [
      'Developing a medical platform for online consultations.',
      'Creating new backend and frontend functionalities.',
    ],
    skills: ["PHP", 'Symfony', 'JavaScript']
  }
])

const educationPl = ref([
  {
    school: 'Coders Lab',
    dateFrom: '03.2016',
    dateTo: '10.2016',
    companyLink: 'https://coderslab.pl',
    direction: 'Bootcamp Backend Developer',
    skills: ['PHP', 'Symfony', 'jQUery', 'MVC', 'Javascript', 'HTML', 'CSS', 'Bootstrap']
  },
  {
    school: 'Uniwersytet Warmińsko-Mazurski w Olsztynie',
    dateFrom: '2011',
    dateTo: '2015',
    companyLink: 'https://uwm.edu.pl',
    direction: 'Geodezja i geoinformatyka (Inżynier)',
    skills: ['PHP', 'Symfony', 'jQUery', 'MVC', 'Javascript', 'HTML', 'CSS', 'Bootstrap']
  },
])

const educationEn = ref([
  {
    school: 'Coders Lab',
    dateFrom: '03.2016',
    dateTo: '10.2016',
    companyLink: 'https://coderslab.pl',
    direction: 'Backend Developer Bootcamp',
    skills: ['PHP', 'Symfony', 'jQUery', 'MVC', 'Javascript', 'HTML', 'CSS', 'Bootstrap']
  },
  {
    school: 'University of Warmia and Mazury in Olsztyn',
    dateFrom: '2011',
    dateTo: '2015',
    companyLink: 'https://uwm.edu.pl',
    direction: 'Geodesy and geoinformatics (Engineer)',
    skills: ['PHP', 'Symfony', 'jQUery', 'MVC', 'Javascript', 'HTML', 'CSS', 'Bootstrap']
  },
])


// Computed properties for locale-based content
const experience = computed(() => {
  return locale.value === 'pl' ? experiencePl.value : experienceEn.value
})

const education = computed(() => {
  return locale.value === 'pl' ? educationPl.value : educationEn.value
})

const skills = ref<string[]>([]);
for (const exp of experiencePl.value) {
  skills.value = skills.value.concat(exp.skills);
}
skills.value = [...new Set(skills.value)];

const route = useRoute();
const cvClause = useI18n().t('cvClause');
const companiesFromUrl = route.query.companies as string || undefined;
let companyNames = ''
if (companiesFromUrl) {
  companyNames = locale.value === 'pl' ? 'przez ' + companiesFromUrl : 'by ' + companiesFromUrl;
}
const cvClauseFinal = cvClause.replace('__COMPANY_NAMES__', companyNames);
</script>

<template>
  <main class="mx-auto px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0 mt-10">
    <div>
      <UAvatar
        src="/android-chrome-512x512.png"
        class="mb-5"
        alt="Avatar"
        size="3xl"
      />
      <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
        <a href="/">Przemek Kowalczyk</a>
      </h1>
      <h2 class="mt-3 text-lg font-medium tracking-tight text-gray-400 sm:text-xl">
        Lead Full Stack Developer
      </h2>
      <p class="mt-4 max-w-md">{{ $t('aboutMe') }}</p>
      <ul class="experience__tech my-5 lg:mt-2 flex flex-wrap lg:mr-32">
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
      <p>
        {{ $t('aboutMeExtended') }}
      </p>
    </div>
    <section class="experience">
      <UPageHeader :title="$t('experience')" class="my-2"/>
      <div
        v-for="exp in experience"
        class="group relative grid pb-1 transition-all grid-cols-6 gap-4 mb-6"
        :class="{'text-gray': exp.isPartTime}"
      >
        <header
          class="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide col-span-1"
          :aria-label="exp.dateInterval">
          <template v-if="exp.dateTo === 'present'">
            {{ exp.dateFrom }} - {{ $t('present') }}
          </template>
          <template v-else>
            {{ exp.dateFrom }} - {{ exp.dateTo }}
          </template>
        </header>
        <div class="z-10 col-span-4">
          <div class="flex items-center gap-2">
            <h4 class="text-xl dark:text-gray-400 text-amber-500">
              {{ exp.jobPosition }}
            </h4>
            · <a :href="exp.companyLink"
                 target="_blank">{{ exp.companyName }}</a>

            <span v-if="exp.isPartTime" class="text-sm">(Part time)</span>
          </div>

          <div v-if="exp.projects" class="flex gap-2 w-full">
            <div v-for="project in exp.projects" class="flex gap-4 my-3">
              <div class="flex items-center gap-1">
                <UIcon
                  name="i-ph-link"
                  dynamic
                />
                <a :href="project.url" target="_blank">{{ project.name }}</a>
              </div>
            </div>
          </div>

          <div class="ml-4 text-sm leading-normal">
            <ul class="list-disc">
              <li v-for="resp in exp.responsibilities" class="my-2">
                <span v-html="resp"></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="cols-span-1 flex items-end">
          <ul class="experience__tech mt-2 flex flex-wrap" aria-label="Technologies used">
            <li
              v-for="skill in exp.skills"
              class="mr-1.5 mt-2"
            >
              <div
                class="flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5">
                {{ skill }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section id="education">
      <UPageHeader :title="$t('education')" class="my-2"/>
      <div
        v-for="edu in education"
        class="group relative grid pb-1 transition-all grid-cols-6 gap-4 mb-6">
        <header
          class="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide col-span-1"
        >
          {{ edu.dateFrom }} - {{ edu.dateTo }}
        </header>
        <div class="z-10 col-span-4">
          <div class="flex items-center gap-2">
            <h4 class="text-xl dark:text-gray-400 text-amber-500">
              {{ edu.direction }}
            </h4>
            · <a :href="edu.companyLink"
                 target="_blank">{{ edu.school }}</a>
          </div>
        </div>
      </div>
    </section>

    <ul class="ml-1 mt-8 flex items-center" aria-label="Social media">
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
      <li class="mr-5 text-xs shrink-0 cursor-pointer">
        <a class="cursor-pointer">
          kontakt@pkowalczyk.dev
        </a>
      </li>
      <li class="mr-5 text-xs shrink-0 cursor-pointer">
        <a class="cursor-pointer">
          codeair18@gmail.com
        </a>
      </li>
      <li class="mr-5 text-xs shrink-0 cursor-pointer">
        <a class="cursor-pointer">
          +48 796 069 415
        </a>
      </li>
    </ul>

    <section class="my-5">
      <p>
        {{ cvClauseFinal }}
      </p>
    </section>
  </main>
</template>

<style scoped lang="scss">
.experience__tech {
  div {
    color: var(--sun-link-color);
    background-color: aliceblue;
  }
}

.dark {
  .experience {
    &__tech div {
      color: #fffdf2;
      background-color: #484848;
    }
  }
}
</style>