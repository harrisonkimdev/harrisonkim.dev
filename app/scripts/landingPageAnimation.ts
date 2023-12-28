/* eslint-disable */
const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: '0px', // No margin
    threshold: 1.0 // 100% of the element must be visible
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {        
        if (entry.isIntersecting) {
            if (entry.target.className.includes('secondRowTitle')) {
                entry.target.classList.remove('opacity-0')
                entry.target.classList.add('animate__fadeIn')
            }
            else if (entry.target.className.includes('secondRowCard1')) {
                entry.target.classList.remove('opacity-0')
                entry.target.classList.add('animate__backInLeft')
            }
            else if (entry.target.className.includes('secondRowCard2')) {
                entry.target.classList.remove('opacity-0')
                entry.target.classList.add('animate__backInLeft')
            }
            else if (entry.target.className.includes('secondRowCard3')) {
                entry.target.classList.remove('opacity-0')
                entry.target.classList.add('animate__backInLeft')
            }
            else if (entry.target.className.includes('thirdRowCard1')) {
                entry.target.classList.remove('opacity-0')
                entry.target.classList.add('animate__backInLeft')
            }
            else if (entry.target.className.includes('thirdRowCard2')) {
                entry.target.classList.remove('opacity-0')
                entry.target.classList.add('animate__backInLeft')
            }
            else if (entry.target.className.includes('thirdRowCard3')) {
                entry.target.classList.remove('opacity-0')
                entry.target.classList.add('animate__backInLeft')
            }
            else if (entry.target.className.includes('thirdRowCard4')) {
                entry.target.classList.remove('opacity-0')
                entry.target.classList.add('animate__backInLeft')
            }
            else if (entry.target.className.includes('fourthContent')) {
                entry.target.classList.remove('opacity-0')
                entry.target.classList.add('animate__bounce')
            }
        }
        
        // if you want to add effect every time users scroll through
        else {
            if (entry.target.className.includes('secondRowTitle')) {
                entry.target.classList.add('opacity-0')
                entry.target.classList.remove('animate__fadeIn')
            }
            else if (entry.target.className.includes('fourthContent')) {
                entry.target.classList.add('opacity-0')
                entry.target.classList.remove('animate__bounce')
            }
        }
    })
}, observerOptions)

export const activateObserver = (refObject: React.MutableRefObject<null>) => {
    if (refObject.current) {
        observer.observe(refObject.current)
    }
}

export const inactivateObserver = (refObject: React.MutableRefObject<null>) => {
    if (refObject.current) {
        observer.unobserve(refObject.current)
    }
}
/* eslint-enable */