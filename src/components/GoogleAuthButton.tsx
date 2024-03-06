import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
export default function GoogleAuthButton() {
  const host = import.meta.env.VITE_HOST;
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        // width={'1500'}
        // size="large"
        onSuccess={async (credentialResponse) => {
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
          localStorage.setItem('accessToken', data.access_token);
          localStorage.setItem('refreshToken', data.refresh_token);
          window.location.href = '/';
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
}
