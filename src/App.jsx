import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
function App() {
  const [count, setCount] = useState(0);
  const host = import.meta.env.VITE_HOST;
  console.log(import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID);
  return (
    <>
      <div>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              console.log(credentialResponse);

              const res = await fetch(`${host}/auth/signin-2`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  // CORS
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH, HEAD, OPTIONS',
                },
                body: JSON.stringify({
                  token: credentialResponse.credential,
                }),
              });

              const data = await res.json();
              console.log(data);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </>
  );
}

export default App;
