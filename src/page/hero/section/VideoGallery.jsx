import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import reel1Video from "../../../assets/videos/reel-1.mp4";
import reel1Thumb from "../../../assets/videos/reel-1.jpg";
import reel2Video from "../../../assets/videos/reel-2.mp4";
import reel2Thumb from "../../../assets/videos/reel-2.jpg";
import reel3Video from "../../../assets/videos/reel-3.mp4";
import reel3Thumb from "../../../assets/videos/reel-3.jpg";
import reel4Video from "../../../assets/videos/reel-4.mp4";
import reel4Thumb from "../../../assets/videos/reel-4.jpg";
import reel5Video from "../../../assets/videos/reel-5.mp4";
import reel5Thumb from "../../../assets/videos/reel-5.jpg";

const videos = [
  {
    id: 1,
    thumbnail: reel1Thumb,
    src: reel1Video,
  },
  {
    id: 2,
    thumbnail: reel2Thumb,
    src: reel2Video,
  },
  {
    id: 3,
    thumbnail: reel3Thumb,
    src: reel3Video,
  },
  {
    id: 4,
    thumbnail: reel4Thumb,
    src: reel4Video,
  },
  {
    id: 5,
    thumbnail: reel5Thumb,
    src: reel5Video,
  },
];

const VideoGallery = () => {
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef({});
  const swiperRef = useRef(null);

  const handlePlayClick = (videoId) => {
    const videoElement = videoRefs.current[videoId];

    if (playingVideo === videoId) {
      // If this video is currently playing, pause it
      if (videoElement) {
        videoElement.pause();
        if (swiperRef.current && swiperRef.current.autoplay) {
          swiperRef.current.autoplay.start();
        }
      }
      setPlayingVideo(null);
    } else {
      // If a different video is playing, pause it first
      if (playingVideo && videoRefs.current[playingVideo]) {
        videoRefs.current[playingVideo].pause();
      }

      // Set the new video as playing
      setPlayingVideo(videoId);

      if (videoElement) {
        // Set the video source if it hasn't been set yet
        if (!videoElement.src) {
          videoElement.src = video.src;
        }

        // Stop swiper autoplay
        if (swiperRef.current && swiperRef.current.autoplay) {
          swiperRef.current.autoplay.stop();
        }

        // Play the video
        videoElement
          .play()
          .then(() => {
            console.log("Video started playing successfully");
          })
          .catch((error) => {
            console.error("Error playing video:", error);
            // Reset state if video fails to play
            setPlayingVideo(null);
            if (swiperRef.current && swiperRef.current.autoplay) {
              swiperRef.current.autoplay.start();
            }
          });
      }
    }
  };

  const handleVideoPlay = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleVideoPause = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  const handleVideoEnded = () => {
    setPlayingVideo(null);
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <div className="video-gallery">
      <h2 className="video-gallery__title">
        Explore Our World of <span>Design</span>
      </h2>

      <div className="video-gallery__container">
        <div
          className="swiper-button-prev-custom"
          style={{
            width: "40px",
            height: "40px",
            border: "none",
            borderRadius: "50%",
            background: "rgba(244, 211, 0, 0.1)",
            backdropFilter: "blur(10px)",
            color: "#f4d300",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </div>
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={15}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            el: ".swiper-pagination-custom",
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          lazy={{
            loadPrevNext: true,
            loadPrevNextAmount: 2,
            loadOnTransitionStart: false,
            elementClass: "swiper-lazy",
            loadingClass: "swiper-lazy-loading",
            loadedClass: "swiper-lazy-loaded",
            preloaderClass: "swiper-lazy-preloader",
          }}
          watchSlides={true}
          watchSlidesProgress={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
          }}
          className="video-gallery__swiper"
        >
          {videos.map((video) => (
            <SwiperSlide key={video.id}>
              <div className="video-card">
                <div className="video-wrapper">
                  <div className="thumbnail-container">
                    <video
                      ref={(el) => (videoRefs.current[video.id] = el)}
                      className="video-card__video swiper-lazy"
                      src={video.src}
                      poster={video.thumbnail}
                      controls={false}
                      preload="metadata"
                      playsInline
                      onEnded={handleVideoEnded}
                      onPlay={handleVideoPlay}
                      onPause={handleVideoPause}
                      style={{ width: "100%", height: "100%" }}
                    />
                    <div className="instagram-overlay">
                      <div className="instagram-gradient"></div>
                    </div>
                    {playingVideo !== video.id ? (
                      <button
                        className="play-button"
                        onClick={() => handlePlayClick(video.id)}
                        aria-label="Play video"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        className="pause-button"
                        onClick={() => handlePlayClick(video.id)}
                        aria-label="Pause video"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className="swiper-button-next-custom"
          style={{
            width: "40px",
            height: "40px",
            border: "none",
            borderRadius: "50%",
            background: "rgba(244, 211, 0, 0.1)",
            backdropFilter: "blur(10px)",
            color: "#f4d300",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
