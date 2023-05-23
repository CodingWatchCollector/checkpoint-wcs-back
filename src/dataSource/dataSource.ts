import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Country } from '../entities'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './database.sqlite',
  synchronize: true,
  logging: ['query', 'error'],
  entities: [Country]
})
