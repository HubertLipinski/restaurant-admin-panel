<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const config = useRuntimeConfig()
const title = config.public.appTitle

const store = useNavStore()

const { roleBasedNavigation } = storeToRefs(store)

const hidden = ref(false)

const breakpoints = useBreakpoints(breakpointsTailwind)

const xs = breakpoints.smaller('sm')
const md = breakpoints.smaller('md')
const mdUp = breakpoints.greaterOrEqual('md')

const navbarVisible = computed(() => {
  return !(xs || md)
})

watch(navbarVisible, (value) => {
  if (value) {
    hidden.value = false
  }
})

function toggleNavabr() {
  hidden.value = !hidden.value
}
</script>

<template>
  <nav class="min-w-[250px] max-h-screen bg-slate-100 px-6 md:pb-6 md:flex md:flex-col">
    <div class="flex flex-row justify-between items-center">
      <ULink
        to="/dashboard"
        class="flex items-center text-primary text-md font-medium tracking-wide py-5 pl-1 hover:text-primary-400">
        <UIcon name="i-medical-icon-restaurant" class="mr-2 align-mid text-2xl" />
        <span class="truncate">{{ title }}</span>
      </ULink>
      <UButton
        color="primary"
        variant="ghost"
        icon="i-heroicons-outline-menu"
        class="md:hidden"
        size="lg"
        square
        @click="toggleNavabr" />
    </div>
    <div class="w-full flex flex-col md:flex-grow" v-auto-animate>
      <div v-if="hidden || mdUp || navbarVisible" class="flex flex-col items-start gap-y-5 md:flex-grow pb-4 md:pb-0">
        <ul class="flex flex-col flex-grow w-full pt-0 md:pt-2">
          <UVerticalNavigation :links="roleBasedNavigation" v-auto-animate>
            <template #default="{ link }">
              <span
                v-if="link.active"
                class="absolute left-[2px] top-0 min-h-full border border-primary-500 bg-primary-500 border-x-1" />
              <div class="relative text-left">
                <div>
                  {{ link.label }}
                </div>
              </div>
            </template>
          </UVerticalNavigation>
        </ul>
        <PartialUserMenu />
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
