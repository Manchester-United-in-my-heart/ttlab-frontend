import { User } from '../components/UserList';
import { Product } from '../components/ProductList';
const host = import.meta.env.VITE_HOST;
const token = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

const isTokenExist = () => {
  return token || refreshToken;
};

const redirectToLoginIfTokenNotExist = () => {
  if (!isTokenExist) {
    window.location.href = '/login';
  }
};

export const IsLogin = async () => {
  if (!isTokenExist) return false;
  const res = await getUsers();
  if (res.status === 401) return false;
  return true;
};

export const login = async (username: string, password: string) => {
  try {
    const res = await fetch(`${host}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // CORS
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH, HEAD, OPTIONS',
      },
      body: JSON.stringify({ username, password }),
    });
    console.log(res);
    const data = await res.json();
    console.log(data);
    if (data.access_token && data.refresh_token) {
      const accessToken = data.access_token;
      const refreshToken = data.refresh_token;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      window.location.href = '/';
    } else {
      alert(data.message  );
    }
  } catch (e) {
    console.log(e);
  }
};

export const refresh = async () => {
  try {
    const res = await fetch(`${host}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (res.status !== 401) {
      const data = await res.json();
      if (data.access_token && data.refresh_token) {
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        window.location.href = '/';
      } else {
        console.log('error');
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const getUsers = async () => {
  redirectToLoginIfTokenNotExist();
  return await fetch(`${host}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const createUser = async (user: User) => {
  redirectToLoginIfTokenNotExist();
  return await fetch(`${host}/users`, {
    body: JSON.stringify({
      name: user.name || '',
      email: user.email || '',
      dateOfBirth: user.DOB || '',
      phone: user.phone || '',
      avatarUrl: user.avatar || '',
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const modifyUser = async (user: User) => {
  redirectToLoginIfTokenNotExist();
  return await fetch(`${host}/users/${user.id}`, {
    body: JSON.stringify({
      name: user.name || '',
      email: user.email || '',
      dateOfBirth: user.DOB || '',
      phone: user.phone || '',
      avatarUrl: user.avatar || '',
    }),
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const deleteUser = async (user: User) => {
  redirectToLoginIfTokenNotExist();
  return await fetch(`${host}/users/${user.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const getProducts = async () => {
  redirectToLoginIfTokenNotExist();
  return await fetch(`${host}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const createProduct = async (product: Product) => {
  redirectToLoginIfTokenNotExist();
  return await fetch(`${host}/products`, {
    body: JSON.stringify({
      name: product.name || '',
      price: product.price || '',
      quantity: product.quantity || '',
      description: product.description || '',
      imageUrl: product.image || '',
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const modifyProduct = async (product: Product) => {
  redirectToLoginIfTokenNotExist();
  return await fetch(`${host}/products/${product.id}`, {
    body: JSON.stringify({
      name: product.name || '',
      price: product.price || '',
      quantity: product.quantity || '',
      description: product.description || '',
      imageUrl: product.image || '',
    }),
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const deleteProduct = async (product: Product) => {
  redirectToLoginIfTokenNotExist();
  return await fetch(`${host}/products/${product.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
  });
};
