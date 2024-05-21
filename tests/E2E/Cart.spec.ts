import { test } from '@playwright/test';
import { CartPage } from '../../page-objects/CartPage';
import { BasePage } from '../../page-objects/BasePage';
import { userLoginData } from '../../test-data/login.data';
import { LoginPage } from '../../page-objects/Login';


test.describe("Testing the cart page", () => {
    let cartPage: CartPage
    let basePage: BasePage
    let loginPage: LoginPage

    const price1 = '$ 215'
    const priceAfterRemoving = '$ 15'
    const emptyPrice = '$ 0'
    const pricePDP = '$ 15'
    const changedQuantityPrice = '$ 415'

    test.beforeEach(async ({ page }) => {
        cartPage = new CartPage(page)
        basePage = new BasePage(page)
        loginPage = new LoginPage(page)

        await basePage.visitCartPage()
    })


    test('Adding items do the Cart from Learning tab - User is logged out', async ({ page }) => {

        await cartPage.addItemsToCart()
        await cartPage.assertCartTotalPrice(price1)
    })

    test('Adding items do the Cart and Purchasing - User is logged out', async ({ page }) => {
        await cartPage.addItemsToCart()
        await cartPage.goToCheckout()
        await cartPage.assertCheckoutUserLoggedOut()
        await cartPage.loginWithPurchaseModal(userLoginData.userEmailValid, userLoginData.userPasswordValid)
        await cartPage.assertLoginAfterPurchase()
    })

    test('Adding items to the cart and Purchasing - User is logged in', async ({page}) => {
        await loginPage.login(userLoginData.userEmailValid, userLoginData.userPasswordValid)
        await cartPage.addItemsToCart()
        await cartPage.goToCheckout()
        await cartPage.assertCheckoutUserLoggedIn()
    })

    test('Adding Courses do the Cart from eLearning tab - User is logged in', async ({ page }) => {

        await loginPage.login(userLoginData.userEmailValid, userLoginData.userPasswordValid)
        await cartPage.addItemsToCart()
        await cartPage.assertCartTotalPrice(price1)
    })

    test('Removing item from the Cart', async ({ page }) => {

        await cartPage.addItemsToCart()
        await cartPage.removeItemFromCart()
        await cartPage.assertRemovingFormCart(priceAfterRemoving)
    })

    test('Removing all items from the Cart', async ({ page }) => {

        await cartPage.addItemsToCart()
        await cartPage.removeAllItemsFromCart()
        await cartPage.assertEmptyCart(emptyPrice)
    })

    test('Go to PDP from the Cart', async ({ page }) => {
        await cartPage.addItemsToCart()
        await cartPage.goToPDPFromCart()
        await cartPage.assertRedirectionToPDPFromCart()
    })

    test('Adding items do the Cart from PDP', async ({page}) => {
        await cartPage.addToCartFromPDPJumboJet()
        await cartPage.assertCartTotalPrice(pricePDP)
    })

    test('Changing the quantity of items in the shopping basket', async ({page}) => {

        await cartPage.addItemsToCart()
        await cartPage.changeItemsQuantity('2')
        await cartPage.assertCartTotalPrice(changedQuantityPrice)
    })



})

