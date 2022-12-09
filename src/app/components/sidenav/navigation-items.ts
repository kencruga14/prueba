import { NavigationItem, NavigationLink } from '../../../@vex/interfaces/navigation-item.interface';

import icHome from '@iconify/icons-ic/twotone-home';
import icPerson from '@iconify/icons-ic/twotone-person';
import icContactSupport from '@iconify/icons-ic/twotone-contact-support';
import icReferences from '@iconify/icons-ic/twotone-library-books';
import icHouse from '@iconify/icons-ic/twotone-house';
import icBook from '@iconify/icons-ic/twotone-book';
import icCard from '@iconify/icons-ic/twotone-credit-card';
import icPdf from '@iconify/icons-ic/picture-as-pdf';

export const navigationStudents: NavigationLink[] = [
    {
      type: 'link',
      label: 'Información Personal',
      route: '/update/student/personal',
      icon: 'badge',
    },
];
  
export const navigationEmployees: NavigationLink[] = [
    {
      type: 'link',
      label: 'Información Personal',
      route: '/update/employee/personal',
      icon: 'badge',
    },
];

export const navigationMil: NavigationLink[] = [
  {
    type: 'link',
    label: 'Información Personal',
    route: '/update/employee/personal',
    icon: 'badge',
  },
];

export const navigationRootItems: NavigationItem = {
    type: 'link',
    label: 'Inicio',
    route: '/',
    icon: 'badge',
    routerLinkActiveOptions: { exact: true }
};