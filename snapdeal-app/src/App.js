import "./App.css";
import PrivateRoute from "./components/Routes/PrivateRoute";
function App() {
  return (
    <div className="container">
      <PrivateRoute />
    </div>
  );
}

export default App;
