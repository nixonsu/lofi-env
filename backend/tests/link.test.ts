/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import brcrypt from "bcrypt";
import db from "./config/db";
import app from "../server";
import User from "../models/user.model";
import Link from "../models/link.model";

const userPayload = {
  name: "John",
  email: "JohnDoe@gmail.com",
  password: "Password123",
};

const agent = request.agent(app);

// Connection and Teardown functions
beforeAll(async () => {
  await db.connect();
});

beforeEach(async () => {
  // Create user
  const { name, email, password } = userPayload;
  const salt = await brcrypt.genSalt(10);
  const hashedPassword = await brcrypt.hash(password, salt);
  const user = await User.create({
    email,
    name,
    password: hashedPassword,
  });
  // Create link resource for user
  await Link.create({ user: user.id });
});

afterEach(async () => {
  await db.clear();
});

afterAll(async () => {
  await db.close();
});

describe("Link", () => {
  describe("Get links", () => {
    describe("Given user is logged in", () => {
      it("Should return 200 OK with link json", async () => {
        // Arrange
        const loginResponse = await agent
          .post("/api/users/login")
          .send(userPayload);
        const { _id: userId, token } = loginResponse.body;

        // Act
        const { statusCode, body } = await agent
          .get("/api/links")
          .set("Authorization", `Bearer ${token}`);

        // Assert
        expect(statusCode).toBe(200);
        expect(body).toEqual([
          {
            __v: expect.any(Number),
            _id: expect.any(String),
            createdAt: expect.any(String),
            title: "lofi hip hop radio - beats to relax/study to",
            updatedAt: expect.any(String),
            url: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
            user: userId,
          },
        ]);
      });
    });

    describe("Given user is not logged in", () => {
      it("Should return 401 Unauthorized", async () => {
        // Act
        const { statusCode, body } = await agent.get("/api/links");

        // Assert
        expect(statusCode).toBe(401);
        expect(body).toEqual({
          message: "Not authorized. no token",
          stack: expect.any(String),
        });
      });
    });
  });

  describe("Create link", () => {
    describe("Given user is logged in", () => {
      it("Should return 201 Created with link json", async () => {
        // Arrange
        const loginResponse = await agent
          .post("/api/users/login")
          .send(userPayload);
        const { _id: userId, token } = loginResponse.body;

        // Act
        const { statusCode, body } = await agent
          .post("/api/links")
          .set("Authorization", `Bearer ${token}`)
          .send({
            user: userId,
            title: "Joji - Glimpse of Us (1 HOUR)",
            url: "https://www.youtube.com/watch?v=FgD-x9ordJg&t=489s",
          });

        // Assert
        expect(statusCode).toBe(201);
        expect(body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          createdAt: expect.any(String),
          title: "Joji - Glimpse of Us (1 HOUR)",
          updatedAt: expect.any(String),
          url: "https://www.youtube.com/watch?v=FgD-x9ordJg&t=489s",
          user: userId,
        });
      });
    });
    describe("Given user is not logged in", () => {
      it("Should return 401 Unauthorized", async () => {
        // Act
        const { statusCode, body } = await agent.post("/api/links").send({
          title: "Joji - Glimpse of Us (1 HOUR)",
          url: "https://www.youtube.com/watch?v=FgD-x9ordJg&t=489s",
        });

        // Assert
        expect(statusCode).toBe(401);
        expect(body).toEqual({
          message: "Not authorized. no token",
          stack: expect.any(String),
        });
      });
    });
    describe("Given url field is missing", () => {
      it("Should return 400 Bad Request", async () => {
        // Arrange
        const loginResponse = await agent
          .post("/api/users/login")
          .send(userPayload);
        const { _id: userId, token } = loginResponse.body;

        // Act
        const { statusCode, body } = await agent
          .post("/api/links")
          .set("Authorization", `Bearer ${token}`)
          .send({
            user: userId,
            title: "Joji - Glimpse of Us (1 HOUR)",
          });

        // Assert
        expect(statusCode).toBe(400);
        expect(body).toEqual({
          message: "Please add a url field",
          stack: expect.any(String),
        });
      });
    });
  });

  describe("Update link", () => {
    describe("Given user is logged in", () => {
      it("Should return 200 OK with link json", async () => {
        // Arrange
        const loginResponse = await agent
          .post("/api/users/login")
          .send(userPayload);
        const { _id: userId, token } = loginResponse.body;
        const linkResponse = await agent
          .get("/api/links")
          .set("Authorization", `Bearer ${token}`);
        const [{ _id: linkId }] = linkResponse.body;

        // Act
        const { statusCode, body } = await agent
          .put(`/api/links/${linkId}`)
          .set("Authorization", `Bearer ${token}`)
          .send({
            title: "A Lofi Song",
          });

        // Assert
        expect(statusCode).toBe(200);
        expect(body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          createdAt: expect.any(String),
          title: "A Lofi Song",
          updatedAt: expect.any(String),
          url: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
          user: userId,
        });
      });
    });
    describe("Given user is not logged in", () => {
      it("Should return 401 Unauthorized", async () => {
        // Act
        const { statusCode, body } = await agent
          .put("/api/links/628e3317f15de6f0fa103ef1")
          .send({
            title: "Joji - Glimpse of Us (1 HOUR)",
            url: "https://www.youtube.com/watch?v=FgD-x9ordJg&t=489s",
          });

        // Assert
        expect(statusCode).toBe(401);
        expect(body).toEqual({
          message: "Not authorized. no token",
          stack: expect.any(String),
        });
      });
    });
    describe("Given link does not exist", () => {
      it("Should return 404 Not Found", async () => {
        // Arrange
        const loginResponse = await agent
          .post("/api/users/login")
          .send(userPayload);
        const { _id: userId, token } = loginResponse.body;

        // Act
        const { statusCode, body } = await agent
          .put("/api/links/628e3317f15de6f0fa103ef1")
          .set("Authorization", `Bearer ${token}`)
          .send({
            title: "A Lofi Song",
          });

        // Assert
        expect(statusCode).toBe(404);
        expect(body).toEqual({
          message: "Link not found",
          stack: expect.any(String),
        });
      });
    });
  });

  describe("Delete link", () => {
    describe("Given user is logged in", () => {
      it("Should return 200 OK with link json", async () => {
        // Arrange
        const loginResponse = await agent
          .post("/api/users/login")
          .send(userPayload);
        const { _id: userId, token } = loginResponse.body;
        const linkResponse = await agent
          .get("/api/links")
          .set("Authorization", `Bearer ${token}`);
        const [{ _id: linkId }] = linkResponse.body;

        // Act
        const { statusCode, body } = await agent
          .delete(`/api/links/${linkId}`)
          .set("Authorization", `Bearer ${token}`);

        // Assert
        expect(statusCode).toBe(200);
        expect(body).toEqual({
          id: linkId,
        });
      });
    });
    describe("Given user is not logged in", () => {
      it("Should return 401 Unauthorized", async () => {
        // Act
        const { statusCode, body } = await agent.delete(
          "/api/links/628e3317f15de6f0fa103ef1"
        );

        // Assert
        expect(statusCode).toBe(401);
        expect(body).toEqual({
          message: "Not authorized. no token",
          stack: expect.any(String),
        });
      });
    });
    describe("Given link does not exist", () => {
      it("Should return 404 Not Found", async () => {
        // Arrange
        const loginResponse = await agent
          .post("/api/users/login")
          .send(userPayload);
        const { _id: userId, token } = loginResponse.body;

        // Act
        const { statusCode, body } = await agent
          .delete("/api/links/628e3317f15de6f0fa103ef1")
          .set("Authorization", `Bearer ${token}`);

        // Assert
        expect(statusCode).toBe(404);
        expect(body).toEqual({
          message: "Link not found",
          stack: expect.any(String),
        });
      });
    });
  });
});
