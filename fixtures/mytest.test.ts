import {test,assert} from "./myFixtures"


test('test1',async({hey},info)=>{
    //info.skip()
    console.log(hey.toUpperCase())
    console.log(hey.toUpperCase());
    let text = hey.toUpperCase()
    assert(text).toBe("I AM LETCODE");
    console.log("Is it passed? " + info.status);

})