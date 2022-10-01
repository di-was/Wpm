const  dataStorage   = string => {
  let splitWord = string.toString().replace('’', "'").split(/(\s+)/)
  let dataStorageData = {}
  for (var i=0; i < splitWord.length; i++) {
    
    dataStorageData = {
      [i] : {
        word: splitWord[i],
        letters: splitWordIntoLetters(splitWord[i]),
        status: 'notcompleted',
      },
      ...dataStorageData
      }
  }
  return dataStorageData

}

const splitWordIntoLetters = word => {
let wordList = word.split('')
let wordData = {} 
for (var i=0; i < wordList.length; i++) {

  wordData = {
    [i]: {
      letter:  wordList[i],
      status: 'notcompleted',
    }
    ,
    ...wordData
  }

}

return wordData
}

export default dataStorage