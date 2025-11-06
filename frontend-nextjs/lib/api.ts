// API utility functions for communicating with Django backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface TokenResponse {
  access: string;
  refresh: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Token management
export const getTokens = (): AuthTokens | null => {
  if (typeof window === 'undefined') return null;
  
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!accessToken || !refreshToken) return null;
  
  return { accessToken, refreshToken };
};

export const setTokens = (accessToken: string, refreshToken: string): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const clearTokens = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

// API request wrapper with authentication
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const tokens = getTokens();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (tokens?.accessToken) {
    headers['Authorization'] = `Bearer ${tokens.accessToken}`;
  }
  
  const config: RequestInit = {
    ...options,
    headers,
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // If unauthorized, try to refresh token
    if (response.status === 401 && tokens?.refreshToken) {
      const newTokens = await refreshAccessToken(tokens.refreshToken);
      if (newTokens) {
        setTokens(newTokens.access, newTokens.refresh);
        
        // Retry the original request with new token
        headers['Authorization'] = `Bearer ${newTokens.access}`;
        const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...config,
          headers,
        });
        
        if (!retryResponse.ok) {
          throw new Error(`HTTP error! status: ${retryResponse.status}`);
        }
        
        return await retryResponse.json();
      } else {
        clearTokens();
        window.location.href = '/login';
        throw new Error('Session expired');
      }
    }
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
      throw new Error(error.detail || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Refresh access token
async function refreshAccessToken(refreshToken: string): Promise<TokenResponse | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
}

// Authentication API
export const authAPI = {
  register: async (userData: {
    username: string;
    email: string;
    password: string;
    password2: string;
    full_name?: string;
  }) => {
    const response = await apiRequest<{
      user: any;
      tokens: TokenResponse;
      message: string;
    }>('/api/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    setTokens(response.tokens.access, response.tokens.refresh);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  },
  
  login: async (credentials: { username: string; password: string }) => {
    const response = await apiRequest<TokenResponse>('/api/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    setTokens(response.access, response.refresh);
    
    // Fetch user profile after login
    const user = await authAPI.getProfile();
    localStorage.setItem('user', JSON.stringify(user));
    
    return { tokens: response, user };
  },
  
  logout: async () => {
    const tokens = getTokens();
    if (tokens?.refreshToken) {
      try {
        await apiRequest('/api/auth/logout/', {
          method: 'POST',
          body: JSON.stringify({ refresh_token: tokens.refreshToken }),
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    clearTokens();
  },
  
  getProfile: async () => {
    return await apiRequest<any>('/api/auth/profile/');
  },
  
  updateProfile: async (profileData: any) => {
    return await apiRequest<{ user: any; message: string }>('/api/auth/profile/', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
  
  changePassword: async (passwordData: { old_password: string; new_password: string }) => {
    return await apiRequest<{ message: string }>('/api/auth/change-password/', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  },
};

// CV API
export const cvAPI = {
  list: async () => {
    return await apiRequest<any[]>('/api/cvs/');
  },
  
  get: async (id: number) => {
    return await apiRequest<any>(`/api/cvs/${id}/`);
  },
  
  create: async (cvData: any) => {
    return await apiRequest<any>('/api/cvs/', {
      method: 'POST',
      body: JSON.stringify(cvData),
    });
  },
  
  update: async (id: number, cvData: any) => {
    return await apiRequest<any>(`/api/cvs/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(cvData),
    });
  },
  
  partialUpdate: async (id: number, cvData: any) => {
    return await apiRequest<any>(`/api/cvs/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(cvData),
    });
  },
  
  delete: async (id: number) => {
    return await apiRequest<void>(`/api/cvs/${id}/`, {
      method: 'DELETE',
    });
  },
  
  analyze: async (id: number) => {
    return await apiRequest<{ message: string; analysis: any }>(`/api/cvs/${id}/analyze/`, {
      method: 'POST',
    });
  },
  
  duplicate: async (id: number) => {
    return await apiRequest<{ message: string; cv: any }>(`/api/cvs/${id}/duplicate/`, {
      method: 'POST',
    });
  },
};

// Work Experience API
export const workExperienceAPI = {
  list: async (cvId: number) => {
    return await apiRequest<any[]>(`/api/cvs/work-experience/?cv_id=${cvId}`);
  },
  
  create: async (data: any) => {
    return await apiRequest<any>('/api/cvs/work-experience/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  update: async (id: number, data: any) => {
    return await apiRequest<any>(`/api/cvs/work-experience/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  delete: async (id: number) => {
    return await apiRequest<void>(`/api/cvs/work-experience/${id}/`, {
      method: 'DELETE',
    });
  },
};

// Education API
export const educationAPI = {
  list: async (cvId: number) => {
    return await apiRequest<any[]>(`/api/cvs/education/?cv_id=${cvId}`);
  },
  
  create: async (data: any) => {
    return await apiRequest<any>('/api/cvs/education/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  update: async (id: number, data: any) => {
    return await apiRequest<any>(`/api/cvs/education/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  delete: async (id: number) => {
    return await apiRequest<void>(`/api/cvs/education/${id}/`, {
      method: 'DELETE',
    });
  },
};

// Skills API
export const skillsAPI = {
  list: async (cvId: number) => {
    return await apiRequest<any[]>(`/api/cvs/skills/?cv_id=${cvId}`);
  },
  
  create: async (data: any) => {
    return await apiRequest<any>('/api/cvs/skills/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  update: async (id: number, data: any) => {
    return await apiRequest<any>(`/api/cvs/skills/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  delete: async (id: number) => {
    return await apiRequest<void>(`/api/cvs/skills/${id}/`, {
      method: 'DELETE',
    });
  },
};

// Projects API
export const projectsAPI = {
  list: async (cvId: number) => {
    return await apiRequest<any[]>(`/api/api/cvs/projects/?cv_id=${cvId}`);
  },
  
  create: async (data: any) => {
    return await apiRequest<any>('/api/cvs/projects/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  update: async (id: number, data: any) => {
    return await apiRequest<any>(`/api/cvs/projects/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  delete: async (id: number) => {
    return await apiRequest<void>(`/api/cvs/projects/${id}/`, {
      method: 'DELETE',
    });
  },
};

// Certifications API
export const certificationsAPI = {
  list: async (cvId: number) => {
    return await apiRequest<any[]>(`/api/cvs/certifications/?cv_id=${cvId}`);
  },
  
  create: async (data: any) => {
    return await apiRequest<any>('/api/cvs/certifications/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  update: async (id: number, data: any) => {
    return await apiRequest<any>(`/api/cvs/certifications/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  delete: async (id: number) => {
    return await apiRequest<void>(`/api/cvs/certifications/${id}/`, {
      method: 'DELETE',
    });
  },
};
