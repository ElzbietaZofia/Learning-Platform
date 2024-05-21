import { expect, Page } from '@playwright/test'

export class LoginPage {
    constructor(private page: Page) { }

    loginButton = this.page.getByRole('button', { name: 'Log in' })
    emailInput = this.page.getByLabel('Email Address')
    passwordInput = this.page.getByLabel('Password')
    signInButton = this.page.getByRole('button', { name: 'Sign in' })
    loggedUserButton = this.page.getByTestId('nav_user_menu_activator')
    myProfileLabel = this.page.getByTestId('nav_user_menu_list').getByText('Profile')
    myTeamLabel = this.page.getByTestId('nav_team_menu')
    
    logoutDropdownLabel = this.page.getByText('Logout')
    alertMsgIncorrectCredentials = this.page.getByText('Invalid Email or Password')
    alertMsgTooShort = this.page.getByText('This field should be at least 8 characters long')
    alertMsgEmptyEmail = this.page.getByText('Email field can\'t be empty')
    alertMsgEmptyPassword = this.page.getByText('Password field can\'t be empty')

    async login(email: string, password: string): Promise<void> {
        await this.loginButton.click()
        await this.emailInput.type(email)
        await this.passwordInput.type(password)
        await this.signInButton.click()
    }

    async logout() {
        await this.loggedUserButton.click()
        await this.logoutDropdownLabel.click()
    }

    async assertSuccessfulLogin() {
        await expect(this.loggedUserButton).toBeVisible()
    }

    async assertSuccessfullLogout() {
        await expect(this.loginButton).toBeVisible()
    }

    async assertIncorrectCredentials(alertMessageIncorrect: string) {
        await expect(this.alertMsgIncorrectCredentials).toHaveText(alertMessageIncorrect)
    }

    async assertTooShortPassword(alertMessageTooShortPass: string) {
        await expect(this.alertMsgTooShort).toHaveText(alertMessageTooShortPass)
    }

    async assertEmptyEmailAndPassword(alertMessageEmptyEmail: string) {
        await expect(this.alertMsgEmptyEmail).toHaveText(alertMessageEmptyEmail)
    }



}
