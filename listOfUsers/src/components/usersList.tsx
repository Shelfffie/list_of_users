import { userValues } from "./type";

type UserListProps = {
  users: userValues[];
  editedData: Partial<userValues>;
  setEditedData: React.Dispatch<React.SetStateAction<Partial<userValues>>>;
  editUser: string | null;
  setEditUser: React.Dispatch<React.SetStateAction<string | null>>;
  setEdit: (user: userValues) => void;
  setEditedDataFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveChanges: (id: string) => void;
  deleteUser: (id: string) => void;
};

export default function UsersList({
  users,
  editedData,
  setEditedData,
  editUser,
  setEditUser,
  setEdit,
  setEditedDataFunc,
  saveChanges,
  deleteUser,
}: UserListProps) {
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
