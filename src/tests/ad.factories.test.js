const adFactories = require("../factories/ad.factories");

test("if getValidAds() length is 1 when no arguments are passed", async () => {
    const response= await adFactories.getValidAds();
    const actual=1;
    const expected=response.ads.length
    expect(actual).toBe(expected);
});

test("if getValidAds() length is correct", async () => {
    const length=10;
    const response= await adFactories.getValidAds(length);
    const actual=length;
    const expected=response.ads.length
    expect(actual).toBe(expected);
});

test("if getValidAds() returns true  invalid param is paseed", async () => {
    const length=2;
    const response= await adFactories.getValidAds(length);
    const actual=true;
    const expected=response.Success
    expect(actual).toBe(expected);
});


test("if getValidAds() returns falsy  when is passed an invalid param ", async () => {
    const length="[10]";
    const response= await adFactories.getValidAds(length);
    const actual=false;
    const expected=response.Success
    expect(actual).toBe(expected);
});



