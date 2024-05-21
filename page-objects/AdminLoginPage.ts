import { expect, Page } from '@playwright/test'

export class AdminLoginPage {
constructor(private page: Page) {}

adminEmailInput = this.page.getByLabel('Email Address')
adminPasswordInput = this.page.getByLabel('Password')
adminLoginButton = this.page.getByRole('button', { name: 'Login' })
logoutIcon = this.page.locator('.v-navigation-drawer__append > .v-list > div:nth-child(2) > .v-list-item__prepend')
alertMsgInvalidCredentials = this.page.getByText('Invalid Email or Password')
adminPanelHeader = this.page.getByRole('heading', { name: 'Admin dashboard' })

async login(username: string, password: string): Promise<void> {
    await this.adminEmailInput.type(username)
    await this.adminEmailInput.press('Tab')
    await this.adminPasswordInput.type(password)
    await this.adminPasswordInput.press('Enter')
}

async logout() {
    await this.logoutIcon.click()
}

async assertSuccessfulLogout() {
    await expect(this.page).toHaveURL('/')
}

async assertSuccessfulLogin() {
await expect(this.adminPanelHeader).toBeVisible()
}

async assertIncorrectCredentials(alertMessageIncorrect: string) {
    await expect(this.alertMsgInvalidCredentials).toHaveText(alertMessageIncorrect)
}


}


