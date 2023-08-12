import knex from 'knex';
import { knexfile } from './knexfile.js';

export const db = knex.knex(knexfile.development);
