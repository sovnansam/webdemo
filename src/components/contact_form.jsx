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
    // Positioned below a standard header (top-20/top-24) and kept below header z-index (z-30)
    const baseStyles =
      "fixed top-20 sm:top-24 right-4 sm:right-5 z-30 max-w-sm w-[calc(100vw-2rem)] sm:w-full bg-white/95 backdrop-blur-md border border-slate-200/90 border-l-4 rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 ease-out";

    switch (type) {
      case 'success':
        return `${baseStyles} border-l-emerald-500`;
      case 'error':
        return `${baseStyles} border-l-rose-500`;
      default:
        return `${baseStyles} border-l-sky-500`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <div className="flex-shrink-0 w-8 h-8 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="flex-shrink-0 w-8 h-8 bg-rose-50 border border-rose-200 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={getNotificationStyles()}>
      <div className="p-3.5 sm:p-4">
        <div className="flex items-center space-x-3">
          {getIcon()}
          <div className="flex-1 min-w-0">
            <p className="text-slate-800 font-medium text-xs sm:text-sm 2xl:text-base leading-snug">
              {message}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close notification"
            className="flex-shrink-0 p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Smooth Progress Bar */}
      <div className="w-full bg-slate-100 h-1">
        <div
          className={`h-full ${
            type === 'success'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
              : 'bg-gradient-to-r from-rose-500 to-pink-500'
          }`}
          style={{
            animation: `shrink ${duration}ms linear forwards`
          }}
        />
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

// Main Contact Form Component - Hospital Glassmorphism Design
const ContactForm = ({ currentLanguage = "en" }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const API_URL = "API/message/message.php";
  const isEn = currentLanguage === "en";

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

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[+]?[0-9\s\-()]{8,}$/;
    return phoneRegex.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name.trim() || !formData.number.trim() || !formData.message.trim()) {
      showNotification(
        'error',
        isEn
          ? "Please fill in all required fields."
          : "សូមបំពេញរាល់ព័ត៌មានទាំងអស់។"
      );
      setLoading(false);
      return;
    }

    if (!validatePhoneNumber(formData.number)) {
      showNotification(
        'error',
        isEn
          ? "Please enter a valid phone number."
          : "សូមបញ្ចូលលេខទូរស័ព្ទដែលត្រឹមត្រូវ។"
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
        showNotification(
          'success',
          isEn
            ? "Message sent successfully! We will get back to you soon."
            : "សារត្រូវបានផ្ញើដោយជោគជ័យ! យើងនឹងទាក់ទងទៅអ្នកវិញឆាប់ៗនេះ។"
        );

        setFormData({
          name: '',
          number: '',
          message: ''
        });
      } else {
        showNotification(
          'error',
          isEn
            ? data.message || "Failed to send message."
            : data.message || "បរាជ័យក្នុងការផ្ញើសារ។"
        );
      }
    } catch (error) {
      console.error('Error sending message:', error);
      showNotification(
        'error',
        isEn
          ? "Network error. Please try again later."
          : "កំហុសបណ្តាញ។ សូមព្យាយាមម្តងទៀត។"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {notification && (
        <ModernNotification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
          duration={4000}
        />
      )}

      <div className="relative w-full max-w-3xl lg:max-w-none 3xl:max-w-3xl mx-auto">
        {/* Soft Ambient Glow Behind Card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-2 bg-gradient-to-tr from-sky-200/45 via-teal-100/35 to-blue-200/45 rounded-3xl blur-xl"
        />

        {/* Main Frosted Medical Card */}
        <div className="relative bg-white/90 backdrop-blur-xl border border-sky-200/80 rounded-2xl shadow-[0_16px_40px_rgba(14,116,144,0.08)] overflow-hidden">
          {/* Top Accent Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 via-blue-600 to-teal-500" />

          <div className="p-5 sm:p-6 2xl:p-8">
            {/* Form Header */}
            <div className="flex items-center space-x-3.5 mb-5 2xl:mb-6">
              <div className="w-11 h-11 2xl:w-12 2xl:h-12 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 flex-shrink-0">
                <svg className="w-5 h-5 2xl:w-6 2xl:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base sm:text-lg 2xl:text-xl font-bold text-slate-900 tracking-tight">
                  {isEn ? "Send Us a Message" : "ផ្ញើសារមកកាន់យើង"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  {isEn
                    ? "Have a question or feedback? We'd love to hear from you."
                    : "មានសំណួរ ឬមតិយោបល់? សូមផ្ញើមកកាន់ពួកយើង។"}
                </p>
              </div>
            </div>

            <form className="space-y-4 2xl:space-y-5" onSubmit={handleSubmit}>
              {/* Name & Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 2xl:gap-4">
                {/* Name Field */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs 2xl:text-sm font-semibold text-slate-700">
                    {isEn ? "Full Name" : "ឈ្មោះ"} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 group-focus-within:text-sky-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder={isEn ? "John Doe" : "ឈ្មោះរបស់អ្នក"}
                      className="w-full pl-10 pr-3.5 py-2.5 2xl:py-3 text-xs sm:text-sm 2xl:text-base bg-slate-50/80 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="space-y-1.5">
                  <label htmlFor="number" className="block text-xs 2xl:text-sm font-semibold text-slate-700">
                    {isEn ? "Phone Number" : "លេខទូរស័ព្ទ"} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 group-focus-within:text-sky-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <input
                      id="number"
                      name="number"
                      type="tel"
                      required
                      value={formData.number}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder={isEn ? "012 345 678" : "០១២ ៣៤៥ ៦៧៨"}
                      className="w-full pl-10 pr-3.5 py-2.5 2xl:py-3 text-xs sm:text-sm 2xl:text-base bg-slate-50/80 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-1.5 2xl:space-y-2">
                <label htmlFor="message" className="block text-xs 2xl:text-sm font-semibold text-slate-700">
                  {isEn ? "Message" : "សារ"} <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <textarea
                    id="message"
                    name="message"
                    rows="9"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder={
                      isEn
                        ? "Write your message or inquiry here..."
                        : "សូមសរសេរសារ ឬសំណួររបស់អ្នកនៅទីនេះ..."
                    }
                    className="w-full px-4 py-3 2xl:py-3.5 text-xs sm:text-sm 2xl:text-base leading-relaxed bg-slate-50/80 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all duration-200 resize-y min-h-[120px] 2xl:min-h-[150px]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`group w-full h-11 sm:h-12 2xl:h-13 flex justify-center items-center rounded-xl font-semibold text-xs sm:text-sm 2xl:text-base text-white transition-all duration-300 shadow-md ${
                  loading
                    ? 'bg-gradient-to-r from-sky-400 to-blue-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-sky-600 via-blue-600 to-teal-600 hover:from-sky-500 hover:via-blue-500 hover:to-teal-500 hover:shadow-lg hover:shadow-sky-500/25 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
                }`}
              >
                {loading ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>{isEn ? "Sending..." : "កំពុងផ្ញើ..."}</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <span>{isEn ? "Send Message" : "បញ្ជូនសារ"}</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;