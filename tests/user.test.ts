import request from "supertest";
import { app, server } from "../src/index"; // Import the server instance
import { faker } from "@faker-js/faker";

describe("User API", () => {
  let createdUserId: number | null = null;

  afterAll((done) => {
    server.close(done); 
  });

  const testUser = {
    name: faker.person.fullName(),  
    email: faker.internet.email(),  
  };

  it("should create users", async () => {
    const res =  await request(app)
                .post("/api/users")
                .send(testUser) ;  
      
      console.log("Response Body: ", res.body);
    expect(res.statusCode).toBe(201);
    createdUserId = res.body.data?.user?.id;
  });

  it("should fetch users", async () => {
    const res = await request(app).get("/api/users");
    
    console.log("Response Body: ", res.body);
    expect(res.statusCode).toBe(200);
  });

  it("should count total users", async () => {
    const res = await request(app).get("/api/users/count");
    
    console.log("Response Body: ", res.body);
    expect(res.statusCode).toBe(200);
  });

  it("should get single user", async () => {
    if (!createdUserId) {
      throw new Error("No user ID available for test.");
    }

    const res = await request(app).get(`/api/users/${createdUserId}`);
    
    console.log("Response Body: ", res.body);
    expect(res.statusCode).toBe(200);
  });

});