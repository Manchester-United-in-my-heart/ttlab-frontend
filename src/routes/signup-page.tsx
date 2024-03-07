import { useState } from 'react';

export default function Signup() {
  const host = import.meta.env.VITE_HOST;
  const [userEmail, setUserEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [enableMFA, setEnableMFA] = useState(false);
  const [avatarLink, setAvatarLink] = useState(''); // new state for avatar link

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      const res = await fetch(`${host}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          username: username,
          password: password,
          mfa: enableMFA,
          image: avatarLink, // new avatar link
        }),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        alert(data.error);
      } else {
        alert('User created successfully');
        document.getElementById('submit-button').innerHTML = '<div></div>';
        document.getElementById('qr-area').innerHTML = `<div style='display: flex; flex-direction: column; justify-content:center; align-items: center'><div>1. Quét QR sau ${data.QRCodeImageURL}</div><div>2. Trở về trang <a href='/login'> đăng nhập </a></div></div>`;
        // window.location.href = '/login';
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="userEmail" className="sr-only">
                Email address
              </label>
              <input id="userEmail" name="userEmail" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input id="username" name="username" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input id="confirmPassword" name="confirmPassword" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div>
              <label htmlFor="avatarLink" className="sr-only">
                Avatar Link
              </label>
              <input id="avatarLink" name="avatarLink" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Avatar Link" value={avatarLink} onChange={(e) => setAvatarLink(e.target.value)} />
            </div>
            <div>
              <label htmlFor="enableMFA" className="flex items-center">
                <input id="enableMFA" name="enableMFA" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" checked={enableMFA} onChange={(e) => setEnableMFA(e.target.checked)} />
                <span className="ml-2 text-sm text-gray-600">Enable MFA</span>
              </label>
            </div>
          </div>

          <div>
            <div id="submit-button">
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign up
              </button>
            </div>
            <div id="qr-area"></div>
          </div>
        </form>
      </div>
    </div>
  );
}
