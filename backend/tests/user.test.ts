/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import brcrypt from "bcrypt";
import db from "./config/db";
import app from "../server";
import User from "../models/user.model";

const userPayload = {
  name: "John",
  email: "JohnDoe@gmail.com",
  password: "Password123",
};

const updatedName = "John Doe";
const updatedUserPayload = {
  name: updatedName,
};

const agent = request.agent(app);

// Connection and Teardown functions
beforeAll(async () => {
  await db.connect();
});

afterEach(async () => {
  await db.clear();
});

afterAll(async () => {
  await db.close();
});

describe("User", () => {
  describe("Register user", () => {
    describe("Given all fields are not supplied", () => {
      it("Should return 400 Bad Request", async () => {
        // Arrange
        const { password, ...userPayloadWithoutPassword } = userPayload;

        // Act
        const { statusCode } = await agent
          .post("/api/users")
          .send(userPayloadWithoutPassword);

        // Assert
        expect(statusCode).toBe(400);
      });
    });
    describe("Given user already exists", () => {
      it("Should return 400 Bad Request", async () => {
        // Arrange
        const { name, email, password } = userPayload;
        const salt = await brcrypt.genSalt(10);
        const hashedPassword = await brcrypt.hash(password, salt);
        await User.create({
          email,
          name,
          password: hashedPassword,
        });

        // Act
        const { statusCode } = await agent.post("/api/users").send(userPayload);

        // Assert
        expect(statusCode).toBe(400);
      });
    });
    describe("Given user does not exist", () => {
      it("Should return 201 Created", async () => {
        // Act
        const { statusCode, body } = await agent
          .post("/api/users")
          .send(userPayload);

        // Assert
        expect(statusCode).toBe(201);
        expect(body).toEqual({
          _id: expect.any(String),
          email: "JohnDoe@gmail.com",
          name: "John",
          token: expect.any(String),
        });
      });
    });
  });

  describe("Login user (create user session)", () => {
    describe("Given email and password are invalid", () => {
      it("Should return 401 Unauthorized", async () => {
        // Act
        const { statusCode } = await agent
          .post("/api/users/login")
          .send({ ...userPayload, password: "wrong password" });

        // Assert
        expect(statusCode).toBe(401);
      });
    });
    describe("Given email and password are valid", () => {
      it("Should return 200 OK with JWT", async () => {
        // Arrange
        const { name, email, password } = userPayload;
        const salt = await brcrypt.genSalt(10);
        const hashedPassword = await brcrypt.hash(password, salt);
        await User.create({
          email,
          name,
          password: hashedPassword,
        });

        // Act
        const { statusCode, body } = await agent
          .post("/api/users/login")
          .send(userPayload);

        // Assert
        expect(statusCode).toBe(200);
        expect(body).toEqual({
          _id: expect.any(String),
          email: "JohnDoe@gmail.com",
          name: "John",
          token: expect.any(String),
        });
      });
    });
  });

  describe("Get user", () => {
    describe("Given user is logged in", () => {
      it("Should return 200 OK with user json", async () => {
        // Arrange
        const { name, email, password } = userPayload;
        const salt = await brcrypt.genSalt(10);
        const hashedPassword = await brcrypt.hash(password, salt);
        await User.create({
          email,
          name,
          password: hashedPassword,
        });
        const response = await agent.post("/api/users/login").send(userPayload);
        const { token } = response.body;

        // Act
        const { statusCode, body } = await agent
          .get("/api/users/me")
          .set("Authorization", `Bearer ${token}`);

        // Assert
        expect(statusCode).toBe(200);
        expect(body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          createdAt: expect.any(String),
          email: "JohnDoe@gmail.com",
          name: "John",
          updatedAt: expect.any(String),
        });
      });
    });
    describe("Given user is not logged in", () => {
      it("Should return 401 Unauthorized", async () => {
        // Act
        const { statusCode, body } = await agent.get("/api/users/me");

        // Assert
        expect(statusCode).toBe(401);
        expect(body).toEqual({
          message: "Not authorized. no token",
          stack: expect.any(String),
        });
      });
    });
  });

  describe("Update user", () => {
    describe("Given user exists and is logged in", () => {
      it("Should return 200 OK with updated user json", async () => {
        // Arrange
        const { name, email, password } = userPayload;
        const salt = await brcrypt.genSalt(10);
        const hashedPassword = await brcrypt.hash(password, salt);
        await User.create({
          email,
          name,
          password: hashedPassword,
        });
        const response = await agent.post("/api/users/login").send(userPayload);
        const { _id: id, token } = response.body;

        // Act
        const { statusCode, body } = await agent
          .put(`/api/users/${id}`)
          .set("Authorization", `Bearer ${token}`)
          .send(updatedUserPayload);

        // Assert
        expect(statusCode).toBe(200);
        expect(body).toEqual({
          __v: expect.any(Number),
          _id: id,
          createdAt: expect.any(String),
          email: "JohnDoe@gmail.com",
          name: updatedName,
          updatedAt: expect.any(String),
        });
      });
    });
    describe("Given user is not logged in", () => {
      it("Should return 401 Unauthorized", async () => {
        // Arrange
        const { name, email, password } = userPayload;
        const salt = await brcrypt.genSalt(10);
        const hashedPassword = await brcrypt.hash(password, salt);
        await User.create({
          email,
          name,
          password: hashedPassword,
        });
        const response = await agent.post("/api/users/login").send(userPayload);
        const { _id } = response.body;

        // Act
        const { statusCode, body } = await agent
          .put(`/api/users/${_id}`)
          .send(updatedUserPayload);

        // Assert
        expect(statusCode).toBe(401);
        expect(body).toEqual({
          message: "Not authorized. no token",
          stack: expect.any(String),
        });
      });
    });
    describe("Given user does not exist", () => {
      it("Should return 404 Not Found", async () => {
        // Arrange
        const { name, email, password } = userPayload;
        const salt = await brcrypt.genSalt(10);
        const hashedPassword = await brcrypt.hash(password, salt);
        await User.create({
          email,
          name,
          password: hashedPassword,
        });
        const response = await agent.post("/api/users/login").send(userPayload);
        const { token } = response.body;

        // Act
        const { statusCode, body } = await agent
          .put(`/api/users/628e3317f15de6f0fa103ef1`)
          .set("Authorization", `Bearer ${token}`)
          .send(updatedUserPayload);

        // Assert
        expect(statusCode).toBe(404);
        expect(body).toEqual({
          message: "User not found",
          stack: expect.any(String),
        });
      });
    });
  });

  describe("Delete user", () => {
    describe("Given user exists and is logged in", () => {
      it("Should return 200 OK with deleted user id", async () => {
        // Arrange
        const { name, email, password } = userPayload;
        const salt = await brcrypt.genSalt(10);
        const hashedPassword = await brcrypt.hash(password, salt);
        await User.create({
          email,
          name,
          password: hashedPassword,
        });
        const response = await agent.post("/api/users/login").send(userPayload);
        const { _id: id, token } = response.body;

        // Act
        const { statusCode, body } = await agent
          .delete(`/api/users/${id}`)
          .set("Authorization", `Bearer ${token}`);

        // Assert
        expect(statusCode).toBe(200);
        expect(body).toEqual({
          id,
        });
      });
    });
    describe("Given user is not logged in", () => {
      it("Should return 401 Unauthorized", async () => {
        // Arrange
        const { name, email, password } = userPayload;
        const salt = await brcrypt.genSalt(10);
        const hashedPassword = await brcrypt.hash(password, salt);
        await User.create({
          email,
          name,
          password: hashedPassword,
        });
        const response = await agent.post("/api/users/login").send(userPayload);
        const { _id } = response.body;

        // Act
        const { statusCode, body } = await agent.delete(`/api/users/${_id}`);

        // Assert
        expect(statusCode).toBe(401);
        expect(body).toEqual({
          message: "Not authorized. no token",
          stack: expect.any(String),
        });
      });
    });
    describe("Given user does not exist", () => {
      it("Should return 404 Not Found", async () => {
        // Arrange
        const { name, email, password } = userPayload;
        const salt = await brcrypt.genSalt(10);
        const hashedPassword = await brcrypt.hash(password, salt);
        await User.create({
          email,
          name,
          password: hashedPassword,
        });
        const response = await agent.post("/api/users/login").send(userPayload);
        const { token } = response.body;

        // Act
        const { statusCode, body } = await agent
          .delete(`/api/users/628e3317f15de6f0fa103ef1`)
          .set("Authorization", `Bearer ${token}`);

        // Assert
        expect(statusCode).toBe(404);
        expect(body).toEqual({
          message: "User not found",
          stack: expect.any(String),
        });
      });
    });
  });
});
