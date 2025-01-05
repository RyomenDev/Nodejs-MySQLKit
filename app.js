const db = require("./databaseCommands.js");

async function main() {
  // Fetch all users
  const users = await db.getAllUsers();
  console.log("Users:", users);

  // Add a new user
  const newUser = await db.addUser("Alice", "alice@example.com");
  console.log("Added User:", newUser);

  // Fetch all posts
  const posts = await db.getAllPosts();
  console.log("Posts:", posts);
}

main().catch(console.error);
