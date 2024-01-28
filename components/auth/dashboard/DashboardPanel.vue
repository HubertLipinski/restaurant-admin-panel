<script setup lang="ts">

import StatisticCard from '~/components/auth/dashboard/StatisticCard.vue'
</script>

<template>
  <div class="flex flex-col md:flex-row flex-wrap justify-center md:justify-evenly gap-5 md:gap-7">
    <UChip size="3xl" color="primary">
      <StatisticCard title="Liczba zamówień" value="1" icon="heroicons-outline:shopping-cart" route="/orders" />
    </UChip>
    <StatisticCard title="Użytkownicy" value="2" icon="heroicons-outline:user-group" route="/users" />
    <StatisticCard title="Stoły" value="33" icon="i-ic-round-table-restaurant" route="/tables" />
    <StatisticCard title="Potrawy" value="4" icon="i-healthicons-hot-meal" route="/dishes" />
    <StatisticCard title="Karty menu" value="55" icon="i-bx-food-menu" route="/menus" />
  </div>
</template>

<style scoped>

</style>