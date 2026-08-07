import { Menu, Search, ShoppingBag, SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { CartDrawer } from './components/CartDrawer'
import { ProductCard } from './components/ProductCard'
import { ProductSheet } from './components/ProductSheet'
import { categories, products } from './data/catalog'
import type { CartLine, CategoryId, Product } from './types'
import './styles.css'

const loadArray = <T,>(key: string, fallback: T[]): T[] => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('stone')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [sort, setSort] = useState<'default' | 'name' | 'price-low' | 'price-high'>('default')
  const [favorites, setFavorites] = useState<string[]>(() => loadArray('sari-favorites', []))
  const [cart, setCart] = useState<CartLine[]>(() => loadArray('sari-cart', []))
  const [toast, setToast] = useState('')

  const category = categories.find((item) => item.id === activeCategory) ?? categories[0]
  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('ko-KR')
    const next = products.filter((product) => product.category === activeCategory && (!normalized || `${product.name} ${product.code}`.toLocaleLowerCase('ko-KR').includes(normalized)))
    if (sort === 'name') return [...next].sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'))
    if (sort === 'price-low') return [...next].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') return [...next].sort((a, b) => b.price - a.price)
    return next
  }, [activeCategory, query, sort])

  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0)

  useEffect(() => localStorage.setItem('sari-favorites', JSON.stringify(favorites)), [favorites])
  useEffect(() => localStorage.setItem('sari-cart', JSON.stringify(cart)), [cart])
  useEffect(() => {
    document.body.classList.toggle('is-locked', menuOpen || cartOpen || Boolean(selectedProduct))
    return () => document.body.classList.remove('is-locked')
  }, [menuOpen, cartOpen, selectedProduct])
  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 2200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const selectCategory = (id: CategoryId) => {
    setActiveCategory(id)
    setQuery('')
    setMenuOpen(false)
    window.setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30)
  }

  const addToCart = (product: Product, quantity = 1) => {
    setCart((lines) => {
      const current = lines.find((line) => line.productId === product.id)
      return current
        ? lines.map((line) => line.productId === product.id ? { ...line, quantity: line.quantity + quantity } : line)
        : [...lines, { productId: product.id, quantity }]
    })
    setToast(`${product.name}을 장바구니에 담았습니다.`)
  }

  const shareOrder = async () => {
    const lines = cart.flatMap((line) => {
      const product = products.find((item) => item.id === line.productId)
      return product ? [`${product.code} ${product.name} × ${line.quantity} — ₩ ${(product.price * line.quantity).toLocaleString('ko-KR')}`] : []
    })
    const total = cart.reduce((sum, line) => {
      const product = products.find((item) => item.id === line.productId)
      return sum + (product?.price ?? 0) * line.quantity
    }, 0)
    const text = `SARI 주문 요청\n\n${lines.join('\n')}\n\n합계 ₩ ${total.toLocaleString('ko-KR')}\n※ 배송비와 제작 일정은 별도 확인`
    try {
      if (navigator.share) {
        await navigator.share({ title: 'SARI 주문 요청', text })
        setToast('주문 목록을 공유했습니다.')
      } else {
        await navigator.clipboard.writeText(text)
        setToast('주문 목록을 복사했습니다.')
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') setToast('공유하지 못했습니다. 다시 시도해 주세요.')
    }
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <button className="icon-button" type="button" onClick={() => setMenuOpen(true)} aria-label="메뉴 열기"><Menu size={21} strokeWidth={1.4} /></button>
          <button className="brand" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="SARI 홈">SARI</button>
          <div className="site-header__actions">
            <button className="icon-button" type="button" onClick={() => setSearchOpen((value) => !value)} aria-label="검색"><Search size={20} strokeWidth={1.4} /></button>
            <button className="icon-button bag-button" type="button" onClick={() => setCartOpen(true)} aria-label={`장바구니 ${cartCount}개`}>
              <ShoppingBag size={20} strokeWidth={1.4} />
              {cartCount > 0 && <span>{cartCount}</span>}
            </button>
          </div>
        </div>
        <div className={`search-bar ${searchOpen ? 'is-open' : ''}`}>
          <Search size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="상품명이나 번호로 검색" aria-label="상품 검색" />
          <button type="button" onClick={() => { setQuery(''); setSearchOpen(false) }} aria-label="검색 닫기"><X size={18} /></button>
        </div>
      </header>

      <main>
        <section className="hero" aria-label="사리공방 소개">
          <img src="assets/hero.png" alt="사리공방 전시 공간과 공예품" />
          <div className="hero__shade" />
          <div className="hero__copy">
            <span>HANDCRAFTED IN SEOUL</span>
            <h1>마음을 꿰어<br />곁에 두는 단주</h1>
            <button type="button" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>컬렉션 보기</button>
          </div>
        </section>

        <nav className="category-nav" aria-label="상품 종류">
          <div className="category-nav__inner">
            {categories.map((item) => (
              <button key={item.id} type="button" className={activeCategory === item.id ? 'is-active' : ''} onClick={() => selectCategory(item.id)}>{item.name}</button>
            ))}
          </div>
        </nav>

        <section className="catalog" id="catalog">
          <header className="catalog-header">
            <div>
              <span className="eyebrow">SARI COLLECTION</span>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
            </div>
            <label className="sort-control">
              <SlidersHorizontal size={15} />
              <select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)} aria-label="상품 정렬">
                <option value="default">기본 순서</option>
                <option value="name">이름순</option>
                <option value="price-low">낮은 가격순</option>
                <option value="price-high">높은 가격순</option>
              </select>
            </label>
          </header>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  favorite={favorites.includes(product.id)}
                  onOpen={setSelectedProduct}
                  onFavorite={(id) => setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])}
                  onAdd={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>{query ? 'NO RESULTS' : 'COMING SOON'}</span>
              <h3>{query ? '찾으시는 상품이 없습니다.' : `${category.name} 상품을 준비하고 있습니다.`}</h3>
              <p>{query ? '다른 상품명이나 번호로 검색해 보세요.' : '새로운 상품이 등록되면 이곳에서 바로 만나볼 수 있어요.'}</p>
              {query && <button className="text-button" type="button" onClick={() => setQuery('')}>검색어 지우기</button>}
            </div>
          )}
        </section>

        <section className="story-strip">
          <div><span>01</span><h3>하나씩 고르고</h3><p>색과 결이 다른 재료를 살핍니다.</p></div>
          <div><span>02</span><h3>손으로 엮고</h3><p>작은 차이까지 손끝으로 조율합니다.</p></div>
          <div><span>03</span><h3>오래 곁에 두고</h3><p>일상 속에서 자주 만나는 물건을 만듭니다.</p></div>
        </section>
      </main>

      <footer className="site-footer">
        <div><strong>SARI</strong><p>사리공방의 단주와 염주 컬렉션</p></div>
        <div><span>SHOP</span>{categories.map((item) => <button key={item.id} onClick={() => selectCategory(item.id)}>{item.shortName}</button>)}</div>
        <div><span>ORDER</span><p>장바구니에서 주문 목록을 공유해 문의할 수 있습니다.</p></div>
        <small>© {new Date().getFullYear()} SARI WORKSHOP</small>
      </footer>

      <div className={`menu-layer ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <button className="menu-layer__scrim" type="button" onClick={() => setMenuOpen(false)} aria-label="메뉴 닫기" />
        <aside className="menu-drawer" aria-label="전체 메뉴">
          <header><span className="brand">SARI</span><button className="icon-button" type="button" onClick={() => setMenuOpen(false)} aria-label="메뉴 닫기"><X size={21} /></button></header>
          <nav>{categories.map((item, index) => <button key={item.id} onClick={() => selectCategory(item.id)} className={activeCategory === item.id ? 'is-active' : ''}><span>0{index + 1}</span>{item.name}</button>)}</nav>
          <p>손으로 엮은 작은 물건이 일상 속에서 오래 곁에 머물기를 바랍니다.</p>
        </aside>
      </div>

      <ProductSheet product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addToCart} />
      <CartDrawer
        open={cartOpen}
        lines={cart}
        products={products}
        onClose={() => setCartOpen(false)}
        onQuantity={(productId, quantity) => setCart((lines) => lines.map((line) => line.productId === productId ? { ...line, quantity } : line))}
        onRemove={(productId) => setCart((lines) => lines.filter((line) => line.productId !== productId))}
        onShare={shareOrder}
      />
      {cartCount > 0 && <button className="mobile-cart" type="button" onClick={() => setCartOpen(true)}><ShoppingBag size={17} /><span>장바구니 {cartCount}</span><strong>보기</strong></button>}
      <div className={`toast ${toast ? 'is-visible' : ''}`} role="status">{toast}</div>
    </div>
  )
}
