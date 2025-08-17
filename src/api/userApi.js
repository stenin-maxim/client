const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('accessToken');

export async function fetchAvatar(token) {
    const response = await fetch(`${API_URL}avatar`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.json();
}

export async function uploadAvatar(token, avatarFile) {
    const formData = new FormData();
    formData.append('avatar', avatarFile);
  
    const response = await fetch(`${API_URL}avatar`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });
    return response.json();
}

export async function deleteAvatar() {
    const response = await fetch(`${API_URL}avatar`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.json();
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
    console.log(city);
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

export async function createProduct(formData) {
    const response = await fetch(`${API_URL}product`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        },
        body: formData,
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка создания продукта: ${response.status} ${errorText}`);
    }
    return response.json();
}