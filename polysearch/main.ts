// deno-lint-ignore-file no-explicit-any
import { format, startOfDay, subDays } from 'https://esm.sh/date-fns@3.6.0'
import { getClient } from 'https://esm.sh/@kodadot1/uniquery@0.6.0-rc.0'
import { getCollectionsCreatedAfter } from './graphql.ts'
import { mapToCollectionInsert } from './mapper.ts'
import { intoInsert, saveStatement } from './sql.ts'
import { CHAIN, DAYS, SUPPLY } from './env.ts'

try {
  const client = getClient(CHAIN as any)
  const date = startOfDay(subDays(new Date(), DAYS))

  console.log(`[CHAIN]: ${CHAIN} [AFTER]: ${format(date, 'yyyy-MM-dd')}`)

  const query = getCollectionsCreatedAfter(date.toISOString(), SUPPLY)
  
  const result: any = await client.fetch(query)

  if (!result || !result.data || !result.data.collections?.length) {
    console.warn('EMPTY RESULT FOR CHAIN: ', CHAIN)
    Deno.exit(0)
  }

  const collections = result.data.collections.map(mapToCollectionInsert).filter(Boolean)

  if (!collections.length) {
    console.warn('EMPTY RESULT FOR CHAIN: ', CHAIN)
    Deno.exit(0)
  }

  const statement = intoInsert('collections', collections)
  saveStatement(statement)
} catch (error) {
  console.log(error)
  Deno.exit(1)
}
