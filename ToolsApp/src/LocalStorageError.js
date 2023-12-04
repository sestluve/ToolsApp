import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LocalStorageError = () => {
  const navigate = useNavigate();

  const handleConfirm = async () => {
    if (window.confirm("Nie udało się załadować danych z pamięci przeglądarki. Czy chcesz je wyczyścić, aby wybrać maszyny ponownie?")) {
      window.localStorage.removeItem('selectedMachines');
      window.localStorage.clear()
      
    }
  };

  useEffect(() => {
    handleConfirm();
  }, [navigate]);

  return (
    <div>
      {/* Treść komponentu, jeśli jest potrzebna */}
    </div>
  );
};

export default LocalStorageError;