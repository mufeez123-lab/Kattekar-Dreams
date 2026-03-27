import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "./pages/Homepage";
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Storefront */}
        <Route path="/" element={<Homepage />} />

        {/* Secret Admin Link */}
        <Route path="/admin-kattekar-secret" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;