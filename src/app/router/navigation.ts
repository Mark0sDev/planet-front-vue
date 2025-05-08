import { AppRoutes } from '@/app/router/router.ts'

import HomeIcon from '@/shared/assets/icons/home.svg'

import FriendsIcon from '@/shared/assets/icons/friends.svg'
import TasksIcon from '@/shared/assets/icons/tasks.svg'
import BalanceIcon from '@/shared/assets/icons/balance.svg'
import TonIcon from '@/shared/assets/icons/ton-vector.svg'

export interface NavItem {
  path: string
  label: string
  icon?: unknown
}

export const NAVIGATION: NavItem[] = [
  { path: AppRoutes.HOME, label: 'Главная', icon: HomeIcon },
  { path: AppRoutes.LEADERS, label: 'Заработать', icon: TonIcon },
  { path: AppRoutes.FRIENDS, label: 'Друзья', icon: FriendsIcon },
  { path: AppRoutes.TASKS, label: 'Задания', icon: TasksIcon },
  { path: AppRoutes.BALANCE, label: 'Баланс', icon: BalanceIcon },
]
