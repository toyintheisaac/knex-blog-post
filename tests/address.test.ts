import request from "supertest";
import { app, server } from "../src/index"; // Import the server instance
import { faker } from "@faker-js/faker";
import db from "../src/database/knex";

describe("Address API", () => {
  let existingUserId: number | null = null;

  beforeAll(async () => {
    // Ensure database cleanup before running tests  
    await db("addresses").del();  
    await db("users").del(); 

    // Create a new user
    const [newUser] = await db("users").insert(
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      ["id"]
    );

    existingUserId = Number(newUser.id);
  });

  afterAll((done) => {
    server.close(done); // Close the server after tests
  });

  it("should create an address", async () => {
    const testAddress = {
      address: faker.location.streetAddress(),
      userId: existingUserId,  
    };

    const res = await request(app).post("/api/addresses").send(testAddress);
    console.log("Create Response:", res.body);

    expect(res.statusCode).toBe(201);
  });

  it("should get user address", async () => {
    const res = await request(app).get(`/api/addresses/${existingUserId}`);
    console.log("Get Response:", res.body);

    expect(res.statusCode).toBe(200);
  });
});