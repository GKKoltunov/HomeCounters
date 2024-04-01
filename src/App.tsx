import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './providers/router/router';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <CookiesProvider>
          <RouterProvider router={router} />
        </CookiesProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
