import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Product } from '../types'

type Props = {
  product: Product | null
  onClose: () => void
  onAdd: (product: Product, quantity: number) => void
}

export function ProductSheet({ product, onClose, onAdd }: Props) {
  const [quantity, setQuantity] = useState(1)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!product) return
    setQuantity(1)
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [product, onClose])

  if (!product) return null

  return (
    <div className="overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="product-sheet" role="dialog" aria-modal="true" aria-labelledby="product-sheet-title">
        <button ref={closeRef} className="icon-button product-sheet__close" type="button" onClick={onClose} aria-label="상품 상세 닫기">
          <X size={21} strokeWidth={1.5} />
        </button>
        <div className="product-sheet__image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-sheet__content">
          <span className="eyebrow">SARI COLLECTION · {product.code}</span>
          <h2 id="product-sheet-title">{product.name}</h2>
          <p className="product-sheet__price">₩ {product.price.toLocaleString('ko-KR')}</p>
          <p className="product-sheet__note">공방에서 하나씩 엮어 만든 상품입니다. 제작 및 배송 일정은 주문 요청 시 함께 확인해 주세요.</p>
          <div className="product-sheet__buy">
            <div className="quantity" aria-label="수량 선택">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="수량 줄이기"><Minus size={16} /></button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="수량 늘리기"><Plus size={16} /></button>
            </div>
            <button className="primary-button" type="button" onClick={() => { onAdd(product, quantity); onClose() }}>
              <ShoppingBag size={17} strokeWidth={1.5} /> 장바구니 담기
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
