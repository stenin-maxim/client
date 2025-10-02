import { useSelector } from 'react-redux';
import { useProductActions } from '@/hooks/useProductActions';
import { useUnpublishModal } from '@/hooks/useUnpublishModal';
import ProductCard from './ProductCard';
import UnpublishModal from '@/components/modal/UnpublishModal';

export default function AllUserProduct() {
    const userProducts = useSelector(state => state.userProduct.userProducts) || [];
    const { setStatusProduct, deleteProduct, loading, isStatusProduct, isDelete } = useProductActions();
    const { modalIsOpen, product, openModal, closeModal } = useUnpublishModal();
    
    const userProductsInactive = userProducts.filter((item) => item.status === 'inactive');
    const userProductsActive = userProducts.filter((item) => item.status === 'active');
    const userProductsSold = userProducts.filter((item) => item.status === 'sold');

    const handleActionClick = async (action, item) => {
        if (action.label === 'Опубликовать повторно') {
            await setStatusProduct(item.id, 'active');
        } else if (action.label === 'Удалить объявление') {
            await deleteProduct(item.id);
        } else if (action.label === 'Снять с публикации') {
            openModal(item);
        }
    };

    const handleSetStatusProduct = async (productId, status) => {
        try {
            await setStatusProduct(productId, status);
            closeModal();
        } catch (error) {
            // Ошибка уже обработана в хуке
        }
    };

    const inactiveActions = [
        { type: 'link', label: 'Редактировать', to: '' },
        { type: 'button', label: 'Опубликовать повторно', disabled: loading || isStatusProduct },
        { type: 'button', label: 'Удалить объявление', disabled: loading || isDelete }
    ];

    const activeActions = [
        { type: 'button', label: 'Продать быстрее', disabled: loading },
        { type: 'link', label: 'Редактировать', to: '' },
        { type: 'button', label: 'Снять с публикации' }
    ];

    const soldActions = [
        { type: 'button', label: 'Удалить объявление', disabled: loading || isDelete }
    ];

    return (
        <>
            {userProductsInactive.length > 0 ? (<h2>Неактивные</h2>) : ''}
            {userProductsInactive?.map((item) => (
                <ProductCard
                    key={item.id}
                    item={item}
                    actions={inactiveActions.map(action => ({
                        ...action,
                        to: action.type === 'link' ? `/product/${item.id}/edit` : undefined
                    }))}
                    onActionClick={handleActionClick}
                    showInactiveText={true}
                />
            ))}

            {userProductsActive.length > 0 ? (<h2>Активные</h2>) : ''}
            {userProductsActive?.map((item) => (
                <ProductCard
                    key={item.id}
                    item={item}
                    actions={activeActions.map(action => ({
                        ...action,
                        to: action.type === 'link' ? `/product/${item.id}/edit` : undefined
                    }))}
                    onActionClick={handleActionClick}
                    showExpiresAt={true}
                />
            ))}

            <UnpublishModal
                isOpen={modalIsOpen}
                onClose={closeModal}
                product={product}
                onAction={handleSetStatusProduct}
                loading={loading}
            />

            {userProductsActive.length > 0 ? (<h2>Проданные</h2>) : ''}
            {userProductsSold?.map((item) => (
                <ProductCard
                    key={item.id}
                    item={item}
                    actions={soldActions.map(action => ({
                        ...action,
                        to: action.type === 'link' ? `/product/${item.id}/edit` : undefined
                    }))}
                    onActionClick={handleActionClick}
                    showSoldText={true}
                />
            ))}
        </>
    );
}
