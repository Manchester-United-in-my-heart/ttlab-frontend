import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const MFAAuthentication = () => {
  const [token, setToken] = useState('');

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you would typically send the token to your server for verification
    const res = await fetch('http://localhost:3000/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: searchParams.get('email'),
        password: searchParams.get('password'),
        token: token,
      }),
    });
    const data = await res.json();

    if (data.access_token && data.refresh_token) {
      const accessToken = data.access_token;
      const refreshToken = data.refresh_token;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      window.location.href = '/';
    } else {
      alert(data.message);
    }
  };
  //print query url
  console.log(searchParams);

  return (
    <div className="w-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Enter your MFA token</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="token" className="sr-only">
                Token
              </label>
              <input id="token" name="token" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Token" value={token} onChange={handleTokenChange} />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MFAAuthentication;
