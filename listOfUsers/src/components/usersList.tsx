import { userValues } from "./type";
import { useNavigate } from "react-router-dom";

type UserListProps = {
  users: userValues[];
  displayedUsers: userValues[];
  editedData: Partial<userValues>;
  setEditedData: React.Dispatch<React.SetStateAction<Partial<userValues>>>;
  editUser: string | null;
  setEditUser: React.Dispatch<React.SetStateAction<string | null>>;
  setEdit: (user: userValues) => void;
  setEditedDataFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveChanges: (id: string) => void;
  deleteUser: (id: string) => void;
  loaderRef: React.RefObject<HTMLDivElement | null>;
};

export default function UsersList({
  users,
  displayedUsers,
  editedData,
  setEditedData,
  editUser,
  setEditUser,
  setEdit,
  setEditedDataFunc,
  saveChanges,
  deleteUser,
  loaderRef,
}: UserListProps) {
  const navigate = useNavigate();
  return (
    <div className="container-xl ms-4">
      <h1>User list:</h1>
      <button
        onClick={() => navigate("/new-user")}
        className="btn btn-secondary mt-4 mb-4"
      >
        Create new user
      </button>
      {users.length === 0 ? (
        <p>The list is currently empty</p>
      ) : displayedUsers.length === 0 && users.length !== 0 ? (
        <p>There are no users for this filters</p>
      ) : (
        <ul className="list-group list-group-flush">
          {displayedUsers.map((user: userValues) =>
            user.id === editUser ? (
              <li key={user.id} className="list-group-item m-2">
                <p>Name:</p>
                <input
                  type="text"
                  value={editedData?.name}
                  name="name"
                  className="mb-4 form-control w-25"
                  onChange={(e) => setEditedDataFunc(e)}
                />
                <p>Last name</p>{" "}
                <input
                  type="text"
                  value={editedData?.lastName}
                  name="lastName"
                  className="mb-4 form-control w-25"
                  onChange={(e) => setEditedDataFunc(e)}
                />
                <p>Email:</p>{" "}
                <input
                  type="text"
                  value={editedData?.email}
                  name="email"
                  className="mb-4 form-control w-25"
                  onChange={(e) => setEditedDataFunc(e)}
                />
                <p>Phone:</p>{" "}
                <input
                  type="text"
                  value={editedData?.phone}
                  name="phone"
                  className="mb-4 form-control w-25"
                  onChange={(e) => setEditedDataFunc(e)}
                />
                <p>Birthday:</p>{" "}
                <input
                  type="date"
                  value={editedData?.birthday}
                  name="birthday"
                  className="mb-4 form-control w-25"
                  onChange={(e) => setEditedDataFunc(e)}
                />
                <div className="d-flex  gap-2">
                  <button
                    onClick={() => saveChanges(user.id)}
                    className="btn btn-success"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setEditUser(null);
                      setEditedData({});
                    }}
                    className="btn btn-warning"
                  >
                    Cancel
                  </button>
                </div>
              </li>
            ) : (
              <li key={user.id} className="list-group-item p-4">
                <p>Name: {user.name}</p>
                <p>Last name: {user.lastName}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Birthday: {user.birthday}</p>
                <button
                  onClick={() => setEdit(user)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
              </li>
            )
          )}
        </ul>
      )}
      <div ref={loaderRef} style={{ height: "50px" }}></div>
    </div>
  );
}
