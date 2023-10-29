<script setup lang="ts">
definePageMeta({
  colorMode: 'light',
})

</script>

<template>
  <div class="flex w-100 min-h-screen justify-center items-center">
    <section class="bg-slate-50 p-10 space-y-4 lg:min-w-[500px] rounded-3xl">
      <header class="flex flex-col gap-2 mb-10 text-left">
        <h1 class="text-2xl font-bold mb-0">Logowanie</h1>
        <h2 class="text-md text-slate-500 font-light mb-0">Zaloguj się, aby uzyskać dostęp do panelu.</h2>
      </header>
      <AuthFormLogin />
    </section>
  </div>

<!--  <UContainer>-->

<!--  </UContainer>-->
</template>

<style scoped>

</style>
