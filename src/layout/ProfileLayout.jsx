import { Outlet } from 'react-router'
import Sidebar from '../components/Sidebar';

export default function ProfileLayout() {
    return (
        <div className="row">
            <div className="col-3">
                <Sidebar />
            </div>
            <div className="col-9">
                <section className="profile">
                    <Outlet />
                </section>
            </div>
        </div>
    )
}