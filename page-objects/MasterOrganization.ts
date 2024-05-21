import { expect, Locator, Page } from '@playwright/test'
import { LoginPage } from './Login'
import { MainMenuComponent } from '../components/navigation.components'
import { BasePage } from './BasePage'

export class MasterOrganization {
	constructor(private page: Page) { }

	loginPage = new LoginPage(this.page)
	mainMenuComponent = new MainMenuComponent(this.page)
	basePage = new BasePage(this.page)


	organizationTab = this.page.getByRole('tab', { name: 'Organization' })
	addUserButton = this.page.getByRole('button', { name: 'Add user' })
	emailInputModal = this.page.getByLabel('Email Address*')
	firstNameInputModal = this.page.getByLabel('First name*')
	lastNameInputModal = this.page.getByLabel('Last name*')
	jobInputModal = this.page.getByLabel('Job Title*')
	addUserSubmitButton = this.page.locator('form').getByRole('button', { name: 'Add user' })
	courseLicenses = this.page.getByRole('tab', { name: 'Course Licenses' })

	alertMsgEmptyEmail = this.page.locator('.p-4 > div > .v-input__details').first()
	alertMsgEmptyFirstName = this.page.locator('div:nth-child(2) > .v-input__details')
	alertMsgEmptyLastName = this.page.locator('div:nth-child(3) > .v-input__details')
	alertMsgEmptyJobTitle = this.page.locator('div:nth-child(4) > .v-input__details')

	userExampleToolTip = this.page.getByTestId('user_tool_tip-2')
	masterExampleToolTip = this.page.getByTestId('master_tool_tip-3')
	userExamplePromoteToMaster = this.page.getByText('Promote to master')
	userExampleDemoteFromMaster = this.page.getByText('Demote from master')
	user1Delete = this.page.getByText('Delete', { exact: true })

	secondPage = this.page.getByRole('button', { name: 'Goto Page 2' })
	newUserEmailField = this.page.getByRole('cell', { name: 'user@xxx.com' })

	usersSearchBoxInput = this.page.locator('#input-25')
	searchResultExample = this.page.getByRole('cell', { name: 'user@xxx.com' })
	saerchResultContainer = this.page.locator('//*[@id="__nuxt"]/div/div[2]/div[2]/div[2]/div[3]/div/table/tbody')



	async goToMyOrganizationUsersList() {
		await this.loginPage.loggedUserButton.click()
		await this.loginPage.myTeamLabel.click()
	}

	async fillAddUserModal(
		email: string,
		firstName: string,
		lastName: string,
		job: string
	) {
		await this.addUserButton.click()
		await this.emailInputModal.fill(email)
		await this.firstNameInputModal.fill(firstName)
		await this.lastNameInputModal.fill(lastName)
		await this.jobInputModal.fill(job)
		await this.addUserSubmitButton.click()
	}

	async assertAddingUserToOrganization() {
		await this.page.waitForTimeout(5000)
		await this.secondPage.click()
		await expect(this.newUserEmailField).toContainText('valid@void.com')
	}

	async deletingUserFromOrganization() {
		await this.userExampleToolTip.click()
		await this.user1Delete.click()
	}

	async assertEmptyForm() {
		await expect(this.alertMsgEmptyEmail).toContainText('Value is required')
		await expect(this.alertMsgEmptyFirstName).toContainText('Value is required')
		await expect(this.alertMsgEmptyLastName).toContainText('Value is required')
		await expect(this.alertMsgEmptyJobTitle).toContainText('Value is required')
	}

	async assertEmptyEmail() {
		await expect(this.alertMsgEmptyEmail).toContainText('Value is required')
	}

	async assertEmptyFirstName() {
		await expect(this.alertMsgEmptyFirstName).toContainText('Value is required')
	}

	async assertEmptyLastName() {
		await expect(this.alertMsgEmptyLastName).toContainText('Value is required')
	}

	async assertEmptyJobTitle() {
		await expect(this.alertMsgEmptyJobTitle).toContainText('Value is required')
	}

	async promoteUserToMaster() {
		await this.userExampleToolTip.click()
		await this.userExamplePromoteToMaster.click()
	}

	async demoteUserFromMaster() {
		await this.masterExampleToolTip.click()
		await this.userExampleDemoteFromMaster.click()
	}

	async assertUserDemotion() {
		await this.userExampleToolTip.click()
		await expect(this.userExamplePromoteToMaster).toBeVisible()
	}

	//Search
	async fillSearchBoxInput(query: string) {
		await this.usersSearchBoxInput.type(query)
	}

	async assertPositiveSearchResult() {
		await expect(this.searchResultExample).toBeVisible()
	}

	async assertNegativeSearchResult() {
		await expect(this.saerchResultContainer).toBeEmpty()
	}


}
