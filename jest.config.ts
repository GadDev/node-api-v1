import type { Config } from "@jest/types"
// Sync object
const config: Config.InitialOptions = {
  // roots: ["<rootDir>/src"],
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testEnvironment: "node",
  coveragePathIgnorePatterns: ["/node_modules/"],
}
export default config
