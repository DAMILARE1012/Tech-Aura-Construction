import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from '@/api/apiSlice'
import uiReducer from '@/features/ui/uiSlice'
import themeReducer from '@/features/theme/themeSlice'
import projectFiltersReducer from '@/features/projects/projectFiltersSlice'
import insightFiltersReducer from '@/features/insights/insightFiltersSlice'
import jobFiltersReducer from '@/features/careers/jobFiltersSlice'

// Endpoint modules must be imported for their side effect: each one injects
// its endpoints into apiSlice at module load.
import '@/features/projects/projectsApi'
import '@/features/services/servicesApi'
import '@/features/insights/insightsApi'
import '@/features/careers/careersApi'
import '@/features/people/peopleApi'
import '@/features/contact/contactApi'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    ui: uiReducer,
    theme: themeReducer,
    projectFilters: projectFiltersReducer,
    insightFilters: insightFiltersReducer,
    jobFilters: jobFiltersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.DEV,
})

// Enables refetchOnFocus / refetchOnReconnect behaviour.
setupListeners(store.dispatch)
