export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#071521',
        panel: '#0d1b2a',
        cyan: '#67e8f9',
        accent: '#7dd3fc'
      },
      boxShadow: {
        glow: '0 0 25px rgba(103, 232, 249, 0.25)'
      }
    }
  },
  plugins: []
}
