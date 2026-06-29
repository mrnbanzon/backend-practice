const config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbUrl: process.env.DATABASE_URL || 'postgres://local-host:5432/myapp',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-not-for-prod'
};


// console.log(config);
// intead of dotenv add flag to runnning node: --env-file=PATH/TO/FILE 

export default config;