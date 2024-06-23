import React, { useState } from 'react';
import './SalaryCalculator.css';

function SalaryCalculator() {
  const [basicSalary, setBasicSalary] = useState(150000);
  const [allowances, setAllowances] = useState([]);
  const [deductions, setDeductions] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editItem, setEditItem] = useState({ type: '', amount: 0, epfEtf: false });

  const handleBasicSalaryChange = (event) => {
    setBasicSalary(parseFloat(event.target.value));
  };

  const deleteAllowance = (index) => {
    const updatedAllowances = allowances.filter((_, i) => i !== index);
    setAllowances(updatedAllowances);
  };

  const deleteDeduction = (index) => {
    const updatedDeductions = deductions.filter((_, i) => i !== index);
    setDeductions(updatedDeductions);
  };

  const resetCalculator = () => {
    setBasicSalary(0);
    setAllowances([]);
    setDeductions([]);
  };

  const openDialog = (type, index = null) => {
    setDialogType(type);
    if (index !== null) {
      if (type === 'allowance') {
        setEditItem({ ...allowances[index] });
      } else if (type === 'deduction') {
        setEditItem({ ...deductions[index] });
      }
      setEditIndex(index);
    } else {
      setEditItem({ type: '', amount: 0, epfEtf: false });
      setEditIndex(null);
    }
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditItem({ type: '', amount: 0, epfEtf: false });
    setEditIndex(null);
  };

  const saveItem = () => {
    if (dialogType === 'allowance') {
      if (editIndex !== null) {
        const updatedAllowances = [...allowances];
        updatedAllowances[editIndex] = editItem;
        setAllowances(updatedAllowances);
      } else {
        setAllowances([...allowances, { ...editItem, id: Date.now() }]);
      }
    } else if (dialogType === 'deduction') {
      if (editIndex !== null) {
        const updatedDeductions = [...deductions];
        updatedDeductions[editIndex] = editItem;
        setDeductions(updatedDeductions);
      } else {
        setDeductions([...deductions, { ...editItem, id: Date.now() }]);
      }
    }
    closeDialog();
  };

  const calculateSalary = () => {
    let totEarning = basicSalary;
    let totEarningEPF = basicSalary;
    let grossDeduction = 0;
  
    // Calculate total earnings and EPF eligible earnings
    allowances.forEach((allowance) => {
      totEarning += allowance.amount;
      if (allowance.epfEtf) {
        totEarningEPF += allowance.amount;
      }
    });
  
    // Calculate total deductions
    deductions.forEach((deduction) => {
      grossDeduction += deduction.amount;
    });
  
    // Calculate gross earnings
    const grossEarning = totEarning - grossDeduction;
  
    // Calculate Gross Salary for EPF
    const grossSalaryEPF = totEarningEPF - grossDeduction;
  
    // Calculate EPF contributions
    const employeeEPF = grossSalaryEPF * 0.08;
    const employerEPF = grossSalaryEPF * 0.12;
  
    // Calculate ETF contribution
    const employerETF = grossSalaryEPF * 0.03;
  
    // Calculate APIT
    const apit = (grossEarning * 0.18) - 25500;
  
    // Calculate net salary
    const netSalary = grossEarning - employeeEPF - apit;
  
    // Calculate Cost to Company (CTC)
    const ctc = grossEarning + employerEPF + employerETF;
  
    return {
      totEarning,
      grossDeduction,
      grossEarning,
      totEarningEPF,
      grossSalaryEPF,
      employeeEPF,
      employerEPF,
      employerETF,
      apit,
      netSalary,
      ctc
    };
  };

  const salaryData = calculateSalary();

  return (
    <div className="container">
      <div className="calculator">
        <div className="section">
          <i className="fas fa-redo reset-icon" onClick={resetCalculator}></i>
          <h2>Calculate Your Salary</h2>
          <div className="input-group">
            <label htmlFor="basicSalary">Basic Salary:</label>
            <input
              type="number"
              id="basicSalary"
              value={basicSalary}
              onChange={handleBasicSalaryChange}
            />
          </div>
          <h2>Earnings</h2>
          <p>Allowance, Fixed Allowance, Bonus and etc.</p>
          {allowances.map((allowance, index) => (
            <div key={allowance.id} className="input-group item-display">
              <span>{allowance.type}: {allowance.amount.toLocaleString()}</span>
              {allowance.epfEtf && <span className="epf-etf">✓ EPF/ETF</span>}
              <i className="fas fa-edit" onClick={() => openDialog('allowance', index)}></i>
              <i className="fas fa-trash" onClick={() => deleteAllowance(index)}></i>
            </div>
          ))}
        
          <button className="button" onClick={() => openDialog('allowance')}>Add New Allowance</button>
          <hr></hr>
          <h2>Deductions</h2>
          <p>Salary Advances, Loan Deductions and all</p>
          {deductions.map((deduction, index) => (
            <div key={deduction.id} className="input-group item-display">
              <span>{deduction.type}: {deduction.amount.toLocaleString()}</span>
              <i className="fas fa-edit" onClick={() => openDialog('deduction', index)}></i>
              <i className="fas fa-trash" onClick={() => deleteDeduction(index)}></i>
            </div>
          ))}
          <button className="button" onClick={() => openDialog('deduction')}>Add New Deduction</button>
        </div>
        <div className="section">
          <h2>Your salary</h2>
          <table>
            <thead>
              <tr>
                <th>Items</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td>Basic Salary</td>
                <td>{basicSalary}</td>
              </tr>
              <tr>
                <td>Gross Earning</td>
                <td>{salaryData.totEarning.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Gross Deduction</td>
                <td>{salaryData.grossDeduction.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Employee EPF (8%)</td>
                <td>{salaryData.employeeEPF.toLocaleString()}</td>
              </tr>
              <tr>
                <td>APIT</td>
                <td>{salaryData.apit.toLocaleString()}</td>
              </tr>
              <tr className="highlight">
                <td>Net Salary</td>
                <td>{salaryData.netSalary.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Employer EPF (12%)</td>
                <td>{salaryData.employerEPF.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Employer ETF (3%)</td>
                <td>{salaryData.employerETF.toLocaleString()}</td>
              </tr>
              <tr>
                <td>CTC (Cost ot Company)</td>
                <td>{salaryData.ctc.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog box */}
      {dialogOpen && (
        <div className="overlay">
          <div className="dialog-wrapper">
            <div className="dialog">
              <h2>Add New</h2>
              <label htmlFor="editType">Type:</label>
              <input
                type="text"
                id="editType"
                value={editItem.type}
                onChange={(event) => setEditItem({ ...editItem, type: event.target.value })}
              />
              <label htmlFor="editAmount">Amount:</label>
              <input
                type="number"
                id="editAmount"
                value={editItem.amount}
                onChange={(event) => setEditItem({ ...editItem, amount: parseFloat(event.target.value) })}
              />
              {dialogType === 'allowance' && (
                <div>
                  <input
                    type="checkbox"
                    id="editEpfEtf"
                    checked={editItem.epfEtf}
                    onChange={(event) => setEditItem({ ...editItem, epfEtf: event.target.checked })}
                  />
                  <label htmlFor="editEpfEtf">EPF/ETF</label>
                </div>
              )}
              <div>
                <button onClick={saveItem}>Save</button>
                <button onClick={closeDialog}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalaryCalculator;
