import React from 'react';
import { Rocket, Sparkles, Users } from 'lucide-react';

const BottomCTA: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8 mt-16 rounded-lg shadow-inner animate-fade-in">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-neutral-900 sm:text-4xl">
          Join our community of builders
        </h2>
        <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
          Share your projects, get feedback, and collaborate with other creators in the ChatAndBuild community space.
        </p>
        
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-center">
              <div className="bg-primary-100 p-3 rounded-full">
                <Rocket className="h-6 w-6 text-primary-600" />
              </div>
            </div>
            <h3 className="mt-4 text-lg font-medium text-neutral-900">Showcase Projects</h3>
            <p className="mt-2 text-sm text-neutral-500">Share your creations with the community and get valuable feedback</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-center">
              <div className="bg-secondary-100 p-3 rounded-full">
                <Sparkles className="h-6 w-6 text-secondary-600" />
              </div>
            </div>
            <h3 className="mt-4 text-lg font-medium text-neutral-900">Get Inspired</h3>
            <p className="mt-2 text-sm text-neutral-500">Discover innovative projects and learn from other builders</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-center">
              <div className="bg-accent-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-accent-600" />
              </div>
            </div>
            <h3 className="mt-4 text-lg font-medium text-neutral-900">Collaborate</h3>
            <p className="mt-2 text-sm text-neutral-500">Connect with like-minded creators and build together</p>
          </div>
        </div>
        
        <div className="mt-10">
          <a
            href="https://chatandbuild.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-105"
          >
            <Rocket className="mr-2 h-5 w-5" />
            Create Your Project
          </a>
        </div>
        <p className="mt-4 text-sm text-neutral-500">
          Join our growing community of innovators and builders today.
        </p>
      </div>
    </div>
  );
};

export default BottomCTA;
