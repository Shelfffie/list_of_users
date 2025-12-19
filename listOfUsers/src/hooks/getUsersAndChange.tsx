import axios from "axios";
import { useState, useEffect } from "react";
import { userValues } from "../components/type";

export function useUsersFunc() {
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

    setEditedData((prev: Partial<userValues>) => ({
      ...prev,
      [inputName]: value,
    }));
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

  return {
    users,
    setUsers,
    editedData,
    setEditedData,
    editUser,
    setEditUser,
    setEdit,
    setEditedDataFunc,
    saveChanges,
    deleteUser,
  };
}
