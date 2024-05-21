import { test } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { userLoginData } from '../../test-data/login.data';
import { LoginPage } from '../../page-objects/Login';
import { BasePage } from '../../page-objects/BasePage';


test.describe("Main Menu functionality", () => {
	let homePage: HomePage
    let loginPage: LoginPage
	let basePage: BasePage

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page)
		homePage = new HomePage(page)
		basePage = new BasePage(page)

		await basePage.visit()
	})

	test('Main Menu with Logged In User', async ({ page }) => {

		await loginPage.login(userLoginData.userEmailValid, userLoginData.userPasswordValid)
        
	})



})