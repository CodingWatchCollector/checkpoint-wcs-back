import { Repository } from 'typeorm'
import { dataSource } from '../dataSource'
import { Country } from '../entities'
import { ErrorRes, SuccessRes } from '../entities/utils'

export class CountryService {
  db: Repository<Country>
  constructor () {
    this.db = dataSource.getRepository('Country')
  }

  async listCountries (continent?: Country['continent']) {
    try {
      const res = await this.db.findBy({ continent })
      return { countries: res }
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.name, message: error.message }
      }
      return {
        error: 'Uknown error',
        message: 'Sorry, could not identify the error'
      }
    }
  }

  async getCountry (code: Country['code']) {
    try {
      return await this.db.findOneBy({ code })
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.name, message: error.message }
      }
      return {
        error: 'Uknown error',
        message: 'Sorry, could not identify the error'
      }
    }
  }

  async createCountry (country: Country) {
    try {
      const newCountryEntity = this.db.create(country)
      const res = await this.db.insert(newCountryEntity)
      const success = res.identifiers.length !== 0
      return { success }
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.name, message: error.message }
      }
      return {
        error: 'Uknown error',
        message: 'Sorry, could not identify the error'
      }
    }
  }
}
