document.addEventListener("DOMContentLoaded", () => {
    // ===== Video Rotation (Home Page only) =====
    const videos = ["video1.mp4", "video2.mp4", "video3.mp4", "video4.mp4"];
    let index = Math.floor(Math.random() * videos.length);
  
    function playVideo() {
      const videoElement = document.getElementById("bg-video");
      if (!videoElement) return; // <-- Only runs on homepage
  
      videoElement.src = videos[index];
      videoElement.play().catch(err => console.log("Video autoplay blocked:", err));
  
      index = (index + 1) % videos.length;
      videoElement.onended = playVideo;
    }
  
    if (document.getElementById("bg-video")) {
      playVideo();
    }
  
    // ===== Navbar Toggle (All Pages) =====
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
  
    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
      });
    }
  
    // ===== Blob Animation (Contact Page only) =====
    const container = document.querySelector(".blobs");
    if (container) {
      // More blobs for fuller coverage
      for (let i = 0; i < 15; i++) {
        const blob = document.createElement("div");
        blob.classList.add("blob");
    
        // Color palette
        const colors = ["pink", "green", "yellow"];
        blob.classList.add(colors[Math.floor(Math.random() * colors.length)]);
    
        container.appendChild(blob);
    
        // Stagger first animation start
        setTimeout(() => animateBlob(blob), i * 1000);
      }
    
      function animateBlob(blob) {
        // Randomize size more heavily
        const size = Math.floor(Math.random() * 250) + 180;
        blob.style.width = `${size}px`;
        blob.style.height = `${size}px`;
    
        // Position safely inside viewport
        blob.style.top = `${Math.random() * 80}%`;
        blob.style.left = `${Math.random() * 80}%`;
    
        // Reset to hidden
        blob.style.opacity = 0;
        blob.style.transform = "scale(0.7)";
    
        // Fade in
        setTimeout(() => {
          blob.style.opacity = 0.9;
          blob.style.transform = "scale(1.3)";
        }, 100);
    
        // Hold longer before fading out
        setTimeout(() => {
          blob.style.opacity = 0;
          blob.style.transform = "scale(0.6)";
        }, 12000); // visible ~12s
    
        // Loop slower so not all restart at same time
        setTimeout(() => animateBlob(blob), 16000 + Math.random() * 4000);
      }
    }
  });
  