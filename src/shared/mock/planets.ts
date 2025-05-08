import PlanetImage1 from '@/shared/assets/planets/planet-1/level-0.png'
import PlanetImage2 from '@/shared/assets/planets/planet-2/level-0.png'
import PlanetImage3 from '@/shared/assets/planets/planet-3/level-0.png'
import PlanetImage4 from '@/shared/assets/planets/planet-4/level-0.png'
import PlanetImage5 from '@/shared/assets/planets/planet-5/level-0.png'
import PlanetImage6 from '@/shared/assets/planets/planet-6/level-0.png'
import PlanetImage7 from '@/shared/assets/planets/planet-7/level-0.png'
import PlanetImage8 from '@/shared/assets/planets/planet-8/level-0.png'
import PlanetImage9 from '@/shared/assets/planets/planet-9/level-0.png'
import PlanetImage10 from '@/shared/assets/planets/planet-10/level-0.png'
import type { Planet } from '@/entities/PlanetCard.vue'

export const planets: Planet[] = [
  {
    name: 'Меркурий',
    imageSrc: PlanetImage1,
    income: 1.1,
    cost: 0.6,
    cycleTime: 3,
    earned: 10,
  },
  {
    name: 'Венера',
    imageSrc: PlanetImage2,
    income: 1.5,
    cost: 0.8,
    cycleTime: 4,
    earned: 12,
  },
  {
    name: 'Земля',
    imageSrc: PlanetImage3,
    income: 1.8,
    cost: 1.0,
    cycleTime: 3,
    earned: 14,
  },
  {
    name: 'Марс',
    imageSrc: PlanetImage4,
    income: 2.2,
    cost: 1.3,
    cycleTime: 5,
    earned: 16,
  },
  {
    name: 'Юпитер',
    imageSrc: PlanetImage5,
    income: 2.7,
    cost: 1.6,
    cycleTime: 6,
    earned: 20,
  },
  {
    name: 'Сатурн',
    imageSrc: PlanetImage6,
    income: 3.0,
    cost: 2.0,
    cycleTime: 7,
    earned: 24,
  },
  {
    name: 'Уран',
    imageSrc: PlanetImage7,
    income: 3.4,
    cost: 2.4,
    cycleTime: 8,
    earned: 28,
  },
  {
    name: 'Нептун',
    imageSrc: PlanetImage8,
    income: 3.8,
    cost: 2.9,
    cycleTime: 9,
    earned: 33,
  },
  {
    name: 'Плутон',
    imageSrc: PlanetImage9,
    income: 4.2,
    cost: 3.5,
    cycleTime: 10,
    earned: 38,
  },
  {
    name: 'Эриды',
    imageSrc: PlanetImage10,
    income: 4.7,
    cost: 4.0,
    cycleTime: 11,
    earned: 45,
  },
]
