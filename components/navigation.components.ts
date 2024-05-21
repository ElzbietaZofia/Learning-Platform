import { Page } from "@playwright/test";


export class MainMenuComponent {
    constructor(private page: Page) { }

  cartTab = this.page.getByTestId('nav_cart_button')
  contactTab = this.page.getByTestId('contact_us_button')
  loginTab = this.page.getByRole('button', { name: 'Log in' })
  userTab = this.page.getByTestId('nav_user_menu_activator')
  myCoursesTab = this.page.getByTestId('nav_my_courses_button')
  userProfileLabel = this.page.getByTestId('nav_user_menu_list_item_0_title')

}

export class ProductsMenuComponent {
    constructor(private page: Page) { }

   elearningCoursesTab = this.page.getByTestId('nav_bottom_link_1')
   eBooksTab = this.page.getByTestId('nav_bottom_link_2')
   webinarsTab = this.page.getByTestId('nav_bottom_link_3')
  
}

export class SingleCourseMenuComponent {
    constructor(private page: Page) { }

    overviewCourseTab = this.page.getByRole('tab', { name: 'Overview' })
    youWillLearnTab = this.page.getByRole('tab', { name: 'You will learn' })
    aboutCourseTab = this.page.getByRole('tab', { name: 'About the course' })
    courseContentTab = this.page.getByRole('tab', { name: 'Course content' })
    prerequisitiesTab = this.page.getByRole('tab', { name: 'Prerequisites' })
    benefitsTab = this.page.getByRole('tab', { name: 'Benefits' })
}

