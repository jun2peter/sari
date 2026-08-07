import { Minus, Plus, Share2, ShoppingBag, Trash2, X } from 'lucide-react'
import type { CartLine, Product } from '../types'

type Props = {
  open: boolean
  lines: CartLine[]
  products: Product[]
  onClose: () => void
  onQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
  onShare: () => void
}

export function CartDrawer({ open, lines, products, onClose, onQuantity, onRemove, onShare }: Props) {
  const resolved = lines.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId)
    return product ? [{ ...line, product }] : []
  })
  const total = resolved.reduce((sum, line) => sum + line.product.price * line.quantity, 0)

  return (
    <div className={`drawer-layer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <button className="drawer-layer__scrim" type="button" onClick={onClose} aria-label="장바구니 닫기" tabIndex={open ? 0 : -1} />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header className="drawer-header">
          <div>
            <span className="eyebrow">YOUR SELECTION</span>
            <h2 id="cart-title">장바구니</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="장바구니 닫기"><X size={21} /></button>
        </header>
        {resolved.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={30} strokeWidth={1.2} />
            <p>아직 담긴 단주가 없습니다.</p>
            <button type="button" className="text-button" onClick={onClose}>컬렉션 둘러보기</button>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {resolved.map(({ product, quantity }) => (
                <article className="cart-line" key={product.id}>
                  <div className="cart-line__image"><img src={product.image} alt="" /></div>
                  <div className="cart-line__content">
                    <span>{product.code}</span>
                    <h3>{product.name}</h3>
                    <p>₩ {(product.price * quantity).toLocaleString('ko-KR')}</p>
                    <div className="cart-line__controls">
                      <div className="quantity quantity--small">
                        <button type="button" onClick={() => onQuantity(product.id, Math.max(1, quantity - 1))} aria-label="수량 줄이기"><Minus size={13} /></button>
                        <span>{quantity}</span>
                        <button type="button" onClick={() => onQuantity(product.id, quantity + 1)} aria-label="수량 늘리기"><Plus size={13} /></button>
                      </div>
                      <button className="cart-line__remove" type="button" onClick={() => onRemove(product.id)} aria-label={`${product.name} 삭제`}><Trash2 size={15} /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <footer className="cart-footer">
              <div className="cart-total"><span>합계</span><strong>₩ {total.toLocaleString('ko-KR')}</strong></div>
              <p>배송비와 제작 일정은 주문 요청 후 안내됩니다.</p>
              <button className="primary-button primary-button--wide" type="button" onClick={onShare}><Share2 size={17} /> 주문 목록 공유하기</button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
