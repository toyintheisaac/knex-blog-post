import db from "../database/knex";

 
export const createPost = async (user_id: number, title: string, body: string) => {
  const [post] = await db("posts").insert({ user_id, title, body }).returning("*");
  return post;  
};

export const getPostByUserId = async (user_id: number) => {
  return await db("posts").where({ user_id }).returning("*"); 
};
export const getPostById = async (id: number) => {
  return await db("posts").where({ id }).returning("*"); 
};

export const destroyPost = async (id: number) => {
  return await db("posts").where({ id }).delete(); 
};
 
 