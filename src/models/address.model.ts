import db from "../database/knex";

 
export const insertAddress = async (user_id: number, address: string) => {
  const [addresses] = await db("addresses").insert({ address, user_id }).returning("*");
  return addresses;  
};

export const getAddressByUserId = async (user_id: number) => {
  return await db("addresses").where({ user_id }).first();  
};

export const updateUserAddress = async (user_id: number, newAddress: string) => {
  const [addresses] =  await db("addresses")
    .where({ user_id })
    .update({ address: newAddress })
    .returning("*");
    return addresses;  
};

 