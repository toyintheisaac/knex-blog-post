import request from "supertest";
import { app, server } from "../src/index";  
import { faker } from "@faker-js/faker";
import db from "../src/database/knex";

describe("Address API", () => {
  let existingUserId: number | null = null;
  let postId: number | null = null;

  beforeAll(async () => { 
    const user = await db("users").first("*"); 

    if (user) {
      existingUserId = Number(user.id);
    } else {
      throw new Error("No users found in the database.");
    }

  });

  afterAll((done) => {
    server.close(done); // Close the server after tests
  });

  it("should create an post", async () => {
    const testPost = { 
      title: faker.lorem.sentence(), 
      body: faker.lorem.paragraphs(2),
      userId: existingUserId,  
    };

    const res = await request(app).post("/api/posts").send(testPost);
    console.log("Create Response:", res.body);

    expect(res.statusCode).toBe(201);
    postId = res.body?.data?.post?.id
  });
  
  it("should get user posts", async () => {
    const res = await request(app).get(`/api/posts?userId=${existingUserId}`);
    console.log("Get Response:", res.body);

    expect(res.statusCode).toBe(200);
  });

  it("should delete post", async () => {
    const res = await request(app).delete(`/api/posts/${postId}`);
    console.log("Get Response:", res.body);

    expect(res.statusCode).toBe(200);
  });


});