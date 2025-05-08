// Import theme functionality
import { defaultTheme, updateTheme } from '../config/theme';

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
  // Try to load saved theme from localStorage
  const savedTheme = localStorage.getItem('site-theme');
  
  if (savedTheme) {
    try {
      const themeData = JSON.parse(savedTheme);
      updateTheme(themeData);
    } catch (e) {
      console.error('Error loading saved theme, using default', e);
      updateTheme(defaultTheme);
    }
  } else {
    // Use default theme
    updateTheme(defaultTheme);
  }
});

// Expose theme functions to global scope for easier access
window.themeUtils = {
  updateTheme,
  
  // Function to change theme and save to localStorage
  changeTheme: (newTheme) => {
    updateTheme(newTheme);
    localStorage.setItem('site-theme', JSON.stringify(newTheme));
  },
  
  // Function to reset to default theme
  resetTheme: () => {
    updateTheme(defaultTheme);
    localStorage.setItem('site-theme', JSON.stringify(defaultTheme));
  }
};