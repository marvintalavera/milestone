import { createContext, useReducer } from "react";

export const MealsContext = createContext()

export const mealsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MEALS':
            return {
                meals: action.payload
            }
        case 'CREATE_MEAL':
            return {
                meals: state.meals ? [action.payload, ...state.meals] : [action.payload]
              }
        case 'DELETE_MEAL':
            return {
                meals: state.meals.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const MealsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(mealsReducer, {
        meals: null
    })

    return (
        <MealsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </MealsContext.Provider>
    )
}