export interface Society {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  image: string;
  tags: string[];
  founded: string;
  president: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  society: string;
  capacity: number;
  registered: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  image: string;
  type: string;
}

export interface Activity {
  id: string;
  type: 'join' | 'event' | 'post' | 'achievement';
  user: string;
  action: string;
  target: string;
  timestamp: string;
  avatar: string;
}

export interface StatData {
  label: string;
  value: number;
  change: number;
  icon: string;
}

export interface ChartData {
  name: string;
  value?: number;
  societies?: number;
  events?: number;
  members?: number;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  societyCount: number;
  eventCount: number;
}
