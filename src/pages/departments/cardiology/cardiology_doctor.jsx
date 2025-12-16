import React, { useState, useEffect } from "react";

// Placeholder API URL - Replace with your actual endpoint
const API_URL = "API/departments/cardiology/cardiology_doctors.php";

// ==========================================
// 1. UTILITIES & CONFIGURATION
// ==========================================

/**
 * Generates the full image URL path.
 */
const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath === "null" || imagePath === "undefined") {
    // Placeholder image for missing profiles
    return "https://placehold.co/600x800/1a1a1a/333333?text=Doctor+Profile";
  }
  if (imagePath.startsWith("http")) return imagePath; // Assume relative path needs prefix
  return `API/doctors/uploads/${imagePath}`;
};

/**
 * Returns language-specific font classes for Tailwind.
 */
const getFontClass = (language) => {
  return language === "km"
    ? "font-battambang khmer-font" // Custom Khmer font classes
    : "english-font";
};

/**
 * Cycles through colors for the hanging tag based on index.
 * Note: These full classes must be seen by the Tailwind compiler.
 */
const getRingColor = (index) => {
  const colors = ["red", "blue", "green", "orange"];
  return colors[index % colors.length];
};

// Map to hold full Tailwind class strings for dynamic usage (fixes compilation issues)
const ringColorClasses = {
  red: { line: "border-red-300/70", ring: "border-red-600 hover:text-red-600" },
  blue: {
    line: "border-blue-300/70",
    ring: "border-blue-600 hover:text-blue-600",
  },
  green: {
    line: "border-green-300/70",
    ring: "border-green-600 hover:text-green-600",
  },
  orange: {
    line: "border-orange-300/70",
    ring: "border-orange-600 hover:text-orange-600",
  },
};

// ==========================================
// 2. HANGING TAG DOCTOR CARD COMPONENT
// ==========================================

const HangingDoctorCard = ({ doctor, currentLanguage, onClick, index }) => {
  const fontClass = getFontClass(currentLanguage);
  const name =
    currentLanguage === "km"
      ? doctor.full_name
      : doctor.full_name_en || doctor.full_name;
  const specialization =
    doctor.specialization ||
    (currentLanguage === "en" ? "Cardiologist" : "គ្រូពេទ្យឯកទេសបេះដូង");
  const qualifications =
    doctor.qualifications ||
    (currentLanguage === "en" ? "Cardiologist" : "គ្រូពេទ្យឯកទេសបេះដូង");
  const experience = doctor.experience_years
    ? `${currentLanguage === "en" ? "Experience" : "បទពិសោធន៍"} ${
        doctor.experience_years
      } ${currentLanguage === "en" ? "Years" : "ឆ្នាំ"} `
    : "";
  const ringColor = getRingColor(index);
  const classes = ringColorClasses[ringColor]; // Get the specific Tailwind classes for this card // Icon paths for social media (using SVG path for minimal dependencies)

  const socialLinks = [
    {
      id: "linkedin",
      icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM6 9h4v12H6zM8 4a2 2 0 100 4 2 2 0 000-4z",
      href: doctor.linkedin_url,
    },
    {
      id: "facebook",
      icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
      href: doctor.facebook_url,
    },
    {
      id: "twitter",
      icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c1.7 1.1 3.9 1.8 6.2 1.8A21 21 0 0022 10.5c0-.6-.1-1.2-.2-1.8A7.7 7.7 0 0023 3z",
      href: doctor.twitter_url,
    },
    {
      id: "email",
      icon: "M21 8l-9 6-9-6m18 4v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7",
      href: `mailto:${doctor.email}`,
    },
  ];

return (
  <div className="flex flex-col items-center">
    {/* The Hanging Line and Ring Container */}
    <div className="relative w-full h-15">
      {/* Vertical Dotted Line */}
      <div
        className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full border-l border-dashed ${classes.line}`}
      ></div>
      
      {/* Colored Ring/Hole - Uses the first class for the border */}
      <div
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 ${
          classes.ring.split(" ")[0]
        } bg-white shadow-md z-20`}
      ></div>
    </div>
    
    {/* The Doctor Card Body */}
    <div
      onClick={() => onClick(doctor)}
      className="w-full max-w-xs cursor-pointer bg-white rounded-[20px] p-6 pt-10 shadow-2xl transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-red-200/50 hover:scale-[1.03] flex flex-col items-center -mt-[20px] z-10 border border-gray-100"
    >
      {/* Doctor Image */}
      <div className="w-full h-full rounded-xl overflow-hidden mb-4 shadow-lg border-4 border-gray-100 flex justify-center">
        <img
          src={getImageUrl(doctor.profile_image)}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Name and Specialization */}
      <div className="w-full text-center mb-1">
        <h3
          className={`text-xl font-extrabold text-gray-900 mb-1 ${fontClass} text-center`}
        >
          {name}
        </h3>
        <p className={`text-red-600 font-semibold text-sm ${fontClass} text-center`}>
          {specialization}
        </p>
      </div>
      
      {/* Qualifications and Experience */}
      <div className="w-full text-center text-gray-600 text-xs mb-2 px-2">
        <p className={`${fontClass} font-medium mt-1 text-center`}>{qualifications}</p>
      </div>
      
      {/* Social Media Icons */}
      <div className="w-full flex flex-col items-center space-y-2 border-t pt-4">
        <div className="w-full text-center text-gray-600 text-sm px-2">
          <p className={`${fontClass} font-medium text-center`}>{experience}</p>
        </div>
      </div>
    </div>
  </div>
);
};
// ==========================================
// 3. DETAILED DOCTOR MODAL COMPONENT
// ==========================================

