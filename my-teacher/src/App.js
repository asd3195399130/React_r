import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Login/login";
import Home from "./Home/Home";
import TableView from "./Home/table";
import TeacherView from './Home/Teacher';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />}>
          <Route exact path="table" element={<TableView />} />
          <Route exact path="teacher" element={<TeacherView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
