
import { test } from '@playwright/test';
import { LoginPage } from '../../page-objects/Login';
import { userLoginData } from '../../test-data/login.data';
import { BasePage } from '../../page-objects/BasePage';

test.describe("Login and Logout flow", () => {
	let loginPage: LoginPage
	let basePage: BasePage

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page)
		basePage = new BasePage(page)

		await basePage.visit()
	})

	test('Positive Login with correct credentials and logout', async ({ page }) => {

		await loginPage.login(userLoginData.userEmailValid, userLoginData.userPasswordValid)
		await loginPage.assertSuccessfulLogin()
		await loginPage.logout()
		await loginPage.assertSuccessfullLogout()
	})

	test('Negative Login with incorrect email & correct password', async ({ page }) => {

		await loginPage.login(userLoginData.userEmailInvalid, userLoginData.userPasswordValid)
		await loginPage.assertIncorrectCredentials(userLoginData.alertTextIncorrectCredentials)
	})

	test('Negative Login with correct email & incorrect password', async ({ page }) => {

		await loginPage.login(userLoginData.userEmailValid, userLoginData.userPasswordInvalid)
		await loginPage.assertIncorrectCredentials(userLoginData.alertTextIncorrectCredentials)
	})

	test('Negative Login with too short password', async ({ page }) => {

		await loginPage.login(userLoginData.userEmailValid, userLoginData.passwordTooShort)
		await loginPage.assertTooShortPassword(userLoginData.alertTextTooShort)
	})

	test('Negative Login with blank fields', async ({ page }) => {

		await loginPage.login("","")
		await loginPage.assertEmptyEmailAndPassword(userLoginData.alertTextEmptyEmail)
	})
})