import React, { useState, useEffect } from 'react';
const API_URL = "API/departments/mri/mri_hero.php";

const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath === "null" || imagePath === "undefined") {
    return "https://placehold.co/800x600/1a1a1a/333333?text=Cardiology+Image";
  }
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/")) return imagePath.substring(1);
  return `API/departments/mri/${imagePath}`;
};

const getFontClass = (language) => {
  return language === "km"
    ? "font-battambang khmer-font"
    : "font-battambang english-font";
};

const MRIHero = ({ currentLanguage = 'km' }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="relative min-h-[90vh] bg-white overflow-hidden flex items-center">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative min-h-[90vh] bg-white overflow-hidden flex items-center">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="text-center text-red-500">Error: {error}</div>
        </div>
      </section>
    );
  }

  const heroData = data[0];

  if (!heroData) {
    return null;
  }

  const title = currentLanguage === 'en' ? heroData.title_en : heroData.title;
  const subTitle = currentLanguage === 'en' ? heroData.subTitle_en : heroData.subTitle;
  const paragraph = currentLanguage === 'en' ? heroData.paragraph_en : heroData.paragraph;
  const paragraph1 = currentLanguage === 'en' ? heroData.paragraph1_en : heroData.paragraph1;
  const paragraph2 = currentLanguage === 'en' ? heroData.paragraph2_en : heroData.paragraph2;
  const featuredImage = getImageUrl(heroData.image_path);
  const youtubeUrl = heroData.youtube_url;
  const images = heroData.images || [];
  const fontClass = getFontClass(currentLanguage);
  
  // Dynamic text from API
  const buttonText = currentLanguage === 'en' ? heroData.button_text_en : heroData.button_text;
  const brandText1 = currentLanguage === 'en' ? heroData.brand_text1_en : heroData.brand_text1;
  const brandText2 = currentLanguage === 'en' ? heroData.brand_text2_en : heroData.brand_text2;
  const brandText3 = currentLanguage === 'en' ? heroData.brand_text3_en : heroData.brand_text3;

  return (
    <div className={fontClass}>
      {/* Top Accent Bar */}
      <div className="h-1 bg-blue-600" />

      {/* Cinematic Letterbox Image */}
      <section className=" top-15 relative h-[20vh] w-full lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] overflow-hidden">
        {featuredImage && (
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        {/* Subtle bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </section>

     {/* Editorial Content - Premium Magazine Style */}
<section className="relative -mt-24 z-10 pb-16 lg:pb-28 xl:pb-36 overflow-hidden">
  {/* Abstract background decoration */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
  </div>

  <div className="container mx-auto px-4 sm:px-6 lg:px-24 xl:px-32 relative">
    <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20 xl:mb-28">
      
      {/* Label with animated underline */}
      {subTitle && (
        <div className="inline-block group -mb-8 mt-30 lg:mb-8 lg:mt-10">
          <span className="inline-block text-[10px] lg:text-[20px] font-bold tracking-[0.05em] text-slate-900 uppercase relative">
            {subTitle}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-700" />
          </span>
        </div>
      )}

      {/* Title with gradient and dual-layer shadow */}
      <h1 className="relative text-xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-[0.2em] lg:leading-[1.15] mb-2 lg:mb-6">
        <span className="relative inline-block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
          {title}
        </span>
        {/* Decorative shadow blur */}
        <span className="absolute inset-0 bg-gradient-to-r from-slate-900/20 to-slate-900/0 blur-xl -z-10" />
      </h1>

      {/* Decorative divider with dot */}
      <div className="flex items-center justify-center gap-1 -mb-10 lg:-mb-8">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-blue-400" />
        <div className="w-1.5 h-2.5 rounded-full bg-blue-500" />
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-blue-400" />
      </div>
</div>

    {/* Optional: Footer divider with scroll indicator */}
    <div className="flex justify-center -mt-4 lg:-mt-26">
      <div className="flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
        <span className="text-[10px] tracking-[0.3em] text-slate-900 uppercase">Continue reading</span>
        <svg className="w-4 h-4 text-slate-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default MRIHero;