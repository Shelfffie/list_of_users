import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { userValues } from "../components/type";

export function useUsersFunc(
  setDisplayedUsers: React.Dispatch<React.SetStateAction<userValues[]>>
) {
  const [users, setUsers] = useState<userValues[]>([]);
  const [editedData, setEditedData] = useState<Partial<userValues>>({});
  const [editUser, setEditUser] = useState<string | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && page < totalPage) {
          setPage((prev) => prev + 1);
        }
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [totalPage, loading]);

  useEffect(() => {
    try {
      const getUsers = async () => {
        if (loading) return;
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/users?page=${page}`
        );
        if (response.status === 200) {
          setTotalPage(response.data.totalPage);
          const newUsers = response.data.users ?? [];
          setUsers((prev) => [...prev, ...newUsers]);
          setDisplayedUsers((prev) => [...prev, ...newUsers]);
          setLoading(false);
        }
      };

      getUsers();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error:", error.response?.data);
      } else if (error instanceof Error) {
        console.log("Error:", error.message);
      }
    }
  }, [page]);

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
    try {
      const response = await axios.put(
        `http://localhost:5000/users/${id}`,
        editedData
      );
      if (response.status === 200) {
        setEditUser(null);
        setUsers((prev) =>
          prev.map((user) =>
            user.id === id ? { ...user, ...editedData } : user
          )
        );
        setEditedData({});
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error", error.response?.data);
      } else if (error instanceof Error) {
        console.log("Error", error.message);
      }
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:5000/users/${id}`);
      if (response.status === 204) {
        setEditUser(null);
        setEditedData({});
        setUsers((prev) => prev.filter((user) => user.id !== id));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error:", error.response?.data);
      } else if (error instanceof Error) {
        console.log("Error:", error.message);
      }
    }
  };

  return {
    users,
    editedData,
    setEditedData,
    editUser,
    setEditUser,
    setEdit,
    setEditedDataFunc,
    saveChanges,
    deleteUser,
    loaderRef,
  };
}
