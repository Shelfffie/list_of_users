import express from "express";
import {
  getUsers,
  createUser,
  changeUser,
  deleteUser,
} from "./components/users";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173/" }));

const PORT = 5000;

app.get("/users", getUsers);
app.post("/users", createUser);
app.put("/users/:id", changeUser);
app.delete("/users/:id", deleteUser);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
