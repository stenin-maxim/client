import Header from './components/Header';
import useRoutes from './routes/routes';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './scss/app.scss';

export default function App() {
    const routes = useRoutes();

    return (
        <>
            <Header />
            <main>
                {routes}
            </main>
            <footer>
                FOOTER
            </footer>
        </>
    )
}