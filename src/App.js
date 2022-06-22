import ProtectedRoutes from "./routes/ProtectedRoutes";

/*const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};*/

function App() {
  return (
    <div>
      <ProtectedRoutes />
    </div>
  );
}

export default App;
