import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loginSchema, registerSchema } from "./auth.schemas";

describe("authentication input schemas", () => {
  it("normalizes the email address during registration", () => {
    const result = registerSchema.safeParse({
      name: " Ada ",
      email: " ADA@EXAMPLE.COM ",
      password: "correct horse battery",
    });

    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.data.name, "Ada");
      assert.equal(result.data.email, "ada@example.com");
    }
  });

  it("rejects passwords that exceed bcrypt's byte limit", () => {
    const result = registerSchema.safeParse({
      name: "Ada",
      email: "ada@example.com",
      password: "é".repeat(37),
    });

    assert.equal(result.success, false);
  });

  it("requires a non-empty password for login", () => {
    const result = loginSchema.safeParse({
      email: "ada@example.com",
      password: "",
    });

    assert.equal(result.success, false);
  });

  it("rejects login passwords that exceed bcrypt's byte limit", () => {
    const result = loginSchema.safeParse({
      email: "ada@example.com",
      password: "é".repeat(37),
    });

    assert.equal(result.success, false);
  });
});
