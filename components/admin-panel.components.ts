import { Page } from "@playwright/test";


export class AdminPanelComponent {
    constructor(private page: Page) { }

    masterDashboardHeading = this.page.getByRole('heading', { name: 'Master dashboard' })
    dashboardIcon = this.page.locator('div:nth-child(3) > div > .v-list-item__prepend').first()
    dashboardLabel = this.page.locator('div').filter({ hasText: 'Dashboard' }).first()
    coursesIcon = this.page.getByTestId('elearning_courses-list_item').locator('i')
    coursesLabel = this.page.locator('div').filter({ hasText: 'eLearning Courses' }).first()
    modulesIcon = this.page.getByTestId('elearning_modules-list_item').locator('i')
    modulesLabel = this.page.locator('div').filter({ hasText: 'eLearning Modules' }).first()
    eBooksIcon = this.page.locator('.mdi-book-open-page-variant')
    eBooksLabel = this.page.getByTestId('quizzes-list_item').nth(1)
    returnHomeIcon = this.page.locator('.v-navigation-drawer__append > .v-list > div > .v-list-item__prepend').first()
    ordersIcon = this.page.getByTestId('orders-list_item').locator('i')
    coursesCategoriesIcon = this.page.getByTestId('elearning_categories-list_item').locator('i')
    modulesCategoriesIcon = this.page.getByTestId('module_categories-list_item').locator('i')
    tagsIcon = this.page.getByTestId('tags-list_item').locator('i')
    usersIcon = this.page.getByTestId('users-list_item').locator('i')

    returnHomeLabel = this.page.getByTestId('home-list_item').locator('i')
    logoutIcon = this.page.getByTestId('logout-list_item').locator('i')
    logoutLabel = this.page.locator('div').filter({ hasText: 'Logout' }).first()

}