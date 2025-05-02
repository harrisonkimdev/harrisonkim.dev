'use client';

import { useState, FormEvent } from 'react';
import { FiMail, FiUser, FiMessageSquare, FiSend, FiCheck } from 'react-icons/fi';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setError('All fields are required');
      setIsSubmitting(false);
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // In a real app, you would send this data to your API
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      
      // if (!response.ok) throw new Error('Failed to send message');
      
      // For demo, just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col">
      <h1 className="section-title text-3xl">Get in Touch</h1>
      
      <div className="mt-6 max-w-2xl mx-auto w-full">
        {isSubmitted ? (
          <div className="flex flex-col items-center text-center py-12">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
              <FiCheck className="text-primary" size={32} />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Message Sent!</h2>
            <p className="text-gray-300 mb-6">
              Thanks for reaching out. I&apos;ll get back to you as soon as possible.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="btn btn-primary"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2">
                Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full py-2 pl-10 pr-4 bg-accent border border-gray-800 rounded-md focus:outline-none focus:border-primary"
                  placeholder="Your name"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-2 pl-10 pr-4 bg-accent border border-gray-800 rounded-md focus:outline-none focus:border-primary"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-gray-300 mb-2">
                Message
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FiMessageSquare className="text-gray-400" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full py-2 pl-10 pr-4 bg-accent border border-gray-800 rounded-md focus:outline-none focus:border-primary"
                  placeholder="What would you like to discuss?"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <FiSend />
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}