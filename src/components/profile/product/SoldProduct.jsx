import { useSelector } from 'react-redux';
import { useProductActions } from '../../../hooks/useProductActions';
import ProductCard from './ProductCard';

export default function SoldProduct() {
    const userProducts = useSelector(state => state.userProduct.userProducts);
    const { deleteProduct, loading, isDelete } = useProductActions();
    
    const userProductsSold = userProducts?.filter((item) => item.status === 'sold');

    const handleActionClick = async (action, item) => {
        if (action.label === 'Удалить объявление') {
            await deleteProduct(item.id);
        }
    };

    const actions = [
        { type: 'button', label: 'Удалить объявление', disabled: loading || isDelete }
    ];

    return (
        <>
            {userProductsSold?.length > 0 ? (
                <>
                    {userProductsSold.map((item) => (
                        <ProductCard
                            key={item.id}
                            item={item}
                            actions={actions}
                            onActionClick={handleActionClick}
                            showSoldText={true}
                        />
                    ))}
                </>
            ) : (
                <center>Все снятые с продажи объявления будут отображаться на этой странице.</center>
            )}
        </>
    );
}
