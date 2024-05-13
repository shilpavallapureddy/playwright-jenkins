import { test, expect, request } from '@playwright/test'
let userID: number;



test("create user by post method", async ({ request, page }) => {
    const responseis = await request.post('https://reqres.in/api/users',
        {
            data: {
                "name": "ranga",
                "job": "trainer"
            },
            headers: {
                "Accept": "application/json"
            }
        });
    console.log('response from post API is', await responseis.json())
    expect(responseis.status()).toBe(201)
    expect(responseis.ok()).toBeTruthy();
    var response1 = await responseis.json()
    userID = response1.id
    console.log('userID of create method', userID)
});

test("update user by put method", async ({ request }) => {
    const responseis = await request.put('https://reqres.in/api/users/' + userID,
        {
            data: {
                "name": "Shilpa Vallapureddy",
                "job": "Automation Backend QA"
            },
            headers: {
                "Accept": "application/json"
            }
        });
    expect(responseis.status()).toBe(200)
    expect(responseis.ok()).toBeTruthy();
    const responsebody=JSON.parse(await responseis.text());
    console.log(responsebody)
});

test("Get user",async({request})=>{
    const responseis=await request.get('https://reqres.in/api/users/2');
    console.log('response from get user API is', await responseis.json())
    expect(responseis.status()).toBe(200)
    const responsebody=JSON.parse(await responseis.text());
    console.log(responsebody)
    expect(responsebody.data.id).toBe(2)
   
});

test("delete user by delete method", async ({ request }) => {
    const responseis = await request.delete('https://reqres.in/api/users/' + userID)
    expect(responseis.status()).toBe(204)
});
