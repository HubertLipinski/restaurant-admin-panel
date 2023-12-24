<script setup lang="ts">
interface sectionHeaderProps {
  title: string
  subtitle?: string | null
  border?: boolean
}

const props = withDefaults(defineProps<sectionHeaderProps>(), {
  subtitle: null,
  border: true,
})
</script>

<template>
  <header class="flex flex-col gap-2 mb-10 text-left" :class="props.border ? 'pb-4 border-b-2' : ''">
    <div class="flex justify-between items-center">
      <div class="flex flex-col flex-1 gap-x-4">
        <h1 class="text-2xl font-bold mb-0" :class="[{ 'mb-1': props.subtitle }]">{{ props.title }}</h1>
        <h2 v-if="props.subtitle" class="text-md text-slate-500 font-light mb-0">{{ props.subtitle }}</h2>
      </div>
      <slot name="actions" />
    </div>
  </header>
</template>
