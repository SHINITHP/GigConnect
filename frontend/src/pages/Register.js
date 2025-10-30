import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    location: '',
    skills: []
  });
  const [customSkill, setCustomSkill] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const popularSkills = [
    'UI/UX Design',
    'Web Development',
    'Mobile App Development',
    'Graphic Design',
    'Logo Design',
    'Video Editing',
    'Content Writing',
    'Digital Marketing',
    'Social Media Management',
    'SEO Optimization',
    'Data Analysis',
    'Project Management',
    'Copywriting',
    'Photography',
    'Illustration'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleSelect = (role) => {
    setFormData(prev => ({
      ...prev,
      role: role,
      skills: role === 'freelancer' ? prev.skills : []
    }));
  };

  const handleSkillAdd = (skill) => {
    if (!formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleCustomSkillAdd = () => {
    if (customSkill.trim() && !formData.skills.includes(customSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, customSkill.trim()]
      }));
      setCustomSkill('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!formData.role) {
      setError('Please select your role');
      return;
    }

    if (!formData.location) {
      setError('Please enter your location');
      return;
    }

    if (formData.role === 'freelancer' && formData.skills.length === 0) {
      setError('Please add at least one skill for freelancer account');
      return;
    }

    setLoading(true);

    try {
      const requestData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        location: formData.location,
        skills: formData.skills
      };

      const res = await axios.post('http://localhost:5000/api/auth/register', requestData);
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      navigate('/dashboard');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Create your account</h1>
          <p className="text-gray-600">Join thousands of professionals</p>
        </div>

        {/* Card */}
        <div className="card-bolt p-8">
          {error && (
            <div className="alert-bolt-error mb-6">
              {error}
            </div>
          )}

          {/* Google Sign Up */}
          <button 
            onClick={handleGoogleSignUp}
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
              <span className="px-2 bg-white text-gray-500">Or sign up with email</span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Basic Information */}
            <div className="form-group-bolt">
              <label className="form-label-bolt">
                Full name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input-bolt"
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group-bolt">
              <label className="form-label-bolt">
                Email address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input-bolt"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group-bolt">
              <label className="form-label-bolt">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input-bolt"
                placeholder="Create a password (min. 6 characters)"
              />
            </div>

            <div className="form-group-bolt">
              <label className="form-label-bolt">
                Confirm password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="form-input-bolt"
                placeholder="Confirm your password"
              />
            </div>

            {/* Role Selection */}
            <div className="form-group-bolt">
              <label className="form-label-bolt">
                I want to: *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={`card-bolt p-4 cursor-pointer text-center transition-all duration-200 ${
                    formData.role === 'client' 
                      ? 'border-2 border-black bg-gray-50' 
                      : 'hover:border-gray-300'
                  }`}
                  onClick={() => handleRoleSelect('client')}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 transition-colors duration-200 ${
                    formData.role === 'client' ? 'bg-black' : 'bg-gray-100'
                  }`}>
                    <span className={`text-lg ${formData.role === 'client' ? 'text-white' : 'text-gray-600'}`}>
                      💼
                    </span>
                  </div>
                  <span className="font-medium text-sm">Hire Talent</span>
                </div>

                <div 
                  className={`card-bolt p-4 cursor-pointer text-center transition-all duration-200 ${
                    formData.role === 'freelancer' 
                      ? 'border-2 border-black bg-gray-50' 
                      : 'hover:border-gray-300'
                  }`}
                  onClick={() => handleRoleSelect('freelancer')}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 transition-colors duration-200 ${
                    formData.role === 'freelancer' ? 'bg-black' : 'bg-gray-100'
                  }`}>
                    <span className={`text-lg ${formData.role === 'freelancer' ? 'text-white' : 'text-gray-600'}`}>
                      🚀
                    </span>
                  </div>
                  <span className="font-medium text-sm">Offer Services</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="form-group-bolt">
              <label className="form-label-bolt">
                Your location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="form-input-bolt"
                placeholder="Enter your city and country"
              />
            </div>

            {/* Skills (only for freelancers) */}
            {formData.role === 'freelancer' && (
              <div className="form-group-bolt">
                <label className="form-label-bolt">
                  Your professional skills *
                </label>
                
                {/* Selected Skills Display */}
                {formData.skills.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <div 
                          key={index}
                          className="bg-black text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-200 hover:bg-gray-800"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleSkillRemove(skill)}
                            className="w-4 h-4 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all duration-200"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add Skills */}
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    className="form-input-bolt flex-1"
                    placeholder="Type to add custom skill"
                  />
                  <button
                    type="button"
                    onClick={handleCustomSkillAdd}
                    disabled={!customSkill.trim()}
                    className="btn-bolt-secondary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                </div>

                {/* Popular Skills */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Popular skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularSkills.slice(0, 6).map((skill, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSkillAdd(skill)}
                        disabled={formData.skills.includes(skill)}
                        className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              className={`btn-bolt-primary w-full ${loading ? 'btn-loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-gray-900 font-medium hover:text-gray-700 transition-colors duration-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;