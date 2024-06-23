export const updateBasicSalary = (amount) => ({
    type: 'UPDATE_BASIC_SALARY',
    payload: amount,
  });
  
  export const addEarning = (earning) => ({
    type: 'ADD_EARNING',
    payload: earning,
  });
  
  export const addDeduction = (deduction) => ({
    type: 'ADD_DEDUCTION',
    payload: deduction,
  });
  
  export const removeEarning = (index) => ({
    type: 'REMOVE_EARNING',
    payload: index,
  });
  
  export const removeDeduction = (index) => ({
    type: 'REMOVE_DEDUCTION',
    payload: index,
  });
  
  export const reset = () => ({
    type: 'RESET',
  });
  
  export const calculateSalary = () => ({
    type: 'CALCULATE_SALARY',
  });
  