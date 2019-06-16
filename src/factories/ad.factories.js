const getValidAds = async function asyncForEach(quantity = 1) {
    const Ads = []
    for (let index = 0; index < quantity; index++) {
        const newValidaAd = {
            title: `my${Math.random()}example${Math.random()}`,
            description: "123"
        }
        Ads.push(newValidaAd)
    }
    return Ads;
}

module.exports = {
    getValidAds
}