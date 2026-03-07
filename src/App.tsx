import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomeCommand from './pages/HomeCommand';
import IdentityMatrix from './pages/IdentityMatrix';
import SystemsSolutions from './pages/SystemsSolutions';
import QualityProtocol from './pages/QualityProtocol';
import ExpertiseHub from './pages/ExpertiseHub';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/es" replace />} />
        <Route path="/:lang" element={<Layout />}>
          <Route index element={<HomeCommand />} />
          {/* ES slugs */}
          <Route path="nosotros" element={<IdentityMatrix />} />
          <Route path="servicios" element={<SystemsSolutions />} />
          <Route path="proceso" element={<QualityProtocol />} />
          <Route path="tecnologias" element={<ExpertiseHub />} />
          {/* EN slugs */}
          <Route path="about" element={<IdentityMatrix />} />
          <Route path="services" element={<SystemsSolutions />} />
          <Route path="process" element={<QualityProtocol />} />
          <Route path="technologies" element={<ExpertiseHub />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
