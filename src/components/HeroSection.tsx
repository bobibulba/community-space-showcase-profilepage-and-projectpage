import React, { useState } from 'react';
import { Play, X, Users, Sparkles, Zap } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-10 px-4 sm:px-6 lg:px-8 mb-8 rounded-lg shadow-lg animate-fade-in">
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-3 right-3 text-white/80 hover:text-white focus:outline-none transition-colors duration-200"
        aria-label="Close hero section"
      >
        <X className="h-5 w-5" />
      </button>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-8 md:mb-0 md:mr-8 max-w-2xl">
          <h1 className="text-3xl font-bold mb-3 leading-tight">Discover & Connect in the ChatAndBuild Community Space</h1>
          <p className="text-white/90 mb-6 text-lg">
            Explore innovative projects, connect with fellow builders, and showcase your own creations in our collaborative community.
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-start">
              <Users className="h-5 w-5 mr-2 text-accent-300 flex-shrink-0 mt-0.5" />
              <p className="text-white/80">Connect with a diverse community of creators and AI enthusiasts</p>
            </div>
            <div className="flex items-start">
              <Sparkles className="h-5 w-5 mr-2 text-accent-300 flex-shrink-0 mt-0.5" />
              <p className="text-white/80">Get inspired by trending projects and innovative solutions</p>
            </div>
            <div className="flex items-start">
              <Zap className="h-5 w-5 mr-2 text-accent-300 flex-shrink-0 mt-0.5" />
              <p className="text-white/80">Share feedback and collaborate on projects in real-time</p>
            </div>
          </div>
          
          <button className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-md shadow-md text-primary-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white transition-all duration-200 hover:shadow-lg">
            <Play className="mr-2 h-4 w-4" />
            Take A Tour
          </button>
        </div>
        
        <div className="relative w-full max-w-md">
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 w-full h-full flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center animate-pulse-slow hover:animate-none transition-all duration-300 cursor-pointer group">
                  <Play className="h-8 w-8 text-white group-hover:text-accent-300 transition-colors duration-300" />
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-white">
                  Community Showcase
                </span>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-4 -right-4 bg-accent-500 text-white px-3 py-1.5 rounded-full shadow-lg text-sm font-medium animate-bounce-slow">
            New Features!
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
