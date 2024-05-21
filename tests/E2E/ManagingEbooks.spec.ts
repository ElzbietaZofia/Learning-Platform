import { test } from '@playwright/test';
import { AdminLoginPage } from '../../page-objects/AdminLoginPage';
import { adminLoginData } from '../../test-data/login.data';
import { getRandomString, getRandomEbookTitle, getRandomName } from '../../utils/data-helpers';
import { BasePage } from '../../page-objects/BasePage';
import { AdminEbooks } from '../../page-objects/ManagingEbooks';


test.describe("eBook Creation, Editing and Delete tests", () => {
    let adminLoginPage: AdminLoginPage
    let basePage: BasePage
    let adminEbooks: AdminEbooks

    const randomString = getRandomString()
    const randomEbookTitle = getRandomEbookTitle()
    const eBookTitleToBeDeleted = 'eBook to be deleted'
    const randomName = getRandomName()
    const publisher = 'Publisher'
    const eBookPrice = '100'
    const bookPrice = '110'
    const pagesCount = '350'
    const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    const pdfFilePath = '/home/Pictures/samplePDF.pdf'
    const coverFilePath = '/home/Pictures/full.jpg'


    test.beforeEach(async ({ page }) => {
        adminLoginPage = new AdminLoginPage(page)
        basePage = new BasePage(page)
        adminEbooks = new AdminEbooks(page)


        await basePage.visitAdminPanelLogin()
        await adminLoginPage.login(adminLoginData.adminEmailValid, adminLoginData.passwordValid)
        await adminEbooks.goToEbooksList()
    })

    test('Positive eBook Creation', async ({ page }) => {

        await adminEbooks.goToEbookCreation()
        await adminEbooks.fillEbookCreationForm(randomEbookTitle, randomName, publisher, eBookPrice, bookPrice, pagesCount, loremIpsum, loremIpsum, loremIpsum, loremIpsum, pdfFilePath, coverFilePath)
        await adminEbooks.assertEbookCreation()
    })


    test('eBook Creation and Delete', async ({ page }) => {
        await adminEbooks.goToEbookCreation()
        await adminEbooks.fillEbookCreationForm(eBookTitleToBeDeleted, randomName, publisher, eBookPrice, bookPrice, pagesCount, loremIpsum, loremIpsum, loremIpsum, loremIpsum, pdfFilePath, coverFilePath)
        await adminEbooks.deleteEbook()
        await adminEbooks.assertEbookDeletion()
    })

    test('Negative eBook Creation - empty eBook Name', async ({ page }) => {
        await adminEbooks.goToEbookCreation()
        await adminEbooks.fillEbookCreationForm('', randomName, publisher, eBookPrice, bookPrice, pagesCount, loremIpsum, loremIpsum, loremIpsum, loremIpsum, pdfFilePath, coverFilePath)
        await adminEbooks.assertEmptyEbookName()
    })

    test('Negative eBook Creation - empty Authors', async ({ page }) => {
        await adminEbooks.goToEbookCreation()
        await adminEbooks.fillEbookCreationForm(randomEbookTitle, '', publisher, eBookPrice, bookPrice, pagesCount, loremIpsum, loremIpsum, loremIpsum, loremIpsum, pdfFilePath, coverFilePath)
        await adminEbooks.assertEmptyAuthors()
    })

    test('Negative eBook Creation - empty Overview', async ({ page }) => {
        await adminEbooks.goToEbookCreation()
        await adminEbooks.fillEbookCreationForm(randomEbookTitle, randomName, publisher, eBookPrice, bookPrice, pagesCount, '', loremIpsum, loremIpsum, loremIpsum, pdfFilePath, coverFilePath)
        await adminEbooks.assertEmptyOverview()
    })


    test('Negative eBook Creation - empty eBook File', async ({ page }) => {
        await adminEbooks.goToEbookCreation()
        await adminEbooks.fillEbookCreationForm(randomEbookTitle, randomName, publisher, eBookPrice, bookPrice, pagesCount, loremIpsum, loremIpsum, loremIpsum, loremIpsum, '', coverFilePath)
        await adminEbooks.assertEmptyPDFFile()
    })

    test('Negative eBook Creation - empty eBook Cover', async ({ page }) => {
        await adminEbooks.goToEbookCreation()
        await adminEbooks.fillEbookCreationForm(randomEbookTitle, randomName, publisher, eBookPrice, bookPrice, pagesCount, loremIpsum, loremIpsum, loremIpsum, loremIpsum, pdfFilePath, '')
        await adminEbooks.assertEmptyCover()
    })

    test('Positive eBook Editing', async ({ page }) => {
        await adminEbooks.goToEbookEditing()
        await adminEbooks.fillEbookEditingForm(randomString)
        await adminEbooks.assertEbookEditing()
    })



    test.describe("eBook Search Box tests", () => {
        let adminLoginPage: AdminLoginPage
        let basePage: BasePage
        let adminEbooks: AdminEbooks


        const searchQueries = [
            { query: 'Scrum', shouldFind: true },
            { query: 'sCrUm', shouldFind: true },
            { query: 'obrigado', shouldFind: true },
        ]


        test.beforeEach(async ({ page }) => {
            adminLoginPage = new AdminLoginPage(page)
            basePage = new BasePage(page)
            adminEbooks = new AdminEbooks(page)

            await basePage.visitAdminPanelLogin()
            await adminLoginPage.login(adminLoginData.adminEmailValid, adminLoginData.passwordValid)
            await adminEbooks.goToEbooksList()
        })

        async function searchAndAssert(query: string, shouldFind: boolean) {
            await adminEbooks.fillSearchBoxInput(query)
            if (shouldFind) {
                await adminEbooks.assertPositiveSeach()
            } else {
                await adminEbooks.assertNegativeSearch()
            }
        }

        searchQueries.forEach(({ query, shouldFind }) => {
            test(`Search Results for query: ${query}`, async ({ page }) => {
                await searchAndAssert(query, shouldFind)
            })
        })
    })

})
