import express from "express";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173/" }));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
