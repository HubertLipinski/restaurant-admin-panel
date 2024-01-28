export const useBreadcrumbsStore = defineStore('breadcrumbs', () => {
  const route = useRoute()
  const router = useRouter()

  const breadcrumbs = computed(() => {
    const fullPath = route.fullPath
    const params = fullPath.startsWith('/') ? fullPath.substring(1).split('/') : fullPath.split('/')
    const crumbs = []

    let path = ''

    params.forEach((param) => {
      path = `${path}/${param}`

      let match = { name: null }

      // fix missing route console warning
      const missingRoutes = [
        '/users/([0-9]+)$',
        '/orders/([0-9]+)$',
      ]

      if (!missingRoutes.some(route => path.match(route))) {
        match = router.resolve(path)
      }

      if (match.name) {
        crumbs.push({
          label: match.name,
          to: match.path,
        })
      }
    })

    return crumbs
  })

  return { breadcrumbs }
})
