import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router'
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './scss/app.scss';
import RequireAuth from './features/auth/RequireAuth'
import RootLayout from './layout/RootLayout';
import ProfileLayout from './layout/ProfileLayout';
import Home from './pages/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Restore from './pages/auth/Restore';
import Settings from './pages/profile/Settings';
import InactiveProfile from './components/profile/InactiveProfile';
import ActiveProfile from './components/profile/ActiveProfile';

export default function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
                {/* public routes */}
                <Route index element={<Home/>} />
                <Route path="login" element={<Login/>} />
                <Route path="register" element={<Register/>} />
                <Route path="restore" element={<Restore/>} />

                {/* protected routes */}
                <Route element={<RequireAuth />}>
                    <Route path="profile" element={<ProfileLayout />}>
                        <Route element={<Profile />}>
                            <Route path="active" element={<ActiveProfile />} />
                            <Route path="inactive" element={<InactiveProfile />} />
                        </Route>
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Route>
            </Route>
        )
    );

    return (
        <RouterProvider router={router} />
    )
}