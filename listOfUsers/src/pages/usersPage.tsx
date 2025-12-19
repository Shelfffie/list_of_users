import UsersList from "../components/usersList";
import { useUsersFunc } from "../hooks/getUsersAndChange";
import { useState } from "react";
import { userValues } from "../components/type";
import FilterUsers from "../components/filterFunc";

export default function UserListPage() {
  const [displayedUsers, setDisplayedUsers] = useState<userValues[]>([]);
  const {
    users,
    editedData,
    setEditedData,
    editUser,
    setEditUser,
    setEdit,
    setEditedDataFunc,
    saveChanges,
    deleteUser,
  } = useUsersFunc(setDisplayedUsers);

  return (
    <>
      <FilterUsers data={users} setNewData={setDisplayedUsers} />
      <UsersList
        users={users}
        displayedUsers={displayedUsers}
        editedData={editedData}
        setEditedData={setEditedData}
        editUser={editUser}
        setEditUser={setEditUser}
        setEdit={setEdit}
        setEditedDataFunc={setEditedDataFunc}
        saveChanges={saveChanges}
        deleteUser={deleteUser}
      />
    </>
  );
}
