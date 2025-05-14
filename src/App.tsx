import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FilterBar from './components/FilterBar';
import ProjectFeed from './components/ProjectFeed';
import BottomCTA from './components/BottomCTA';
import ProfilePage from './components/ProfilePage';
import { SortOption } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [showProfile, setShowProfile] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['home']);
  const [previousPath, setPreviousPath] = useState<string>('home');
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      // Go back in our custom navigation history
      if (navigationHistory.length > 1) {
        const newHistory = [...navigationHistory];
        newHistory.pop(); // Remove current state
        const previousState = newHistory[newHistory.length - 1];
        
        setNavigationHistory(newHistory);
        
        if (previousState === 'home') {
          setShowProfile(false);
          setSelectedProjectId(undefined);
          setSelectedUserId(undefined);
        } else if (previousState === 'profile') {
          setShowProfile(true);
          setSelectedProjectId(undefined);
          // Keep the selected user ID
        } else if (previousState.startsWith('project:')) {
          const projectId = previousState.split(':')[1];
          setShowProfile(true);
          setSelectedProjectId(projectId);
        } else if (previousState.startsWith('user:')) {
          const userId = previousState.split(':')[1];
          setShowProfile(true);
          setSelectedUserId(userId);
          setSelectedProjectId(undefined);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigationHistory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  const handleProfileClick = (userId?: string) => {
    // Update navigation history
    const newHistory = [...navigationHistory, userId ? `user:${userId}` : 'profile'];
    setNavigationHistory(newHistory);
    
    // Determine where we're coming from
    const currentPath = showProfile && selectedProjectId ? 'project' : 'home';
    setPreviousPath(currentPath);
    
    // Update browser history
    window.history.pushState({}, '', userId ? `/user/${userId}` : '/profile');
    
    // Update UI state
    setShowProfile(true);
    setSelectedProjectId(undefined);
    setSelectedUserId(userId || 'user123'); // Default to user123 if no ID provided
  };

  const handleHomeClick = () => {
    // Update navigation history
    const newHistory = [...navigationHistory, 'home'];
    setNavigationHistory(newHistory);
    
    // Update browser history
    window.history.pushState({}, '', '/');
    
    // Update UI state
    setShowProfile(false);
    setSelectedProjectId(undefined);
    setSelectedUserId(undefined);
  };

  const handleProjectClick = (projectId: string) => {
    // Determine where we're coming from
    const currentPath = showProfile ? 'profile' : 'home';
    setPreviousPath(currentPath);
    
    // Update navigation history
    const newHistory = [...navigationHistory, `project:${projectId}`];
    setNavigationHistory(newHistory);
    
    // Update browser history
    window.history.pushState({}, '', `/project/${projectId}`);
    
    // Update UI state
    setSelectedProjectId(projectId);
    setShowProfile(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        onProfileClick={() => handleProfileClick()}
        onHomeClick={handleHomeClick}
      />
      
      <main className="container mx-auto px-4 py-8">
        {showProfile ? (
          <ProfilePage 
            projectId={selectedProjectId}
            onBackClick={handleHomeClick}
            previousPath={previousPath}
            onProfileClick={handleProfileClick}
          />
        ) : (
          <>
            <HeroSection />
            <FilterBar 
              selectedCategory={selectedCategory} 
              onCategoryChange={handleCategoryChange}
              sortOption={sortOption}
              onSortChange={handleSortChange}
            />
            <ProjectFeed 
              selectedCategory={selectedCategory}
              sortOption={sortOption}
              onProjectClick={handleProjectClick}
            />
            <BottomCTA />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
