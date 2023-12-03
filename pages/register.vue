<script setup lang="ts">
definePageMeta({
  colorMode: 'light',
  pageTransition: {
    name: 'slide-left',
    mode: 'out-in',
  },
})

const store = useUserStore()
if (store.isAuth) {
  navigateTo('/', { replace: true })
}
</script>

<template>
  <div class="flex w-100 min-h-screen justify-center items-center">
    <section class="bg-slate-50 p-10 space-y-4 md:w-[550px] rounded-3xl shadow-lg">
      <TheSectionHeader title="Rejestracja" subtitle="Zarejestruj się, aby uzyskać dostęp do panelu." border />
      <AuthFormRegister />
    </section>
  </div>
</template>
