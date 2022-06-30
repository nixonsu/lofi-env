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
      it("Should return 200 OK with link json", async () => {});
    });

    describe("Given user is not logged in", () => {
      it("Should return 401 Unauthorized", async () => {});
    });
  });

  describe("Create link", () => {
    describe("Given user is logged in", () => {
      it("Should return 201 Created with link json", async () => {});
    });
    describe("Given user is not logged in", () => {
      it("Should return 401 Unauthorized", async () => {});
    });
    describe("Given url field is missing", () => {
      it("Should return 400 Bad Request", async () => {});
    });
  });

  describe("Update link", () => {
    describe("Given user is logged in", () => {
      it("Should return 200 OK with link json", async () => {});
    });
    describe("Given user is not logged in", () => {
      it("Should return 401 Unauthorized", async () => {});
    });
    describe("Given link does not exist", () => {
      it("Should return 404 Not Found", async () => {});
    });
    describe("Given user updates another users link", () => {
      it("Should return 401 Unauthorized", async () => {});
    });
  });

  describe("Delete link", () => {
    describe("Given user is logged in", () => {
      it("Should return 200 OK with link json", async () => {});
    });
    describe("Given user is not logged in", () => {
      it("Should return 401 Unauthorized", async () => {});
    });
    describe("Given link does not exist", () => {
      it("Should return 404 Not Found", async () => {});
    });
    describe("Given user deletes another users link", () => {
      it("Should return 401 Unauthorized", async () => {});
    });
  });
});
