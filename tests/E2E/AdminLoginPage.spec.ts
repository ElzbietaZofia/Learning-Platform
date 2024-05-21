
import { test } from '@playwright/test';
import { AdminLoginPage } from '../../page-objects/AdminLoginPage';
import { adminLoginData } from '../../test-data/login.data';
import { BasePage } from '../../page-objects/BasePage';


test.describe("Admin Login and Logout flow", () => {
    let adminLoginPage: AdminLoginPage
    let basePage: BasePage

    test.beforeEach(async ({ page }) => {
        adminLoginPage = new AdminLoginPage(page)
        basePage = new BasePage(page)


        await basePage.visitAdminPanelLogin()
    })

    test('Positive Admin Login with correct credentials and logout', async ({ page }) => {

        await adminLoginPage.login(adminLoginData.adminEmailValid, adminLoginData.passwordValid)
        await adminLoginPage.assertSuccessfulLogin()
        await adminLoginPage.logout()
        await adminLoginPage.assertSuccessfulLogout()
    })

    test('Negative Login with incorrect email & correct password', async ({ page }) => {

        await adminLoginPage.login(adminLoginData.adminEmailInvalid, adminLoginData.passwordValid)
        await adminLoginPage.assertIncorrectCredentials(adminLoginData.alertTextIncorrectCredentials)
    })


    test('Negative Login with correct email & incorrect password', async ({ page }) => {

        await adminLoginPage.login(adminLoginData.adminEmailValid, adminLoginData.passwordInvalid)
        await adminLoginPage.assertIncorrectCredentials(adminLoginData.alertTextIncorrectCredentials)
    })

    test('Negative Login with too short password', async ({ page }) => {
        await adminLoginPage.login(adminLoginData.adminEmailValid, adminLoginData.passwordTooShort)
        await adminLoginPage.assertIncorrectCredentials(adminLoginData.alertTextIncorrectCredentials)

    })
})