import React from "react";
import { motion } from "framer-motion";

const Loading = ({ size = "md", message = "Loading..." }) => {
  // Size variants
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Spinner */}
      <motion.div
        className={`rounded-full border-t-transparent ${sizeClasses[size]} border-blue-500`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        
      />
      
      {/* Optional message */}
      {message && (
        <motion.p 
          className="text-gray-600 text-sm font-medium"
          initial={{ y: 5 }}
          animate={{ y: 0 }}
          transition={{ 
            yoyo: Infinity, 
            duration: 0.8,
            ease: "easeOut"
          }}
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
};

export default Loading;