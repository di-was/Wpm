  
// For initial Data Construction
const getCLassName = obj => {
    for ( const [key, value] of Object.entries(obj)) {
      if (key === 'status') {
        return value;
      }
    }
  }
const getWordName = obj => {
  for (const [key, value] of Object.entries(obj)) {
    if(key === 'word') {
      return value
    }
  }
}
//----------------------------

// For data Validation
const getCurrentWordAndLetter = (data, activeWord, activeLetter) => {
    for ( const [key, value] of Object.entries(data)) {
      if (key === activeWord.toString()) {
        for (const [secondaryKey, secondaryValue] of Object.entries(value.letters)) {
          if (secondaryKey === activeLetter.toString()) {
           
            //return  secondaryValue.letter
            return [{[key]: value}, secondaryValue.letter]
          }
        }
      }
    }
}

const checkLetter = (key, activeData) => {
  if (key === activeData) {
    return true
  } else {return false}
}



const updateDictionary = (correctData, activeLetter, setActiveLetter,  data, setData) => {
  for ( const [key, value] of Object.entries(correctData)) {
    for (const [secondaryKey, secondaryValue] of Object.entries(value.letters)) {
      if (secondaryKey === activeLetter.toString()) {
        secondaryValue.status = 'completed'
      }
     
    }
  }

  for (const [index, dictionary] of Object.entries(correctData)) {
        
    setData({ [index]: dictionary, ...data});
  }
}


const updateActiveStatus = (data, activeWord, setActiveWord,  activeLetter, setActiveLetter) => {
    let  paragraphLength = 0
    for (const [key, value] of Object.entries(data)) {
          // for calculating total words in paragraph
      if (key >= paragraphLength) {
        paragraphLength = parseInt(key)
      }
    }
 
    for (const [key, value] of Object.entries(data)) {

      if (key === activeWord.toString()) {

        // set Active word if word is already completed
        if (value.status === 'completed' ) {
         
            if (parseInt(key) < paragraphLength) {
              setActiveWord(parseInt(key) + 1)
              setActiveLetter(0)
            }
          
        }


        for (const [lettersKey, lettersValue] of Object.entries(value.letters)) {
          let letterLength = parseInt(value.word.length) - 1 // reduction is made as the index starts from 0
          
          if (activeLetter.toString() === lettersKey.toString()) {
            lettersValue.status = 'completed'
            setActiveLetter(parseInt(lettersKey) + 1)
          }
                 
          if (activeLetter === letterLength) {
            
            value.status = 'completed'
            if (parseInt(key) < paragraphLength) {
              setActiveWord(parseInt(key) + 1)
              setActiveLetter(0)
            }
          } 
 

        }
      }
      if (parseInt(key) === paragraphLength) {
        return false
      }
    }
    
  
}
const getMethods = {
  getCLassName, getWordName, getCurrentWordAndLetter, checkLetter, updateDictionary, updateActiveStatus
}



export default getMethods