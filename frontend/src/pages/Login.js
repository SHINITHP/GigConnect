import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login', 
        { email, password }
      );
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      navigate('/dashboard');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/auth/google/url');
      window.location.href = response.data.authUrl;
    } catch (err) {
      setError('Google authentication failed. Please try again.');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6 hover-lift">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center transition-transform duration-200 hover:scale-105">
              <span className="text-white font-bold">G</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">GigConnect</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Welcome back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Card */}
        <div className="card-bolt p-8">
          {error && (
            <div className="alert-bolt-error mb-6">
              {error}
            </div>
          )}

          {/* Google Sign In */}
          <button 
            onClick={handleGoogleSignIn}
            className="btn-bolt-google mb-6"
            disabled={googleLoading}
          >
            {googleLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                Connecting to Google...
              </div>
            ) : (
              <>
                <img 
                  src="https://developers.google.com/identity/images/g-logo.png" 
                  alt="Google" 
                  width="20" 
                  height="20" 
                  className="transition-transform duration-200 group-hover:scale-110"
                />
                Continue with Google
              </>
            )}
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-group-bolt">
              <label className="form-label-bolt">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
                className="form-input-bolt"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group-bolt">
              <div className="flex items-center justify-between mb-2">
                <label className="form-label-bolt">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
                className="form-input-bolt"
                placeholder="Enter your password"
              />
            </div>

            <button 
              type="submit" 
              className={`btn-bolt-primary w-full ${loading ? 'btn-loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-gray-900 font-medium hover:text-gray-700 transition-colors duration-200">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;