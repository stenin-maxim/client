import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Restore from './pages/auth/Restore';
import Profile from './pages/Profile';
import { Routes, Route } from 'react-router'
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './scss/app.scss';
import RequireAuth from './features/auth/RequireAuth'

export default function App() {
    return (
        <>
            <Header />
            <main>
                <div className="container">
                    <Routes>
                        {/* public routes */}
                        <Route path="/" element={<Home/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/restore" element={<Restore/>} />

                        {/* protected routes */}
                        <Route element={<RequireAuth />}>
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                    </Routes>
                </div>
            </main>
            <Footer/>
        </>
    )
}