import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'
import React from 'react'
import { Provider as ReduxStoreProvider } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { HistoryRouter } from 'redux-first-history/rr6'

import { Layout } from '@/components/layout/Layout'

import Toaster from './components/common/Toast'
import routes from './pages'
import { history, store } from './store'

const App: React.FC = () => {
  const pageRoutes = routes.map(({ path, title, element, layout }) => {
    const Page = element
    const PageLayout = layout || Layout
    return (
      <Route
        key={title}
        path={path}
        element={
          <PageLayout>
            <Page />
          </PageLayout>
        }
      />
    )
  })
  return (
    <ReduxStoreProvider store={store}>
      <ThemeProvider>
        <NextUIProvider>
          <HistoryRouter history={history}>
            <Routes>{pageRoutes}</Routes>
          </HistoryRouter>
        </NextUIProvider>
        <Toaster />
      </ThemeProvider>
    </ReduxStoreProvider>
  )
}

export default App
