import env from 'env-var';

const config = {
  PORT: env.get('PORT').required().asIntPositive(),
  NODE_ENV: env.get('NODE_ENV').required().asString(),
  JWT_SECRET: env.get('JWT_SECRET').required().asString(),
}

export default config;