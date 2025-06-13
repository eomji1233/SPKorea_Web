import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header'
import About from './pages/About';
import Home from './pages/Home'
import Contact from "./components/ContactForm";
import ScrollToTop from "./components/ScrollToTop";
import WorkList from "./pages/work/WorkList";
import WorkAdd from "./pages/admin/WorkAdd";
import WorkDetail from "./pages/work/WorkDetail";
import WorkEdit from "./pages/admin/WorkEdit";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";
import ContactForm from "./components/ContactForm";
import CursorFollower from "./components/CursorFollwer";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </div>
  );
}

function AppRoutes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <CursorFollower />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/work" element={<WorkList />} />
        <Route path="/work/:id" element={<WorkDetail />} />

        <Route path="/contact" element={<ContactForm />} />

        <Route
          path="/admin/work/add"
          element={user?.roles.includes("ROLE_ADMIN") ? <WorkAdd /> : <Navigate to="/" replace />}
        />
        <Route
          path="/admin/work/edit/:id"
          element={user?.roles.includes("ROLE_ADMIN") ? <WorkEdit /> : <Navigate to="/" replace />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
}


export default App;