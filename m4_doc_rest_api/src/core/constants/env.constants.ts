export const envConstants = {
  isProduction: process.env.NODE_ENV === "production",
  PORT: process.env.PORT,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  CORS_METHODS: process.env.CORS_METHODS,
  isApiMock: process.env.API_MOCK === "true",
};
