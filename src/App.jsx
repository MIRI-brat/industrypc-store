import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/products.json')

        if (!response.ok) {
          throw new Error('Не удалось загрузить товары')
        }

        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error)
        setLoadError(true)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

const addToCart = (product) => {
  const existingProduct = cart.find(
    (item) => item.id === product.id
  )

  if (existingProduct) {
    setCart(
      cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  } else {
    setCart([...cart, { ...product, quantity: 1 }])
  }
}

const removeFromCart = (id) => {
  setCart(
    cart.filter((item) => item.id !== id)
  )
}

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  })

  const [formSent, setFormSent] = useState(false)

  const handleFormSubmit = (event) => {
    event.preventDefault()

    if (!formData.name.trim() || !formData.phone.trim()) {
      return
    }

    setFormSent(true)

    setFormData({
      name: '',
      phone: '',
    })
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container header__inner">
          <a className="logo" href="#">
            INDUSTRY<span>PC</span>
          </a>

          <nav className="nav">
            <a href="#catalog">Каталог</a>
            <a href="#advantages">Преимущества</a>
            <a href="#about">О компании</a>
            <a href="#contacts">Контакты</a>
          </nav>

          <button
            type="button"
            className="cart-button"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            Корзина <span>{cart.length}</span>
          </button>
        </div>
      </header>

      <main>
        {isCartOpen && (
          <div className="cart-panel">
            <div className="container">
              <div className="cart-panel__header">
                <h2>Корзина</h2>

                <button
                  type="button"
                  className="cart-close"
                  onClick={() => setIsCartOpen(false)}
                >
                  ×
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="cart-empty">
                  В корзине пока нет товаров.
                </p>
              ) : (
                <>
                  <div className="cart-items">
{cart.map((product) => (
  <div
    className="cart-item"
    key={product.id}
  >
    <div>
      <strong>{product.name}</strong>

      <p>
        {product.price.toLocaleString('ru-RU')} ₽ ×{' '}
        {product.quantity}
      </p>

      <strong>
        {(product.price * product.quantity).toLocaleString('ru-RU')} ₽
      </strong>
    </div>

    <button
      type="button"
      className="cart-remove"
      onClick={() => removeFromCart(product.id)}
    >
      Удалить
    </button>
  </div>
))}
                  </div>

                  <div className="cart-total">
                    <strong>
                      Итого:{' '}
{cart
  .reduce(
    (sum, product) =>
      sum + product.price * product.quantity,
    0
  )
  .toLocaleString('ru-RU')}
                      ₽
                    </strong>
                  </div>
                  <a
  href="#contacts"
  className="cart-order-button"
  onClick={() => setIsCartOpen(false)}
>
  Оформить заявку
</a>
                </>
              )}
            </div>
          </div>
        )}

        <section className="hero">
          <div className="container hero__inner">
            <div className="hero__content">
              <p className="hero__label">
                ПРОМЫШЛЕННЫЕ КОМПЬЮТЕРЫ
              </p>

              <h1>
                Надёжные компьютеры
                <br />
                для промышленности
              </h1>

              <p className="hero__text">
                Промышленные ПК для автоматизации, производства,
                транспортных систем и работы в сложных условиях.
              </p>

              <div className="hero__buttons">
                <a
                  href="#catalog"
                  className="button button--primary"
                >
                  Смотреть каталог
                </a>

                <a
                  href="#contacts"
                  className="button button--secondary"
                >
                  Оставить заявку
                </a>
              </div>
            </div>

            <div className="hero__visual">
              <div className="computer-card">
                <div className="computer-screen">
                  INDUSTRY
                  <br />
                  COMPUTER
                </div>

                <div className="computer-body">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="catalog" id="catalog">
          <div className="container">
            <p className="section-label">КАТАЛОГ</p>

            <h2>Промышленные компьютеры</h2>

            <div className="products">
              {isLoading ? (
  <p>Загрузка товаров...</p>
) : loadError ? (
  <p>Не удалось загрузить каталог. Попробуйте обновить страницу.</p>
) : products.length === 0 ? (
  <p>Товары пока отсутствуют.</p>
) : (
  products.map((product) => (
                  <article
                    className="product-card"
                    key={product.id}
                  >
                    <div className="product-card__image">
  <img
    src={product.image}
    alt={product.name}
  />
</div>

                    <h3>{product.name}</h3>

                    <p>{product.description}</p>

                    <div className="product-card__bottom">
                      <strong>
                        от{' '}
                        {product.price.toLocaleString('ru-RU')} ₽
                      </strong>

                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                      >
                        В корзину
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="advantages" id="advantages">
          <div className="container">
            <p className="section-label">ПОЧЕМУ МЫ</p>

            <h2>Преимущества</h2>

            <div className="advantages__grid">
              <div>
                <span>01</span>
                <h3>Надёжность</h3>
                <p>
                  Оборудование рассчитано на длительную эксплуатацию.
                </p>
              </div>

              <div>
                <span>02</span>
                <h3>Производительность</h3>
                <p>
                  Конфигурации для различных промышленных задач.
                </p>
              </div>

              <div>
                <span>03</span>
                <h3>Поддержка</h3>
                <p>
                  Помогаем подобрать подходящее оборудование.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact" id="contacts">
          <div className="container contact__inner">
            <div>
              <p className="section-label">
                СВЯЗАТЬСЯ С НАМИ
              </p>

              <h2>Получить консультацию</h2>

              <p>
                Оставьте заявку, и специалист свяжется с вами
                для уточнения требований к оборудованию.
              </p>
            </div>

            <form
              className="contact-form"
              onSubmit={handleFormSubmit}
            >
              <input
  type="text"
  placeholder="Ваше имя"
  value={formData.name}
  maxLength={50}
  required
  onChange={(event) =>
    setFormData({
      ...formData,
      name: event.target.value,
    })
  }
/>

              <input
  type="tel"
  placeholder="Телефон"
  value={formData.phone}
  maxLength={20}
  required
  onChange={(event) =>
    setFormData({
      ...formData,
      phone: event.target.value,
    })
  }
/>

              <button type="submit">
                Оставить заявку
              </button>

              {formSent && (
                <p className="form-success">
                  Заявка отправлена. Мы свяжемся с вами.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer" id="about">
        <div className="container">
          <strong>INDUSTRYPC</strong>
          <p>Промышленные компьютеры и оборудование</p>
        </div>
      </footer>
    </div>
  )
}

export default App