import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router'
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './scss/app.scss';
import RequireAuth from './features/auth/RequireAuth'
import RootLayout from './layout/RootLayout';
import ProfileLayout from './layout/ProfileLayout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Restore from './pages/auth/Restore';
import Profile from './pages/profile/Profile';
import Settings from './pages/profile/Settings';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import EditProduct from './pages/EditProduct';
import Favorites from './pages/profile/Favorites';
import Messages from './pages/profile/Messages';
import Support from './pages/profile/Support';
import InactiveProfile from './components/profile/InactiveProfile';
import ActiveProfile from './components/profile/ActiveProfile';
import AdsFavorites from './components/profile/AdsFavorites';
import SellersFavorites from './components/profile/SellersFavorites';
import VerifyEmail from './pages/VerifyEmail';

export default function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
                {/* public routes */}
                <Route index element={<Home/>} />
                <Route path="*" element={<NotFound/>} />
                <Route path="login" element={<Login/>} />
                <Route path="register" element={<Register/>} />
                <Route path="restore" element={<Restore/>} />
                <Route path="/verify-email/:id/:hash" element={<VerifyEmail />} />

                {/* protected routes */}
                <Route element={<RequireAuth />}>
                    <Route path="product" element={<Product/>} />
                    <Route path="product/:id/edit" element={<EditProduct />}/>
                    <Route element={<ProfileLayout />}>
                        <Route path="profile" element={<Profile />}>
                            <Route index element={<InactiveProfile />} />
                            <Route path="active" element={<ActiveProfile />} />
                        </Route>
                        <Route path="favorites" element={<Favorites />}>
                            <Route index element={<AdsFavorites />} />
                            <Route path="sellers" element={<SellersFavorites />} />
                        </Route>
                        <Route path="settings" element={<Settings />} />
                        <Route path="messages" element={<Messages />} />
                        <Route path="support" element={<Support />} />
                    </Route>
                </Route>
            </Route>
        )
    );

    return (
        <RouterProvider router={router} />
    )
}