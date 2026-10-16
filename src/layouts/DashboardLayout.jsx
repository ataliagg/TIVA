import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import Sidebar from '../components/layout/Sidebar';
import './DashboardLayout.css';
export default function DashboardLayout({ worker = false }) {
  const { setRole } = useDemo();
  useEffect(() => {
    setRole(worker ? 'worker' : 'client');
  }, [worker, setRole]);
  return (
    <div className="dashboard-layout container page">
      <Sidebar worker={worker} />
      <div className="dashboard-content">
        <Outlet context={{ worker, base: worker ? '/trabajador' : '/cliente' }} />
      </div>
    </div>
  );
}
