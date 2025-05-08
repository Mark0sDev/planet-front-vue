import type { User } from '@/entities/UserCard.vue'
import type { TopUser } from '@/entities/TopUserCard.vue'

import avatar1 from '@/shared/assets/avatars/avatar-1.jpg'
import avatar2 from '@/shared/assets/avatars/avatar-2.jpg'
import avatar3 from '@/shared/assets/avatars/avatar-3.jpg'
import avatar4 from '@/shared/assets/avatars/avatar-4.jpg'

export const myUser: User = { id: 1, name: 'Katy', score: '0.00005', place: 23 }

export const top3Users: TopUser[] = [
  {
    id: 1,
    name: 'Mega Boy',
    avatar: avatar1,
    score: '123.35M',
    place: 1,
  },
  {
    id: 2,
    name: 'Mega Girl',
    avatar: avatar2,
    score: '120.00M',
    place: 2,
  },
  {
    id: 3,
    name: 'Alien',
    avatar: avatar3,
    score: '118.00M',
    place: 3,
  },
]

export const topUsers: User[] = [
  {
    id: 1,
    name: 'Natalie',
    avatar: avatar1,
    score: '0,00005',
    place: 4,
  },
  {
    id: 2,
    name: 'Natalie',
    avatar: avatar2,
    score: '0,00005',
    place: 5,
  },
  {
    id: 3,
    name: 'Natalie',
    avatar: avatar3,
    score: '0,00005',
    place: 21,
  },
  {
    id: 4,
    name: 'Natalie',
    avatar: avatar4,
    score: '0,00005',
    place: 124,
  },
  {
    id: 5,
    name: 'Natalie',
    avatar: avatar2,
    score: '0,00005',
    place: 123,
  },
  {
    id: 6,
    name: 'Natalie',
    avatar: avatar1,
    score: '0,00005',
    place: 6,
  },
  {
    id: 7,
    name: 'Natalie',
    avatar: avatar2,
    score: '0,00005',
    place: 7,
  },
  {
    id: 8,
    name: 'Natalie',
    avatar: avatar3,
    score: '0,00005',
    place: 218,
  },
]
