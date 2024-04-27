const users = [
  {
    name: "John",
    lastname: "Doe",
    photo: "https://example.com/photos/john_doe.jpg",
    email: "john@example.com",
    password: "password123",
    age: 30,
    genre: "Male",
    events: ["60980e5f4e2b9529c35fc5c1", "60980e5f4e2b9529c35fc5c3"],
    role: "user",
  },
  {
    name: "Alice",
    lastname: "Smith",
    email: "alice@example.com",
    password: "password456",
    age: 25,
    genre: "Female",
    events: ["60980e5f4e2b9529c35fc5c2", "60980e5f4e2b9529c35fc5c4"],
    role: "organizer",
  },
];

import "dotenv/config.js";
import "../../config/database.js";

import User from "../User.js";

User.insertMany(users);

/* users.forEach(elemento => {
  User.create({
    name: elemento.name,
    lastname: elemento.lastname,
    email: elemento.email,
    password: elemento.password,
    age: elemento.age,
    genre: elemento.genre,
    events: elemento.events,
    role: elemento.role,
  });
});
 */
