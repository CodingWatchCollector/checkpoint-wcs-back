import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import {
  AllCountriesRes,
  Country,
  GetCountryRes,
  newCountryInput,
  NewCountryRes
} from '../entities'
import { CountryService } from '../services'

@Resolver()
export class CountryResolver {
  @Query(() => AllCountriesRes)
  async countries (
    @Arg('continent', { nullable: true }) continent?: string
  ): Promise<typeof AllCountriesRes> {
    return await new CountryService().listCountries(continent)
  }

  @Query(() => GetCountryRes, { nullable: true })
  async country (
    @Arg('code') code: string
  ): Promise<typeof GetCountryRes | null> {
    return await new CountryService().getCountry(code)
  }

  @Mutation(() => NewCountryRes)
  async newCountry (
    @Arg('country') country: newCountryInput
  ): Promise<typeof NewCountryRes> {
    const res = await new CountryService().createCountry(country)
    return res
  }
}
