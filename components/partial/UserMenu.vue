<script setup lang="ts">

const store = useUserStore()

const logOutUser = () => {
  store.logOut()
  navigateTo('/login', { replace: true })
}

const items = [
  [{
    label: store.fullName,
    slot: 'account',
    disabled: true,
  }], [{
    label: 'Ustawienia',
    icon: 'i-heroicons-cog-8-tooth',
  }],
  // [{
  //   label: 'Documentation',
  //   icon: 'i-heroicons-book-open',
  // }, {
  //   label: 'Changelog',
  //   icon: 'i-heroicons-megaphone',
  // }, {
  //   label: 'Status',
  //   icon: 'i-heroicons-signal',
  // }],
  [{
    label: 'Wyloguj się',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: logOutUser,
  }],
]
</script>

<template>
  <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
    <UButton :label="store.fullName ?? '-'" variant="ghost" :block="true" class="justify-evenly">
      <template #leading>
        <UAvatar
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          size="md"
        />
      </template>
    </UButton>
    <template #account="{ item }">
      <div class="text-left">
        <p>
          Zalogowany jako
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
        <p class="truncate text-gray-800 dark:text-white">
          Rola użytkownika
        </p>
      </div>
    </template>
    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>
      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
    </template>
  </UDropdown>
</template>

<style scoped>

</style>
