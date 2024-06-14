
import React, { useState, useEffect } from 'react';
import { DefaultContext } from 'react-icons';
import DefaultLayout from '../../layout/DefaultLayout';

export default function SortingTrainList() {
  const [isInputVisible, setInputVisible] = useState(false);
  const [filter, setFilter] = useState('');
  const [trainsName] = useState([
    "Train_Name", "Maharashtra_Exp", "Puri_Surat_Weekly_SF_Express", "Surat_Puri_Weekly_SF_Express",
    "Hapa_Bilaspur_SF_Express", "Prerana_Express", "Hatia_Pune_SF_Express", "Pune_Hatia_SF_Express",
    "Shalimar_Mumbai_LTT_(Kurla)_Express.", "Mumbai_LTT_Shalimar_(Kurla)_Express.",
    "Malda_Town_Surat_Express.", "Surat_Malda_Town_Express.", "Bilaspur_Hapa_S_Express.",
    "Vidarbha_SF_Express", "Vidarbha_SF_Express"
  ]);
  const [selectedTrains, setSelectedTrains] = useState([]);

  useEffect(() => {
    console.log('Array of new train:', selectedTrains);
  }, [selectedTrains]);

  const toggleDropdown = () => {
    setInputVisible(true);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredOptions = trainsName.filter(option =>
    option.toLowerCase().includes(filter.toLowerCase())
  );

  const handleTrainClick = (trainName) => {
    setSelectedTrains(prevSelectedTrains => [...prevSelectedTrains, trainName]);
  };

  return (
    <DefaultLayout>
         <div className="dropdown" style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={toggleDropdown} style={{ display: isInputVisible ? 'none' : 'inline-block' }}>
        Dropdown
      </button>
      <input
        type="text"
          value={filter}
          // value={formData.trainList}
          onChange={handleFilterChange}
          //  onChange={handleChange}
        style={{ display: isInputVisible ? 'inline-block' : 'none' }}
      />
      {isInputVisible && (
        <div
          className="dropdown-content"
          style={{
            display: 'block',
            position: 'absolute',
            backgroundColor: '#f9f9f9',
            minWidth: '160px',
            boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
            zIndex: 1,
          }}
        >
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleTrainClick(option)}
              style={{
                color: 'black',
                padding: '12px 16px',
                textDecoration: 'none',
                display: 'block',
                cursor: 'pointer'
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
    </DefaultLayout>
  );
}
