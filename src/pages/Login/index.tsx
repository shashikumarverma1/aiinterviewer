import React, { useState } from 'react';
import { Brain } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
//   const { signIn, signUp } = useAuth();
//   const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setError(null);
    // setLoading(true);

    // try {
    //   if (isLogin) {
    //     await signIn(email, password);
    //   } else {
    //     await signUp(email, password);
    //   }
    //   navigate('/dashboard');
    // } catch (err) {
    //   setError(err instanceof Error ? err.message : 'An error occurred');
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Brain className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {/* {isLogin ? 'Sign in to your account' : 'Create your account'} */}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {/* {isLogin ? "Don't have an account? " : "Already have an account? "} */}
            <button
              onClick={() => {
                // setIsLogin(!isLogin);
                // setError(null);
              }}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {/* {isLogin ? 'Sign up' : 'Sign in'} */}
            </button>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            {/* <p className="text-sm text-red-600">{error}</p> */}
          </div>
        )}

        <form className="mt-8 space-y-6"
        //  onSubmit={handleSubmit}
         >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                // onChange={(e) => setEmail(e.target.value)}
                // disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                // autoComplete={isLogin ? "current-password" : "new-password"}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                // disabled={loading}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
            //   disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              ) : null}
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;