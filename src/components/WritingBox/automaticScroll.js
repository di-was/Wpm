import React, {useRef} from 'react'

function scrollIfNec(paragraphwidth, activeWord, myRef, scrolled, setScrolled) {
    let elementWidth = 0 -  (scrolled * paragraphwidth)
    
    
    for (let i=0; i < activeWord; i++) {

        elementWidth += document.getElementById(`${i}`).clientWidth 
       
    
    }

    if (paragraphwidth <  elementWidth) {
        if (scrolled === 0) {myRef.current.scroll(0, 36.72)} else {myRef.current.scroll(0, 36.72  * scrolled)}
        setScrolled(scrolled + 1)
    }
 
    
}

export default scrollIfNec;