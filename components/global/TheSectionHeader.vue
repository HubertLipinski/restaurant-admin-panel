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
  <header class="mb-10 text-left" :class="props.border ? 'pb-4 border-b-2' : ''">
    <div class="flex flex-col gap-2 justify-between">
      <div class="flex flex-row gap-y-3">
        <h1 class="text-2xl font-bold mb-0 flex-grow" :class="[{ 'mb-1': props.subtitle }]">{{ props.title }}</h1>
        <div class="flex-nowrap">
          <slot name="actions" />
        </div>
      </div>
      <h2 v-if="props.subtitle" class="text-md text-slate-500 font-light mb-0">{{ props.subtitle }}</h2>
    </div>
  </header>
</template>
