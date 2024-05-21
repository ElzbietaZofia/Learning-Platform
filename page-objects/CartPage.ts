import { expect, Page } from '@playwright/test'
import { MainMenuComponent } from '../components/navigation.components'
import { ProductsMenuComponent } from '../components/navigation.components'

export class CartPage {

   constructor(private page: Page) { }

   mainMenuComponent = new MainMenuComponent(this.page)
   productsMenuComponent = new ProductsMenuComponent(this.page)

   backButton = this.page.getByTestId('back_bottom')
   backTextButton = this.page.getByTestId('back_top').getByText('Back')
   addToCartIconCourse1 = this.page.locator('[data-test-id="course-112"]').getByRole('button')
   addToCartIconCourse2 = this.page.locator('[data-test-id="course-66"]').getByRole('button')
   removeBinIcon = this.page.getByTestId('remove_button')
   removeBinIcon1 = this.page.getByTestId('remove_button').first()
   removeBinIcon2 = this.page.getByTestId('remove_button').nth(1)
   quantityInput = this.page.locator('#input-192')

   totalPriceCart = this.page.getByTestId('total_price')

   checkoutButton = this.page.getByTestId('checkout_bottom')
   purchaseLoginModal = this.page.getByText('To purchase payment')
   purchaseLoginModalLoginButton = this.page.locator('div').filter({ hasText: 'Log in Or register' }).getByRole('button', { name: 'Log in' })
   purchaseToastSuccess = this.page.getByText('Congratulations! Your purchase was successful.')

   signInModalEmailInput = this.page.getByLabel('Email Address')
   signInModalPasswordInput = this.page.getByLabel('Password')
   signInModalSignInButton = this.page.getByRole('button', { name: 'Sign in' })

   courseMelaphyreHyperlink = this.page.getByRole('link', { name: 'Melaphyre' })
   courseMelaphyreInstructors = this.page.getByText('Instructor(s): Volcanic Rock')
   courseJumboJetAddToCart = this.page.locator('div').filter({ hasText: '$15Course price Add to cart' }).getByRole('button', { name: 'Add to cart' })

   toastSuccesfulPurchase = this.page.getByText('Congratulations! Your purchase was successful.')

  


   async goToCart() {
      await this.mainMenuComponent.cartTab.click()
   }

   async addItemsToCart() {
      await this.productsMenuComponent.elearningCoursesTab.click()
      await this.page.waitForTimeout(3000)
      await this.addToCartIconCourse1.click()
      await this.backButton.click()
      await this.page.waitForTimeout(3000)
      await this.addToCartIconCourse2.click()
   }

   async goToPDPFromCart() {
      await this.courseMelaphyreHyperlink.click()
   }

   async assertRedirectionToPDPFromCart() {
      await expect(this.courseMelaphyreInstructors).toBeVisible()    
   }

   async goToCheckout() {
      await this.checkoutButton.click()
   }

   async assertCheckoutUserLoggedOut() {
      await expect(this.purchaseLoginModal).toBeVisible()
   }

   async assertCheckoutUserLoggedIn() {
      await expect(this.purchaseToastSuccess).toBeVisible()
   }

   async loginWithPurchaseModal(username: string, password: string) {
      await this.purchaseLoginModalLoginButton.click()
      await this.signInModalEmailInput.fill(username)
      await this.signInModalPasswordInput.fill(password)
      await this.signInModalSignInButton.click()
   }

   async assertLoginAfterPurchase() {
      await expect(this.mainMenuComponent.userTab).toContainText('user@peogi.com')
   }

   async assertCartTotalPrice(totalPrice: string) {
      await expect(this.totalPriceCart).toContainText(totalPrice)
   }

   async removeItemFromCart() {
      await this.removeBinIcon1.click()
   }

   async assertRemovingFormCart(totalPrice: string) {
      await expect(this.totalPriceCart).toContainText(totalPrice)
   }

   async removeAllItemsFromCart() {
      await this.removeBinIcon2.click()
      await this.removeBinIcon.click()
   }

   async assertEmptyCart(emptyPrice: string) {
      await expect(this.totalPriceCart).toContainText(emptyPrice)
   }

   async addToCartFromPDPJumboJet() {
      await this.page.goto('/course/66')
      await this.courseJumboJetAddToCart.click()
  }

  async changeItemsQuantity(quantity: string) {
   await this.quantityInput.fill(quantity)
  }



} 