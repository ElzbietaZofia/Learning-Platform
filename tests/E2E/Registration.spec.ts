import { test } from '@playwright/test';
import { LoginPage } from '../../page-objects/Login';
import { userLoginData } from '../../test-data/login.data';
import { BasePage } from '../../page-objects/BasePage';
import { RegistrationUser } from '../../page-objects/Registration';
import { getRandomEmail, getRandomFirstName, getRandomLastName } from '../../utils/data-helpers';

test.describe("Account Creation", () => {
    let loginPage: LoginPage
    let basePage: BasePage
    let registrationUser: RegistrationUser

    const validPassword = '12345678'
    const invalidPassword = '87654321'
    const randomEmail = getRandomEmail()
    const randomFirstName = getRandomFirstName()
    const randomLastName = getRandomLastName()
    const state = 'New York'
    const city = 'New York'
    const zip = '14356'
    const address1 = '1339 Prospect Ave'


    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        basePage = new BasePage(page)
        registrationUser = new RegistrationUser(page)

        await basePage.visit()
        await registrationUser.visitAccountCreation()
    })

    test('Positive Account Creation User @smoke', async ({ page }) => {
        await registrationUser.fillLoginInfo(randomEmail, validPassword, validPassword)
        await registrationUser.fillPersonalInfoRegularUser(randomFirstName, randomLastName)
        await registrationUser.assertSuccessfulAccountCreation()
    })

    test('Positive Account Creation User - all inputs are filled', async ({ page }) => {
        await registrationUser.fillLoginInfo(randomEmail, validPassword, validPassword)
        await registrationUser.fillPersonalInfoRegularUser(randomFirstName, randomLastName)
        await registrationUser.fillAdditionalInfo(state, city, zip, address1)
        await registrationUser.assertSuccessfulAccountCreation()
    })

    test('Negative Account Creation - Empty Form Login Info', async ({ page }) => {
        await registrationUser.fillLoginInfo('', '', '')
        await registrationUser.assertEmptyFormAccountCreation()
    })

    test('Negative Account Creation - Empty Form Personal Info', async ({ page }) => {
        await registrationUser.fillLoginInfo(randomEmail, validPassword, validPassword)
        await registrationUser.fillPersonalInfoRegularUser('', '')
        await registrationUser.assertEmptyFormPersonalAccountCreation()
    })

    test('Negative Account Creation - Incorrect password repetition', async ({page}) => {
        await registrationUser.fillLoginInfo(randomEmail, validPassword, invalidPassword)
        await registrationUser.assertWrongPasswordRepeatAccountCreation()
    })

    test('Negative Account Creation - Using already registered email', async ({page}) => {
        await registrationUser.fillLoginInfo(userLoginData.userEmailValid, validPassword, validPassword)
        await registrationUser.fillPersonalInfoRegularUser(randomFirstName, randomLastName)
        await registrationUser.assertRegiesteredEmailAccountCreatiom()
    })


})
