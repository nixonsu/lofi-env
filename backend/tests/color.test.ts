/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import brcrypt from "bcrypt";
import db from "./config/db";
import app from "../server";
import User from "../models/user.model";
import Color from "../models/color.model";

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
  // Create color resource for user
  await Color.create({ user: user.id });
});

afterEach(async () => {
  await db.clear();
});

afterAll(async () => {
  await db.close();
});

describe("Color", () => {
  describe("Get colors", () => {
    describe("Given user is logged in", () => {
      it("Should return 200 OK with color json", async () => {
        // Arrange
        const response = await agent.post("/api/users/login").send(userPayload);
        const { _id: userId, token } = response.body;

        // Act
        const { statusCode, body } = await agent
          .get("/api/colors")
          .set("Authorization", `Bearer ${token}`);

        // Assert
        expect(statusCode).toBe(200);
        expect(body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          backgroundColor: expect.any(String),
          createdAt: expect.any(String),
          primaryTextColor: expect.any(String),
          secondaryTextColor: expect.any(String),
          updatedAt: expect.any(String),
          user: userId,
        });
      });
    });
    describe("Given user is not logged in", () => {
      it("Should return 401 Unauthorized", async () => {
        // Act
        const { statusCode, body } = await agent.get("/api/colors");

        // Assert
        expect(statusCode).toBe(401);
        expect(body).toEqual({
          message: "Not authorized. no token",
          stack: expect.any(String),
        });
      });
    });
  });

  describe("Update color", () => {
    describe("Given user is logged in", () => {
      it("Should return 200 OK with updated color json", async () => {
        // Arrange
        const loginResponse = await agent
          .post("/api/users/login")
          .send(userPayload);
        const { _id: userId, token } = loginResponse.body;
        const colorResponse = await agent
          .get(`/api/colors`)
          .set("Authorization", `Bearer ${token}`);

        // Act
        const { statusCode, body } = await agent
          // eslint-disable-next-line no-underscore-dangle
          .put(`/api/colors/${colorResponse.body._id}`)
          .set("Authorization", `Bearer ${token}`)
          .send({ backgroundColor: "black" });

        // Assert
        expect(statusCode).toBe(200);
        expect(body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          backgroundColor: "black",
          createdAt: expect.any(String),
          primaryTextColor: expect.any(String),
          secondaryTextColor: expect.any(String),
          updatedAt: expect.any(String),
          user: userId,
        });
      });
    });
    describe("Given color does not exist", () => {
      it("Should return 404 Not Found", async () => {
        // Arrange
        const loginResponse = await agent
          .post("/api/users/login")
          .send(userPayload);
        const { token } = loginResponse.body;

        // Act
        const { statusCode, body } = await agent
          .put(`/api/colors/628e3317f15de6f0fa103ef1`)
          .set("Authorization", `Bearer ${token}`)
          .send({ backgroundColor: "black" });

        // Assert
        expect(statusCode).toBe(404);
        expect(body).toEqual({
          message: "Color not found",
          stack: expect.any(String),
        });
      });
    });
    describe("Given user is not logged in", () => {
      it("Should return 401 Unauthorized", async () => {
        // Act
        const { statusCode, body } = await agent
          .put(`/api/colors/628e3317f15de6f0fa103ef1`)
          .send({ backgroundColor: "black" });

        // Assert
        expect(statusCode).toBe(401);
        expect(body).toEqual({
          message: "Not authorized. no token",
          stack: expect.any(String),
        });
      });
    });
  });
});
