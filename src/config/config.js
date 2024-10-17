import env from 'env-var';

const config = {
  PORT: env.get('PORT').required().asIntPositive(),
  jwt_secret: env.get('JWT_SECRET').required().asString(),
}

export default config;