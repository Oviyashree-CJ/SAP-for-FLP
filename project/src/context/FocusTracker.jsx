import { useEffect } from "react";

function FocusTracker() {
  useEffect(() => {
    let timer;
    let audio = new Audio("/audio/alarm.wav");
    audio.volume = 1.0;
    audio.loop = true; // ✅ Loop the sound until stopped
    
    // Ask for notification + unlock audio on first user action
    const requestPermissions = () => {
      if (Notification.permission !== "granted") {
        Notification.requestPermission().then((perm) => {
          console.log("Notification permission:", perm);
        });
      }

      // Unlock audio
      audio.play()
        .then(() => {
          console.log("Audio unlocked");
          audio.pause();
          audio.currentTime = 0;
        })
        .catch((err) => {
          console.warn("Autoplay blocked until user interacts:", err);
        });

     document.removeEventListener("click", requestPermissions);
    };

    document.addEventListener("click", requestPermissions);

    const playSound = () => {
      audio.play().catch((err) => console.warn("Audio play failed:", err));
    };

    const stopSound = () => {
      audio.pause();
      audio.currentTime = 0;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("Tab hidden → starting 1 min timer...");
        timer = setTimeout(() => {
          console.log("1 minute passed → showing notification, alert, and sound");

          if (Notification.permission === "granted") {
            new Notification("Stay Focused!", {
              body: "You switched away for 1 minute. Get back to studying!",
            });
          }

          playSound();
          if (window.confirm("Stay Focused!\nYou switched away for 1 minute.")) {
            stopSound();
          }
        }, 60 * 1000);
      } else {
        clearTimeout(timer);
        stopSound();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("click", requestPermissions);
      clearTimeout(timer);
      stopSound();
    };
  }, []);

  return null;
}

export default FocusTracker;
