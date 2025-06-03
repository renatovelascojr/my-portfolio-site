import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import LandingSection from "./components/LandingSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactMeSection from "./components/ContactmeSection";
import Footer from "./components/Footer";
import { AlertProvider } from "./context/alertContext";
import Alert from "./components/Alert";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from './utils/supabaseClient.ts';
import { setUser, clearUser } from './store/authSlice.ts';
import CreateBlog from "./components/CreateBlog.tsx";
import UpdateBlog from "./components/UpdateBlog.tsx";
import BlogsList from "./components/ListBlog.tsx";

// ProtectedRoute component
function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/login" replace />;
}

// PublicRoute component to block logged-in users from auth pages
function PublicRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  return user ? <Navigate to="/home" replace /> : children;
}

// Home component
function Home() {
  return (
    <>
      <LandingSection />
      <ProjectsSection />
     <BlogsList /> 
      <ContactMeSection />
      <Footer />
    </>
  );
}

function App() {
  const dispatch = useDispatch();
  const location = useLocation();  // This works here because Router is higher up (in index.js)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        dispatch(setUser(session.user));
      } else {
        dispatch(clearUser());
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          dispatch(setUser(session.user));
        } else {
          dispatch(clearUser());
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);

  const noHeaderRoutes = ["/login", "/register"];

  return (
    <ChakraProvider>
      <AlertProvider>
        {/* NO Router HERE */}
        
        {/* Conditionally show Header */}
        {!noHeaderRoutes.includes(location.pathname) && <Header />}

        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/register" replace />} />

            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />


            {/* Blog routes protected */}
             <Route
              path="/blogs/create"
              element={
                <ProtectedRoute>
                  <CreateBlog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blogs/update/:id"
              element={
                <ProtectedRoute>
                  <UpdateBlog />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Alert />
      </AlertProvider>
    </ChakraProvider>
  );
}

export default App;