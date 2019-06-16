const getValidAds =  function (quantity = 1) {
    if(!Number.isInteger(quantity)){
        return {Success:false}
    }
    const ads = []
    for (let index = 0; index < quantity; index++) {
        const newValidAd = {
            title: `my${Math.random()}title${Math.random()}`,
            description: `my${Math.random()}dexription${Math.random()}`
        }
        ads.push(newValidAd)
    }
        return {Success:true,ads}
}

module.exports = {
    getValidAds
}