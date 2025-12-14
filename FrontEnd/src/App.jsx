// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/headers.jsx'
import Home from './pages/home.jsx'
import About from './pages/about.jsx'
import Blog from './pages/Blog'
import Oncology from './pages/departments/oncology'
import Optamology from './pages/departments/optamo.jsx'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/oncology" element={<Oncology />} />
          <Route path="/optamo" element={<Optamology />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App