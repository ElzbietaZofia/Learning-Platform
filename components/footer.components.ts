import { Page } from "@playwright/test";

export class FooterComponent {
    constructor(private page: Page) { }

    allRightsReserved = this.page.locator('div').filter({ hasText: 'All rights reserved.' })
    fullCourseList = this.page.getByRole('link', { name: 'Full Course List' })
    careers = this.page.getByRole('link', { name: 'Careers' })
    contactUs = this.page.locator('div').filter({ hasText: 'Contact UsPrivacy PolicyTerms of Use' }).getByRole('link', { name: 'Contact Us' })
    privacyPolicy = this.page.getByRole('link', { name: 'Privacy Policy' })
    termsOfUse = this.page.getByRole('link', { name: 'Terms of Use' })
  }