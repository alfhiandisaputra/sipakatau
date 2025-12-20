// src/TestApp.jsx
import React from 'react';
import { Home, Camera } from 'lucide-react';

function TestApp() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Test Icons</h1>
      <Home className="w-10 h-10 text-green-500" />
      <Camera className="w-10 h-10 text-blue-500" />
      <p className="mt-4">JIka icons Muncul, lucide-react bekerja!</p>
    </div>
  );
}

export default TestApp;