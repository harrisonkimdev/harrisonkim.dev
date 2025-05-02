import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Next.js 앱의 경로를 지정하여 next.config.js와 .env 파일을 테스트 환경에 로드
  dir: './',
})

// Jest에 전달할 커스텀 설정
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // 절대 경로 별칭 처리
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // 테스트 파일 패턴
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  // 테스트 성능 개선을 위한 설정
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transformIgnorePatterns: ['/node_modules/'],
  maxWorkers: '50%', // CPU 코어의 절반만 사용
  watchPathIgnorePatterns: ['/node_modules/', '/.next/'],
}

// next/jest가 비동기적으로 Next.js 설정을 로드할 수 있도록 이렇게 export
export default createJestConfig(config) 