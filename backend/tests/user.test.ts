/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-empty-function */
import request from "supertest";
import brcrypt from "bcrypt";
import db from "./config/db";
import app from "../server";
import User from "../models/user.model";

const userInput = {
  name: "John",
  email: "JohnDoe@gmail.com",
  password: "Password123",
};

const agent = request.agent(app);

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
  describe("User registration", () => {
    describe("Given all fields are not supplied", () => {
      it("Should return 400 Bad Request", async () => {
        const { password, ...userInputWithoutPassword } = userInput;
        const { statusCode } = await agent
          .post("/api/users")
          .send(userInputWithoutPassword);

        expect(statusCode).toBe(400);
      });
    });
    describe("Given user already exists", () => {
      it("Should return 400 Bad Request", async () => {
        const { name, email, password } = userInput;
        const salt = await brcrypt.genSalt(10);
        const hashedPassword = await brcrypt.hash(password, salt);
        await User.create({
          email,
          name,
          password: hashedPassword,
        });

        const { statusCode } = await agent.post("/api/users").send(userInput);

        expect(statusCode).toBe(400);
      });
    });
    describe("Given user does not exist", () => {
      it("Should return 200 OK", async () => {
        const { statusCode, body } = await agent
          .post("/api/users")
          .send(userInput);

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
    describe("Given email and password are valid", () => {});
    describe("Given user does not exist", () => {});
  });

  describe("Get user", () => {
    describe("Given user is logged in", () => {});
    describe("Given user is not logged in", () => {});
  });

  describe("Update user", () => {
    describe("Given user is logged in", () => {});
    describe("Given user is not logged in", () => {});
  });

  describe("Delete user", () => {
    describe("Given user is logged in", () => {});
    describe("Given user is not logged in", () => {});
  });
});
