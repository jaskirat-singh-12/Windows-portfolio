import React, { useState, useEffect } from 'react'
import { Upload, Check } from 'lucide-react'

const Background = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedDefault, setSelectedDefault] = useState(null);

  // Default background presets
  const defaultBackgrounds = [
    { name: 'Ocean Blue', url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=800&fit=crop' },
    { name: 'Mountain Forest', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop' },
    { name: 'Galaxy', url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&h=800&fit=crop' },
    { name: 'Desert', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop' },
  ];

  const setBackgroundImage = (imageUrl) => {
    if (imageUrl) {
      document.documentElement.style.backgroundImage = `url(${imageUrl})`;
      document.documentElement.style.backgroundSize = 'cover';
      document.documentElement.style.backgroundPosition = 'center';
      document.documentElement.style.backgroundAttachment = 'fixed';
      document.documentElement.style.backgroundRepeat = 'no-repeat';
    }
  };

  const applyDefaultBackground = async (url, name) => {
    setSelectedDefault(name);
    
    // Save to backend
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5005/api/user/background-preset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ url, name })
      });

      setBackgroundImage(url);
      window.dispatchEvent(new Event('backgroundUpdated'));
    } catch (error) {
      console.error("Failed to set background:", error);
      // Still apply locally even if backend call fails
      setBackgroundImage(url);
      window.dispatchEvent(new Event('backgroundUpdated'));
    }
  };

  const uploadBackground = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5005/api/user/background", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      console.log("Upload response:", data);

      // Try multiple possible property names
      const imageUrl = data.imageUrl || data.url || data.background || data.backgroundUrl;
      if (imageUrl) {
        setBackgroundImage(imageUrl);
        window.dispatchEvent(new Event('backgroundUpdated'));
      } else {
        console.error("No image URL in response:", data);
      }
    } catch (error) {
      console.error("Upload fetch failed:", error);
      throw error;
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    setUploading(true);
    try {
      await uploadBackground(selectedFile);
      setSelectedFile(null);
      alert("Background updated successfully!");
      
      // Reload background after upload by dispatching a custom event
      window.dispatchEvent(new Event('backgroundUpdated'));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload background");
    } finally {
      setUploading(false);
    }
  };

  // Fetch background on component mount
  useEffect(() => {
    const loadBackground = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:5005/api/user/background", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        console.log("GET background response:", data);

        // Try multiple possible property names
        const imageUrl = data.background || data.imageUrl || data.url || data.backgroundUrl;
        if (imageUrl) {
          setBackgroundImage(imageUrl);
        }
      } catch (error) {
        console.error("Failed to load background:", error);
      }
    };

    loadBackground();
  }, []);

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 text-white overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Customize Your Background</h2>
          <p className="text-gray-400">Choose from curated presets or upload your own</p>
        </div>

        {/* Default Presets Section */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-white">Recommended Backgrounds</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {defaultBackgrounds.map((bg, index) => (
              <div
                key={index}
                onClick={() => applyDefaultBackground(bg.url, bg.name)}
                className="group relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:scale-105"
              >
                <img
                  src={bg.url}
                  alt={bg.name}
                  className="w-full h-40 object-cover group-hover:brightness-75 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 flex items-end justify-between p-3">
                  <p className="text-white font-medium text-sm">{bg.name}</p>
                  {selectedDefault === bg.name && (
                    <div className="flex items-center gap-1 bg-blue-500 px-2 py-1 rounded-full">
                      <Check size={14} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Upload Custom Background</h3>
          
          <div className="flex flex-col gap-4">
            <label className="cursor-pointer group">
              <div className="flex items-center justify-center gap-3 border-2 border-dashed border-white/30 rounded-lg p-8 hover:border-blue-400 group-hover:bg-white/5 transition-all duration-300">
                <Upload size={24} className="text-blue-400" />
                <div>
                  <p className="font-medium group-hover:text-blue-400 transition-colors">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {selectedFile && (
              <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
                <p className="text-sm text-gray-300">Selected: <span className="font-medium text-white">{selectedFile.name}</span></p>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-xs text-gray-400 hover:text-red-400 transition-colors"
                >
                  Remove
                </button>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={uploading || !selectedFile}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading..." : "Upload & Apply Background"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Background