const DoctorDetailModal = ({
  doctor,
  currentLanguage,
  closeModal,
  fontClass,
}) => {
  const name =
    currentLanguage === "km"
      ? doctor.full_name
      : doctor.full_name_en || doctor.full_name;
  const specialization =
    doctor.specialization ||
    (currentLanguage === "en" ? "Cardiologist" : "គ្រូពេទ្យឯកទេសបេះដូង");
  const position =
    doctor.position ||
    (currentLanguage === "en" ? "Attending Physician" : "គ្រូពេទ្យព្យាបាល");
  const bio =
    currentLanguage === "km"
      ? doctor.biography
      : doctor.biography_en || doctor.biography;
  const languages =
    doctor.languages ||
    (currentLanguage === "en" ? "Not specified" : "មិនបានបញ្ជាក់");
  const experience = doctor.experience_years
    ? `${doctor.experience_years} ${
        currentLanguage === "en" ? "Years" : "ឆ្នាំ"
      }`
    : currentLanguage === "en"
    ? "N/A"
    : "គ្មាន"; // Reusable detail item sub-component

  const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            {icon}     {" "}
      <div>
               {" "}
        <p
          className={`text-sm font-semibold text-gray-500 uppercase ${fontClass}`}
        >
          {label}
        </p>
               {" "}
        <p className={`text-lg font-medium text-gray-800 ${fontClass}`}>
          {value}
        </p>
             {" "}
      </div>
         {" "}
    </div>
  );
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
      onClick={closeModal}
    >
           {" "}
      <div
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden transform transition-transform duration-500 ease-out scale-95"
        onClick={(e) => e.stopPropagation()}
      >
                {/* Modal Content Grid */}       {" "}
        <div className="relative">
                   {" "}
          <div className="grid grid-cols-1 md:grid-cols-3">
                        {/* Left: Doctor Image */}           {" "}
            <div className="md:col-span-1 bg-gray-100">
                           {" "}
              <img
                src={getImageUrl(doctor.profile_image)}
                alt={name}
                className="w-full h-60 md:h-full object-cover"
              />
                         {" "}
            </div>
                                    {/* Right: Main Info */}           {" "}
            <div className="md:col-span-2 p-8 md:p-10 space-y-6">
                            {/* Name & Title */}             {" "}
              <h2
                className={`text-4xl font-extrabold text-gray-900 ${fontClass}`}
              >
                {name}
              </h2>
                           {""}
              <p
                className={`text-xl font-semibold text-red-600 border-b pb-4 border-gray-100 ${fontClass}`}
              >
                                {position} • {specialization}             {" "}
              </p>
                            {/* Bio/Summary */}             {" "}
              <div>
                               {" "}
                <h4
                  className={`text-lg font-bold text-gray-800 mb-2 ${fontClass}`}
                >
                                   {" "}
                  {currentLanguage === "en" ? "Biography" : "ប្រវត្តិរូបសង្ខេប"}
                                 {" "}
                </h4>
                               {" "}
                <p
                  className={`text-gray-600 leading-relaxed text-base ${fontClass}`}
                >
                                   {" "}
                  {bio ||
                    (currentLanguage === "en"
                      ? "No detailed biography available."
                      : "មិនមានប្រវត្តិរូបសង្ខេបលម្អិតទេ។")}
                                 {" "}
                </p>
                             {" "}
              </div>
                         {" "}
            </div>
                     {" "}
          </div>
                              {/* Close Button */}         {" "}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors z-20"
          >
                       {" "}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
                           {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
                         {" "}
            </svg>
                     {" "}
          </button>
                 {" "}
        </div>
                {/* Modal Footer with Details and Actions */}       {" "}
        <div className="p-8 border-t border-gray-100 bg-gray-50">
                   {" "}
          <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${fontClass}`}>
                       {" "}
            {currentLanguage === "en"
              ? "Qualifications & Contact"
              : "លក្ខណៈសម្បត្តិ និងទំនាក់ទំនង"}
                     {" "}
          </h3>
                             {" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {/* Experience Detail */}           {" "}
            <DetailItem
              icon={
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              label={currentLanguage === "en" ? "Experience" : "បទពិសោធន៍"}
              value={experience}
            />
                        {/* Languages Detail */}           {" "}
            <DetailItem
              icon={
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
              }
              label={currentLanguage === "en" ? "Languages" : "ភាសា"}
              value={languages}
            />
                        {/* Email Detail */}           {" "}
            <DetailItem
              icon={
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
              label={currentLanguage === "en" ? "Email" : "អ៊ីមែល"}
              value={doctor.email || "N/A"}
            />
                        {/* Phone Detail */}           {" "}
            <DetailItem
              icon={
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              }
              label={currentLanguage === "en" ? "Phone" : "ទូរស័ព្ទ"}
              value={doctor.phone || "N/A"}
            />
                     {" "}
          </div>
                              {/* Action Buttons */}         {" "}
          <div className="flex gap-4 pt-4">
                       {" "}
            <button
              className={`flex-1 py-4 bg-red-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-red-700 transition-colors transform hover:scale-[1.01] ${fontClass}`}
            >
                           {" "}
              {currentLanguage === "en"
                ? "Book Appointment Now"
                : "កក់ពេលណាត់ឥឡូវនេះ"}
                         {" "}
            </button>
                       {" "}
            <button
              onClick={closeModal}
              className={`px-6 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors ${fontClass}`}
            >
                            {currentLanguage === "en" ? "Close" : "បិទ"}       
                 {" "}
            </button>
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  );
};

// ==========================================
// 4. MAIN COMPONENT: CARDIOLOGY DOCTORS
// ==========================================

const CardiologyDoctors = ({ currentLanguage = "en" }) => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fontClass = getFontClass(currentLanguage); // --- Data Fetching ---

  useEffect(() => {
    const fetchDoctorsData = async () => {
      setLoading(true);
      try {
        // NOTE: This fetch will likely fail if the API/doctors path is not correct in your environment
        const response = await fetch(API_URL); // Check for HTTP errors before processing JSON
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setDoctorsData(data.data || []);
        } else {
          setError(
            data.message || "Failed to load doctors data: API reported failure."
          );
        }
      } catch (err) {
        console.error("Error fetching doctors data:", err);
        setError(
          `Failed to connect to the server or process data. Error: ${err.message}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorsData();
  }, []); // --- Handlers ---

  const handleCardClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false); // Give time for the modal closing animation before resetting doctor data
    setTimeout(() => setSelectedDoctor(null), 300);
  }; // --- Loading State UI ---

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
               {" "}
        <div className="text-center">
                   {" "}
          <div className="w-16 h-16 border-4 border-transparent border-t-red-500 rounded-full animate-spin mb-4 mx-auto"></div>
                   {" "}
          <p className={`text-gray-600 ${fontClass}`}>
                       {" "}
            {currentLanguage === "en"
              ? "Loading doctors..."
              : "កំពុងទាញយកគ្រូពេទ្យ..."}
                     {" "}
          </p>
                 {" "}
        </div>
             {" "}
      </div>
    );
  } // --- Error State UI ---

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
               {" "}
        <div className="text-center">
                   {" "}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                       {" "}
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
                           {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
                         {" "}
            </svg>
                     {" "}
          </div>
                   {" "}
          <h2 className={`text-xl font-bold text-red-700 mb-2 ${fontClass}`}>
            Data Fetching Error
          </h2>
                    <p className={`text-gray-700 mb-4 ${fontClass}`}>{error}</p>
                   {" "}
          <button
            onClick={() => window.location.reload()}
            className={`mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 ${fontClass}`}
          >
                        {currentLanguage === "en" ? "Retry" : "ព្យាយាមម្តងទៀត"} 
                   {" "}
          </button>
                 {" "}
        </div>
             {" "}
      </div>
    );
  } // --- No Doctors State UI ---

  if (doctorsData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
               {" "}
        <div className="text-center">
                   {" "}
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                       {" "}
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
                           {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
                         {" "}
            </svg>
                     {" "}
          </div>
                   {" "}
          <p className={`text-gray-600 ${fontClass}`}>
                       {" "}
            {currentLanguage === "en"
              ? "No doctors available for this department."
              : "មិនមានគ្រូពេទ្យសម្រាប់ផ្នែកនេះទេ។"}
                     {" "}
          </p>
                 {" "}
        </div>
             {" "}
      </div>
    );
  } // --- Main Content Render ---

  return (
    <div className="min-h-screen py-12">
           {" "}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
        <div className="mb-10 text-left">
          <span
            className={`inline-block mb-3 text-red-600 uppercase tracking-widest text-sm font-bold ${fontClass}`}
          >
            {currentLanguage === "en"
              ? "Our Expert Team"
              : "ក្រុមអ្នកជំនាញរបស់យើង"}
          </span>
          <h1
            className={`text-xl md:text-3xl font-extrabold text-gray-900 mb-4 tracking-tight ${fontClass}`}
          >
            {currentLanguage === "en"
              ? "Cardiology Specialists"
              : "អ្នកឯកទេសបេះដូង"}
          </h1>
        </div>
                {/* Doctor Card Grid */}       {" "}
        {/* Negative margin pulls the cards up to meet the hanging lines */}   
           {" "}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                   {" "}
          {doctorsData.map((doctor, index) => (
            <HangingDoctorCard
              key={doctor.id}
              doctor={doctor}
              currentLanguage={currentLanguage}
              onClick={handleCardClick}
              index={index}
            />
          ))}
                 {" "}
        </div>
             {" "}
        <div className="mt-20 pt-10 border-t border-gray-200 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Footer Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
              {/* Medical Services Section */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {currentLanguage === "en"
                    ? "Medical Departments"
                    : "នាយកដ្ឋានវេជ្ជសាស្ត្រ"}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 group">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                        <svg
                          className="w-4 h-4 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                        {currentLanguage === "en"
                          ? "Emergency & ICU"
                          : "បន្ទប់សង្គ្រោះបន្ទាន់"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 group">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                          />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                        {currentLanguage === "en"
                          ? "Surgical ICU"
                          : "ICU វះកាត់"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 group">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                        {currentLanguage === "en"
                          ? "Laboratory"
                          : "មន្ទីរពិសោធន៍"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 group">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <svg
                          className="w-4 h-4 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                        {currentLanguage === "en"
                          ? "Internal Medicine"
                          : "វេជ្ជសាស្ត្រខាងក្នុង"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact Section */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {currentLanguage === "en"
                    ? "Emergency Contact"
                    : "ទំនាក់ទំនងបន្ទាន់"}
                </h3>
                <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-xl border border-red-100">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {currentLanguage === "en"
                          ? "24/7 Emergency Hotline"
                          : "ទូរស័ព្ទបន្ទាន់ 24/7"}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {currentLanguage === "en"
                          ? "+(855) 95 998 953"
                          : "+(៨៥៥) ៩៥​ ៩៩៨ ៩៥៣"}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Social Links (Optional) */}
                <div className="flex justify-center space-x-4 mt-6">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-700 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.279 16.736 5.019 15.622 5 12c.019-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z" />
                    </svg>
                  </a>
                </div>
                
              </div>
              
            </div>
             <div className="flex items-center justify-center w-full py-8 border-t border-gray-100">
              <div className="text-center max-w-lg px-4 ">
                {/* Centered Copyright Text */}
                <p className="text-gray-600 text-sm font-medium">
                  © {new Date().getFullYear()}{" "}
                  {currentLanguage === "en"
                    ? "Khmer-Soviet Friendship Hospital. All rights reserved."
                    : "មន្ទីរពេទ្យ​ មិត្តភាព​ ខ្មែរ សូវៀត រក្សាសិទ្ធិគ្រប់យ៉ាង"}
                </p>

                {/* Centered Tagline/Slogan */}
                <p className="text-gray-400 text-xs mt-1.5 italic">
                  {currentLanguage === "en"
                    ? "Medical Excellence. Compassionate Care."
                    : "ភាពអស្ចារ្យវេជ្ជសាស្ត្រ។ ការថែទាំដោយការយកចិត្តទុកដាក់។"}
                </p>
              </div>
            </div>
           
          </div>
        </div>
             {" "}
      </div>
            {/* Doctor Details Modal */}     {" "}
      {showModal && selectedDoctor && (
        <DoctorDetailModal
          doctor={selectedDoctor}
          currentLanguage={currentLanguage}
          closeModal={closeModal}
          fontClass={fontClass}
        />
      )}
         {" "}
    </div>
  );
};

export default CardiologyDoctors;
