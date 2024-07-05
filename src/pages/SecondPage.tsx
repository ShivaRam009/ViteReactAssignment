// src/pages/SecondPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import DepartmentList from '../components/DepartmentList';

const SecondPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      alert('Please enter your details first');
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Second Page</h1>
      <DataTable />
      <DepartmentList />
    </div>
  );
};

export default SecondPage;
