/* eslint-disable */
export default {
  displayName: 'rtk-rest-api',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  coverageDirectory: '../../coverage/libs/rtk-rest-api',
  setupFilesAfterEnv: ['./test/test-setup.ts'],
};
