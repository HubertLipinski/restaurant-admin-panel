import mockDishes from '~/server/mock/mockDishes'

export default defineEventHandler(() => {
  // const query = getQuery(event)

  // const type: MenuFilterType = query.type ?? null
  //
  // return data.filter((menu) => {
  //   if (type === 'inactive') {
  //     return !menu.active
  //   }
  //
  //   if (type === 'active') {
  //     return menu.active
  //   }
  //
  //   return true
  // })

  return mockDishes
})
