import { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: { filename: "./db.sqlite" },
    useNullAsDefault: true, 
    migrations: {
      directory: "../migrations",
    }, 
  }
};

export default config;