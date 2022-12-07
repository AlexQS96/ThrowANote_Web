//Nav Menu Button
//Check if the menu is opened
//if its opened the scroll on page is enabled, the header is transparent
//and the menu classes are removed

//if the menu is not opened
//the header background is changed
//the page scroll is disabled
//and finally the menu is opened

export const openNav = () => {
    const nav = document.querySelector('.nav')

    if(nav.classList.contains('navOpen')){
        nav.classList.add('navClose')
        document.body.classList.remove('noScroll')
        document.getElementsByTagName('html')[0].classList.remove('noScroll')
        setTimeout(() => {
            nav.classList.remove('navClose')
        }, 300);
        setTimeout(() => {
            nav.classList.remove('navOpen')
        }, 200);
    }
    else
    {
        document.body.classList.toggle('noScroll')
        document.getElementsByTagName('html')[0].classList.toggle('noScroll')
        nav.classList.toggle('navOpen')
    }
}

// Hide menu slider when the page logo is pressed

export const logoNav = () => {
    const nav = document.querySelector('.nav')

    if(nav && nav.classList.contains('navOpen')){
        openNav()
    }   
}