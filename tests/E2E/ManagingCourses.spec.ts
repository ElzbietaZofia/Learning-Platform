
import { test } from '@playwright/test';
import { AdminLoginPage } from '../../page-objects/AdminLoginPage';
import { adminLoginData } from '../../test-data/login.data';
import { AddModulesToCourse, AdminCourse, AdminCourseSearchBox } from '../../page-objects/ManagingCourses';
import { getRandomString, getRandomNumber, getRandomName, getRandomTitle } from '../../utils/data-helpers'
import { BasePage } from '../../page-objects/BasePage';


test.describe("Course Creation", () => {
    let adminLoginPage: AdminLoginPage
    let adminCourse: AdminCourse
    let basePage: BasePage

    const randomTitle = getRandomTitle()
    const randomSubscriptionLenght = getRandomNumber(3,8)
    const randomPrice = getRandomNumber(200, 400)
    const randomName = getRandomName()
    const randomString = getRandomString()
    const videoFilePath = './files/SampleVideo.mp4'
    const thumbnailFilePath = './files/puppy.jpg'
    const courseURL = '/course-66'

    test.beforeEach(async ({ page }) => {
        adminLoginPage = new AdminLoginPage(page)
        adminCourse = new AdminCourse(page)
        basePage = new BasePage(page)

        await basePage.visitAdminPanelLogin()
        await adminLoginPage.login(adminLoginData.adminEmailValid, adminLoginData.passwordValid)
        await adminCourse.goToCourseCreation()
    })
    
    test('Positive Course Creation @smoke', async ({ page }) => {
        await adminCourse.findElementAndRefresh()
        await adminCourse.fillCreateCourseForm(randomTitle, randomSubscriptionLenght.toString(), randomPrice.toString(), randomName, randomString, randomString, randomString, videoFilePath, thumbnailFilePath)
        await adminCourse.assertCourseCreation(courseURL)
    })

    test('Negative Course Creation - Empty Form', async ({ page }) => {
        await adminCourse.emptyCreateCourseForm()
        await adminCourse.assertEmptyCreateCourseForm()
    })
    
    })

  

    test.describe("Course Editing", () => {
        let adminLoginPage: AdminLoginPage
        let adminCourse: AdminCourse
        let basePage: BasePage
    
        const randomCourseLength = getRandomNumber(2, 6)
        const courseName = 'Online Security for Dummies'
      
    
        test.beforeEach(async ({ page }) => {
            adminLoginPage = new AdminLoginPage(page)
            adminCourse = new AdminCourse(page)
            basePage = new BasePage(page)
    
            await basePage.visitAdminPanelLogin()
            await adminLoginPage.login(adminLoginData.adminEmailValid, adminLoginData.passwordValid)
            await adminCourse.goToCourseEdit(courseName)
            await adminCourse.findElementAndRefresh()
        })

    test('Positive Course Editing @smoke', async ({page}) => {
        await adminCourse.fillEditCourseForm(randomCourseLength.toString())
        await adminCourse.assertCourseEditing()
    })

    test('Negative Course Editing - Negative number in Course Length field', async ({page}) => {
        await adminCourse.fillEditCourseForm('-1')
        await adminCourse.assertNegativeCourseEditing()
    })
    
})


test.describe("Courses Search Box Tests", () => {
    let adminLoginPage: AdminLoginPage
    let adminCourseSearchBox: AdminCourseSearchBox
    let basePage: BasePage
    let adminCourse: AdminCourse

    const searchQueries = [
        { query: 'agile', shouldFind: true },
        { query: 'aGilE', shouldFind: true },
        { query: 'kalimera', shouldFind: false }
    ]


    test.beforeEach(async ({ page }) => {
        adminLoginPage = new AdminLoginPage(page)
        adminCourse = new AdminCourse(page)
        adminCourseSearchBox = new AdminCourseSearchBox(page)
        basePage = new BasePage(page)

        await basePage.visitAdminPanelLogin()
        await adminLoginPage.login(adminLoginData.adminEmailValid, adminLoginData.passwordValid)
        await adminCourseSearchBox.goToCoursesList()
    })


    async function searchAndAssert(query: string, shouldFind: boolean) {
        await adminCourseSearchBox.fillSearchBox(query)
        if (shouldFind) {
            await adminCourseSearchBox.assertPositiveSearchResult()
        } else {
            await adminCourseSearchBox.assertNegativeSearchResult()
        }
    }

    searchQueries.forEach(({ query, shouldFind }) => {
        test(`Search Results for query: ${query}`, async ({ page }) => {
            await searchAndAssert(query, shouldFind)
        })
    })

})

test.describe("Adding Lessons to the Courses", () => {
    let adminLoginPage: AdminLoginPage
    let adminCourseSearchBox: AdminCourseSearchBox
    let addModulesToCourse: AddModulesToCourse
    let basePage: BasePage
    let adminCourse: AdminCourse

    test.beforeEach(async ({ page }) => {
        adminLoginPage = new AdminLoginPage(page)
        adminCourse = new AdminCourse(page)
        adminCourseSearchBox = new AdminCourseSearchBox(page)
        addModulesToCourse = new AddModulesToCourse(page)
        basePage = new BasePage(page)

        await basePage.visitAdminPanelLogin()
        await adminLoginPage.login(adminLoginData.adminEmailValid, adminLoginData.passwordValid)
        await adminCourseSearchBox.goToCoursesList()
    })

    test('Add and Delete New Lesson to the Course @smoke', async ({ page }) => {
        await addModulesToCourse.addNewModuleToCourse()
        await addModulesToCourse.assertAddedModule()
        await addModulesToCourse.deleteModuleFromCourse()
        await addModulesToCourse.assertDeletedModule()
    })

})


