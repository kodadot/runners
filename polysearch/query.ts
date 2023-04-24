import {
  extendFields,
  getClient,
} from "https://esm.sh/@kodadot1/uniquery@0.3.0-rc.0";
import { startOfDay, subDays } from "https://esm.sh/date-fns@2.29.3";
import { Prefix } from "https://esm.sh/@kodadot1/static@0.0.1";

export function getCollections(prefix: Prefix) {
  const client = getClient(prefix);
  const date = startOfDay(subDays(new Date(), 1));
  console.log(date);
  const query = client.collectionListCreatedAfter(date, {
    fields: extendFields(["meta"]),
    limit: 10,
  });

  return client.fetch(query);
}

// console.log(result);
