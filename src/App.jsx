// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/headers.jsx";
import Home from "./pages/home.jsx";
import About from "./pages/about.jsx";
import Blog from "./pages/Blog";
import Oncology from "./pages/departments/oncology";
import Optamology from "./pages/departments/optamo.jsx";
import DepartmentsPage from "./pages/departments/department.jsx";
import Announcements from "./pages/announcements.jsx";
import ContactUs from "./pages/contact.jsx";
import Cardiology from "./pages/departments/cardiology/cardiology.jsx";
import Activity from "./pages/activity.jsx";

function App() {
  return (
     <LanguageProvider>
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/announcement" element={<Announcements />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/oncology" element={<Oncology />} />
          <Route path="/optamo" element={<Optamology />} />
          <Route path="/cardiology" element={<Cardiology />} />
        </Routes>
      </div>
    </Router>
    </LanguageProvider>
  );
}

export default App;
