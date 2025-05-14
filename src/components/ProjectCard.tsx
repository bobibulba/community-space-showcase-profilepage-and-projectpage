import React, { useState } from 'react';
import { ArrowUp, MessageSquare, Share2, Award } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onProjectClick?: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onProjectClick }) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(project.metrics.upvotes);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isUpvoted) {
      setUpvotes(upvotes - 1);
    } else {
      setUpvotes(upvotes + 1);
    }
    setIsUpvoted(!isUpvoted);
  };

  const handleCardClick = () => {
    if (onProjectClick) {
      onProjectClick(project.id);
    }
  };

  // Calculate staggered animation delay based on index
  const delayClass = `staggered-delay-${(index % 6) + 1}`;

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden hover-lift staggered-item ${delayClass} cursor-pointer`}
      onClick={handleCardClick}
    >
      <div className="relative">
        {project.thumbnail && (
          <img 
            src={project.thumbnail} 
            alt={project.title} 
            className="w-full h-48 object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
            onError={(e) => {
              // Fallback for failed image loads
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/400x200?text=Project+Image';
              target.onerror = null; // Prevent infinite error loop
            }}
          />
        )}
        
        {/* Date badge */}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-xs text-white">{formatDate(project.createdAt)}</span>
        </div>
        
        {/* Top project badge (conditional) */}
        {upvotes > 400 && (
          <div className="absolute -bottom-3 left-4 bg-accent-500 text-white px-2.5 py-1 rounded-full shadow-md flex items-center text-xs font-medium">
            <Award className="h-3.5 w-3.5 mr-1" />
            Top Project
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-neutral-900 mb-1 line-clamp-1">{project.title}</h3>
        <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{project.description}</p>
        
        <div className="flex items-center mb-3">
          <img 
            src={project.builder.avatar} 
            alt={project.builder.name} 
            className="w-8 h-8 rounded-full mr-2 object-cover border-2 border-white shadow-sm"
            onError={(e) => {
              // Fallback for failed avatar loads
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/40x40?text=User';
              target.onerror = null;
            }}
          />
          <span className="text-sm text-neutral-700">{project.builder.name}</span>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map((tag, index) => (
            <span 
              key={index} 
              className="inline-block bg-neutral-100 hover:bg-neutral-200 rounded-full px-2.5 py-0.5 text-xs font-medium text-neutral-800 transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-neutral-500 text-sm">
          <div className="flex items-center space-x-4">
            <button 
              className={`flex items-center upvote-button ${isUpvoted ? 'text-accent-500 font-medium' : ''}`}
              onClick={handleUpvote}
              aria-label={isUpvoted ? "Remove upvote" : "Upvote this project"}
            >
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>{upvotes}</span>
            </button>
            <button className="flex items-center hover:text-primary-600 transition-colors duration-200">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{project.metrics.comments}</span>
            </button>
            <button className="flex items-center hover:text-primary-600 transition-colors duration-200">
              <Share2 className="h-4 w-4 mr-1" />
              <span>{project.metrics.shares}</span>
            </button>
          </div>
          <span className="text-xs text-neutral-400">{project.metrics.visits} views</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
