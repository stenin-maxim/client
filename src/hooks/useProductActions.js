import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useStatusProductMutation, useDeleteUserProductMutation } from '../api/productApi';
import { updateUserProductValue, removeUserProduct } from '../features/userProduct/userProductSlice';

export const useProductActions = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false); // отменить многочисленное нажатие кнопки, при отправке данных
    const [statusProduct, { isLoading: isStatusProduct }] = useStatusProductMutation();
    const [deleteUserProduct, { isLoading: isDelete }] = useDeleteUserProductMutation();

    const setStatusProduct = async (productId, status) => {
        setLoading(true);
        try {
            const result = await statusProduct({productId, status}).unwrap();
            dispatch(updateUserProductValue({ id: productId, value: result.data.status }));
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
        setLoading(true);
        let confirmResult = confirm("Вы действительно хотите удалить объявление?");

        if (confirmResult) {
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