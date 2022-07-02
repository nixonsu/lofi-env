/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import brcrypt from "bcrypt";
import db from "./config/db";
import app from "../server";
import User from "../models/user.model";
import Task from "../models/task.model";

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
  // Create task resource for user
  await Task.create({ user: user.id, text: "Fold clothes", isDone: false });
});

afterEach(async () => {
  await db.clear();
});

afterAll(async () => {
  await db.close();
});

describe("Task", () => {
  describe("Get tasks", () => {
    describe("Given user is logged in", () => {
      it("Should return 200 OK with task json", async () => {
        // Arrange
        const loginResponse = await agent
          .post("/api/users/login")
          .send(userPayload);
        const { _id: userId, token } = loginResponse.body;

        // Act
        const { statusCode, body } = await agent
          .get("/api/tasks")
          .set("Authorization", `Bearer ${token}`);

        // Assert
        expect(statusCode).toBe(200);
        expect(body).toEqual([
          {
            __v: expect.any(Number),
            _id: expect.any(String),
            createdAt: expect.any(String),
            isDone: false,
            text: "Fold clothes",
            updatedAt: expect.any(String),
            user: userId,
          },
        ]);
      });
    });

    describe("Given user is not logged in", () => {
      it("Should return 401 Unauthorized", async () => {
        // Act
        const { statusCode, body } = await agent.get("/api/tasks");

        // Assert
        expect(statusCode).toBe(401);
        expect(body).toEqual({
          message: "Not authorized. no token",
          stack: expect.any(String),
        });
      });
    });
  });

  describe("Create task", () => {
    describe("Given user is logged in", () => {
      it("Should return 201 Created with task json", async () => {
        // Arrange
        const loginResponse = await agent
          .post("/api/users/login")
          .send(userPayload);
        const { _id: userId, token } = loginResponse.body;

        // Act
        const { statusCode, body } = await agent
          .post("/api/tasks")
          .set("Authorization", `Bearer ${token}`)
          .send({ text: "Wash clothes" });

        // Assert
        expect(statusCode).toBe(201);
        expect(body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          createdAt: expect.any(String),
          isDone: false,
          text: "Wash clothes",
          updatedAt: expect.any(String),
          user: userId,
        });
      });
    });
    describe("Given user is not logged in", () => {
      it("Should return 401 Unauthorized", async () => {
        // Act
        const { statusCode, body } = await agent
          .post("/api/tasks")
          .send({ text: "Wash clothes" });

        // Assert
        expect(statusCode).toBe(401);
        expect(body).toEqual({
          message: "Not authorized. no token",
          stack: expect.any(String),
        });
      });
    });
    describe("Given text field is missing", () => {
      it("Should return 400 Bad Request", async () => {
        // Arrange
        const loginResponse = await agent
          .post("/api/users/login")
          .send(userPayload);
        const { _id: userId, token } = loginResponse.body;

        // Act
        const { statusCode, body } = await agent
          .post("/api/tasks")
          .set("Authorization", `Bearer ${token}`)
          .send({});

        // Assert
        expect(statusCode).toBe(400);
        expect(body).toEqual({
          message: "Please add a text field",
          stack: expect.any(String),
        });
      });
    });
  });

  describe("Update task", () => {
    describe("Given user is logged in", () => {
      it("Should return 200 OK with task json", async () => {
        // Arrange
        const loginResponse = await agent
          .post("/api/users/login")
          .send(userPayload);
        const { _id: userId, token } = loginResponse.body;
        const { _id: taskId } = await Task.create({
          user: userId,
          text: "Wash clothes",
          isDone: false,
        });

        // Act
        const { statusCode, body } = await agent
          .put(`/api/tasks/${taskId}`)
          .set("Authorization", `Bearer ${token}`)
          .send({ text: "Fold clothes" });

        // Assert
        expect(statusCode).toBe(200);
        expect(body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          createdAt: expect.any(String),
          isDone: false,
          text: "Fold clothes",
          updatedAt: expect.any(String),
          user: userId,
        });
      });
    });
    describe("Given user is not logged in", () => {
      it("Should return 401 Unauthorized", async () => {
        // Act
        const { statusCode, body } = await agent
          .put(`/api/tasks/628e3317f15de6f0fa103ef1`)
          .send({ text: "Fold clothes" });

        // Assert
        expect(statusCode).toBe(401);
        expect(body).toEqual({
          message: "Not authorized. no token",
          stack: expect.any(String),
        });
      });
    });
    describe("Given task does not exist", () => {
      it("Should return 404 Not Found", async () => {
        // Arrange
        const loginResponse = await agent
          .post("/api/users/login")
          .send(userPayload);
        const { _id: userId, token } = loginResponse.body;

        // Act
        const { statusCode, body } = await agent
          .put("/api/tasks/628e3317f15de6f0fa103ef1")
          .set("Authorization", `Bearer ${token}`)
          .send({ text: "Fold clothes" });

        // Assert
        expect(statusCode).toBe(404);
        expect(body).toEqual({
          message: "Task not found",
          stack: expect.any(String),
        });
      });
    });
  });

  describe("Delete task", () => {
    describe("Given user is logged in", () => {
      it("Should return 200 OK with task json", async () => {
        // Arrange
        const loginResponse = await agent
          .post("/api/users/login")
          .send(userPayload);
        const { _id: userId, token } = loginResponse.body;
        const { id: taskId } = await Task.create({
          user: userId,
          text: "Wash clothes",
          isDone: false,
        });

        // Act
        const { statusCode, body } = await agent
          .delete(`/api/tasks/${taskId}`)
          .set("Authorization", `Bearer ${token}`);

        // Assert
        expect(statusCode).toBe(200);
        expect(body).toEqual({
          id: taskId,
        });
      });
    });
    describe("Given user is not logged in", () => {
      it("Should return 401 Unauthorized", async () => {
        // Act
        const { statusCode, body } = await agent.delete(
          `/api/tasks/628e3317f15de6f0fa103ef1`
        );

        // Assert
        expect(statusCode).toBe(401);
        expect(body).toEqual({
          message: "Not authorized. no token",
          stack: expect.any(String),
        });
      });
    });
    describe("Given task does not exist", () => {
      it("Should return 404 Not Found", async () => {
        // Arrange
        const loginResponse = await agent
          .post("/api/users/login")
          .send(userPayload);
        const { _id: userId, token } = loginResponse.body;

        // Act
        const { statusCode, body } = await agent
          .delete("/api/tasks/628e3317f15de6f0fa103ef1")
          .set("Authorization", `Bearer ${token}`);

        // Assert
        expect(statusCode).toBe(404);
        expect(body).toEqual({
          message: "Task not found",
          stack: expect.any(String),
        });
      });
    });
  });
});
