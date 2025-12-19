import UsersList from "../components/usersList";
import { useUsersFunc } from "../hooks/getUsersAndChange";

export default function UserListPage() {
  const {
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
  } = useUsersFunc();

  return (
    <>
      <UsersList
        users={users}
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
