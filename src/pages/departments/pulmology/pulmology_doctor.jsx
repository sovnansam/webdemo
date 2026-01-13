import React, { useState, useEffect } from "react";
import { useLanguage } from "../../../contexts/LanguageContext";

// Placeholder API URL - Replace with your actual endpoint
const API_URL = "API/departments/pulmonology/pulmonology_doctors.php";

// ==========================================
// 1. UTILITIES & CONFIGURATION
// ==========================================

/**
 * Generates the full image URL path.
 */
const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath === "null" || imagePath === "undefined") {
    // Placeholder image for missing profiles
    return "https://placehold.co/600x800/1a1a1a/333333?text=pulmonology+Doctor+Profile";
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
  red: { line: "border-blue-300/70", ring: "border-red-600 hover:text-blue-600" },
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
    (currentLanguage === "en" ? "Pulmonologist" : "គ្រូពេទ្យឯកទេសខួរពោះ");
  const qualifications =
    doctor.qualifications ||
    (currentLanguage === "en" ? "Pulmonologist" : "គ្រូពេទ្យឯកទេសខួរពោះ");
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
      className="w-full max-w-xs cursor-pointer bg-white rounded-[20px] p-6 pt-10 shadow-2xl transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-blue-200/50 hover:scale-[1.03] flex flex-col items-center -mt-[20px] z-10 border border-gray-100"
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
        <p className={`text-blue-600 font-semibold text-sm ${fontClass} text-center`}>
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
    (currentLanguage === "en" ? "Pulmonologist" : "គ្រូពេទ្យឯកទេសខួរពោះ");
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
                className={`text-xl font-semibold text-blue-600 border-b pb-4 border-gray-100 ${fontClass}`}
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
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors z-20"
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
                  className="w-6 h-6 text-blue-600"
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
              className={`flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-[1.01] ${fontClass}`}
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
// 4. MAIN COMPONENT: pulmonology DOCTORS
// ==========================================

const PulmologyDoctors = ({ currentLanguage = "en" }) => {
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
        console.error("Error fetching pulmonology doctors data:", err);
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
          <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin mb-4 mx-auto"></div>
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
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                       {" "}
            <svg
              className="w-8 h-8 text-blue-600"
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
            className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${fontClass}`}
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
            className={`inline-block mb-3 text-blue-600 uppercase tracking-widest text-sm font-bold ${fontClass}`}
          >
            {currentLanguage === "en"
              ? "Our Expert Team"
              : "ក្រុមអ្នកជំនាញរបស់យើង"}
          </span>
          <h1
            className={`text-xl md:text-3xl font-extrabold text-gray-900 mb-4 tracking-tight ${fontClass}`}
          >
            {currentLanguage === "en"
              ? "pulmonology Specialists"
              : "អ្នកឯកទេសខួរពោះ"}
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
        {showModal && selectedDoctor && (
          <DoctorDetailModal
            doctor={selectedDoctor}
            currentLanguage={currentLanguage}
            closeModal={closeModal}
            fontClass={fontClass}
          />
        )}
      </div>
    </div>
  );
};

export default PulmologyDoctors;
