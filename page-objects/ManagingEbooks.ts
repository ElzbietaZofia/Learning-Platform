import { expect, Page } from '@playwright/test'
import { AdminPanelComponent } from '../components/admin-panel.components';

export class AdminEbooks {
    constructor(private page: Page) { }

    adminPanelComponent = new AdminPanelComponent(this.page)

    createEbookButton = this.page.getByRole('button', { name: 'Create eBook' })
    eBookNameInput = this.page.getByLabel('Enter eBook name')
    eBookAuthorsInput = this.page.getByLabel('Enter author\'s fullname')
    eBookPublisherInput = this.page.getByLabel('Enter publisher\'s full name')
    eBookPriceInput = this.page.getByLabel('Enter eBook price')
    bookPriceInput = this.page.getByLabel('Enter book price')
    pagesCountInput = this.page.getByLabel('Enter pages count')
    overviewInput = this.page.getByTestId('overview_field').locator('div').first()
    keyTopicsInput = this.page.getByTestId('key_topics_field').locator('div').first()
    aboutAuthorsInput = this.page.getByTestId('about_the_authors_field').locator('div').first()
    informationTnput = this.page.getByTestId('info_field').locator('div').first()
    tagsDropList = this.page.getByLabel('Select Tags')
    tagArchitecture = this.page.getByText('Success Architecture')

    eBookFileEnter = this.page.getByLabel('Enter eBook file', { exact: true })
    coverFileEnter = this.page.getByLabel('Enter cover file', { exact: true })

    addEbookSubmitButton = this.page.getByTestId('submit_button')

    toastSuccessfulEbookCreation = this.page.getByText('You have successfully created a new eBook.')
    toastFailedEbookCreation = this.page.getByText('Unable to create the resource. Double check the validity of data.')
    toastSuccessfulEbookDeletion = this.page.getByText('You have successfully deleted a eBook.')

    eBookToBeDeletedTooltip = this.page.locator('[data-testid^="modal-assign-"]')
    eBookToBeDeletedEdit = this.page.locator('div').filter({ hasText: 'Edit' }).first()
    eBookToBeDeletedDelete = this.page.locator('div').filter({ hasText: 'Delete' }).first()
    eBookToBeDeletedTitleOnList = this.page.getByRole('cell', { name: 'eBook to be deleted' })
    modalDeleteEbookConfirm = this.page.getByRole('button', { name: 'Delete' })

    eBookNameValidationMsg = this.page.getByTestId('name_field').locator('div').filter({ hasText: 'Value is required' }).first()
    eBookAuthorsValidationMsg = this.page.locator('div').filter({ hasText: 'Value is required' }).first()
    eBookOverviewValidationMsg = this.page.getByText('Overview* Value is required')
    eBookAboutAuthorsValidationMsg = this.page.locator('//*[@id="#formTop"]/div/div[12]/small')
    eBookFileValidationMsg = this.page.getByTestId('ebook_file_field').getByText('Value is required')
    eBookCoverValidationMsg = this.page.getByTestId('cover_file_field').getByText('Value is required')

    //Search Box
    searchBoxInput = this.page.getByLabel('Search')

    positiveSearchResult = this.page.getByRole('cell', { name: 'USB 3.0' })
    searchResultContainer = this.page.locator('//*[@id="__nuxt"]/div/div/div/main/div/div/div[3]/div/table/tbody')

    //Editing
    eBookTooltipPCI = this.page.locator('[data-test-id="options-button-2"]')
    eBookEditPCI = this.page.getByText('Edit')
    editEbookSubmitButton = this.page.getByRole('button', { name: 'Save your eBook' })
    eBooksListHeader = this.page.getByText('eBooksCreate eBook')

    toastSuccessfulEbookEditing = this.page.getByText('You have successfully edited a eBook.')


    async goToEbooksList() {
        await this.adminPanelComponent.eBooksIcon.click()
    }
    
    async goToEbookCreation() {
        await this.createEbookButton.click()
    }

    async fillEbookCreationForm(
        eBookName: string,
        authors: string,
        publisher: string,
        eBookPrice: string,
        bookPrice: string,
        pagesCount: string,
        overview: string,
        keyTopics: string,
        aboutAuthors: string,
        information: string,
        eBookFile: string,
        coverFile: string
    ) {
        await this.eBookNameInput.fill(eBookName)

        if (authors) {
            await this.eBookAuthorsInput.fill(authors)
        }

        if (publisher) {
            await this.eBookPublisherInput.fill(publisher)
        }

        if (eBookPrice) {
            await this.eBookPriceInput.fill(eBookPrice)
        }

        if (bookPrice) {
            await this.bookPriceInput.fill(bookPrice)
        }

        if (pagesCount) {
            await this.pagesCountInput.fill(pagesCount)
        }

        if (overview) {
            await this.overviewInput.fill(overview)
        }

        if (keyTopics) {
            await this.keyTopicsInput.fill(keyTopics)
        }

        if (aboutAuthors) {
            await this.aboutAuthorsInput.fill(aboutAuthors)
        }

        if (information) {
            await this.informationTnput.fill(information)
        }

        await this.tagsDropList.click()
        await this.tagArchitecture.click()

        if (eBookFile) {
            await this.eBookFileEnter.click()
            await this.eBookFileEnter.setInputFiles(eBookFile)
        }

        if (coverFile) {
            await this.coverFileEnter.click()
            await this.coverFileEnter.setInputFiles(coverFile)
        }

        await this.addEbookSubmitButton.click()
    }

    async assertEbookCreation() {
        await expect(this.toastSuccessfulEbookCreation).toBeVisible()
        await expect(this.page).toHaveURL('/admin/ebook')
    }


    async deleteEbook() {
        await this.eBookToBeDeletedTooltip.click()
        await this.eBookToBeDeletedDelete.click()
        await this.modalDeleteEbookConfirm.click()
    }

    async assertEbookDeletion() {
        await expect(this.toastSuccessfulEbookDeletion).toBeVisible()
    }

    async assertEmptyEbookName() {
        await expect(this.eBookNameValidationMsg).toContainText('Value is required')
    }

    async assertEmptyAuthors() {
        await expect(this.eBookAuthorsValidationMsg).toContainText('Value is required')
    }

    async assertEmptyOverview() {
        await expect(this.eBookOverviewValidationMsg).toContainText('Value is required')
    }

    async assertEmptyAboutAuthors() {
        await expect(this.eBookAboutAuthorsValidationMsg).toContainText('Value is required')
    }

    async assertEmptyPDFFile() {
        await expect(this.eBookFileValidationMsg).toContainText('Value is required')
    }

    async assertEmptyCover() {
        await expect(this.eBookCoverValidationMsg).toContainText('Value is required')
    }


    //Search Box
    async fillSearchBoxInput(query: string) {
        await this.searchBoxInput.fill(query)
    }

    async assertPositiveSeach() {
        await expect(this.positiveSearchResult).toBeVisible()
    }

    async assertNegativeSearch() {
        await expect(this.searchResultContainer).toBeEmpty()
    }

    //Editing
    async goToEbookEditing() {
        await this.eBooksListHeader.click()
        await this.eBookTooltipPCI.click()
        await this.eBookEditPCI.click()
    }

    async fillEbookEditingForm(
        publisher: string
        
    ) {
        
        await this.eBookPublisherInput.fill(publisher)
        await this.editEbookSubmitButton.click()
    }

    async assertEbookEditing() {
        await expect(this.toastSuccessfulEbookEditing).toBeVisible()
    }


}