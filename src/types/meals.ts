export type Ingredients = {
  label: string
  unitMeasure: string
  units: string | number
  value: string
}

export type Meal = {
  id?: string
  name?: string
  mealImage?: string
  kCal?: string
  prepTime?: string
  recipe?: string[]
  ingredients?: Ingredients[]
}
