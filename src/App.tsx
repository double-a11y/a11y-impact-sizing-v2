import React, { useState } from 'react';
import './App.css';

const EU_COUNTRIES = [
  { 
    name: 'Austria', 
    population: 9120813, 
    disabledPopulation: 0.184 * 9120813, 
    eaaFine: 0
  },
  { 
    name: 'Belgium', 
    population: 11738763, 
    disabledPopulation: 1447000, 
    eaaFine: 4500000 
  },
  { 
    name: 'Bulgaria', 
    population: 6838937, 
    disabledPopulation: 0.094 * 6838937, 
    eaaFine: 2500000 
  },
  { 
    name: 'Croatia', 
    population: 3875325, 
    disabledPopulation: 0.177 * 3875325, 
    eaaFine: 2000000 
  },
  { 
    name: 'Cyprus', 
    population: 1207359, 
    disabledPopulation: 180000, 
    eaaFine: 1500000 
  },
  { 
    name: 'Czech Republic', 
    population: 10735859, 
    disabledPopulation: 0.103 * 10735859, 
    eaaFine: 3500000 
  },
  { 
    name: 'Denmark', 
    population: 5977412, 
    disabledPopulation: 697000, 
    eaaFine: 3000000 
  },
  { 
    name: 'England', 
    population: 69138192, 
    disabledPopulation: 0.207 * 69138192, 
    eaaFine: 0 
  },
  { 
    name: 'Estonia', 
    population: 1360546, 
    disabledPopulation: 200000, 
    eaaFine: 1800000 
  },
  { 
    name: 'Finland', 
    population: 5617310, 
    disabledPopulation: 0.128 * 5617310, 
    eaaFine: 3200000 
  },
  { 
    name: 'France', 
    population: 66548530, 
    disabledPopulation: 12000000, 
    eaaFine: 5000000 
  },
  { 
    name: 'Germany', 
    population: 84552242, 
    disabledPopulation: 13000000, 
    eaaFine: 6000000 
  },
  { 
    name: 'Greece', 
    population: 10047817, 
    disabledPopulation: 1607000, 
    eaaFine: 3700000 
  },
  { 
    name: 'Hungary', 
    population: 9676135, 
    disabledPopulation: 0.043 * 9676135, 
    eaaFine: 3300000 
  },
  { 
    name: 'Ireland', 
    population: 5255017, 
    disabledPopulation: 655000, 
    eaaFine: 2800000 
  },
  { 
    name: 'Italy', 
    population: 59342867, 
    disabledPopulation: 9000000, 
    eaaFine: 5500000 
  },
  { 
    name: 'Latvia', 
    population: 1886202, 
    disabledPopulation: 0.093 * 1886202, 
    eaaFine: 2000000 
  },
  { 
    name: 'Lithuania', 
    population: 2859110, 
    disabledPopulation: 0.078 * 2859110, 
    eaaFine: 2200000 
  },
  { 
    name: 'Luxembourg', 
    population: 673036, 
    disabledPopulation: 0.27 * 673036, 
    eaaFine: 1500000 
  },
  { 
    name: 'Malta', 
    population: 539607, 
    disabledPopulation: 66000, 
    eaaFine: 1200000 
  },
  { 
    name: 'Netherlands', 
    population: 18228742, 
    disabledPopulation: 0.123 * 18228742, 
    eaaFine: 4800000 
  },
  { 
    name: 'Norway', 
    population: 5576660, 
    disabledPopulation: 0.15 * 5576660, 
    eaaFine: 0 
  },
  { 
    name: 'Poland', 
    population: 38539201, 
    disabledPopulation: 0.134 * 38539201, 
    eaaFine: 4200000 
  },
  { 
    name: 'Portugal', 
    population: 10425292, 
    disabledPopulation: 0.178 * 10425292, 
    eaaFine: 3600000 
  },
  { 
    name: 'Romania', 
    population: 19237691, 
    disabledPopulation: 0.048 * 19237691, 
    eaaFine: 3900000 
  },
  { 
    name: 'Slovakia', 
    population: 5459781, 
    disabledPopulation: 819000, 
    eaaFine: 2700000 
  },
  { 
    name: 'Slovenia', 
    population: 2118697, 
    disabledPopulation: 316000, 
    eaaFine: 2100000 
  },
  { 
    name: 'Spain', 
    population: 47910526, 
    disabledPopulation: 7106000, 
    eaaFine: 5200000 
  },
  { 
    name: 'Sweden', 
    population: 10606999, 
    disabledPopulation: 0.352 * 10606999, 
    eaaFine: 4100000 
  },
  { 
    name: 'Switzerland', 
    population: 8921981, 
    disabledPopulation: 1555000, 
    eaaFine: 0 
  }
];

