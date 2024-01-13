<script setup lang="ts">
const { data: user }: { data: User; unknown } = useAuth()
const { clearToken } = useAuthState()

async function signOut() {
  await useFetch('/logout', { method: 'POST', body: {} })
  await clearToken()
  window.location.reload()
}

const items = [
  [
    {
      label: user.value?.email,
      slot: 'account',
      disabled: true,
    },
  ],
  [
    {
      label: 'Ustawienia',
      icon: 'i-heroicons-cog-8-tooth',
    },
  ],

  [
    {
      slot: 'logout',
      label: 'Wyloguj się',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: () => {
        signOut()
      },
    },
  ],
]
</script>

<template>
  <UDropdown
    :items="items"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-start' }"
    class="md:w-full">
    <UButton :label="user?.email ?? '-'" variant="ghost" :block="true" class="justify-evenly">
      <template #leading>
        <UAvatar src="https://via.placeholder.com/150" size="md" />
      </template>
    </UButton>
    <template #account="{ item }">
      <div class="text-left">
        <p>Zalogowany jako</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
        <p class="truncate text-gray-800 dark:text-white mt-2">Rola użytkownika</p>
        <span class="truncate font-medium text-gray-900 dark:text-white">
          {{ user?.privilegesLevel ?? 'Brak roli' }}
        </span>
      </div>
    </template>
    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>
      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
    </template>
  </UDropdown>
</template>

<style scoped></style>
