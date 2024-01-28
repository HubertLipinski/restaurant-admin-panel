<script setup lang="ts">

await navigateTo('/login', { replace: true, redirectCode: 301 })

useHead({
  title: 'Rejestracja',
})

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/dashboard',
  },
  pageTransition: {
    name: 'slide-left',
    mode: 'out-in',
  },
})
</script>

<template>
  <div class="flex w-100 min-h-screen justify-center items-center">
    <section class="bg-slate-50 p-10 space-y-4 md:w-[550px] rounded-3xl shadow-lg">
      <TheSectionHeader title="Rejestracja" subtitle="Zarejestruj się, aby uzyskać dostęp do panelu." border />
      <AuthFormRegister />
    </section>
  </div>
</template>
