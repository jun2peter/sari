import { Heart, Plus } from 'lucide-react'
import type { Product } from '../types'

type Props = {
  product: Product
  favorite: boolean
  onOpen: (product: Product) => void
  onFavorite: (id: string) => void
  onAdd: (product: Product) => void
}

const formatPrice = (price: number) => `₩ ${price.toLocaleString('ko-KR')}`

export function ProductCard({ product, favorite, onOpen, onFavorite, onAdd }: Props) {
  return (
    <article className="product-card">
      <div className="product-card__visual">
        <button className="product-card__open" type="button" onClick={() => onOpen(product)} aria-label={`${product.name} 상세 보기`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </button>
        <span className="product-card__code">{product.code}</span>
        <button
          className={`icon-button product-card__heart ${favorite ? 'is-active' : ''}`}
          type="button"
          onClick={() => onFavorite(product.id)}
          aria-label={favorite ? `${product.name} 찜 해제` : `${product.name} 찜하기`}
          aria-pressed={favorite}
        >
          <Heart size={17} strokeWidth={1.5} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="product-card__info">
        <button type="button" className="product-card__title" onClick={() => onOpen(product)}>
          <span>{product.name}</span>
          <small>{formatPrice(product.price)}</small>
        </button>
        <button className="product-card__add" type="button" onClick={() => onAdd(product)} aria-label={`${product.name} 장바구니 담기`}>
          <Plus size={17} strokeWidth={1.5} />
        </button>
      </div>
    </article>
  )
}
