import React, { useState } from "react";
import { X, Monitor, Move, Folder, Palette, Cookie } from "lucide-react";

const InstructionsModal = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to My Portfolio",
      icon: Monitor,
      description: "Learn how to navigate this interactive desktop experience",
      content: "This is not a regular website—it's a simulated Windows desktop. Let me show you how to use it!",
    },
    {
      title: "Fullscreen View",
      icon: Monitor,
      description: "Maximize your experience",
      content: "Double-click on an empty area of the screen to toggle fullscreen mode. This gives you more space to explore.",
    },
    {
      title: "Move Icons",
      icon: Move,
      description: "Customize your layout",
      content: "Click and drag any folder icon (Resume, My Projects) to move them around the desktop. Arrange them however you like!",
    },
    {
      title: "Open Projects",
      icon: Folder,
      description: "View content in windows",
      content: "Double-click on any folder or project icon to open it in a new draggable window on the same screen. You can drag, resize, and close these windows.",
    },
    {
      title: "Change Background",
      icon: Palette,
      description: "Personalize your desktop",
      content: "Click the Wallpaper button at the bottom to change the background. Choose from beautiful images to customize your experience.",
    },
    {
      title: "Cookie Notice",
      icon: Cookie,
      description: "Data Storage Information",
      content: "We store your background preference locally in cookies. Your chosen background will persist for 7 days, so you get a consistent experience across multiple visits.",
    },
  ];

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CurrentIcon size={32} />
            <div>
              <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
              <p className="text-sm text-blue-100">{steps[currentStep].description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-1 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-gray-700 text-center mb-8 text-lg">
            {steps[currentStep].content}
          </p>

          {/* Step Indicators */}
          <div className="flex gap-2 justify-center mb-8">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentStep
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400 w-2"
                }`}
                aria-label={`Go to step ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex-1 px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Previous
            </button>
            {currentStep === steps.length - 1 ? (
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-opacity font-medium"
              >
                Got It! 🎉
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                className="flex-1 px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-opacity font-medium"
              >
                Next
              </button>
            )}
          </div>

          {/* Skip Button */}
          <button
            onClick={onClose}
            className="w-full mt-3 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
            Skip Tutorial
          </button>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-3 text-center text-xs text-gray-500">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;
