class Header {
  selectors = {
    root: '[data-js-header]',
    overlay: '[data-js-header-overlay]',
    burgerButton: '[data-js-header-burger-button]',
  }
  stateclasses = {
    isActive: 'active',
    isLock: 'is-lock',
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    this.overlayElement = this.rootElement.querySelector(this.selectors.overlay)
    this.burgerButtonElement = this.rootElement.querySelector(
      this.selectors.burgerButton,
    )
    this.bindEvents()
  }

  onBurgerButtonClick = () => {
    this.burgerButtonElement.classList.toggle(this.stateclasses.isActive)
    this.overlayElement.classList.toggle(this.stateclasses.isActive)
    document.documentElement.classList.toggle(this.stateclasses.isLock)
  }
  bindEvents() {
    this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick)
  }
}

export default Header