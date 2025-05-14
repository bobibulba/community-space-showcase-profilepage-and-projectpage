import React, { useState, useEffect, useRef, useCallback } from 'react';
import ProjectCard from './ProjectCard';
import { Project, SortOption } from '../types';
import { Loader } from 'lucide-react';
import { mockProjects } from '../data/mockProjects';

interface ProjectFeedProps {
  selectedCategory: string;
  sortOption: SortOption;
  onProjectClick?: (projectId: string) => void;
}

const ProjectFeed: React.FC<ProjectFeedProps> = ({ selectedCategory, sortOption, onProjectClick }) => {
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const PROJECTS_PER_PAGE = 6;

  // Filter and sort projects
  const getFilteredAndSortedProjects = useCallback(() => {
    // Ensure mockProjects is an array before filtering
    if (!Array.isArray(mockProjects)) {
      console.error("mockProjects is not an array:", mockProjects);
      return [];
    }
    
    let filtered = [...mockProjects];
    
    // Apply category filter
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(project => 
        project.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase())
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'most_visited':
        filtered.sort((a, b) => b.metrics.visits - a.metrics.visits);
        break;
      case 'most_upvoted':
        filtered.sort((a, b) => b.metrics.upvotes - a.metrics.upvotes);
        break;
      case 'most_commented':
        filtered.sort((a, b) => b.metrics.comments - a.metrics.comments);
        break;
      case 'most_shared':
        filtered.sort((a, b) => b.metrics.shares - a.metrics.shares);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        break;
    }
    
    return filtered;
  }, [selectedCategory, sortOption]);

  // Reset when filters change
  useEffect(() => {
    setDisplayedProjects([]);
    setPage(1);
    setHasMore(true);
  }, [sortOption, selectedCategory]);

  // Load more projects when page changes
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const filteredProjects = getFilteredAndSortedProjects();
        
        // Ensure filteredProjects is an array
        if (!Array.isArray(filteredProjects)) {
          console.error("filteredProjects is not an array:", filteredProjects);
          setDisplayedProjects([]);
          setHasMore(false);
          setLoading(false);
          return;
        }
        
        const startIndex = 0;
        const endIndex = page * PROJECTS_PER_PAGE;
        
        setDisplayedProjects(filteredProjects.slice(startIndex, endIndex));
        setHasMore(endIndex < filteredProjects.length);
      } catch (error) {
        console.error("Error loading projects:", error);
        setDisplayedProjects([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };
    
    loadProjects();
  }, [page, getFilteredAndSortedProjects]);

  // Set up intersection observer for infinite scroll
  const lastProjectRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const handleClearFilters = () => {
    // This would be connected to parent component filter reset
    // For now, we'll just reset to default sort
    window.location.href = '/';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {displayedProjects.length === 0 && !loading ? (
        <div className="text-center py-12 animate-fade-in">
          <p className="text-neutral-500 text-lg">No projects found matching your criteria.</p>
          <button 
            onClick={handleClearFilters}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => {
            if (displayedProjects.length === index + 1) {
              return (
                <div ref={lastProjectRef} key={project.id}>
                  <ProjectCard 
                    project={project} 
                    index={index} 
                    onProjectClick={onProjectClick}
                  />
                </div>
              );
            } else {
              return (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index} 
                  onProjectClick={onProjectClick}
                />
              );
            }
          })}
        </div>
      )}
      
      {loading && (
        <div className="flex justify-center my-8 animate-fade-in">
          <div className="flex space-x-1 items-center">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <span className="ml-2 text-primary-600 font-medium">Loading projects...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFeed;
