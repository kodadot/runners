import { CHAIN } from "./env.ts";

// deno-lint-ignore no-explicit-any
export const mapToCollectionInsert = (collection: any) => {
  const content = {
    name: collection.name,
    image: collection.image || collection.meta?.image,
    media_url: collection.media || collection.meta?.animation_url,
  }

  if (!content.image || !content.name) {
    return null;
  }

  return {
    id: collection.id,
    name: content.name,
    image: content.image,
    media_url: content.media_url,
    metadata: collection.metadata,
    chain: CHAIN,
    volume: 0,
  };
};

// export const mapToItmeInsert = (item: any) => {

// }
