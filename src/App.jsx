// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/headers.jsx";
import Home from "./pages/home.jsx";
import About from "./pages/about.jsx";
import Blog from "./pages/Blog";
import Oncology from "./pages/departments/oncology/oncology.jsx"
import Optamology from "./pages/departments/optamology/optamo.jsx";
import DepartmentsPage from "./pages/departments/department.jsx";
import Announcements from "./pages/announcements.jsx";
import ContactUs from "./pages/contact.jsx";
import Cardiology from "./pages/departments/cardiology/cardiology.jsx";
import CardiologySection1 from "./pages/departments/cardiology/CardiologySection1.jsx";
import CardiologySection2 from "./pages/departments/cardiology/CardiologySection2.jsx";
import CardiologySection3 from "./pages/departments/cardiology/CardiologySection3.jsx";
import CardiologySection4 from "./pages/departments/cardiology/CardiologySection4.jsx";
import CardiologySection5 from "./pages/departments/cardiology/CardiologySection5.jsx";
import CardiologySection6 from "./pages/departments/cardiology/CardiologySection6.jsx";
import CardiologySection7 from "./pages/departments/cardiology/CardiologySection7.jsx";
import CardiologySection8 from "./pages/departments/cardiology/CardiologySection8.jsx";
import CardiologySection9 from "./pages/departments/cardiology/CardiologySection9.jsx";
import CardiologySection10 from "./pages/departments/cardiology/CardiologySection10.jsx";
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
          <Route path="/cardiology_section1" element={<CardiologySection1 />} />
          <Route path="/cardiology_section2" element={<CardiologySection2 />} />
          <Route path="/cardiology_section3" element={<CardiologySection3 />} />
          <Route path="/cardiology_section4" element={<CardiologySection4 />} />
          <Route path="/cardiology_section5" element={<CardiologySection5 />} />
          <Route path="/cardiology_section6" element={<CardiologySection6 />} />
          <Route path="/cardiology_section7" element={<CardiologySection7 />} />
          <Route path="/cardiology_section8" element={<CardiologySection8 />} />
          <Route path="/cardiology_section9" element={<CardiologySection9 />} />
          <Route path="/cardiology_section10" element={<CardiologySection10 />} />
        </Routes>
      </div>
    </Router>
    </LanguageProvider>
  );
}

export default App;
