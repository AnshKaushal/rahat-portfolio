const { MongoClient } = require("mongodb")
const bcrypt = require("bcrypt")

async function createAdmin() {
  const client = new MongoClient(
    process.env.MONGODB_URI || "mongodb://localhost:27017/rahat-portfolio"
  )

  try {
    await client.connect()
    const db = client.db("portfolio")

    const hashedPassword = await bcrypt.hash("admin123", 12)

    const admin = {
      email: "admin@rahatsunil.com",
      password: hashedPassword,
      createdAt: new Date(),
    }

    await db.collection("admins").insertOne(admin)
    console.log("Admin user created successfully")
  } catch (error) {
    console.error("Error creating admin:", error)
  } finally {
    await client.close()
  }
}

createAdmin()
