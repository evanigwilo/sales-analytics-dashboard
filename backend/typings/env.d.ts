declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PROTOCOL: string;
      SERVER_PORT: string;
      SERVER_HOST: string;
      NODE_ENV: string;
      API_VERSION: string;
    }
  }
}

export {}
