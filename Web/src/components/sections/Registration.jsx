import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TermsModal from '../TermsModal';

const Registration = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    userType: '',
    agreeToTerms: false
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('terms');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    } else {
      // Validate PSU email domains for students and employees
      if (userType === 'psu-student' || userType === 'psu-employee') {
        const email = formData.email.toLowerCase();
        if (!email.endsWith('@parsu.edu.ph') && !email.endsWith('.pbox@parsu.edu.ph')) {
          newErrors.email = 'PSU students and employees must use a @parsu.edu.ph or .pbox@parsu.edu.ph email address';
        }
      }
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/register-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          username: formData.username,
          password: formData.password,
          userType: userType,
          organization: formData.organization,
          position: formData.position
        })
      });

      if (response.ok) {
        setSubmitMessage('Account created successfully! You can now log in.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          password: '',
          confirmPassword: '',
          userType: '',
          organization: '',
          position: '',
          agreeToTerms: false
        });
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      setSubmitMessage('Registration failed. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setFormData(prev => ({ ...prev, userType: type }));
  };

  const handleBackToSelection = () => {
    setUserType(null);
    setFormData(prev => ({ ...prev, userType: '' }));
  };

  if (!userType) {
    return (
      <section className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-gray-600 text-xl sm:text-2xl font-medium px-2">Are you from Partido State University?</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8">
            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={() => handleUserTypeSelect('psu-student')}
                className="w-full p-3 sm:p-4 text-left border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">PSU Student</h3>
                    <p className="text-xs sm:text-sm text-gray-600">I'm currently enrolled as a student at Partido State University</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleUserTypeSelect('psu-employee')}
                className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">PSU Employee</h3>
                    <p className="text-sm text-gray-600">I work at Partido State University as faculty or staff</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleUserTypeSelect('outside')}
                className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-1.866-1.5-3.27-3.333-3.27M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-1.866 1.5-3.27 3.333-3.27m0 0V5a2 2 0 012-2h.333a2 2 0 012 2v3.333m0 0V5a2 2 0 012-2h.333a2 2 0 012 2v3.333m0 0V5a2 2 0 012-2h.333a2 2 0 012 2v3.333" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Outside PSU</h3>
                    <p className="text-sm text-gray-600">I'm not affiliated with Partido State University</p>
                  </div>
                </div>
              </button>
              
              <div className="border-t border-gray-200 my-6"></div>
              
              <button
                onClick={() => navigate('/login')}
                className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all"
              >
                Already have an account? Log in
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-4 sm:mb-8">
          {userType && (
            <p className="text-base sm:text-lg font-medium text-gray-700 mt-1 sm:mt-2">
              {userType === 'psu-student' && 'Registering as PSU Student'}
              {userType === 'psu-employee' && 'Registering as PSU Employee'}
              {userType === 'outside' && 'Registering as External User'}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8">
          <div className="space-y-6 sm:space-y-8">
            <div className="mb-3 sm:mb-4">
              <button
                type="button"
                onClick={handleBackToSelection}
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to selection
              </button>
            </div>
            
            {/* Personal Information */}
            <div>
              <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-3 sm:mb-4">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-black text-sm sm:text-base`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-black text-sm sm:text-base`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
                </div>
              </div>

              <div className="mt-3 sm:mt-4">
                <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-black text-sm sm:text-base`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              <div className="mt-3 sm:mt-4">
                <label htmlFor="username" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-black text-sm sm:text-base`}
                  placeholder="johndoe"
                />
                {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                <div>
                  <label htmlFor="password" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-black text-sm sm:text-base`}
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-black text-sm sm:text-base`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="focus:ring-gray-900 h-4 w-4 text-gray-900 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setModalContent('terms');
                      setModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    terms and conditions
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setModalContent('privacy');
                      setModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    privacy policy
                  </button>{' '}
                  *
                </label>
                {errors.agreeToTerms && <p className="mt-1 text-xs text-red-600">{errors.agreeToTerms}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>

            {submitMessage && (
              <div className={`p-3 rounded-lg text-sm ${submitMessage.includes('successful') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {submitMessage}
              </div>
            )}
          </div>
        </form>
      </div>
      
      <TermsModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        contentType={modalContent} 
      />
    </section>
  );
};

export default Registration;
