import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Alerts from './components/Alerts';


function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = ((message, type) => {
    setAlert({
      message: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  })

  const router = createBrowserRouter([
    {
      path: '/',
      element: <>
        <Navbar />
      </>
    },
    {
      path: '/home',
      element: <>
        <Navbar />
        <Home/>
      </>
    },
    {
      path: '/about',
      element: <>
        <Navbar />
        <About/>
      </>
    },
    {
      path: '/login',
      element: <>
        <Navbar />
        <Alerts customAlert={alert}/>
        <Login showAlert={showAlert}/>
      </>
    },
    {
      path: '/signup',
      element: <>
        <Navbar />
        <Alerts customAlert={alert}/>
        <Signup showAlert={showAlert}/>
      </>
    }
  ])

  return (
    <>
      <NoteState>
        <RouterProvider router={router} />
      </NoteState>
    </>
  );
}

export default App;
