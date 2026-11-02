import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig([
  ...nextVitals,
  {
    // Keep existing state synchronization during the framework migration.
    files: [
      'src/app/admin/blogs/(components)/Table.tsx',
      'src/app/login/LoginModal.tsx',
      'src/components/providers/ThemeProvider.tsx',
    ],
    rules: { 'react-hooks/set-state-in-effect': 'off' },
  },
  {
    // Legacy homepage observers declare their callbacks below their effects.
    files: ['src/components/(homepage)/SecondRow.jsx', 'src/components/(homepage)/ThirdRow.jsx'],
    rules: { 'react-hooks/immutability': 'off' },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'coverage/**', 'next-env.d.ts']),
])
