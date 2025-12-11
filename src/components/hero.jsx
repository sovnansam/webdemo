import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Container,
  useTheme,
  useMediaQuery,
  Fade,
  Chip,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  PlayArrow,
  Pause,
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { heroImages } from "../images/index.js";  

// Modern animations (keep your existing animations)
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(1deg); }
  66% { transform: translateY(5px) rotate(-1deg); }
`;

const modernShimmer = keyframes`
  0% { 
    transform: translateX(-100%) rotate(-12deg) scaleY(2);
    opacity: 0;
  }
  20% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.4;
  }
  80% {
    opacity: 0.8;
  }
  100% { 
    transform: translateX(200%) rotate(-12deg) scaleY(2);
    opacity: 0;
  }
`;

const multiLayerShimmer = keyframes`
  0% { 
    transform: translateX(-100%) rotate(-8deg) scaleY(1.5);
    opacity: 0;
  }
  15% {
    opacity: 0.6;
  }
  30% {
    opacity: 0.3;
  }
  100% { 
    transform: translateX(200%) rotate(-8deg) scaleY(1.5);
    opacity: 0;
  }
`;

const gentleShimmer = keyframes`
  0% { 
    transform: translateX(-150%) rotate(-15deg) scaleY(1.8);
    opacity: 0;
  }
  10% {
    opacity: 0.4;
  }
  25% {
    opacity: 0.2;
  }
  40% {
    opacity: 0.4;
  }
  100% { 
    transform: translateX(250%) rotate(-15deg) scaleY(1.8);
    opacity: 0;
  }
`;

const zoomIn = keyframes`
  0% { 
    opacity: 0;
    transform: scale(1.2);
    filter: blur(10px) brightness(1.3);
  }
  100% { 
    opacity: 1;
    transform: scale(1);
    filter: blur(0) brightness(1);
  }
`;

const slideFromRight = keyframes`
  0% { 
    opacity: 0;
    transform: translateX(100%) scale(1.05);
    filter: brightness(1.2);
  }
  100% { 
    opacity: 1;
    transform: translateX(0) scale(1);
    filter: brightness(1);
  }
`;

const slideFromLeft = keyframes`
  0% { 
    opacity: 0;
    transform: translateX(-100%) scale(1.05);
    filter: brightness(1.2);
  }
  100% { 
    opacity: 1;
    transform: translateX(0) scale(1);
    filter: brightness(1);
  }
