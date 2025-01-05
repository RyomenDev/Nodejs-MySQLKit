const mysql = require("mysql2/promise");

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password", // Replace with your MySQL password
  database: "tf_demo",
});

// Fetch all users
async function getAllUsers() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

// Add a new user
async function addUser(name, email) {
  const [result] = await pool.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email]
  );
  return { id: result.insertId, name, email };
}

// Update a user's email
async function updateUserEmail(userId, email) {
  const [result] = await pool.query("UPDATE users SET email = ? WHERE id = ?", [
    email,
    userId,
  ]);
  return result.affectedRows > 0;
}

// Delete a user by ID
async function deleteUser(userId) {
  const [result] = await pool.query("DELETE FROM users WHERE id = ?", [userId]);
  return result.affectedRows > 0;
}

// Fetch all posts with their authors
async function getAllPosts() {
  const [rows] = await pool.query(`
    SELECT posts.id, posts.title, posts.body, users.name AS author
    FROM posts
    JOIN users ON posts.user_id = users.id
  `);
  return rows;
}

// Add a new post
async function addPost(userId, title, body) {
  const [result] = await pool.query(
    "INSERT INTO posts (user_id, title, body) VALUES (?, ?, ?)",
    [userId, title, body]
  );
  return { id: result.insertId, userId, title, body };
}

// Fetch comments for a specific post
async function getCommentsByPost(postId) {
  const [rows] = await pool.query(
    `
    SELECT comments.content, users.name AS commenter
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE comments.post_id = ?
  `,
    [postId]
  );
  return rows;
}

// Add a new comment
async function addComment(postId, userId, content) {
  const [result] = await pool.query(
    "INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)",
    [postId, userId, content]
  );
  return { id: result.insertId, postId, userId, content };
}

// Like a post
async function likePost(postId, userId) {
  const [result] = await pool.query(
    "INSERT INTO likes (post_id, user_id) VALUES (?, ?)",
    [postId, userId]
  );
  return { id: result.insertId, postId, userId };
}

// Get the most liked posts
async function getMostLikedPosts() {
  const [rows] = await pool.query(`
    SELECT posts.title, users.name AS author, COUNT(likes.id) AS like_count
    FROM posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN likes ON posts.id = likes.post_id
    GROUP BY posts.id
    ORDER BY like_count DESC
  `);
  return rows;
}

// Export all functions
module.exports = {
  getAllUsers,
  addUser,
  updateUserEmail,
  deleteUser,
  getAllPosts,
  addPost,
  getCommentsByPost,
  addComment,
  likePost,
  getMostLikedPosts,
};
