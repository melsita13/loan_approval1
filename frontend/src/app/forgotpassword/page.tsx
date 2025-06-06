'use client';

import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import Footer from '@/components/Footer';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      toast.error('Please enter your email address.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert("Password reset link sent to your email address.")
        toast.success(data.message || 'Password reset link sent to your email address.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push('/login'); 
      } else {
        toast.error(data.error || 'Failed to send password reset email. Please try again.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Forgot password request failed:', error);
      toast.error('An unexpected error occurred. Please try again later.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[82vh] flex justify-center items-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-2xl shadow-blue-600 w-full max-w-sm overflow-y-hidden ">
          <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>
          <p className="text-gray-600 mb-4 text-center">
            Enter your email address below and we'll send you a link to reset your password.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full p-2 border-2 bg-blue-50 border-amber-50 outline-amber-50 rounded-full shadow-2xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder='enter email here'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 text-white py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Sending...' : 'Send reset link'}
              </button>
            </div>
            <div className="text-center text-sm">
              <span
                className="text-blue-600 cursor-pointer hover:text-blue-300"
                onClick={() => router.push('/login')}
              >
                Back to Login
              </span>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}