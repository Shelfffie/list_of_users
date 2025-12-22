import db from "../firebase.js";

const escapeRegex = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  let limit = 10;
  const offset = (page - 1) * limit;
  const filter = req.query.filter;

  const snapshot = await db.ref(`users`).once("value");
  if (!snapshot.exists()) {
    return res.status(204);
  }

  const usersObj = Object.entries(snapshot.val()).map(([id, user]) => ({
    id,
    ...user,
  }));

  let filtered = usersObj;
  if (filter) {
    const safe = escapeRegex(filter).toLowerCase();
    filtered = usersObj.filter((user) => {
      const keyWords = user.search.split(/\s+/);
      return keyWords.some((word) => word.startsWith(safe));
    });
  }

  console.log("FILTER:", filter);
  console.log("FOUND:", filtered.length);

  const users = filtered.slice(offset, offset + limit);

  let totalPage = Math.ceil(filtered.length / limit);

  if (page > totalPage) {
    return res.json({ users: [], totalPage });
  }

  res.json({ users, totalPage });
};

const createUser = async (req, res) => {
  const { name, lastName, email, phone, birthday } = req.body;

  if (!name || !lastName || !email || !phone || !birthday) {
    return res
      .status(400)
      .json({ message: "Всі поля повинні бути заповнені!" });
  }

  const snapshot = await db.ref(`users`).once("value");
  const users = snapshot.val();

  let userExist = users
    ? Object.values(users).some(
        (user) => user.email === email || user.phone === phone
      )
    : false;

  if (userExist) {
    return res.status(409).json({
      message: "Користувач з такими поштою або/і телефоном вже існує!",
    });
  }

  const newUserRef = db.ref("users").push();
  await newUserRef.set({ name, lastName, email, phone, birthday });
  res.status(201).json({
    message: "Користувача успішно створено!",
    user: { id: newUserRef.key, name, lastName, email, phone, birthday },
  });
};

const changeUser = async (req, res) => {
  const body = req.body;
  const { id } = req.params;

  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({ message: "Немає даних для зміни!" });
  }

  const snapshot = await db.ref(`users/${id}`).once("value");

  if (!snapshot.exists()) {
    return res.status(409).json({
      message: "Такого користувача не існує!",
    });
  }

  await db.ref(`users/${id}`).update(body);
  res.status(200).json({ user: snapshot.val() });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const snapshot = await db.ref(`users/${id}`).once("value");

  if (!snapshot.exists()) {
    return res.status(409).json({
      message: "Такого користувача не існує!",
    });
  }

  await db.ref(`users/${id}`).remove();
  res.status(204);
};

export { getUsers, createUser, changeUser, deleteUser };
