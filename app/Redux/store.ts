import logger from 'redux-logger'

import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import mainReducer from './features/Main/mainSlice'

export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type TAppDispatch = typeof store.dispatch
export type TRootState = ReturnType<typeof store.getState>
export type TAppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	TRootState,
	unknown,
	Action<string>
>
