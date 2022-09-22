import React from 'react'
import DOMPurify from 'dompurify';


function GenerateHtml(props) {
  const letterDisplay = (letters) => {
    let subhtml = ''
    for (const [letterKey, letterValue] of Object.entries(letters)) {
      if (letterValue.status === 'notcompleted') {
        subhtml += letterValue.letter
      } else {
        subhtml += `<span class=${letterValue.status} id='special-letter'>${letterValue.letter}</span>`
      }
    }
    return subhtml
  }

  let html = ''
  for ( const [key, value] of Object.entries(props.data)) {
    if (key === props.activeWord.toString()) {
      //html += `<span id='${key}' class='${props.getCLassName(value)} active-word'>${props.getWordName(value)}</span>`
     
      html += `<span id='${key}' class='${props.getCLassName(value)} active-word'>${letterDisplay(value.letters)} <br></span>`
    }else {
    html += `<span id='${key}' class='${props.getCLassName(value)}'>${props.getWordName(value)}</span>`
    }
  }
  return <p  className='get-width' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(new DOMParser().parseFromString(html, 'text/html').body)}} />
  
}



export default GenerateHtml