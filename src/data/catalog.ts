import type { Category, Product } from '../types'

export const categories: Category[] = [
  {
    id: 'stone',
    name: '원석 단주',
    shortName: '원석 단주',
    description: '각기 다른 색과 결을 한 줄에 엮은 단주 컬렉션',
  },
  {
    id: 'double',
    name: '행운의 두 줄 단주',
    shortName: '두 줄 단주',
    description: '겹쳐 차거나 길게 늘어뜨릴 수 있는 두 줄 단주',
  },
  {
    id: 'silver',
    name: '은장식 단주',
    shortName: '은장식 단주',
    description: '은장식이 더해진 단주 컬렉션',
  },
  {
    id: 'mala',
    name: '108염주',
    shortName: '108염주',
    description: '차분한 반복을 위해 엮은 108염주 컬렉션',
  },
]

export const products: Product[] = [
  { id: 'stone-01', code: '#1', name: '산호', price: 25000, category: 'stone', image: 'assets/products/stone-01.png', featured: true },
  { id: 'stone-02', code: '#2', name: '터키석 어닉스', price: 25000, category: 'stone', image: 'assets/products/stone-02.png' },
  { id: 'stone-03', code: '#3', name: '산호 녹렴석', price: 25000, category: 'stone', image: 'assets/products/stone-03.png' },
  { id: 'stone-04', code: '#4', name: '핑크 수정', price: 25000, category: 'stone', image: 'assets/products/stone-04.png' },
  { id: 'stone-05', code: '#5', name: '청금석 옥', price: 25000, category: 'stone', image: 'assets/products/stone-05.png' },
  { id: 'stone-06', code: '#6', name: '청금석 자마노', price: 25000, category: 'stone', image: 'assets/products/stone-06.png' },
  { id: 'stone-07', code: '#7', name: '터키석 수정 마노', price: 25000, category: 'stone', image: 'assets/products/stone-07.png' },
  { id: 'stone-08', code: '#8', name: '산호 녹렴석', price: 25000, category: 'stone', image: 'assets/products/stone-08.png' },
  { id: 'stone-09', code: '#9', name: '황옥 자개', price: 25000, category: 'stone', image: 'assets/products/stone-09.png' },
  { id: 'stone-10', code: '#10', name: '네모 어닉스', price: 25000, category: 'stone', image: 'assets/products/stone-10.png' },
  { id: 'stone-11', code: '#11', name: '호안석 나비 산호', price: 25000, category: 'stone', image: 'assets/products/stone-11.png' },
  { id: 'stone-12', code: '#12', name: '호안석 나비 청금석', price: 25000, category: 'stone', image: 'assets/products/stone-12.png' },
  { id: 'stone-13', code: '#13', name: '호안석 어닉스', price: 25000, category: 'stone', image: 'assets/products/stone-13.png' },
  { id: 'stone-14', code: '#14', name: '호안석 어닉스2', price: 25000, category: 'stone', image: 'assets/products/stone-14.png' },
  { id: 'stone-15', code: '#15', name: '청금석 큐브 어닉스', price: 25000, category: 'stone', image: 'assets/products/stone-15.png' },
  { id: 'stone-16', code: '#16', name: '청금석 큐브', price: 25000, category: 'stone', image: 'assets/products/stone-16.png' },
  { id: 'stone-17', code: '#17', name: '황옥 청금석', price: 25000, category: 'stone', image: 'assets/products/stone-17.png' },
  { id: 'double-a1', code: '#A-1', name: '코끼리 산호', price: 35000, category: 'double', image: 'assets/products/double-a1.png', featured: true },
  { id: 'double-a2', code: '#A-2', name: '코끼리 청금석', price: 35000, category: 'double', image: 'assets/products/double-a2.png' },
  { id: 'double-a3', code: '#A-3', name: '코끼리 옥', price: 35000, category: 'double', image: 'assets/products/double-a3.png' },
  { id: 'double-a4', code: '#A-4', name: '산호 나비', price: 35000, category: 'double', image: 'assets/products/double-a4.png' },
  { id: 'double-a5', code: '#A-5', name: '터키석 만자', price: 35000, category: 'double', image: 'assets/products/double-a5.png' },
]
