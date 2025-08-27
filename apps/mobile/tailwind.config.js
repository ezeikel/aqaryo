/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        // Default fallback fonts
        'sans': 'Poppins-Regular',
        'heading': 'Outfit-Regular',
        'arabic': 'NotoKufiArabic-Regular',
        
        // Poppins font weights (specific classes)
        'poppins-light': 'Poppins-Light',
        'poppins-regular': 'Poppins-Regular',
        'poppins-medium': 'Poppins-Medium',
        'poppins-semibold': 'Poppins-SemiBold',
        'poppins-bold': 'Poppins-Bold',
        
        // Outfit font weights (for headings)
        'outfit-regular': 'Outfit-Regular',
        'outfit-medium': 'Outfit-Medium',
        'outfit-semibold': 'Outfit-SemiBold',
        'outfit-bold': 'Outfit-Bold',
        'outfit-extrabold': 'Outfit-ExtraBold',
        
        // Noto Kufi Arabic font weights
        'noto-kufi-regular': 'NotoKufiArabic-Regular',
        'noto-kufi-medium': 'NotoKufiArabic-Medium',
        'noto-kufi-semibold': 'NotoKufiArabic-SemiBold',
        'noto-kufi-bold': 'NotoKufiArabic-Bold',
        
        // Cairo font weights
        'cairo-regular': 'Cairo-Regular',
        'cairo-medium': 'Cairo-Medium',
        'cairo-semibold': 'Cairo-SemiBold',
        'cairo-bold': 'Cairo-Bold',
      },
    },
  },
  plugins: [],
}

