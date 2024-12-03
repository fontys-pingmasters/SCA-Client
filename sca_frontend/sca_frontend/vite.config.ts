import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // Continue build even when warnings are present
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'SOME_SPECIFIC_WARNING_CODE') {
          // Ignore specific warning
          return;
        }
        // Otherwise, log the warning
        warn(warning);
      }
    ,
  plugins: [
    react()],
  }
}
})
