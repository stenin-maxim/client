import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useStatusProductMutation, useDeleteUserProductMutation } from '../api/userProductApi';
import { updateUserProductStatus, removeUserProduct } from '../features/userProduct/userProductSlice';

export const useProductActions = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false); // отменить многочисленное нажатие кнопки, при отправке данных
    const [statusProduct, { isLoading: isStatusProduct }] = useStatusProductMutation();
    const [deleteUserProduct, { isLoading: isDelete }] = useDeleteUserProductMutation();

    const setStatusProduct = async (productId, status) => {
        setLoading(true);
        try {
            const result = await statusProduct({productId, status}).unwrap();
            dispatch(updateUserProductStatus({ id: productId, value: result.data.status }));
            alert(result.message);
            return result;
        } catch (error) {
            alert(`Ошибка публикации: ${error.message || 'Неизвестная ошибка'}`);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (productId) => {
        let confirmResult = confirm("Вы действительно хотите удалить объявление?");
        
        if (!confirmResult) {
            return;
        }

        setLoading(true);
        try {
            const result = await deleteUserProduct(productId).unwrap();
            dispatch(removeUserProduct(productId));
            alert(result.message);
            return result;
        } catch (error) {
            console.error('Ошибка удаления продукта:', error);
            throw error;
        } finally {
            setLoading(false);
        }

    };

    return {
        loading,
        isStatusProduct,
        isDelete,
        setStatusProduct,
        deleteProduct
    };
};