import { CHAIN } from "./env.ts";

// deno-lint-ignore no-explicit-any
export const mapToCollectionInsert = (collection: any) => {
  return {
    id: collection.id,
    name: collection.name,
    image: collection.image || collection.meta.image,
    media_url: collection.media || collection.meta.animation_url,
    metadata: collection.metadata,
    chain: CHAIN,
    volume: 0,
  };
};

// export const mapToItmeInsert = (item: any) => {

// }
