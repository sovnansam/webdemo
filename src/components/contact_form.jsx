import { useState, useEffect } from 'react';

// Modern Notification Component
const ModernNotification = ({ type, message, onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getNotificationStyles = () => {
    const baseStyles = "fixed top-6 right-6 z-50 max-w-sm w-full bg-gray-900 border-l-4 rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out";
    
    switch (type) {
      case 'success':
        return `${baseStyles} border-green-500`;
      case 'error':
        return `${baseStyles} border-red-500`;
      default:
        return `${baseStyles} border-blue-500`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        );
      case 'error':
        return (
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <div className="p-4">
        <div className="flex items-start space-x-3">
          {getIcon()}
          <div className="flex-1">
            <p className="text-white font-medium text-sm">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-4 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
          <div 
            className={`h-1 rounded-full transition-all duration-1000 ease-linear ${
              type === 'success' ? 'bg-green-500' : 'bg-red-500'
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

// Main Contact Form Component
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
            ? "🎉 Message sent successfully! We'll get back to you soon."
            : "🎉 សារត្រូវបានផ្ញើដោយជោគជ័យ! យើងនឹងតបទៅអ្នកវិញឆាប់ៗនេះ។"
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
            ? `❌ ${data.message || "Failed to send message. Please try again."}`
            : `❌ ${data.message || "បរាជ័យក្នុងការផ្ញើសារ។ សូមព្យាយាមម្តងទៀត។"}`
        );
      }
    } catch (error) {
      console.error('Error sending message:', error);
      showNotification('error', 
        currentLanguage === "en" 
          ? "🌐 Network error. Please check your connection and try again."
          : "🌐 កំហុសបណ្តាញ។ សូមពិនិត្យមើលការតភ្ជាប់របស់អ្នកហើយព្យាយាមម្តងទៀត។"
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
          duration={5000}
        />
      )}

      <div className=" bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {currentLanguage === "en" ? "Contact Us" : "ទាក់ទងមកពួកយើង"}
          </h2>
          <p className="text-gray-400">
            {currentLanguage === "en" 
              ? "We'd love to hear from you. Send us a message!" 
              : "យើងចូលចិត្តស្តាប់ពីអ្នក។ ផ្ញើសារមកពួកយើង!"}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 transition-all duration-200">
              {currentLanguage === "en" ? "Full Name" : "ឈ្មោះពេញ"} *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-600 transition-all duration-300"
              placeholder={currentLanguage === "en" ? "Enter your full name" : "បញ្ចូលឈ្មោះពេញរបស់អ្នក"}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="number" className="block text-sm font-medium text-gray-300 transition-all duration-200">
              {currentLanguage === "en" ? "Phone Number" : "លេខទូរស័ព្ទ"} *
            </label>
            <input
              id="number"
              name="number"
              type="tel"
              required
              value={formData.number}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-600 transition-all duration-300"
              placeholder={currentLanguage === "en" ? "Enter your phone number" : "បញ្ចូលលេខទូរស័ព្ទរបស់អ្នក"}
              disabled={loading}
            />
            <p className="text-xs text-gray-400">
              {currentLanguage === "en" 
                ? "Format: +855 12 345 678 or 012 345 678" 
                : "ទម្រង់: +855 12 345 678 ឬ 012 345 678"}
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 transition-all duration-200">
              {currentLanguage === "en" ? "Message" : "សារ"} *
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-600 transition-all duration-300 resize-none"
              placeholder={currentLanguage === "en" ? "Enter your message..." : "បញ្ចូលសាររបស់អ្នក..."
              }
              disabled={loading}
            ></textarea>
          </div>

          <button
    type="submit"
    disabled={loading}
    className={`w-full flex relative overflow-hidden group justify-center items-center ${
        loading 
            ? 'bg-blue-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-700 hover:to-blue-400 cursor-pointer'
    } text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg`}
>

            {/* Animated background */}
            {!loading && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            )}
            
            <span className="relative flex items-center justify-center space-x-2">
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{currentLanguage === "en" ? "Sending..." : "កំពុងផ្ញើ..."}</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>{currentLanguage === "en" ? "Send" : "ផ្ញើសារ"}</span>
                </>
              )}
            </span>
          </button>
        </form>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            {currentLanguage === "en" 
              ? "We typically respond within 24 hours" 
              : "យើងនឹងតបក្នុងរយះពេល 24 ម៉ោង"}
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactForm;