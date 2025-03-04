/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("addresses", table => {
        table.increments("id").primary();
        table.string("address").notNullable(); 
        table.integer("user_id").references("id").inTable("users").onDelete("CASCADE").unique();
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("addresses");
};
