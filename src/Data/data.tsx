import Icon1 from '../assets/icons/icon-1.svg';
import Icon2 from '../assets/icons/icon-2.svg';
import Icon3 from '../assets/icons/icon-3.svg';
import Icon4 from '../assets/icons/icon-4.svg';
import Icon5 from '../assets/icons/icon-5.svg';

export const sidebars = [
  {
    id: 0,
    icon: Icon1,
    title: 'Dashboard',
    url: '/dashboard',
  },
  {
    id: 1,
    icon: Icon2,
    title: 'Onboarding',
    url: '/onboarding',
  },
  {
    id: 2,
    icon: Icon3,
    title: 'Teachers',
    url: '/teachers',
  },
  { id: 3, icon: Icon4, title: 'Check Results', url: '/results' },
  { id: 4, icon: Icon5, title: 'Payments', url: '/payments' },
];

export const cards = [
  {
    title: 'Total Application',
    value: 500,
    color: '#2B2C2E',
  },
  {
    title: 'Approved',
    value: 125,
    color: '#0DB153',
  },
  {
    title: 'Rejected',
    value: 40,
    color: '#F84C4C',
  },
  {
    title: 'In-Review',
    value: 40,
    color: '#FFB73E',
  },
];


