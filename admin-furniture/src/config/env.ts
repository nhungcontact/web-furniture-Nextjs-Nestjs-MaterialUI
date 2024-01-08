const appConfig = {
  API_HOST: process.env.NEXT_PUBLIC_API_HOST || "",
  FILE_HOST: process.env.NEXT_PUBLIC_FILE_HOST || "",
  GOOGLE_ID: process.env.GOOGLE_ID || "",
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || "",
  NEXTAUTH_CREDENTIAL_LOGIN_URL: process.env.NEXTAUTH_CREDENTIAL_LOGIN_URL || "",
};

export default appConfig;
