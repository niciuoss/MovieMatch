import { RouterProvider } from 'react-router-dom'
import './global.css'
import { router } from './routes'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './components/theme/theme-provider'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey='moviematch-theme' defaultTheme='light'>
        <Helmet titleTemplate='%s | movie.match'/>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </HelmetProvider>
  )
}
