import axios from "axios";
import { useState, useEffect } from "react";
import { userValues } from "./type";

export default function UsersList() {
  const [users, setUsers] = useState<userValues[]>([]);
  const [editedData, setEditedData] = useState<Partial<userValues>>({});
  const [editUser, setEditUser] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get("http://localhost:5000/users");
      if (response.status === 200) {
        setUsers(response.data.users);
      }
    };

    getUsers();
  }, []);

  const setEdit = (user: userValues) => {
    setEditUser(user.id);
    setEditedData(user);
  };

  const setEditedDataFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name as keyof userValues;
    const value = e.target.value;

    setEditedData((prev) => (prev ? { ...prev, [inputName]: value } : {}));
  };

  const saveChanges = async (id: string) => {
    const response = await axios.put(
      `http://localhost:5000/users/${id}`,
      editedData
    );
    if (response.status === 200) {
      setEditUser(null);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, ...editedData } : user))
      );
      setEditedData({});
    }
  };

  const deleteUser = async (id: string) => {
    const response = await axios.delete(`http://localhost:5000/users/${id}`);
    if (response.status === 204) {
      setEditUser(null);
      setEditedData({});
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  return (
    <>
      <h1>Список користувачів:</h1>
      {users.length === 0 ? (
        <p>Список поки пустий</p>
      ) : (
        <ul>
          {users.map((user: userValues) =>
            user.id === editUser ? (
              <li key={user.id}>
                <p>Name:</p>
                <input
                  type="text"
                  value={editedData?.name}
                  name="name"
                  onChange={(e) => setEditedDataFunc(e)}
                />
                <p>Last name</p>{" "}
                <input
                  type="text"
                  value={editedData?.lastName}
                  name="lastName"
                  onChange={(e) => setEditedDataFunc(e)}
                />
                <p>Email:</p>{" "}
                <input
                  type="text"
                  value={editedData?.email}
                  name="email"
                  onChange={(e) => setEditedDataFunc(e)}
                />
                <p>Phone:</p>{" "}
                <input
                  type="text"
                  value={editedData?.phone}
                  name="phone"
                  onChange={(e) => setEditedDataFunc(e)}
                />
                <p>Birthday:</p>{" "}
                <input
                  type="date"
                  value={editedData?.birthday}
                  name="birthday"
                  onChange={(e) => setEditedDataFunc(e)}
                />
                <button onClick={() => saveChanges(user.id)}>Save</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
                <button
                  onClick={() => {
                    setEditUser(null);
                    setEditedData({});
                  }}
                >
                  Cancel
                </button>
              </li>
            ) : (
              <li key={user.id}>
                <p>Name: {user.name}</p>
                <p>Last name: {user.lastName}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Birthday: {user.birthday}</p>
                <button onClick={() => setEdit(user)}>Edit</button>
              </li>
            )
          )}
        </ul>
      )}
    </>
  );
}
