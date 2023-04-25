// deno-lint-ignore-file no-explicit-any
import { startOfDay, subDays } from 'https://cdn.skypack.dev/date-fns@^2.29.2'
import { getClient } from 'https://esm.sh/@kodadot1/uniquery@0.3.0-rc.0'
import { getCollectionsCreatedAfter } from './graphql.ts'
import { mapToCollectionInsert } from './mapper.ts'
import { intoInsert, saveStatement } from './sql.ts'
import { CHAIN } from './env.ts'

try {
  const client = getClient(CHAIN as any)
  const date = startOfDay(subDays(new Date(), 7))

  console.log(`FETCHING ${CHAIN} COLLECTIONS CREATED AFTER ${date}`)

  const query = getCollectionsCreatedAfter(date.toISOString(), 20)
  
  const result: any = await client.fetch(query)

  if (!result || !result.data || !result.data.collections?.length) {
    console.log('no result')
    Deno.exit(0)
  }

  const collections = result.data.collections.map(mapToCollectionInsert)

  const statement = intoInsert('collections', collections)
  saveStatement(statement)
} catch (error) {
  console.log(error)
  Deno.exit(1)
}
