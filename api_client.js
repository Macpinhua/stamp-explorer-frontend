class ApiClient {
    constructor(baseURL = 'http://localhost:8000') {
        this.baseURL = baseURL;
        this.token = localStorage.getItem('token');
    }

    // 设置认证token
    setToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    // 清除认证token
    clearToken() {
        this.token = null;
        localStorage.removeItem('token');
    }

    // 通用请求方法
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        // 添加认证头
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const config = {
            method: options.method || 'GET',
            headers,
            ...options
        };

        // 处理body
        if (options.body && typeof options.body === 'object') {
            config.body = JSON.stringify(options.body);
        }

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API请求失败:', error);
            throw error;
        }
    }

    // 用户相关API
    async register(userData) {
        return this.request('/api/users/register', {
            method: 'POST',
            body: userData
        });
    }

    async login(credentials) {
        const response = await this.request('/api/users/login', {
            method: 'POST',
            body: credentials
        });
        this.setToken(response.access_token);
        return response;
    }

    async getCurrentUser() {
        return this.request('/api/users/me');
    }

    async updateUser(userData) {
        return this.request('/api/users/me', {
            method: 'PUT',
            body: userData
        });
    }

    async uploadAvatar(file) {
        const formData = new FormData();
        formData.append('file', file);

        return this.request('/api/users/avatar/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    // 帖子相关API
    async createPost(formData) {
        return this.request('/api/posts/', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    async getPosts(params = {}) {
        const queryParams = new URLSearchParams(params).toString();
        const endpoint = `/api/posts/${queryParams ? '?' + queryParams : ''}`;
        return this.request(endpoint);
    }

    async likePost(postId) {
        return this.request(`/api/posts/${postId}/like`, {
            method: 'POST'
        });
    }

    // 印章点相关API
    async createStampLocation(formData) {
        return this.request('/api/stamps/', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    async getStampLocations(params = {}) {
        const queryParams = new URLSearchParams(params).toString();
        const endpoint = `/api/stamps/${queryParams ? '?' + queryParams : ''}`;
        return this.request(endpoint);
    }

    async favoriteStamp(stampId) {
        return this.request(`/api/stamps/${stampId}/favorite`, {
            method: 'POST'
        });
    }

    // 反馈相关API
    async createFeedback(formData) {
        return this.request('/api/feedback/', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    // 检查认证状态
    isAuthenticated() {
        return !!this.token;
    }

    // 登出
    logout() {
        this.clearToken();
    }
}

// 创建全局API客户端实例
const apiClient = new ApiClient('https://stamp-explorer.vercel.app');

// 导出以便在其他文件中使用
window.ApiClient = ApiClient;
window.apiClient = apiClient;