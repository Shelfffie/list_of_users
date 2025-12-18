import axios from "axios";
import { useState, useEffect } from "react";
import { userValues } from "./type";

export default function UsersList() {
  const [users, setUsers] = useState<any>(null);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get("http://localhost:5000/users");
      if (response.status === 200) {
        setUsers(response.data.users);
      }
    };

    getUsers();
  }, []);

  return (
    <>
      <h1>Список користувачів:</h1>
      <ul>
        {users?.map((user: userValues) => (
          <li key={user.id}>
            <p>Name: {user.name}</p>
            <p>Last name: {user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Birthday: {user.birthday}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
