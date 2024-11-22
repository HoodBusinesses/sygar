export const IsServerless = () => (process.env.SYGAR_SERVERLESS ?? false) === 'false' ? false : (process.env.SYGAR_SERVERLESS ?? false) === 'true' ? true : process.env.SYGAR_SERVERLESS ?? false;
