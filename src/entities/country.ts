import { createUnionType, Field, InputType, ObjectType } from 'type-graphql'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { ErrorRes, SuccessRes } from './utils'

@Entity()
@ObjectType()
export class Country {
  @PrimaryColumn()
  @Field()
  code: string

  @Column()
  @Field()
  name: string

  @Column()
  @Field()
  emoji: string

  @Column()
  @Field()
  continent: string
}

@InputType()
export class newCountryInput implements Partial<Country> {
  @Field()
  code: string

  @Field()
  name: string

  @Field()
  emoji: string

  @Field()
  continent: string
}

export const NewCountryRes = createUnionType({
  name: 'NewCountryResult',
  types: () => [SuccessRes, ErrorRes] as const,
  resolveType: value => {
    if ('success' in value) {
      return SuccessRes
    } else {
      return ErrorRes
    }
  }
})

export const GetCountryRes = createUnionType({
  name: 'GetCountryResult',
  types: () => [Country, ErrorRes] as const,
  resolveType: value => {
    if ('success' in value) {
      return Country
    } else {
      return ErrorRes
    }
  }
})

@ObjectType()
class AllCountries {
  @Field(() => [Country])
  countries: Country[]
}

export const AllCountriesRes = createUnionType({
  name: 'AllCountriesResult',
  types: () => [AllCountries, ErrorRes] as const,
  resolveType: value => {
    if ('error' in value) {
      return ErrorRes
    } else {
      return AllCountries
    }
  }
})
