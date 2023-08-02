import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./pages/homePage";

import OpenAIHandler from "./components/Tarigma/OpenAIHandler";

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
          <Route path="/" element={<HomePage />} />
          <Route path="/generate-report" element={<OpenAIHandler />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
