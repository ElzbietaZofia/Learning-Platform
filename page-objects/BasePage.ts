import { Page } from '@playwright/test'
import { LoginPage } from './Login'
import { MainMenuComponent } from '../components/navigation.components'

export class BasePage {
    constructor(private page: Page) { }

    loginPage = new LoginPage(this.page)
    mainMenuComponent = new MainMenuComponent(this.page)

    loginButton = this.page.getByRole('button', { name: 'Log in' })

    async visit() {
        await this.page.goto('/')
    }

    async visitCartPage() {
        await this.page.goto('/cart')
    }

    async loginModal() {
        await this.loginButton.click()
    }

    async visitAdminPanelLogin() {
        await this.page.goto('/admin/login')
    }

    async visitOrganizationPage() {
        await this.page.goto('/user/organization')
    }

    

    }




