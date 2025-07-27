const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('accessToken');

export async function fetchAvatar() {
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