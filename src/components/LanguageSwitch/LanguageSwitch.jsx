import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSwitch = () => {
  const { currentLanguage, toggleLanguage } = useLanguage();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = () => {
    if (isToggling) return;
    setIsToggling(true);
    
    // First toggle the language in context
    toggleLanguage();
    
    // Store the new language in localStorage
    const newLanguage = currentLanguage === 'en' ? 'km' : 'en';
    localStorage.setItem('language', newLanguage);
    
    // Reload the page after a short delay to show animation
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Toggle container */}
      <div className="relative">
        <button
          onClick={handleToggle}
          className="relative w-20 h-10 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 cursor-pointer overflow-hidden"
          disabled={isToggling}
        >
          {/* Background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-50 to-gray-100"></div>
          
          {/* Placeholder text - Always visible */}
          <div className="absolute inset-0 flex items-center justify-between px-3">
            {/* KH placeholder (left) */}
            <span className={`text-sm font-medium transition-all duration-300 ${
              currentLanguage === 'km' ? 'text-white' : 'text-gray-400'
            }`}>
              KH
            </span>
            
            {/* EN placeholder (right) */}
            <span className={`text-sm font-medium transition-all duration-300 ${
              currentLanguage === 'en' ? 'text-white' : 'text-gray-400'
            }`}>
              EN
            </span>
          </div>
          
          {/* Sliding indicator - Shows current language */}
          <div className={`absolute top-1 left-1 w-8 h-8 rounded-full shadow-lg transform transition-all duration-300 flex items-center justify-center ${
            currentLanguage === 'en' 
              ? 'translate-x-10 bg-blue-500' 
              : 'translate-x-0 bg-red-500'
          } ${isToggling ? 'scale-95' : ''}`}>
            <span className="text-xs font-bold text-white">
              {currentLanguage === 'en' ? 'EN' : 'KH'}
            </span>
          </div>
        </button>
        
        {/* Tooltip showing what will happen on click */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-gray-500 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Click to switch to {currentLanguage === 'en' ? 'Khmer' : 'English'}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitch;