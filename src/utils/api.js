const BASE_URL = import.meta.env.VITE_API_URL

const request = async (path, options = {}) => {
    const response = await fetch(`${BASE_URL}${path}`, options)

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
    }

    return response
}

export const getHealth = () => request('/api/health')