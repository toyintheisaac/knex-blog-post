import db from "../database/knex";

export const getUsers = async (page: number, pageSize: number) =>
  await db("users").select("*").limit(pageSize).offset(page * pageSize);

export const getUserById = async (id: number) =>
  await db("users").where({ id }).first();

export const getUserWithAddress = async (userId: number) => {
  return await db("users")
    .leftJoin("addresses", "users.id", "addresses.user_id")
    .select(
      "users.id",
      "users.name",
      "users.email",
      "addresses.address", 
    )
    .where("users.id", userId)
    .first();  
};

export const createUser = async (name: string, email: string) => {
  const [user] = await db("users").insert({ name, email }).returning("*");
  return user;  
};

export const getUserCount = async () =>   await db("users").count("* as count").first();


export const getUserByEmail = async (email: string) => {
    return await db("users").where({ email }).first();  
};