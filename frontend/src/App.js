import Login from "./components/Login";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      {/* <Router> */}
      <Navbar />
      {/* <Switch> */}
      {/* <Route path="/Login" exact component={Login} /> */}
      {/* </Switch> */}
      <Login />
      {/* </Router> */}
    </div>
  );
}

export default App;
