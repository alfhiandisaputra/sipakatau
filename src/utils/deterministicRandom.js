// src/utils/deterministicRandom.js

export const getDeterministicChange = (id) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    const char = id.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  return (Math.abs(hash) % 5) - 2;
};