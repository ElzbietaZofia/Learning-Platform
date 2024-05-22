import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/Login';
import { masterUserLoginData, userToBeDeleted } from '../../test-data/login.data';
import { getRandomLastName, getRandomEmail, getRandomFirstName, getRandomJob} from '../../utils/data-helpers';
import { BasePage } from '../../page-objects/BasePage';
import { MasterOrganization } from '../../page-objects/MasterOrganization';


test.describe("Managing Users", () => {
	let loginPage: LoginPage
	let basePage: BasePage
	let masterOrganization: MasterOrganization

	const randomEmail = getRandomEmail()
	const randomFirstName = getRandomFirstName()
	const randomLastName = getRandomLastName()
	const randomJob = getRandomJob()

	test.beforeEach(async ({ page }) => {
    	loginPage = new LoginPage(page)
    	basePage = new BasePage(page)
    	masterOrganization = new MasterOrganization(page)

    	await basePage.visit()
    	await loginPage.login(masterUserLoginData.masterEmailValid, masterUserLoginData.masterPasswordValid)
   	 
	})


	test('Positive adding user to Organization @smoke', async ({ page }) => {
    	await masterOrganization.goToMyOrganizationUsersList()
		await masterOrganization.fillAddUserModal(userToBeDeleted.userEmailInvalid, randomFirstName, randomLastName, randomJob)
		await masterOrganization.assertAddingUserToOrganization()
	})


	test('Negative adding user to Organization - Empty form', async ({ page }) => {

    	await masterOrganization.goToMyOrganizationUsersList()
    	await masterOrganization.fillAddUserModal('', '', '', '')
    	await masterOrganization.assertEmptyForm()
	})

	test('Negative adding user to Organization - Empty Email', async ({ page }) => {

    	await masterOrganization.goToMyOrganizationUsersList()
    	await masterOrganization.fillAddUserModal('', randomFirstName, randomLastName, randomJob)
    	await masterOrganization.assertEmptyEmail()
	})

	test('Negative adding user to Organization - Empty First Name', async ({ page }) => {

    	await masterOrganization.goToMyOrganizationUsersList()
    	await masterOrganization.fillAddUserModal(randomEmail, '', randomLastName, randomJob)
    	await masterOrganization.assertEmptyFirstName()
	})

	test('Negative adding user to Organization - Empty Last Name', async ({ page }) => {

    	await masterOrganization.goToMyOrganizationUsersList()
    	await masterOrganization.fillAddUserModal(randomEmail, randomFirstName, '', randomJob)
    	await masterOrganization.assertEmptyLastName()
	})

	test('Promote and Demote User to Master @smoke', async ({page}) => {

    	await masterOrganization.goToMyOrganizationUsersList()
    	await masterOrganization.promoteUserToMaster()
    	await masterOrganization.demoteUserFromMaster()
    	await masterOrganization.assertUserDemotion()
	})

})

test.describe("Organization Users Search Box Tests", () => {
	let loginPage: LoginPage
	let basePage: BasePage
	let masterOrganization: MasterOrganization

	const searchQueries = [
		{ query: 'example', shouldFind: true},
		{ query: 'eXamplE', shouldFind: true},
		{ query: 'Exmaple Sample', shouldFind: true},
		{ query: 'invalidText', shouldFind: false}
	]

	test.beforeEach(async ({ page }) => {
    	loginPage = new LoginPage(page)
    	basePage = new BasePage(page)
    	masterOrganization = new MasterOrganization(page)

    	await basePage.visit()
    	await loginPage.login(masterUserLoginData.masterEmailValid, masterUserLoginData.masterPasswordValid)
    	await masterOrganization.goToMyOrganizationUsersList()
	})

	async function searchAndAssert(query: string, shouldFind: boolean) {
        await masterOrganization.fillSearchBoxInput(query)
        if (shouldFind) {
            await masterOrganization.assertPositiveSearchResult()
        } else {
            await masterOrganization.assertNegativeSearchResult()
        }
    }

    searchQueries.forEach(({ query, shouldFind }) => {
        test(`Search Results for query: ${query}`, async ({ page }) => {
            await searchAndAssert(query, shouldFind)
        })
    })

})