<script setup lang="ts">

interface StatisticCardProps {
  title: string
  value: string | number
  icon: string
  route: string
}

const props: StatisticCardProps = defineProps<StatisticCardProps>()

</script>

<template>
  <UCard class="text-center w-full md:w-[220px]">
    <template #header>
      <h2 class="text-md font-medium">{{ props.title }}</h2>
    </template>

    <div class="flex flex-row items-center justify-center gap-2 font-medium">
      <UIcon :name="props.icon" class="text-4xl text-primary" dynamic />
      <h3 class="text-5xl">{{ props.value }}</h3>
    </div>

    <template #footer>
      <UButton
        block
        size="sm"
        color="primary"
        variant="ghost"
        trailing
        label="Zobacz więcej"
        :to="props.route"
      >
        <template #trailing>
          <UIcon name="i-heroicons-arrow-right-20-solid" />
        </template>
      </UButton>
    </template>
  </UCard>
</template>

<style scoped>

</style>