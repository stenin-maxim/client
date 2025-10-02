import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { useProductActions } from '../../../hooks/useProductActions';

export default function InactiveProduct() {
    const userProducts = useSelector(state => state.userProduct.userProducts);
    const { setStatusProduct, deleteProduct, loading, isStatusProduct, isDelete } = useProductActions();

    const userProductsNoActive = userProducts?.filter((item) => item.status === 'inactive');

    const handleActionClick = async (action, item) => {
        if (action.label === 'Опубликовать повторно') {
            await setStatusProduct(item.id, 'active');
        } else if (action.label === 'Удалить') {
            await deleteProduct(item.id);
        }
    };

    const actions = [
        { type: 'link', label: 'Редактировать', to: '' },
        { type: 'button', label: 'Опубликовать повторно', disabled: loading || isStatusProduct },
        { type: 'button', label: 'Удалить обявление', disabled: loading || isDelete }
    ];

    return (
        <>
            {userProductsNoActive?.length > 0 ? 
                <>
                    {userProductsNoActive.map((item) => (
                        <ProductCard
                            key={item.id}
                            item={item}
                            actions={actions.map(action => ({
                                ...action,
                                to: action.type === 'link' ? `/product/${item.id}/edit` : undefined
                            }))}
                            onActionClick={handleActionClick}
                            showInactiveText={true}
                        />
                    ))}
                </> : <center>Заблокированные и неактивные объявления будут отображаться на этой странице.</center>
            }
        </>
    );
}