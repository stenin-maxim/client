import { Outlet } from 'react-router'
import Breadcrumbs from '@/components/Breadcrumbs';

export default function BreadcrumbsLayout() {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <Breadcrumbs />
                </div>
            </div>
            <Outlet />
        </>
    )
}