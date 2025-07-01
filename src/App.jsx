import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router'
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './scss/app.scss';
import RequireAuth from './features/auth/RequireAuth'
import RootLayout from './layout/RootLayout';
import ProfileLayout from './layout/ProfileLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Restore from './pages/auth/Restore';
import Settings from './pages/profile/Settings';
import ProfileInactive from './components/profile/ProfileInactive';
import ProfileActive from './components/profile/ProfileActive';

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
                            <Route path="active" element={<ProfileActive />} />
                            <Route path="inactive" element={<ProfileInactive />} />
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