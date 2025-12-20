// src/utils/calculations.js
export const calculatePoints = (weight, wasteType) => {
  const rates = {
    'plastic': 100,
    'paper': 80,
    'metal': 150,
    'glass': 120,
    'organic': 50
  };
  
  return Math.floor(weight * (rates[wasteType] || 100));
};

export const calculateImpact = (totalWaste) => {
  const treesSaved = Math.floor(totalWaste / 100); // 100kg = 1 tree
  const co2Reduced = Math.floor(totalWaste * 2.5); // 1kg waste = 2.5kg CO2 reduction
  return { treesSaved, co2Reduced };
};