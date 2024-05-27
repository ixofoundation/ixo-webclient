import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // When building a library, you need to define the entry point
    lib: {
      entry: 'src/index.ts', // Adjust this path to your library's entry point
      name: '@ixo-webclient/utils', // This is the name of your global variable
      fileName: (format) => `utils.${format}.js`
    },
    // Define external dependencies here. For example, React could be a peer dependency.
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        // Provide globals here, e.g., React
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  resolve: {
    alias: {
      'stream': 'readable-stream',
      'assert': 'assert',
      'http': 'stream-http',
      'https': 'https-browserify',
      'os': 'os-browserify/browser',
      'url': 'url',
      'crypto': 'crypto-browserify',
      'path': 'path-browserify',
      'process': 'process/browser'
    }
  }
});
