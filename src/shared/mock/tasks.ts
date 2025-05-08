import { type Task, TaskStatus } from '@/entities/TaskCard/types.ts'

import dailyRewardAvatar from '@/shared/assets/avatars/daily-avatar.jpg'
import inviteFriendsAvatar from '@/shared/assets/avatars/invite-avatar.jpg'
import subscribeLegoAvatar from '@/shared/assets/avatars/subscribe-avatar.jpg'
import testAvatar1 from '@/shared/assets/avatars/avatar-1.jpg'
import testAvatar2 from '@/shared/assets/avatars/avatar-2.jpg'
import testAvatar3 from '@/shared/assets/avatars/avatar-3.jpg'
import testAvatar4 from '@/shared/assets/avatars/avatar-4.jpg'

export const dailyTasks: Task[] = [
  {
    id: 1,
    title: 'Ежедневная награда',
    avatar: dailyRewardAvatar,
    reward: '0.0001',
    status: TaskStatus.CLAIM,
    timer: '00:00:00 до следующей награды',
  },
  {
    id: 2,
    title: 'Пригласи 10 друзей',
    avatar: inviteFriendsAvatar,
    reward: '0.0005',
    status: TaskStatus.CLAIM,
    timer: '00:00:00 до следующей награды',
  },
  {
    id: 3,
    title: 'Подпишись на "LEGO"',
    avatar: subscribeLegoAvatar,
    reward: '2.000',
    status: TaskStatus.START,
  },
]

export const otherTasks: Task[] = [
  {
    id: 4,
    title: 'Подпишись на "Test 213"',
    avatar: testAvatar1,
    reward: '2.000',
    status: TaskStatus.DONE,
  },
  {
    id: 5,
    title: 'Подпишись на "Test 213"',
    avatar: testAvatar2,
    reward: '2.000',
    status: TaskStatus.START,
  },
  {
    id: 6,
    title: 'Подпишись на "Test 213"',
    avatar: testAvatar3,
    reward: '2.000',
    status: TaskStatus.START,
  },
  {
    id: 7,
    title: 'Подпишись на "Test 213"',
    avatar: testAvatar4,
    reward: '2.000',
    status: TaskStatus.START,
  },
]
