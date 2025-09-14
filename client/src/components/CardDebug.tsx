import React from 'react';

export default function CardDebug() {
  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-8">Card Debug Test</h2>
      
      {/* Test 1: Basic card with explicit styles */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Test 1: Card with explicit bg-gray-800</h3>
        <div className="card" style={{ backgroundColor: '#1f2937', color: 'white' }}>
          <div className="aspect-video bg-blue-500 mb-4">Image placeholder</div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-red-500 mb-2">Test Title</h3>
            <p className="text-white mb-4">This is a test description to see if the text appears white.</p>
            <button className="text-red-500">Test Button</button>
          </div>
        </div>
      </div>

      {/* Test 2: Card using only CSS class */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Test 2: Card using only CSS class</h3>
        <div className="card">
          <div className="aspect-video bg-blue-500 mb-4">Image placeholder</div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-red-500 mb-2">Test Title</h3>
            <p className="mb-4">This is a test description.</p>
            <button className="text-red-500">Test Button</button>
          </div>
        </div>
      </div>

      {/* Test 3: Direct Tailwind classes */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Test 3: Direct Tailwind bg-gray-800</h3>
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden text-white">
          <div className="aspect-video bg-blue-500 mb-4">Image placeholder</div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-red-500 mb-2">Test Title</h3>
            <p className="text-white mb-4">This is a test description with explicit text-white.</p>
            <button className="text-red-500">Test Button</button>
          </div>
        </div>
      </div>

      {/* Test 4: Computed styles debug */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Test 4: CSS Variables Debug</h3>
        <div 
          className="card"
          style={{
            border: '2px solid red',
            minHeight: '200px'
          }}
        >
          <div className="p-6">
            <p>CSS Variables:</p>
            <p>--tw-bg-opacity: {getComputedStyle(document.documentElement).getPropertyValue('--tw-bg-opacity')}</p>
            <p>Background should be gray-800</p>
          </div>
        </div>
      </div>
    </div>
  );
}