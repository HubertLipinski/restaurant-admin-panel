export const useBreadcrumbsStore = defineStore('breadcrumbs', () => {
  const route = useRoute()
  const router = useRouter()

  const breadcrumbs = computed(() => {
    const fullPath = route.fullPath
    const params = fullPath.startsWith('/') ? fullPath.substring(1).split('/') : fullPath.split('/')
    const crumbs = []

    let path = ''

    params.forEach((param, index) => {
      path = `${path}/${param}`
      const match = router.resolve(path)

      if (match.name !== null) {
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
