import 'dotenv/config';
import * as joi from 'joi';

interface EnvsVars {
  PORT: number;
  DATABASE_URL: string;
}

const envsSchemas = joi.object({
    PORT: joi.number().required(),
    DATABSE_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchemas.validate(process.env);

// if (error) {
//   throw new Error(`Error ${error.message}`);
// }
const envVars: EnvsVars = value;

export const envs = {
  port: envVars.PORT,
  databseURL: envVars.DATABASE_URL,
};
