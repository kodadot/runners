import {
  Sql,
  sqliteOnly as sql,
} from "https://deno.land/x/polysql@v0.0.9/mod.ts"
import { CHAIN } from "./env.ts"

export const intoInsert = <T>(table: string, rows: T[]): Sql => {
  const statement =
    sql`INSERT OR IGNORE INTO "${table}" <${rows}>`;
  return statement;
};

export const sqlToString = (statement: Sql): string => {
  return "" + statement;
};

export const saveStatement = async (statement: Sql) => {
  await Deno.writeTextFile(`./${CHAIN}.sql`, statement.toString());
};