`;

const fadeIn = keyframes`
  0% { 
    opacity: 0;
    transform: scale(1.1);
    filter: blur(5px);
  }
  100% { 
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
`;

const morphIn = keyframes`
  0% { 
    opacity: 0;
    transform: scale(0.9) rotate(-2deg);
    filter: hue-rotate(90deg) blur(8px);
    border-radius: 40%;
  }
  100% { 
    opacity: 1;
    transform: scale(1) rotate(0deg);
    filter: hue-rotate(0deg) blur(0);
    border-radius: 0%;
  }
`;

const slideUp = keyframes`
  0% { 
    opacity: 0;
    transform: translateY(40px);
  }
  100% { 
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInFromRight = keyframes`
  0% { 
    opacity: 0;
    transform: translateX(100px);
  }
  100% { 
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInFromLeft = keyframes`
  0% { 
    opacity: 0;
    transform: translateX(-100px);
  }
  100% { 
    opacity: 1;
    transform: translateX(0);
  }
`;

const gradientFlow = keyframes`
  0%, 100% { 
    background-position: 0% 50%;
    filter: hue-rotate(0deg);
  }
  50% { 
    background-position: 100% 50%;
    filter: hue-rotate(15deg);
  }
`;

const HeroSlideshow = ({ currentLanguage = 'en' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [slideDirection, setSlideDirection] = useState("right");
  const [transitionType, setTransitionType] = useState("zoom");
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const API_URL = "/API/hero/hero_web.php";

  const { hero1 } = heroImages;  

  // Fallback slides
  const fallbackSlides = [
    {
      id: 1,
      title: {
        en: "Elevate Your Digital Experience",
        km: "បង្កើនបទពិសោធន៍ឌីជីថលរបស់អ្នក"
      },
      description: {
        en: "Transform your business with AI-driven solutions that adapt and scale with your needs.",
        km: "ផ្លាស់ប្តូរអាជីវកម្មរបស់អ្នកជាមួយនឹងដំណោះស្រាយដែលបង្កើតឡើងដោយ AI ដែលសម្របខ្លួន និងពង្រីកតាមតម្រូវការរបស់អ្នក។"
      },
      image: hero1,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      badge: {
        en: "AI Powered",
        km: "ប្រើប្រាស់ AI"
      },
      transition: "zoom",
    },
  ];

  // Helper functions
  const getFallbackImage = (index) => {
    const images = [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    ];
    return images[index % images.length];
  };

  const getGradientByIndex = (index) => {
    const gradients = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    ];
    return gradients[index % gradients.length];
  };

  const getTransitionByIndex = (index) => {
    const transitions = ["zoom", "slide-right", "morph", "fade"];
    return transitions[index % transitions.length];
  };

  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return getFallbackImage(0);
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('API/')) {
      const baseUrl = API_URL.replace('/API/hero/hero_web.php', '');
      return `${baseUrl}/${imagePath}`;
    }
    return getFallbackImage(0);
  };

  // Fetch slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try { 
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const result = await response.json();
        
        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          const formattedSlides = result.data.map((slide, index) => ({
            id: slide.id,
            title: {
              en: slide.title_en || "Default Title",
              km: slide.title || "ចំណងជើងលំនាំដើម"
            },
            description: {
              en: slide.description_en || "Default description text.",
              km: slide.description || "អត្ថបទពិពណ៌នាលំនាំដើម។"
            },
            image: getFullImageUrl(slide.image_path),
            link: slide.link || "",
            gradient: getGradientByIndex(index),
            badge: {
              en: "Featured",
              km: "ពិសេស"
            },
            transition: getTransitionByIndex(index),
          }));
          setSlides(formattedSlides);
        } else {
          setSlides(fallbackSlides);
          setError("No slides data available from API. Showing default slides.");
        } 
      } catch (err) {
        console.error("Failed to fetch slides:", err);
        setSlides(fallbackSlides);
        setError("Failed to load slides from API. Showing default slides.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchSlides();
  }, []);

  // Auto slide functionality
  useEffect(() => {
    let interval;
    if (isPlaying && !isHovered && slides.length > 0) {
      interval = setInterval(() => {
        handleNextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isHovered, currentSlide, slides.length]);

  const handleNextSlide = () => {
    if (slides.length === 0) return;
    setSlideDirection("right");
    const nextIndex = (currentSlide + 1) % slides.length;
    setTransitionType(slides[nextIndex].transition);
    setCurrentSlide(nextIndex);
  };

  const handlePrevSlide = () => {
    if (slides.length === 0) return;
    setSlideDirection("left");
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    setTransitionType(slides[prevIndex].transition);
    setCurrentSlide(prevIndex);
  };

  const goToSlide = (index) => {
    if (slides.length === 0) return;
    setSlideDirection(index > currentSlide ? "right" : "left");
    setTransitionType(slides[index].transition);
    setCurrentSlide(index);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Get animation based on transition type
  const getImageAnimation = () => {
    const animations = {
      'zoom': zoomIn,
      'slide-right': slideFromRight,
      'slide-left': slideFromLeft,
      'morph': morphIn,
      'fade': fadeIn,
    };
    return animations[transitionType] || zoomIn;
  };

  const getAnimationDuration = () => {
    const durations = {
      'zoom': '1s',
      'slide-right': '0.8s',
      'slide-left': '0.8s',
      'morph': '1.2s',
      'fade': '1s',
    };
    return durations[transitionType] || '1s';
  };

  // Get localized text
  const getLocalizedText = (textObj) => {
    return textObj[currentLanguage] || textObj.en;
  };

  // Button text based on language
  const buttonText = {
    en: "SHOW MORE",
    km: "មើលបន្ថែម"
  };

  // Show loading state
  if (loading) {
    return (
      <Box
        sx={{
          width: "90%",
          height: {
            xs: "30vh",
            sm: "40vh",
            md: "50vh",
            lg: "50vh",
            xl: "75vh"
          },
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 4,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: {
            xs: "12px",
            md: "20px",
            lg: "24px"
          },
        }}
      >
        <CircularProgress sx={{ color: "white" }} />
        <Typography sx={{ color: "white", ml: 2 }}>
          Loading slides...
        </Typography>
      </Box>
    );
  }

  if (error && slides.length === 0) {
    return (
      <Box
        sx={{
          width: "90%",
          height: {
            xs: "30vh",
            sm: "40vh",
            md: "50vh",
            lg: "60vh",
            xl: "75vh"
          },
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 4,
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (slides.length === 0) {
    return (
      <Box
        sx={{
          width: "90%",
          height: {
            xs: "30vh",
            sm: "40vh",
            md: "50vh",
            lg: "60vh",
            xl: "75vh"
          },
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 4,
        }}
      >
        <Alert severity="warning">No slides available</Alert>
      </Box>
    );
  }

  const currentSlideData = slides[currentSlide];

  return (
    <Box
      sx={{
        position: "relative",
        width: "90%",
        height: {
          xs: "30vh",
          sm: "40vh",
          md: "50vh",
          lg: "60vh",
          xl: "75vh"
        },
        margin: "0 auto",
        overflow: "hidden",
        background: theme.palette.background.default,
        borderRadius: {
          xs: "12px",
          md: "20px",
          lg: "24px"
        },
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        cursor: isHovered ? "grab" : "default",
        my: 4,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Error Alert */}
      {error && (
        <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
          <Alert severity="warning" sx={{ fontSize: '0.8rem', py: 0.5 }}>
            {error}
          </Alert>
        </Box>
      )}

      {/* Animated Gradient Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: currentSlideData.gradient,
          backgroundSize: "200% 200%",
          animation: `${gradientFlow} 8s ease infinite`,
          opacity: 0.9,
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `linear-gradient(45deg, 
              rgba(0,0,0,0.1) 0%, 
              rgba(0,0,0,0.3) 50%, 
              rgba(0,0,0,0.1) 100%)`,
          },
        }}
      />

      {/* Slide Container */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {slides.map((slide, index) => (
          <Box
            key={slide.id}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: index === currentSlide ? 1 : 0,
              pointerEvents: index === currentSlide ? 'auto' : 'none',
              transition: 'opacity 0.3s ease',
              animation: index === currentSlide ? 
                `${getImageAnimation()} ${getAnimationDuration()} cubic-bezier(0.25, 0.46, 0.45, 0.94) both` : 'none',
            }}
          >
            {/* Main Image */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                transition: "transform 8s cubic-bezier(0.23, 1, 0.32, 1)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(
                    135deg,
                    rgba(0,0,0,0.4) 0%,
                    rgba(0,0,0,0.2) 50%,
                    rgba(0,0,0,0.4) 100%
                  )`,
                },
              }}
            />

            {/* Shimmer Effects */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  background: `linear-gradient(
                    90deg,
                    transparent 0%,
                    rgba(255,255,255,0.1) 20%,
                    rgba(255,255,255,0.3) 50%,
                    rgba(255,255,255,0.1) 80%,
                    transparent 100%
                  )`,
                  transform: "rotate(-12deg)",
                  animation: `${modernShimmer} 8s ease-in-out infinite`,
                  animationDelay: `${index * 0.5}s`,
                  filter: "blur(1px)",
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>

      {/* Content Container - ALWAYS VISIBLE ON ALL SCREENS */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          padding: {
            xs: 2,
            sm: 3,
            md: 4,
            lg: 5
          },
          background: "linear-gradient(transparent 0%, rgba(0,0,0,0.7) 100%)",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              color: "white",
              textAlign: "left",
              maxWidth: {
                xs: "100%",
                sm: "80%",
                md: "60%",
                lg: "50%"
              },
              animation: `${
                slideDirection === "right" ? slideInFromLeft : slideInFromRight
              } 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both`,
              fontFamily: currentLanguage === 'km' ? "'Khmer OS', 'Noto Sans Khmer', sans-serif" : 'inherit',
            }}
          >
      
            {/* Title - Smaller and Responsive */}
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "500",
                mb: {
                  xs: 1,
                  sm: 1.5,
                  md: 2
                },
                background: `linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.9) 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontSize: {
                  xs: "0.5rem",
                  sm: "1rem",
                  md: "1.5rem",
                  lg: "2rem",
                  xl: "2.5rem"
                },
                lineHeight: {
                  xs: 1.2,
                  sm: 1.1
                },
                letterSpacing: currentLanguage === 'km' ? '0' : '-0.02em',
                textShadow: "0 4px 20px rgba(0,0,0,0.1)",
                fontFamily: currentLanguage === 'km' ? "'Khmer OS', 'Noto Sans Khmer', sans-serif" : 'inherit',
              }}
            >
              {getLocalizedText(currentSlideData.title)}
            </Typography>

            {/* Description - Smaller and Responsive */}
            <Typography
              variant="body1"
              sx={{
                mb: {
                  xs: 2,
                  sm: 3,
                  md: 4
                },
                opacity: 0.9,
                lineHeight: {
                  xs: 1.4,
                  sm: 1.6
                },
                fontSize: {
                  xs: "0.5rem",
                  sm: "0.6rem",
                  md: "0.7rem",
                  lg: "1rem"
                },
                maxWidth: {
                  xs: "100%",
                  sm: "90%"
                },
                fontWeight: "300",
                letterSpacing: currentLanguage === 'km' ? '0' : '0.01em',
                fontFamily: currentLanguage === 'km' ? "'Khmer OS', 'Noto Sans Khmer', sans-serif" : 'inherit',
                display: {
                  xs: "block",
                  sm: "block"
                }
              }}
            >
              {getLocalizedText(currentSlideData.description)}
            </Typography>

  {/* CTA Button - Responsive */}
{currentSlideData.link && (
  <Fade in timeout={1000}>
    <Button
      variant="outlined"
      size={isMobile ? "small" : "large"}
      onClick={() => window.open(currentSlideData.link, '_blank')}
      sx={{
        px: {
          xs: 1,
          sm: 2,
          md: 3
        },
        py: {
          xs: 0.6,
          sm: 0.8,
          md: 1.2
        },
        fontSize: {
          xs: "0.5rem",
          sm: "0.6rem",
          md: "0.7rem"
        },
        fontWeight: "500",
        borderRadius: "8px",
        borderColor: "rgba(255,255,255,0.3)",
        color: "white",
        backdropFilter: "blur(20px)",
        background: "rgba(255,255,255,0.05)",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.1)",
          borderColor: "rgba(255,255,255,0.5)",
          transform: "translateY(-2px)",
        },
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        fontFamily: currentLanguage === 'km' ? "'Khmer OS', 'Noto Sans Khmer', sans-serif" : 'inherit',
      }}
    >
      {buttonText[currentLanguage]}
    </Button>
  </Fade>
)}
          </Box>
        </Container>
      </Box>

      {/* Modern Navigation Controls */}
      <Box
        sx={{
          position: "absolute",
          bottom: {
            xs: 10,
            sm: 15,
            md: 20,
            lg: 30
          },
          right: {
            xs: 10,
            sm: 20,
            md: 30,
            lg: 40
          },
          zIndex: 3,
        }}
      >
        {/* Play/Pause & Navigation - Always visible but smaller on mobile */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            background: "rgba(0,0,0,0.2)",
            backdropFilter: "blur(20px)",
            borderRadius: {
              xs: "8px",
              sm: "12px"
            },
            p: 0.5,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <IconButton
            onClick={togglePlay}
            sx={{
              color: "white",
              padding: {
                xs: 0.5,
                sm: 1
              },
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
              transition: "all 0.2s ease",
            }}
            size={isMobile ? "small" : "medium"}
          >
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>

          <IconButton
            onClick={handlePrevSlide}
            sx={{
              color: "white",
              padding: {
                xs: 0.5,
                sm: 1
              },
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
              transition: "all 0.2s ease",
            }}
            size={isMobile ? "small" : "medium"}
          >
            <KeyboardArrowLeft />
          </IconButton>

          <IconButton
            onClick={handleNextSlide}
            sx={{
              color: "white",
              padding: {
                xs: 0.5,
                sm: 1
              },
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
              transition: "all 0.2s ease",
            }}
            size={isMobile ? "small" : "medium"}
          >
            <KeyboardArrowRight />
          </IconButton>
        </Box>
      </Box>

      {/* Modern Slide Indicators - Bottom Center */}
      <Box
        sx={{
          position: "absolute",
          bottom: {
            xs: 10,
            sm: 15,
            md: 20
          },
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          gap: 1,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              width: index === currentSlide ? {
                xs: 20,
                sm: 24,
                md: 32
              } : {
                xs: 6,
                sm: 8
              },
              height: {
                xs: 2,
                sm: 3
              },
              backgroundColor:
                index === currentSlide
                  ? "white"
                  : "rgba(255,255,255,0.4)",
              borderRadius: 2,
              cursor: "pointer",
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                backgroundColor: "white",
                transform: "scaleY(1.5)",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HeroSlideshow;