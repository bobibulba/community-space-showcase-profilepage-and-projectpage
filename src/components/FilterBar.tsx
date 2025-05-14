import React, { useState } from 'react';
import { ChevronDown, Filter, X } from 'lucide-react';
import { SortOption } from '../types';
import { categories } from '../data/mockCategories';

interface FilterBarProps {
  onSortChange: (sort: SortOption) => void;
  onCategoryChange: (category: string) => void;
  selectedSort: SortOption;
  selectedCategory: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  onSortChange, 
  onCategoryChange, 
  selectedSort, 
  selectedCategory 
}) => {
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'most_visited', label: 'Most Visited' },
    { value: 'most_liked', label: 'Most Liked' },
    { value: 'most_commented', label: 'Most Commented' },
    { value: 'most_upvoted', label: 'Most Upvoted' },
    { value: 'most_remixed', label: 'Most Remixed' },
    { value: 'most_shared', label: 'Most Shared' },
    { value: 'newest', label: 'Newest' },
  ];

  const getSortLabel = (value: SortOption): string => {
    return sortOptions.find(option => option.value === value)?.label || 'Sort By';
  };

  return (
    <div className="bg-white shadow-sm rounded-lg mb-6 p-4 animate-slide-up">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-primary-500 mr-2" />
          <span className="text-neutral-700 font-medium">Filters:</span>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
              aria-expanded={sortDropdownOpen}
              aria-haspopup="true"
            >
              {getSortLabel(selectedSort)}
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${sortDropdownOpen ? 'transform rotate-180' : ''}`} />
            </button>
            
            {sortDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 animate-fade-in">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSortChange(option.value);
                        setSortDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${selectedSort === option.value ? 'bg-primary-50 text-primary-600 font-medium' : 'text-neutral-700 hover:bg-neutral-50'}`}
                      role="menuitem"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
              aria-expanded={categoryDropdownOpen}
              aria-haspopup="true"
            >
              {selectedCategory || 'All Categories'}
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${categoryDropdownOpen ? 'transform rotate-180' : ''}`} />
            </button>
            
            {categoryDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 animate-fade-in">
                <div className="py-1 max-h-60 overflow-y-auto" role="menu" aria-orientation="vertical">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        onCategoryChange(category === 'All' ? '' : category);
                        setCategoryDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${selectedCategory === category || (category === 'All' && !selectedCategory) ? 'bg-primary-50 text-primary-600 font-medium' : 'text-neutral-700 hover:bg-neutral-50'}`}
                      role="menuitem"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Active filters display */}
      {(selectedSort || selectedCategory) && (
        <div className="mt-4 flex flex-wrap items-center gap-2 animate-fade-in">
          <span className="text-xs text-neutral-500">Active filters:</span>
          
          {selectedSort && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 transition-all duration-200 hover:bg-primary-200">
              {getSortLabel(selectedSort)}
              <button
                onClick={() => onSortChange('newest' as SortOption)}
                className="ml-1.5 text-primary-600 hover:text-primary-800 focus:outline-none"
                aria-label={`Remove ${getSortLabel(selectedSort)} filter`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          )}
          
          {selectedCategory && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800 transition-all duration-200 hover:bg-secondary-200">
              {selectedCategory}
              <button
                onClick={() => onCategoryChange('')}
                className="ml-1.5 text-secondary-600 hover:text-secondary-800 focus:outline-none"
                aria-label={`Remove ${selectedCategory} filter`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
