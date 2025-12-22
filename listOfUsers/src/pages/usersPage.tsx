import UsersList from "../components/usersList";
import { useUsersFunc } from "../hooks/getUsersAndChange";
import { useState } from "react";
import { userValues } from "../components/type";

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
    loaderRef,
    inputValue,
    setInputValueTimer,
  } = useUsersFunc(setDisplayedUsers);

  return (
    <>
      <div className="m-4">
        <h2>Фільтрувати:</h2>
        <input
          type="text"
          value={inputValue}
          className="form-control"
          onChange={(e) => setInputValueTimer(e)}
        />
      </div>
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
        loaderRef={loaderRef}
      />
    </>
  );
}
