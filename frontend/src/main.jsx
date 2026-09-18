
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { store, persistor } from './store/store.js'
import './index.css'
import './i18n/i18n.js'

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

// Switching schools changes the X-School-Id header on every future request,
// but data already cached from the previous school stays stale until
// something asks for it again. Invalidating everything on schoolChanged
// makes every mounted, data-driven page refetch under the new tenant
// immediately — real-time switching, not "switch and hope you navigate away
// and back".
window.addEventListener('schoolChanged', () => {
  queryClient.invalidateQueries();
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
