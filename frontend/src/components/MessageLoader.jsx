import { useState, useEffect } from "react";

const MessageLoader = ({
  messages = [
    "processing request",
    "matching to the best rider",
    "calculating estimated pickup time",
    "getting the most affordable price",
    "finding the best route possible"
  ],
  interval = 2500
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, interval);

    return () => clearInterval(id);
  }, [messages.length, interval]);

  return (
    <div className="flex items-center justify-center">
      <div className="font-light transition-colors duration-3000 capitalize">{messages[currentIndex]}...</div>
    </div>
  );
};

export default MessageLoader;
