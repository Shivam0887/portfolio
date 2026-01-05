import fs from "fs";
import path from "path";

// Manually load env from .env or .env.local before anything else
try {
  const envPath = fs.existsSync(".env.local") ? ".env.local" : ".env";
  const envConfig = fs.readFileSync(envPath, "utf-8");
  envConfig.split("\n").forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith("#")) return;

    const [key, ...valueChunks] = trimmedLine.split("=");
    if (key && valueChunks.length > 0) {
      let value = valueChunks.join("=").split("#")[0].trim(); // Remove inline comments
      // Remove surrounding quotes if they exist
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key.trim()] = value;
    }
  });
  console.log("Environment variables loaded.");
} catch (e) {
  console.warn("Could not load .env file", e);
}

async function createAdmin() {
  console.log("Creating admin user with email admin@example.com...");
  try {
    // Dynamic import to ensure process.env is populated first
    const { auth } = await import("../lib/auth");

    const user = await auth.api.signUpEmail({
      body: {
        email: "admin@example.com",
        password: "admin123", // CHANGE THIS IMMEDIATELY
        name: "John Doe",
      },
    });
    console.log("Admin user created successfully!");
    console.log("Email: admin@example.com");
    console.log("Password: admin123");
  } catch (error: any) {
    if (
      error.message?.includes("already exists") ||
      error.body?.message?.includes("already exists")
    ) {
      console.log("Admin user already exists.");
    } else {
      console.error("Failed to create admin user:", error);
    }
  } finally {
    process.exit();
  }
}

createAdmin();
