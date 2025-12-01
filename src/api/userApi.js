const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('accessToken');

export async function getAvatar(token) {
    // Проверяем наличие токена
    if (!token) {
        return { avatar: null };
    }
    try {
        const response = await fetch(`${API_URL}avatar`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        // Проверяем статус ответа
        if (!response.ok) {
            // Если ответ не успешный, возвращаем null вместо ошибки
            return { avatar: null };
        }

        // Проверяем Content-Type перед парсингом
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            // Если ответ не JSON, возвращаем null
            return { avatar: null };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching avatar:', error);
        return { avatar: null };
    }
}

export async function uploadAvatar(token, avatarFile) {
    const formData = new FormData();
    formData.append('avatar', avatarFile);
  
    try {
        const response = await fetch(`${API_URL}avatar`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Ошибка загрузки аватара');
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Неверный формат ответа от сервера');
        }

        return response.json();
    } catch (error) {
        console.error('Error uploading avatar:', error);
        throw error;
    }
}

export async function deleteAvatar() {
    try {
        const response = await fetch(`${API_URL}avatar`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Ошибка удаления аватара');
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        }
        
        return { success: true };
    } catch (error) {
        console.error('Error deleting avatar:', error);
        throw error;
    }
}

export async function updateName(token, name) {
    const response = await fetch(`${API_URL}profile/name`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name }),
        credentials: 'include',
    });
    if (!response.ok) throw new Error('Ошибка обновления имени');
    return response.json();
}

export async function updatePhone(token, phone) {
    const response = await fetch(`${API_URL}profile/phone`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone }),
    });
    if (!response.ok) throw new Error('Ошибка обновления номера телефона');
    return response.json();
}

export async function updateCity(token, city) {
    const response = await fetch(`${API_URL}profile/city`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city }),
    });
    if (!response.ok) throw new Error('Ошибка обновления города');
    return response.json();
}

export async function updateEmail(token, email) {
    const response = await fetch(`${API_URL}profile/email`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error('Ошибка обновления email');
    return response.json();
}
