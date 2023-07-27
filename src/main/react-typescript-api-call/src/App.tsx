
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import OpenAIHandler from "./components/OpenAIHandler";

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Report Automation
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/generate-report"} className="nav-link">
              OpenAI Handler
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<OpenAIHandler/>} />
          <Route path="/generate-report" element={<OpenAIHandler />} />
          <Route path="/add" element={<AddTutorial/>} />
          <Route path="/tutorials/:id" element={<Tutorial/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;