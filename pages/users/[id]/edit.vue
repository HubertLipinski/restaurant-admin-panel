<script setup lang="ts">
import UserForm from '~/components/auth/users/UserForm.vue'
import { UserRole } from '~/types/user'

useHead({
  title: 'Edytuj użytkownika',
})

definePageMeta({
  layout: 'auth',
  name: 'Edytuj użytkownika',
  validate: async (route) => {
    return /^\d+$/.test(route.params.id)
  },
  middleware: ['user-role'],
  requiredRole: [UserRole.Admin],
})

const route = useRoute()
const router = useRouter()
const id = route.params.id

const { data: response } = await useApiFetch(`/users/${id}`)
const user = computed(() => response.value?.data)
</script>

<template>
  <div>
    <PageSkeleton v-if="!user" />
    <section v-else class="mt-2.5 py-2">
      <TheSectionHeader :title="`Edytuj użytkownika - ${user.name}`">
        <template #actions>
          <UButton
            icon="i-heroicons-arrow-small-left-20-solid"
            size="lg"
            color="gray"
            variant="soft"
            label="Wróć"
            @click="router.back"
            :trailing="false" />
        </template>
      </TheSectionHeader>
    </section>
    <UserForm :user="user" method="edit" />
  </div>
</template>

<style scoped></style>
