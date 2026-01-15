import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router'
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '@/scss/app.scss';
import RequireAuth from '@/features/auth/RequireAuth'

import RootLayout from '@/layout/RootLayout';
import ProfileLayout from '@/layout/ProfileLayout';
import BreadcrumbsLayout from '@/layout/BreadcrumbsLayout';

import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import VerifyEmail from '@/pages/VerifyEmail';

import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Restore from '@/pages/auth/Restore';

import ProductULID from '@/pages/product/ProductULID';
import CreateProduct from '@/pages/product/CreateProduct';
import EditProduct from '@/pages/product/EditProduct';

import Profile from '@/pages/profile/Profile';
import Messages from '@/pages/profile/Messages';
import Favorites from '@/pages/profile/Favorites';
import Settings from '@/pages/profile/Settings';
import Support from '@/pages/profile/Support';

import AllUserProduct from '@/components/profile/product/AllUserProduct';
import InactiveProduct from '@/components/profile/product/InactiveProduct';
import ActiveProduct from '@/components/profile/product/ActiveProduct';
import SoldProduct from '@/components/profile/product/SoldProduct';

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

                <Route element={<BreadcrumbsLayout />}>
                    <Route path="/:city/:category/:subcategory/:ulid" element={<ProductULID />}/> {/* Важно: роут продукта должен стоять ПЕРВЫМ, чтобы не быть перехваченным роутом каталога */}
                </Route>
                <Route path="/:city?/:category?/:subcategory?" element={<Home />}/>
                {/* protected routes */}
                <Route element={<RequireAuth />}>
                    <Route path="product" element={<CreateProduct/>} />
                    <Route path="product/:id/edit" element={<EditProduct />}/>
                    <Route element={<BreadcrumbsLayout />}>
                        <Route element={<ProfileLayout />}>
                            <Route path="profile" element={<Profile />}>
                                <Route index element={<AllUserProduct />} />
                                <Route path="inactive" element={<InactiveProduct />} />
                                <Route path="active" element={<ActiveProduct />} />
                                <Route path="sold" element={<SoldProduct />} />
                            </Route>
                            <Route path="messages" element={<Messages />} />
                            <Route path="favorites" element={<Favorites />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="support" element={<Support />} />
                        </Route>
                    </Route>
                </Route>
            </Route>
        )
    );

    return (
        <RouterProvider router={router} />
    )
}