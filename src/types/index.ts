export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  builder: {
    name: string;
    avatar: string;
  };
  metrics: {
    upvotes: number;
    comments: number;
    shares: number;
    visits: number;
  };
  tags: string[];
  createdAt: string;
}

export type SortOption = 
  | 'most_visited'
  | 'most_liked'
  | 'most_commented'
  | 'most_upvoted'
  | 'most_remixed'
  | 'most_shared'
  | 'newest';

export interface User {
  id: string;
  name: string;
  avatar: string;
  isLoggedIn: boolean;
}
