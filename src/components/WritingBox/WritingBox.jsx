import {React, useState, useEffect, useRef} from 'react'
import { useStopwatch } from 'react-timer-hook';

// components
import GenerateHtml from './GenerateHtml';
import Button from 'react-bootstrap/Button';


// utilities
import dataStorage from './dataStorage'
import getMethods from './dataAccess';
import scrollIfNec from './automaticScroll';
import newParagraph from './newParagraph';



function WritingBox(props) {
    // utilities
    const onKeyEnter = (key) => {

      const [ correctData, correctKey,] = getMethods.getCurrentWordAndLetter(data, activeWord, activeLetter)
      const correctLetter = getMethods.checkLetter(key, correctKey) 
      if (correctLetter === true) {
          getMethods.updateDictionary(correctData, activeLetter, setActiveLetter,  data,  setData)
      }
      return correctLetter
    }

    const keyDownHandler = event => {
        if (completed !== true & started == true) {
          
        if (onKeyEnter(event.key)) {
          setcharactersTyped(charactersTyped + 1)
          const stillActive = getMethods.updateActiveStatus(data, activeWord, setActiveWord,  activeLetter, setActiveLetter);
          
        }
      } else {
        if (started) {
         document.querySelector('.text-container').classList.add('scrollable')

         setStarted(!started)
        
        }
        
        }
      }

      const onStart = (e) => {
  
        if (startResetButton === 'Reset') {
          setData(dataStorage(newPara))
          setActiveLetter(0)
          setActiveWord(0)
          setCompleted(0)
          setScrolled(0)
          setStarted(false)
          reset()
          pause()
          setcharactersTyped(1)
          document.querySelector('.text-container').classList.remove('scrollable')
          setStartResetButton('Start')
        }
        if (startResetButton === 'Start') {
          setStarted(!started)
          setStartResetButton('Reset')
          reset()
          start()
          
        }
        
      }

      const onNext = (e) => {
        newParagraph(setNewPara, setData, dataStorage)
        setActiveLetter(0)
        setActiveWord(0)
        setCompleted(0)
        setScrolled(0)
        
        setStarted(false)

        reset()
        pause()
        setStartResetButton('Start')
        document.querySelector('.text-container').classList.remove('scrollable')
        setcharactersTyped(1)
      }
      
      
 
      
      


    //hooks
    const [newPara, setNewPara] = useState(props.paragraph)
    const [data, setData] = useState(dataStorage('Click Next to Load'))
    const [activeWord, setActiveWord] = useState(0)
    const [activeLetter, setActiveLetter] = useState(0)
    const [completed, setCompleted] = useState(0)
    const myRef = useRef(null)
    const mobileRef = useRef(null)
    const startButton = useRef(null)
    const MenuButton = useRef(null)
    const [scrolled, setScrolled] = useState(0)
    const [started, setStarted] = useState(false)
    const [charactersTyped, setcharactersTyped] = useState(1)
    const [startResetButton, setStartResetButton] = useState('Start')
    const {
      seconds,
      minutes,
      hours,
      days,
      isRunning,
      start,
      pause,
      reset,
    } = useStopwatch({ autoStart: false});

      
   
    useEffect(() => {
      if (started == true) {
         start()
      } else {
        pause()
      }

    }, [started])
    
  useEffect(() => {
    document.addEventListener('keydown',keyDownHandler)
    return () => (
      document.removeEventListener('keydown',keyDownHandler)
     
    )
  })


  if ((newPara.split(/(\s+)/).length - 1).toString()  === activeWord.toString() && newPara.split(/(\s+)/).slice(-1)[0].length === activeLetter) {
    document.removeEventListener('keydown',keyDownHandler)
    
    if (completed === 0) {
      if (started) { 
      setCompleted(true )
      }
      
    } 
  }
    
  useEffect( () => {
    if (document.querySelector('.get-width') !== null) {
      scrollIfNec(document.querySelector('.get-width').clientWidth, activeWord, myRef, scrolled, setScrolled)
    }
  }, [activeWord])
 
  
  
  return (
    <div className='text-area' >
      <div className='button-wpm'>
        <div className='buttons'>
          <Button ref={startButton} className='ripple-button' variant="success" onClick={onStart} disabled={started}>{startResetButton}</Button>{' '}
          <Button ref={MenuButton} className='ripple-button' variant="primary" disabled={started}>Menu</Button>{' '}
          <Button className='ripple-button' variant="danger" onClick={onNext}>Next</Button>{' '}
        </div>
        <div className='span-info'>
          
          <span>Wpm : {  ( (charactersTyped/ 5) / (minutes + (seconds/60)) ).toFixed(2) !== 'Infinity' ? ( (charactersTyped/ 5) / (minutes + (seconds/60)) ).toFixed(2)  : '0' } </span>
          <span>Time: {days > 0 ? `${days}d` :  undefined} {hours > 0 ? `${hours}h`: undefined } {minutes > 0 ? `${minutes}m` : undefined } {`${seconds}s`}</span>
        </div>
      </div>

      <div className='text-container' ref={myRef}>
            <GenerateHtml  data={data} getCLassName={getMethods.getCLassName} getWordName={getMethods.getWordName}  activeWord={activeWord} activeLetter={activeLetter}/>
      </div>
        
    </div>
  )

  
}

export default WritingBox