const App = () => {
  const [inputRows, setInputRows] = useState([{ country: '', rpu: '', growth: '', acquisitionIndex: '', revenueLoss: null }]);
  const [totalMonthlyRevenueLoss, setTotalMonthlyRevenueLoss] = useState(0);

  const addInputRow = () => {
    setInputRows([...inputRows, { country: '', rpu: '', growth: '', acquisitionIndex: '', revenueLoss: null }]);
  };

  const updateInputRow = (index, field, value) => {
    const newRows = [...inputRows];
    newRows[index][field] = value;
    setInputRows(newRows);
  };

  const calculateRowImpact = (index) => {
    const row = inputRows[index];
    const country = EU_COUNTRIES.find((c) => c.name === row.country);
    if (!country || !row.rpu || !row.growth || !row.acquisitionIndex) return;

    const loss = (parseFloat(row.acquisitionIndex) / 100) *
      (parseFloat(row.growth) / 100) *
      parseFloat(row.rpu) *
      country.disabledPopulation +
      (country.eaaFine / 12);

    const newRows = [...inputRows];
    newRows[index].revenueLoss = loss.toFixed(2);
    setInputRows(newRows);
    calculateTotalLoss(newRows);
  };

  const calculateTotalLoss = (rows) => {
    const total = rows.reduce((sum, row) => sum + (row.revenueLoss ? parseFloat(row.revenueLoss) : 0), 0);
    setTotalMonthlyRevenueLoss(total);
  };

  const removeInputRow = (index) => {
    const rows = inputRows.filter((_, i) => i !== index);
    setInputRows(rows);
    calculateTotalLoss(rows);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>EU Accessibility Impact Sizing Tool</h1>
        <p className="small-text">© The data provided here is based on the 2024 census available on Worldometers.info and unstats.un.org</p>
      </header>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>RPU</th>
              <th>Growth %</th>
              <th>Acquisition Index %</th>
              <th>Monthly Revenue Loss</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inputRows.map((row, index) => (
              <tr key={index}>
                <td>
                  <select value={row.country} onChange={(e) => updateInputRow(index, 'country', e.target.value)}>
                    <option value="">Select Country</option>
                    {EU_COUNTRIES.map((country, i) => (
                      <option key={i} value={country.name}>{country.name}</option>
                    ))}
                  </select>
                </td>
                <td><input type="number" value={row.rpu} onChange={(e) => updateInputRow(index, 'rpu', e.target.value)} /></td>
                <td><input type="number" value={row.growth} onChange={(e) => updateInputRow(index, 'growth', e.target.value)} /></td>
                <td><input type="number" value={row.acquisitionIndex} onChange={(e) => updateInputRow(index, 'acquisitionIndex', e.target.value)} /></td>
                <td>{row.revenueLoss ? `€${row.revenueLoss}` : '-'}</td>
                <td>
                  <button onClick={() => calculateRowImpact(index)}>Calculate</button>
                  <button className="destructive" onClick={() => removeInputRow(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addInputRow}>Add Row</button>
        {totalMonthlyRevenueLoss > 0 && <p>Total Monthly Revenue Loss: €{totalMonthlyRevenueLoss.toFixed(2)}</p>}
      </div>
      <footer className="footer">
        <p className="small-text">© 2024 EU Accessibility Impact Tool</p>
      </footer>
    </div>
  );
};

export default App;
