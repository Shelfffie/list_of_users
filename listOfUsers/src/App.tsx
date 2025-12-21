import UserListPage from "./pages/usersPage";
import CreateUser from "./components/createUser";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/error"
            element={
              <div>
                <p>That page doesnt exist</p>
              </div>
            }
          />
          <Route path="/" element={<UserListPage />} />
          <Route path="/new-user" element={<CreateUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
