import { AppRoutes } from '@/app/router/router.ts'

import HomeIcon from '@/shared/assets/icons/home.svg'
import FriendsIcon from '@/shared/assets/icons/friends.svg'
import TasksIcon from '@/shared/assets/icons/tasks.svg'
import BalanceIcon from '@/shared/assets/icons/balance.svg'
import TonIcon from '@/shared/assets/icons/ton-vector.svg'
import MiniGameIcon from '@/shared/assets/icons/game-controller.svg'

export interface NavItem {
  path: string
  label: string
  icon?: unknown
}

export const NAVIGATION: NavItem[] = [
  { path: AppRoutes.HOME, label: 'nav.home', icon: HomeIcon },
  { path: AppRoutes.FRIENDS, label: 'nav.friends', icon: FriendsIcon },
  { path: AppRoutes.MINIGAME, label: 'nav.game', icon: MiniGameIcon },
  { path: AppRoutes.PLANETS, label: 'nav.earn', icon: TonIcon },
  { path: AppRoutes.TASKS, label: 'nav.tasks', icon: TasksIcon },
  { path: AppRoutes.BALANCE, label: 'nav.balance', icon: BalanceIcon },
]
