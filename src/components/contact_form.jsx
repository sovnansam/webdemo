import { useState, useEffect } from 'react';

// Modern Notification Component
const ModernNotification = ({ type, message, onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getNotificationStyles = () => {
    const baseStyles = "fixed top-4 right-4 z-50 max-w-xs w-full bg-gray-900/90 backdrop-blur-sm border-l-2 rounded-lg shadow-xl transform transition-all duration-200 ease-in-out";
    
    switch (type) {
      case 'success':
        return `${baseStyles} border-emerald-500`;
      case 'error':
        return `${baseStyles} border-rose-500`;
      default:
        return `${baseStyles} border-blue-500`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <div className="flex-shrink-0">
            <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        );
      case 'error':
        return (
          <div className="flex-shrink-0">
            <div className="w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={getNotificationStyles()}>
      <div className="p-2">
        <div className="flex items-center space-x-2">
          {getIcon()}
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-xs truncate">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors duration-150"
          >
            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="mt-1 w-full bg-gray-700/50 rounded-full h-0.5">
          <div 
            className={`h-0.5 rounded-full transition-all duration-1000 ease-linear ${
              type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
            }`}
            style={{ 
              animation: `shrink ${duration}ms linear forwards` 
            }}
          />
        </div>
      </div>
      
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

// Main Contact Form Component - Glassmorphism Design
const ContactForm = ({ currentLanguage }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const API_URL = "API/message/message.php";

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Phone number validation
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[+]?[0-9\s\-()]{10,}$/;
    return phoneRegex.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!formData.name.trim() || !formData.number.trim() || !formData.message.trim()) {
      showNotification('error', 
        currentLanguage === "en" 
          ? "❌ Please fill in all fields."
          : "❌ សូមបំពេញរាល់ព័ត៌មានទាំងអស់។"
      );
      setLoading(false);
      return;
    }

    // Phone number validation
    if (!validatePhoneNumber(formData.number)) {
      showNotification('error', 
        currentLanguage === "en" 
          ? "❌ Please enter a valid phone number."
          : "❌ សូមបញ្ចូលលេខទូរស័ព្ទដែលត្រឹមត្រូវ។"
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name.trim(),
          number: formData.number.trim(),
          message: formData.message.trim(),
          feedback: '',
          feedback_by: ''
        })
      });

      const data = await response.json();

      if (data.success) {
        showNotification('success', 
          currentLanguage === "en" 
            ? "✓ Message sent successfully!"
            : "✓ សារត្រូវបានផ្ញើដោយជោគជ័យ!"
        );
        
        // Reset form
        setFormData({
          name: '',
          number: '',
          message: ''
        });
      } else {
        showNotification('error', 
          currentLanguage === "en" 
            ? `❌ ${data.message || "Failed to send."}`
            : `❌ ${data.message || "បរាជ័យក្នុងការផ្ញើ។"}`
        );
      }
    } catch (error) {
      console.error('Error sending message:', error);
      showNotification('error', 
        currentLanguage === "en" 
          ? "🌐 Network error."
          : "🌐 កំហុសបណ្តាញ។"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Modern Notification */}
      {notification && (
        <ModernNotification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
          duration={4000}
        />
      )}

      <div className="relative max-w-sm mx-auto">
        {/* Glass effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl"></div>
        
        {/* Main glass container */}
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl overflow-hidden">
          {/* Subtle gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
          
          {/* Content */}
          <div className="relative p-4">
        

            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* Name and Phone in same row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-medium text-white/80">
                    {currentLanguage === "en" ? "Name" : "ឈ្មោះ"} *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                    placeholder={currentLanguage === "en" ? "Your name" : "ឈ្មោះរបស់អ្នក"}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="number" className="block text-xs font-medium text-white/80">
                    {currentLanguage === "en" ? "Phone" : "លេខ"} *
                  </label>
                  <input
                    id="number"
                    name="number"
                    type="tel"
                    required
                    value={formData.number}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                    placeholder={currentLanguage === "en" ? "Phone" : "លេខទូរស័ព្ទ"}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Message field */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-xs font-medium text-white/80">
                  {currentLanguage === "en" ? "Message" : "សារ"} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="1"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder={currentLanguage === "en" ? "Type your message here..." : "សរសេរសាររបស់អ្នកនៅទីនេះ..."}
                  disabled={loading}
                ></textarea>
              </div>

              {/* Submit button with gradient */}
              <button
  type="submit"
  disabled={loading}
  className={`w-full h-10 flex justify-center items-center ${
    loading 
      ? 'bg-gradient-to-r from-blue-400 to-purple-400 cursor-not-allowed' 
      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-700 cursor-pointer transform hover:-translate-y-0.5'
  } text-white py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg text-sm`}
>
  <span className="flex items-center justify-center space-x-1.5">
    {loading ? (
      <>
        <span className="text-xs">{currentLanguage === "en" ? "Sending..." : "កំពុងផ្ញើ..."}</span>
      </>
    ) : (
      <>
        <span className="font-medium text-xs">{currentLanguage === "en" ? "Send" : "បញ្ជូន"}</span>
      </>
    )}
  </span>
</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;