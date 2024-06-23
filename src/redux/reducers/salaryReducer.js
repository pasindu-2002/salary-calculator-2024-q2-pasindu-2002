const initialState = {
    basicSalary: 0,
    earnings: [],
    deductions: [],
    netSalary: 0,
    epfEmployer: 0,
    epfEmployee: 0,
    etfEmployer: 0,
    ctc: 0,
  };
  
  const salaryReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_BASIC_SALARY':
        return { ...state, basicSalary: action.payload };
      case 'ADD_EARNING':
        return { ...state, earnings: [...state.earnings, action.payload] };
      case 'ADD_DEDUCTION':
        return { ...state, deductions: [...state.deductions, action.payload] };
      case 'REMOVE_EARNING':
        return {
          ...state,
          earnings: state.earnings.filter((_, index) => index !== action.payload),
        };
      case 'REMOVE_DEDUCTION':
        return {
          ...state,
          deductions: state.deductions.filter((_, index) => index !== action.payload),
        };
      case 'RESET':
        return initialState;
      case 'CALCULATE_SALARY':
        const totalEarnings = state.earnings.reduce((acc, earning) => acc + earning.amount, 0);
        const totalDeductions = state.deductions.reduce((acc, deduction) => acc + deduction.amount, 0);
        const epfEmployee = (state.basicSalary * 0.08).toFixed(2);
        const epfEmployer = (state.basicSalary * 0.12).toFixed(2);
        const etfEmployer = (state.basicSalary * 0.03).toFixed(2);
        const netSalary = (state.basicSalary + totalEarnings - totalDeductions - epfEmployee).toFixed(2);
        const ctc = (state.basicSalary + totalEarnings + parseFloat(epfEmployer) + parseFloat(etfEmployer)).toFixed(2);
  
        return {
          ...state,
          epfEmployee,
          epfEmployer,
          etfEmployer,
          netSalary,
          ctc,
        };
      default:
        return state;
    }
  };
  
  export default salaryReducer;
  