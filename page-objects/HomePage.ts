import { expect, Locator, Page } from '@playwright/test'
import { LoginPage } from './Login'
import { MainMenuComponent } from '../components/navigation.components'

export class HomePage {
    constructor(private page: Page) { }

    loginPage = new LoginPage(this.page)
    mainMenuComponent = new MainMenuComponent(this.page)



    async loggedInUserTab() {
        await this.mainMenuComponent.userTab.click()
        await this.mainMenuComponent.userProfileLabel.click()
    }

    async assertUserTab() {
        await expect(this.page).toHaveURL('/profile')
    }

    async myCoursesTab() {
        await this.mainMenuComponent.myCoursesTab.click()
    }

    async assertmyCoursesTab() {
        await expect(this.page).toHaveURL('/user/courses')
    }

    async cartTab() {
        await this.mainMenuComponent.cartTab.click()
    }

    async assertCartTab() {
        await expect(this.page).toHaveURL('/cart')
    }

    
}
