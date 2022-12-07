//Made this hook to fix the paper holes issue with the height, it returns 100% of height
//if the height doesnt overflow if it does it changes the html height to auto
//to expand the paper holes to the client height
//it works for nextjs but you can edit the main page selector to #root for example

const overflowFix = () => {

    const htmlPage = document.getElementsByTagName('html')[0].clientHeight
    const mainPage = document.querySelector('#__next').scrollHeight

    if (mainPage > htmlPage) {
        /* console.log("overflowing html "+htmlPage+" - main "+mainPage); */
        return document.getElementsByTagName('html')[0].style.height = 'auto'
    }
    else
    {
        /* console.log("no overflow html "+htmlPage+" - main "+mainPage); */
        return document.getElementsByTagName('html')[0].style.height = '100%'
    }

}

export default overflowFix
