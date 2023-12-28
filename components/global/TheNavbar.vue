<script setup lang="ts">
const config = useRuntimeConfig()
const title = config.public.appTitle

const store = useNavStore()

const { roleBasedNavigation } = storeToRefs(store)
</script>

<template>
  <nav class="min-w-[250px] max-h-screen bg-slate-100 px-6 pb-6 md:flex md:flex-col">
    <UButton
      variant="ghost"
      size="lg"
      to="/"
      class="inline-flex text-xl sm:text-2xl pt-5 hover:bg-slate-200 hover:text-primary-400">
      <span>{{ title }}</span>
      <UIcon name="i-heroicons-light-bulb" />
    </UButton>
    <hr class="my-2 bg-primary" />
    <ul class="flex flex-col flex-grow">
      <UVerticalNavigation :links="roleBasedNavigation">
        <template #default="{ link }">
          <div class="relative text-left w-full my-3">
            <div>
              {{ link.label }}
            </div>
          </div>
        </template>
      </UVerticalNavigation>
    </ul>
    <PartialUserMenu />
  </nav>
</template>

<style scoped></style>
