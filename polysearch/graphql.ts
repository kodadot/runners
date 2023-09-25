import { importQL } from "https://deno.land/x/importql@v1.0.0/mod.ts";

type GraphQuery = {
  query: string;
  variables: any;
};

export function resolveQuery(
  name: string,
  variables?: Record<string, any>,
): GraphQuery {
  const query: any = importQL(`./queries/${name}.graphql`);
  return { query: query.loc.source.body, variables: variables ?? {} };
}

export function getCollectionsCreatedAfter(date: string, supply = 20) {
  const query = resolveQuery("collectionsCreatedAfter", {
    after: date,
    supply,
  });
  return query;
}

// export function getItemsFromCollections(list: string[]) {
//   const query = resolveQuery('tokensInCollectionList', { list });
//   console.log(query);
//   return query;
// }
