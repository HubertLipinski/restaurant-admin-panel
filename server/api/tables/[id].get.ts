import mockTables from '~/server/mock/mockTables'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const data: Tables[] = mockTables

  return data.find((table: Table) => {
    return table.id === parseInt(id)
  })
})
