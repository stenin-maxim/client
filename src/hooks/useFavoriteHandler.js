import { useToggleFavoriteMutation } from '@/api/userProductApi';

export const useFavoriteHandler = () => {
    const [toggleFavorite] = useToggleFavoriteMutation();
    const handleFavorite = async (e, product) => {
        e.stopPropagation();
        e.preventDefault();
 
        try {
            const result = await toggleFavorite({ product }).unwrap();

            return result;
        } catch (err) {
            console.error("Ошибка при смене статуса избранного:", err);
            throw err;
        }
    };

    return { handleFavorite };
};