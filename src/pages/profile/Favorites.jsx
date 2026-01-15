import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { useGetFavoriteUserProductsQuery } from '@/api/userProductApi';
import { useFavoriteHandler } from '@/hooks/useFavoriteHandler';

export default function Favorites() {
    const { isLoading } = useGetFavoriteUserProductsQuery();
    const { handleFavorite } = useFavoriteHandler();
    const favorites = useSelector(state => state.userProduct.favorites);

    if (isLoading && favorites.length === 0) return <p>Загрузка...</p>;

    return (
        <>
            <h2>Избранное</h2>
            <div className="favorites">
                <div className="row">
                    {favorites.map((product) => (
                        <div className="col-3" key={product.ulid}>
                            <div className="home-product">
                                <Link to={product.url}>
                                    <div className="image-wrapper">
                                        <img src={product.image}/>
                                        <span className="location">{product.city}</span>
                                        <i className={`bi ${product.is_favorite ? 'bi-heart-fill' : 'bi-heart'}`}
                                            title={product.is_favorite ? "Удалить из избранного" : "Добавить в избранное"}
                                            onClick={(e) => handleFavorite(e, product)}>
                                        </i>
                                    </div>
                                    <div className="price">{product.price}</div>
                                    <div className="title">{product.name}</div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}