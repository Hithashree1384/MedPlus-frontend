import React from "react";
import { bannerStyles } from "../assets/dummyStyles";
import { Stethoscope, Star, Calendar, Phone, ShieldCheck, Clock } from "lucide-react";
import bannerimg from '../assets/BannerImg.png'
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate=useNavigate();
  return (
    <div className={bannerStyles.bannerContainer}>
      <div className={bannerStyles.mainContainer}>
        
        {/* Animated Border */}
        <div className={bannerStyles.borderOutline}>
          <div className={bannerStyles.outerAnimatedBan}></div>
          <div className={bannerStyles.innerWhiteBorder}></div>
        </div>

        {/* Content */}
        <div className={bannerStyles.contentContainer}>
          <div className={bannerStyles.flexContainer}>
            
            {/* LEFT CONTENT */}
            <div className={bannerStyles.leftContent}>
              
              {/* Header Badge */}
              <div className={bannerStyles.headerBadgeContainer}>
                <div className={bannerStyles.stethoscopeContainer}>
                  <div className={bannerStyles.stethoscopeInner}>
                    <Stethoscope className={bannerStyles.stethoscopeIcon} />
                  </div>
                </div>

                <p className="text-teal-600 font-semibold text-sm">
                  Trusted Healthcare Platform
                </p>
              </div>

              {/* Title */}
              <h2 className={bannerStyles.title}>
                Med{""}
                <span className={bannerStyles.titleGradient}>
                  Plus
                </span>
              </h2>

              {/* Stars */}
              <div className={bannerStyles.starsContainer}>
                <div className={bannerStyles.starsInner}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className={bannerStyles.starIcon} />
                  ))}
                </div>
              </div>

              {/* Tagline */}
              <p className={bannerStyles.tagline}>
                Manage patients, appointments and records with{" "}<br/>
                <span className={bannerStyles.taglineHighlight}>
                  AI-powered efficiency
                </span>
              </p>

              {/* Features */}
              <div className={bannerStyles.featuresGrid}>
                
                <div className={`${bannerStyles.featureItem} ${bannerStyles.featureBorderGreen}`}>
                  <Calendar className={bannerStyles.featureIcon} />
                  <span className={bannerStyles.featureText}>Easy Appointment Booking</span>
                </div>

                <div className={`${bannerStyles.featureItem} ${bannerStyles.featureBorderBlue}`}>
                  <ShieldCheck className={bannerStyles.featureIcon} />
                  <span className={bannerStyles.featureText}>Secure Patient Records</span>
                </div>

                <div className={`${bannerStyles.featureItem} ${bannerStyles.featureBorderEmerald}`}>
                  <Clock className={bannerStyles.featureIcon} />
                  <span className={bannerStyles.featureText}>Real-time Monitoring</span>
                </div>

                <div className={`${bannerStyles.featureItem} ${bannerStyles.featureBorderPurple}`}>
                  <Phone className={bannerStyles.featureIcon} />
                  <span className={bannerStyles.featureText}>24/7 Emergency Support</span>
                </div>

              </div>

              {/* Buttons */}
              <div className={bannerStyles.ctaButtonsContainer}>
                
                <button className={`${bannerStyles.bookButton} cursor-pointer`} onClick={()=> navigate("/doctors")}>
                  <div className={bannerStyles.bookButtonOverlay}></div>
                  <span className={bannerStyles.bookButtonContent}>
                    <Calendar className={bannerStyles.bookButtonIcon} />
                    Book Appointment Now
                  </span>
                </button>

                <button className={`${bannerStyles.emergencyButton} cursor-pointer`} onClick={()=>(window.location.href="tel:8299431275")}>
                  <span className={bannerStyles.emergencyButtonContent}>
                    <Phone className={bannerStyles.emergencyButtonIcon} />
                    Request Emergency Now
                  </span>
                </button>

              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className={bannerStyles.rightImageSection}>
              <div className={bannerStyles.imageContainer}>
                <div className={bannerStyles.imageFrame}>
                  
                  <img
                    src={bannerimg}
                    alt="Hospital"
                    className='w-300 h-80'
                  />

                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Banner;