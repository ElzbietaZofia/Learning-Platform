import * as crypto from "crypto"

export function getRandomString() {
    return crypto.randomBytes(10).toString("hex")
}

export function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const firstNameList = ["Alice", "Bob", "Charlie", "David", "Eve", "Anna", "Norma", "John", "Michael", "Camila", "Mary", "Ben"];
const lastNameList = ["Smith", "Johnson", "Brown", "Lee", "Wilson", "Cosgrowe", "Campbell", "Whitman"];

export function getRandomName(): string {
    const randomFirstName = firstNameList[Math.floor(Math.random() * firstNameList.length)];
    const randomLastName = lastNameList[Math.floor(Math.random() * lastNameList.length)];
    return `${randomFirstName} ${randomLastName}`;
}

const domainList = ["example.com", "test.com", "domain.com", "sample.com", "super.com", "smooth.com", "address.com", "cool.com"]

export function getRandomEmail(): string {
    const randomUsername = getRandomString()
    const randomDomain = domainList[Math.floor(Math.random() * domainList.length)]
    return `${randomUsername}@${randomDomain}`
}

const courseCategoryList = ["Lean", "XP", "Core"]

export function getRandomCategory(): string {
    const randomCategory = Math.floor(Math.random() * courseCategoryList.length);
    return courseCategoryList[randomCategory];
}

const moduleCategoryList = ["Scrum", "XP"]

export function getRandomModuleCategory(): string {
    const randomModuleCategory = Math.floor(Math.random() * moduleCategoryList.length);
    return courseCategoryList[randomModuleCategory];
}

const testList = ["Alpha", "Charles", "Parrot", "Paul Gauguin"]

export function getRandomTest(): string {
    const randomTest = Math.floor(Math.random() * testList.length);
    return testList[randomTest];
}


const firstTitlePart = ["Lama", "Bear", "Hen", "Tortoise", "Hedgehog", "Gorilla", "Goose", "Dog", "Sparrow", "Monkey", "Owl", "Cat", "Blackbird", "Bug", "Otter", "Bunny", "Rat", "Rabbit", "Squirrel", "Dove", "Pigeon"];
const secondTitlePart = ["Huge", "Bold", "Brown", "Wise", "Clever", "Independent", "Smart", "Reckless", "Sneaky", "Fast", "Slow", "Magnificent", "Active", "Alert", "Brilliant", "White", "Black"];

export function getRandomTitle(): string {
    const randomFirstTitlePart = firstTitlePart[Math.floor(Math.random() * firstTitlePart.length)];
    const randomSecondTitlePart = secondTitlePart[Math.floor(Math.random() * secondTitlePart.length)];
    return `${randomFirstTitlePart} ${randomSecondTitlePart}`;
}

const firstModuleTitlePart = ["Daisy", "Rose", "Bluebell", "Dahlia", "Begonia", "Iris", "Orchid", "Peony", "Sunflower", "Tulip", "Iris", "Begonia", "Lavender", "Lilly", "Wisteria", "Violet"];
const secondModuleTitlePart = ["Beautiful", "Delicate", "Pretty", "Amazing", "Terrific", "Lovely", "Brilliant", "Divine", "Grand", "Superb", "Gorgeus"];

export function getRandomModuleTitle(): string {
    const randomFirstModuleTitlePart = firstModuleTitlePart[Math.floor(Math.random() * firstModuleTitlePart.length)];
    const randomSecondModuleTitlePart = secondModuleTitlePart[Math.floor(Math.random() * secondModuleTitlePart.length)];
    return `${randomFirstModuleTitlePart} ${randomSecondModuleTitlePart}`;
}


const firstName = ["Maria", "Charles", "Steven", "Paul", "Ringo", "Max", "Walt", "Carmen", "Monica", "Jerry", "Cody", "Raul", "Ron", "Evan", "Arnold"]

export function getRandomFirstName(): string {
    const randomFirstName = Math.floor(Math.random() * firstName.length);
    return firstName[randomFirstName];
}

const lastName = ["Smith", "Johnson", "Hitchens", "McCartney", "Star", "Spider", "Corn", "Sousa", "Grace", "Nolan", "Jackson", "Monter", "Jonas", "Camaro", "Wood"]

export function getRandomLastName(): string {
    const randomLastName = Math.floor(Math.random() * lastName.length);
    return lastName[randomLastName];
}

const jobTitleList = ["carpenter", "designer", "writer", "CCO", "CEO", "CTO", "CVO", "pilot"]

export function getRandomJob(): string {
    const randomJob = Math.floor(Math.random() * jobTitleList.length);
    return jobTitleList[randomJob];
}




const firstEbookTitlePart = ["Lama", "Bear", "Hen", "Tortoise", "Hedgehog", "Gorilla", "Goose", "Dog", "Sparrow", "Monkey", "Owl", "Cat", "Blackbird", "Bug", "Otter", "Bunny", "Rat", "Rabbit", "Squirrel", "Dove", "Pigeon"];
const secondEbookTitlePart = ["Daisy", "Rose", "Bluebell", "Dahlia", "Begonia", "Iris", "Orchid", "Peony", "Sunflower", "Tulip", "Iris", "Begonia", "Lavender", "Lilly", "Wisteria", "Violet"];

export function getRandomEbookTitle(): string {
    const randomFirstEbookTitlePart = firstEbookTitlePart[Math.floor(Math.random() * firstEbookTitlePart.length)];
    const randomSecondEbookTitlePart = secondEbookTitlePart[Math.floor(Math.random() * secondEbookTitlePart.length)];
    return `${randomFirstEbookTitlePart} ${randomSecondEbookTitlePart}`;
}

