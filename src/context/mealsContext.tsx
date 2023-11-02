import { collection, getDocs, query } from 'firebase/firestore'
import React, { createContext, useContext, useMemo, useState, type FC } from 'react'
import { db } from '../services/firebase'
import { Meal } from '../types/meals'

interface IMealsContext {
  mealsLoader: boolean
  mealsList: Meal[]
  fetchMeals: () => void
}

interface MealsProviderProps {
  children: React.ReactNode
}

const MealsContext = createContext<IMealsContext | undefined>(undefined)

export const useMealsContext = (): IMealsContext => {
  const context = useContext(MealsContext)
  if (!context) {
    throw new Error('useMealsContext must be used within a MealsProvider')
  }
  return context
}

export const MealsProvider: FC<MealsProviderProps> = ({ children }) => {
  const [mealsList, setMealsList] = useState<Meal[] | []>([])
  const [loading, setLoading] = useState(true)

  const getMeals = query(collection(db, 'meals'))

  const fetchMeals = (): void => {
    getDocs(getMeals)
      .then((mealsQuery) => {
        const meals: Meal[] = mealsQuery.docs.map((doc) => {
          const data = doc.data()
          return {
            ...data,
            id: doc.id,
            ingredients: { ...data.ingredients, units: Number(data.ingredients.units) },
          }
        })
        setLoading(false)
        setMealsList(meals)
      })
      .catch((error) => {
        console.error('Error fetching meals:', error)
      })
  }

  useMemo(() => {
    fetchMeals()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MealsContext.Provider value={{ mealsLoader: loading, mealsList, fetchMeals }}>
      {children}
    </MealsContext.Provider>
  )
}
