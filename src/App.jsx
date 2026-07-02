// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/headers.jsx";
import Home from "./pages/home.jsx";
import About from "./pages/about.jsx";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/blogDetail";
import Ophthalmology from "./pages/departments/ophthalmology/ophthalmology.jsx";
import OphthalmologySection1 from "./pages/departments/ophthalmology/OphthalmologySection1.jsx";
import OphthalmologySection2 from "./pages/departments/ophthalmology/OphthalmologySection2.jsx";
import OphthalmologySection3 from "./pages/departments/ophthalmology/OphthalmologySection3.jsx";
import OphthalmologySection4 from "./pages/departments/ophthalmology/OphthalmologySection4.jsx";
import OphthalmologySection5 from "./pages/departments/ophthalmology/OphthalmologySection5.jsx";
import OphthalmologySection6 from "./pages/departments/ophthalmology/OphthalmologySection6.jsx";
import OphthalmologySection7 from "./pages/departments/ophthalmology/OphthalmologySection7.jsx";
import OphthalmologySection8 from "./pages/departments/ophthalmology/OphthalmologySection8.jsx";
import OphthalmologySection9 from "./pages/departments/ophthalmology/OphthalmologySection9.jsx";
import OphthalmologySection10 from "./pages/departments/ophthalmology/OphthalmologySection10.jsx";
import Dentistry from "./pages/departments/dentistry/dentistry.jsx";
import DentistrySection1 from "./pages/departments/dentistry/DentistrySection1.jsx";
import DentistrySection2 from "./pages/departments/dentistry/DentistrySection2.jsx";
import DentistrySection3 from "./pages/departments/dentistry/DentistrySection3.jsx";
import DentistrySection4 from "./pages/departments/dentistry/DentistrySection4.jsx";
import DentistrySection5 from "./pages/departments/dentistry/DentistrySection5.jsx";
import DentistrySection6 from "./pages/departments/dentistry/DentistrySection6.jsx";
import DentistrySection7 from "./pages/departments/dentistry/DentistrySection7.jsx";
import DentistrySection8 from "./pages/departments/dentistry/DentistrySection8.jsx";
import DentistrySection9 from "./pages/departments/dentistry/DentistrySection9.jsx";
import DentistrySection10 from "./pages/departments/dentistry/DentistrySection10.jsx";
import DepartmentsPage from "./pages/departments/department.jsx";
import Announcements from "./pages/announcements.jsx";
import AnnouncementDetail from "./pages/announcementDetail.jsx";
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
import Gastrology from "./pages/departments/gastrology/gastrology.jsx";
import GastrologySection1 from "./pages/departments/gastrology/GastrologySection1.jsx";
import GastrologySection2 from "./pages/departments/gastrology/GastrologySection2.jsx";
import GastrologySection3 from "./pages/departments/gastrology/GastrologySection3.jsx";
import GastrologySection4 from "./pages/departments/gastrology/GastrologySection4.jsx";
import GastrologySection5 from "./pages/departments/gastrology/GastrologySection5.jsx";
import GastrologySection6 from "./pages/departments/gastrology/GastrologySection6.jsx";
import GastrologySection7 from "./pages/departments/gastrology/GastrologySection7.jsx";
import GastrologySection8 from "./pages/departments/gastrology/GastrologySection8.jsx";
import GastrologySection9 from "./pages/departments/gastrology/GastrologySection9.jsx";
import GastrologySection10 from "./pages/departments/gastrology/GastrologySection10.jsx";
import Pulmology from "./pages/departments/pulmology/pulmology.jsx";
import PulmonologySection1 from "./pages/departments/pulmology/PulmonologySection1.jsx";
import PulmonologySection2 from "./pages/departments/pulmology/PulmonologySection2.jsx";
import PulmonologySection3 from "./pages/departments/pulmology/PulmonologySection3.jsx";
import PulmonologySection4 from "./pages/departments/pulmology/PulmonologySection4.jsx";
import PulmonologySection5 from "./pages/departments/pulmology/PulmonologySection5.jsx";
import PulmonologySection6 from "./pages/departments/pulmology/PulmonologySection6.jsx";
import PulmonologySection7 from "./pages/departments/pulmology/PulmonologySection7.jsx";
import PulmonologySection8 from "./pages/departments/pulmology/PulmonologySection8.jsx";
import PulmonologySection9 from "./pages/departments/pulmology/PulmonologySection9.jsx";
import PulmonologySection10 from "./pages/departments/pulmology/PulmonologySection10.jsx";
import Neurology from "./pages/departments/neurology/neurology.jsx";
import NeurologySection1 from "./pages/departments/neurology/NeurologySection1.jsx";
import NeurologySection2 from "./pages/departments/neurology/NeurologySection2.jsx";
import NeurologySection3 from "./pages/departments/neurology/NeurologySection3.jsx";
import NeurologySection4 from "./pages/departments/neurology/NeurologySection4.jsx";
import NeurologySection5 from "./pages/departments/neurology/NeurologySection5.jsx";
import NeurologySection6 from "./pages/departments/neurology/NeurologySection6.jsx";
import NeurologySection7 from "./pages/departments/neurology/NeurologySection7.jsx";
import NeurologySection8 from "./pages/departments/neurology/NeurologySection8.jsx";
import NeurologySection9 from "./pages/departments/neurology/NeurologySection9.jsx";
import NeurologySection10 from "./pages/departments/neurology/NeurologySection10.jsx";
import Dermatology from "./pages/departments/dermatology/dermatology.jsx";
import DermatologySection1 from "./pages/departments/dermatology/DermatologySection1.jsx";
import DermatologySection2 from "./pages/departments/dermatology/DermatologySection2.jsx";
import DermatologySection3 from "./pages/departments/dermatology/DermatologySection3.jsx";
import DermatologySection4 from "./pages/departments/dermatology/DermatologySection4.jsx";
import DermatologySection5 from "./pages/departments/dermatology/DermatologySection5.jsx";
import DermatologySection6 from "./pages/departments/dermatology/DermatologySection6.jsx";
import DermatologySection7 from "./pages/departments/dermatology/DermatologySection7.jsx";
import DermatologySection8 from "./pages/departments/dermatology/DermatologySection8.jsx";
import DermatologySection9 from "./pages/departments/dermatology/DermatologySection9.jsx";
import DermatologySection10 from "./pages/departments/dermatology/DermatologySection10.jsx";
import Obgy from "./pages/departments/obgy/obgy.jsx";
import ObgySection1 from "./pages/departments/obgy/ObgySection1.jsx";
import ObgySection2 from "./pages/departments/obgy/ObgySection2.jsx";
import ObgySection3 from "./pages/departments/obgy/ObgySection3.jsx";
import ObgySection4 from "./pages/departments/obgy/ObgySection4.jsx";
import ObgySection5 from "./pages/departments/obgy/ObgySection5.jsx";
import ObgySection6 from "./pages/departments/obgy/ObgySection6.jsx";
import ObgySection7 from "./pages/departments/obgy/ObgySection7.jsx";
import ObgySection8 from "./pages/departments/obgy/ObgySection8.jsx";
import ObgySection9 from "./pages/departments/obgy/ObgySection9.jsx";
import ObgySection10 from "./pages/departments/obgy/ObgySection10.jsx";
import Urology from "./pages/departments/urology/urology.jsx";
import UrologySection1 from "./pages/departments/urology/UrologySection1.jsx";
import UrologySection2 from "./pages/departments/urology/UrologySection2.jsx";
import UrologySection3 from "./pages/departments/urology/UrologySection3.jsx";
import UrologySection4 from "./pages/departments/urology/UrologySection4.jsx";
import UrologySection5 from "./pages/departments/urology/UrologySection5.jsx";
import UrologySection6 from "./pages/departments/urology/UrologySection6.jsx";
import UrologySection7 from "./pages/departments/urology/UrologySection7.jsx";
import UrologySection8 from "./pages/departments/urology/UrologySection8.jsx";
import UrologySection9 from "./pages/departments/urology/UrologySection9.jsx";
import UrologySection10 from "./pages/departments/urology/UrologySection10.jsx";
import Ent from "./pages/departments/ent/ent.jsx";
import EntSection1 from "./pages/departments/ent/EntSection1.jsx";
import EntSection2 from "./pages/departments/ent/EntSection2.jsx";
import EntSection3 from "./pages/departments/ent/EntSection3.jsx";
import EntSection4 from "./pages/departments/ent/EntSection4.jsx";
import EntSection5 from "./pages/departments/ent/EntSection5.jsx";
import EntSection6 from "./pages/departments/ent/EntSection6.jsx";
import EntSection7 from "./pages/departments/ent/EntSection7.jsx";
import EntSection8 from "./pages/departments/ent/EntSection8.jsx";
import EntSection9 from "./pages/departments/ent/EntSection9.jsx";
import EntSection10 from "./pages/departments/ent/EntSection10.jsx";
import Activity from "./pages/activity.jsx";
import Pediatric from "./pages/departments/pediatric/pediatric.jsx";
import PediatricSection1 from "./pages/departments/pediatric/PediatricSection1.jsx";
import PediatricSection2 from "./pages/departments/pediatric/PediatricSection2.jsx";
import PediatricSection3 from "./pages/departments/pediatric/PediatricSection3.jsx";
import PediatricSection4 from "./pages/departments/pediatric/PediatricSection4.jsx";
import PediatricSection5 from "./pages/departments/pediatric/PediatricSection5.jsx";
import PediatricSection6 from "./pages/departments/pediatric/PediatricSection6.jsx";
import PediatricSection7 from "./pages/departments/pediatric/PediatricSection7.jsx";
import PediatricSection8 from "./pages/departments/pediatric/PediatricSection8.jsx";
import PediatricSection9 from "./pages/departments/pediatric/PediatricSection9.jsx";
import PediatricSection10 from "./pages/departments/pediatric/PediatricSection10.jsx";
import MriPage from "./pages/services/mri/Mri.jsx";
import MriSection1 from "./pages/services/mri/MriSection1.jsx";







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
          <Route path="/announcement/:id" element={<AnnouncementDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/ophthalmology" element={<Ophthalmology />} />
          <Route path="/ophthalmology_section1" element={<OphthalmologySection1 />} />
          <Route path="/ophthalmology_section2" element={<OphthalmologySection2 />} />
          <Route path="/ophthalmology_section3" element={<OphthalmologySection3 />} />
          <Route path="/ophthalmology_section4" element={<OphthalmologySection4 />} />
          <Route path="/ophthalmology_section5" element={<OphthalmologySection5 />} />
          <Route path="/ophthalmology_section6" element={<OphthalmologySection6 />} />
          <Route path="/ophthalmology_section7" element={<OphthalmologySection7 />} />
          <Route path="/ophthalmology_section8" element={<OphthalmologySection8 />} />
          <Route path="/ophthalmology_section9" element={<OphthalmologySection9 />} />
          <Route path="/ophthalmology_section10" element={<OphthalmologySection10 />} />
          <Route path="/dentistry" element={<Dentistry />} />
          <Route path="/dentistry_section1" element={<DentistrySection1 />} />
          <Route path="/dentistry_section2" element={<DentistrySection2 />} />
          <Route path="/dentistry_section3" element={<DentistrySection3 />} />
          <Route path="/dentistry_section4" element={<DentistrySection4 />} />
          <Route path="/dentistry_section5" element={<DentistrySection5 />} />
          <Route path="/dentistry_section6" element={<DentistrySection6 />} />
          <Route path="/dentistry_section7" element={<DentistrySection7 />} />
          <Route path="/dentistry_section8" element={<DentistrySection8 />} />
          <Route path="/dentistry_section9" element={<DentistrySection9 />} />
          <Route path="/dentistry_section10" element={<DentistrySection10 />} />
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
          <Route path="/gastrology" element={<Gastrology />} />
          <Route path="/gastrology_section1" element={<GastrologySection1 />} />
          <Route path="/gastrology_section2" element={<GastrologySection2 />} />
          <Route path="/gastrology_section3" element={<GastrologySection3 />} />
          <Route path="/gastrology_section4" element={<GastrologySection4 />} />
          <Route path="/gastrology_section5" element={<GastrologySection5 />} />
          <Route path="/gastrology_section6" element={<GastrologySection6 />} />
          <Route path="/gastrology_section7" element={<GastrologySection7 />} />
          <Route path="/gastrology_section8" element={<GastrologySection8 />} />
          <Route path="/gastrology_section9" element={<GastrologySection9 />} />
          <Route path="/gastrology_section10" element={<GastrologySection10 />} />
          <Route path="/pulmonology" element={<Pulmology />} />
          <Route path="/pulmonology_section1" element={<PulmonologySection1 />} />
          <Route path="/pulmonology_section2" element={<PulmonologySection2 />} />
          <Route path="/pulmonology_section3" element={<PulmonologySection3 />} />
          <Route path="/pulmonology_section4" element={<PulmonologySection4 />} />
          <Route path="/pulmonology_section5" element={<PulmonologySection5 />} />
          <Route path="/pulmonology_section6" element={<PulmonologySection6 />} />
          <Route path="/pulmonology_section7" element={<PulmonologySection7 />} />
          <Route path="/pulmonology_section8" element={<PulmonologySection8 />} />
          <Route path="/pulmonology_section9" element={<PulmonologySection9 />} />
          <Route path="/pulmonology_section10" element={<PulmonologySection10 />} />
          <Route path="/neurology" element={<Neurology />} />
          <Route path="/neurology_section1" element={<NeurologySection1 />} />
          <Route path="/neurology_section2" element={<NeurologySection2 />} />
          <Route path="/neurology_section3" element={<NeurologySection3 />} />
          <Route path="/neurology_section4" element={<NeurologySection4 />} />
          <Route path="/neurology_section5" element={<NeurologySection5 />} />
          <Route path="/neurology_section6" element={<NeurologySection6 />} />
          <Route path="/neurology_section7" element={<NeurologySection7 />} />
          <Route path="/neurology_section8" element={<NeurologySection8 />} />
          <Route path="/neurology_section9" element={<NeurologySection9 />} />
          <Route path="/neurology_section10" element={<NeurologySection10 />} />
          <Route path="/dermatology" element={<Dermatology />} />
          <Route path="/dermatology_section1" element={<DermatologySection1 />} />
          <Route path="/dermatology_section2" element={<DermatologySection2 />} />
          <Route path="/dermatology_section3" element={<DermatologySection3 />} />
          <Route path="/dermatology_section4" element={<DermatologySection4 />} />
          <Route path="/dermatology_section5" element={<DermatologySection5 />} />
          <Route path="/dermatology_section6" element={<DermatologySection6 />} />
          <Route path="/dermatology_section7" element={<DermatologySection7 />} />
          <Route path="/dermatology_section8" element={<DermatologySection8 />} />
          <Route path="/dermatology_section9" element={<DermatologySection9 />} />
          <Route path="/dermatology_section10" element={<DermatologySection10 />} />
          <Route path="/obgy" element={<Obgy />} />
          <Route path="/obgy_section1" element={<ObgySection1 />} />
          <Route path="/obgy_section2" element={<ObgySection2 />} />
          <Route path="/obgy_section3" element={<ObgySection3 />} />
          <Route path="/obgy_section4" element={<ObgySection4 />} />
          <Route path="/obgy_section5" element={<ObgySection5 />} />
          <Route path="/obgy_section6" element={<ObgySection6 />} />
          <Route path="/obgy_section7" element={<ObgySection7 />} />
          <Route path="/obgy_section8" element={<ObgySection8 />} />
          <Route path="/obgy_section9" element={<ObgySection9 />} />
          <Route path="/obgy_section10" element={<ObgySection10 />} />
          <Route path="/urology" element={<Urology />} />
          <Route path="/urology_section1" element={<UrologySection1 />} />
          <Route path="/urology_section2" element={<UrologySection2 />} />
          <Route path="/urology_section3" element={<UrologySection3 />} />
          <Route path="/urology_section4" element={<UrologySection4 />} />
          <Route path="/urology_section5" element={<UrologySection5 />} />
          <Route path="/urology_section6" element={<UrologySection6 />} />
          <Route path="/urology_section7" element={<UrologySection7 />} />
          <Route path="/urology_section8" element={<UrologySection8 />} />
          <Route path="/urology_section9" element={<UrologySection9 />} />
          <Route path="/urology_section10" element={<UrologySection10 />} />
          <Route path="/ent" element={<Ent />} />
          <Route path="/ent_section1" element={<EntSection1 />} />
          <Route path="/ent_section2" element={<EntSection2 />} />
          <Route path="/ent_section3" element={<EntSection3 />} />
          <Route path="/ent_section4" element={<EntSection4 />} />
          <Route path="/ent_section5" element={<EntSection5 />} />
          <Route path="/ent_section6" element={<EntSection6 />} />
          <Route path="/ent_section7" element={<EntSection7 />} />
          <Route path="/ent_section8" element={<EntSection8 />} />
          <Route path="/ent_section9" element={<EntSection9 />} />
          <Route path="/ent_section10" element={<EntSection10 />} />
          <Route path="/pediatric" element={<Pediatric />} />
          <Route path="/pediatric_section1" element={<PediatricSection1 />} />
          <Route path="/pediatric_section2" element={<PediatricSection2 />} />
          <Route path="/pediatric_section3" element={<PediatricSection3 />} />
          <Route path="/pediatric_section4" element={<PediatricSection4 />} />
          <Route path="/pediatric_section5" element={<PediatricSection5 />} />
          <Route path="/pediatric_section6" element={<PediatricSection6 />} />
          <Route path="/pediatric_section7" element={<PediatricSection7 />} />
          <Route path="/pediatric_section8" element={<PediatricSection8 />} />
          <Route path="/pediatric_section9" element={<PediatricSection9 />} />
          <Route path="/pediatric_section10" element={<PediatricSection10 />} />

     
      
         

        </Routes>
      </div>
    </Router>
    </LanguageProvider>
  );
}

export default App;
