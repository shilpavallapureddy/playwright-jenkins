import {test as baseTest} from '@playwright/test'

type shilpa={
    hey:string
}

const  fixture= baseTest.extend<shilpa>({
    hey: "I am letcode"
})

export const test = fixture;
export const assert = fixture.expect
export const describe= fixture.describe