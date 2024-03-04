import { User } from '../components/UserList';
import { Product } from '../components/ProductList';
const host = import.meta.env.VITE_HOST || 'https://nest-mongo-gold.vercel.app';
const token = localStorage.getItem('accessToken');
if (!token) {
  window.location.href = '/login';
}

export const getUsers = async () => {
  return await fetch(`${host}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const createUser = async (user: User) => {
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
  return await fetch(`${host}/users/${user.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const getProducts = async () => {
  return await fetch(`${host}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const createProduct = async (product: Product) => {
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
  return await fetch(`${host}/products/${product.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
  });
};
