import React, { useState, useContext, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Display from './Display'
import Input from './Input'
import Themes from './Themes';
import Extra from './Extra';
import './App.css'
import { Calculation } from './Calculation';
import { DarkModeContext } from './contexts/darkMode';
import History from './History';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { updateSystemBar, keepScreenOn } from './utils';
import { KeepAwake } from '@capacitor-community/keep-awake';

function Main() {
  const { isDarkMode } = useContext(DarkModeContext);
  const root = window.document.documentElement;
  const platform = Capacitor.getPlatform();
  const isNative = platform === 'ios' || platform === 'android';
  const isWeb = platform === 'web';

  const [defHistory, setDefHistory] = useState(() => {
    const historyData = localStorage.getItem('history');
    return historyData ? JSON.parse(historyData) : [];
  });
  const [isBlue, setIsBlue] = useState(true);
  const [isGreen, setIsGreen] = useState(false);
  const [isYellow, setIsYellow] = useState(false);
  const [isRed, setIsRed] = useState(false);
  const [isPurple, setIsPurple] = useState(false);
  const [isOrange, setIsOrange] = useState(false);

  const [isAbel, setIsAbel] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isBarlow, setIsBarlow] = useState(false);
  const [isJosefin, setIsJosefin] = useState(false);
  const [isMontserrat, setIsMontserrat] = useState(false);
  const [isDigital, setIsDigital] = useState(false);
  const [isGoogleSans, setIsGoogleSans] = useState(false);
  const [isDotty, setIsDotty] = useState(false);
  const [isOrbitron, setIsOrbitron] = useState(false);
  const [isTiny, setIsTiny] = useState(false);

  const [isContinue, setIsContinue] = useState(() => {
    const continueData = localStorage.getItem('continue');
    return continueData ? JSON.parse(continueData) : true;
  });
  const [continueSmart, setContinueSmart] = useState(() => {
    const smartData = localStorage.getItem('smartCntd');
    return smartData ? JSON.parse(smartData) : false;
  });
  const [isStartFresh, setIsStartFresh] = useState(() => {
    const freshStartData = localStorage.getItem('freshStart');
    return freshStartData ? JSON.parse(freshStartData) : false;
  });
  const [systemFont, setSystemFont] = useState(() => {
    const systemFontData = localStorage.getItem('systemFont');
    return systemFontData ? JSON.parse(systemFontData) : true;
  });
  const [separateFont, setSeparateFont] = useState(() => {
    const separateFontData = localStorage.getItem('separateFont');
    return separateFontData ? JSON.parse(separateFontData) : false;
  });
  
  const [input, setInput] = useState('');
  const [calculationArr, setCalculationArr] = useState([]);
  const [answer, setAnswer] = useState('');
  const [inputRef, setInputRef] = useState(null);
  const [isThemes, setIsThemes] = useState(false);
  const [isHistory, setIsHistory] = useState(false);
  const [isExtra, setIsExtra] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [shoWarning, setShoWarning] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const id = nanoid();
  const timestamp = new Date().toLocaleDateString();
  const [showResult, setShowResult] = useState(false);
  
  const handleBackAnimation = () => {
    const pages = ["Themes", "History", "Extra"]
    let page = isThemes ? "Themes" : isHistory ? "History" : isExtra ? "Extra" : "";
    
    for (let i = 0; i < pages.length; i++) {
      const element = pages[i]
      
      if (element === page) {
        if (isThemes || showSupport || (!showAbout && isExtra) || shoWarning) {
          /*setAnimateOut(true)
          setTimeout(() => {
            //element === "Themes" ? setThemes(false) : (element === "History" && shoWarning) ? setShoWarning(false) : element === "History" ? setHistory(false) : (showAbout && showSupport) ? setShowSupport(false) : (element === "Extra" && showAbout) ? setShowAbout(false) : setExtra(false)
            if (element === "Themes") {
              setIsThemes(false)
            } else if (element === "History") {
              setShoWarning(false)
            } else if (element === "Extra") {
              if (showAbout && showSupport) {
                setShowSupport(false)
              } else {
                setIsExtra(false)
              }
            }
            
            setAnimateOut(false)
          }, 500)*/
            if (element === "Themes") {
              setIsThemes(false)
            } else if (element === "History") {
              setShoWarning(false)
            } else if (element === "Extra") {
              if (showAbout && showSupport) {
                setShowSupport(false)
              } else {
                setIsExtra(false)
              }
            }
        } else {
          element === "History" ? setIsHistory(false) : setShowAbout(false)
        }
      }
    }
  }
  
  useEffect(() => {
    if (!isNative) return
    
    const backHandler = App.addListener('backButton', ({ canGoBack }) => {
      if (isThemes || isHistory || isExtra) {
        handleBackAnimation()
      } else {
        App.exitApp();
      }
    });
      
      return () => {
        backHandler.remove();
      };
      
    }, [isThemes, isHistory, isExtra, showAbout, showSupport, shoWarning]);

  const [moreKey, setMoreKey] = useState(false);
  const [invKey, setInvKey] = useState(false);
  const [isDeg, setIsDeg] = useState(false);

  function history(id, inputStr, calcArr, answer, timestamp) {
    this.id = id
    this.inputStr = inputStr
    this.calcArr = calcArr
    this.answer = answer
    this.time = timestamp
  }
  
  const [contextMenu, setContextMenu] = useState({
      show: false,
      x: 0,
      y: 0,
      selectedItem: null
  })

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const shouldSystemDark = savedMode ? (savedMode === 'dark') : isSystemDark;
    if (shouldSystemDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    if (savedMode) {
      if (isDarkMode) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isNative) {
      updateSystemBar(isDarkMode, isBlue, isGreen, isYellow, isRed, isPurple);

      keepScreenOn();
  
      return () => {
        KeepAwake.allowSleep().catch(console.error);
      }
    }
  }, [isNative, isDarkMode, isBlue, isGreen, isYellow, isRed, isPurple, isOrange])

  const checkFont = () => {
    const savedFont = JSON.parse(localStorage.getItem('font'))
    const fontArray = ["abel", "open", "barlow", "josefin", "montserrat", "digital", "googleSans", "dotty", "orbitron", "tiny"]

    let shouldFont = savedFont.abel ? "abel" : savedFont.open ? "open" : savedFont.barlow ? "barlow" : savedFont.josefin ? "josefin" : savedFont.montserrat ? "montserrat" : savedFont.digital ? "digital" : savedFont.googleSans ? "googleSans" : savedFont.dotty ? "dotty" : savedFont.orbitron ? "orbitron" : savedFont.tiny ? "tiny" : "";

    for (let i = 0; i < fontArray.length; i++) {
        const element = fontArray[i]
        if (element === shouldFont) {
            root.classList.add(element);
            //console.log("added", element)
            element === "abel" ? setIsAbel(true) : element === "open" ? setIsOpen(true) : element === "barlow" ? setIsBarlow(true) : element === "josefin" ? setIsJosefin(true) : element === "montserrat" ? setIsMontserrat(true) : element === "digital" ? setIsDigital(true) : element === "googleSans" ? setIsGoogleSans(true) : element === "dotty" ? setIsDotty(true) : element === "orbitron" ? setIsOrbitron(true) : element === "tiny" ? setIsTiny(true) : "";
        }
    }
  }

  useEffect(() => {
      const savedTheme = JSON.parse(localStorage.getItem('colorScheme'))
      const themeArray = ["blue", "green", "yellow", "red", "purple", "orange"]

      try {
          let shouldTheme = savedTheme.blue ? "blue" : savedTheme.green ? "green" : savedTheme.yellow ? "yellow" : savedTheme.red ? "red" : savedTheme.purple ? "purple" : savedTheme.orange ? "orange" : ""
          console.log(shouldTheme)
  
          for (let i = 0; i < themeArray.length; i++) {
              const element = themeArray[i]
              if (element === shouldTheme) {
                  if (element !== "blue") {
                      root.classList.add(element);
                      setIsBlue(false)
                  }
                  element === "blue" ? setIsBlue(true) : element === "green" ? setIsGreen(true) : element === "yellow" ? setIsYellow(true) : element === "red" ? setIsRed(true) : element === "purple" ? setIsPurple(true) : element === "orange" ? setIsOrange(true) : ""
              }
          }

          if (!systemFont) checkFont();
      } catch (error) {
          console.log("No saved themes")
      }
  }, [])

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(defHistory));
  }, [defHistory])

  useEffect(() => {
    localStorage.setItem('continue', JSON.stringify(isContinue));
    localStorage.setItem('smartCntd', JSON.stringify(continueSmart));
    localStorage.setItem('freshStart', JSON.stringify(isStartFresh));
  }, [isContinue, continueSmart, isStartFresh])

  useEffect(() => {
    localStorage.setItem('systemFont', JSON.stringify(systemFont));
    localStorage.setItem('separateFont', JSON.stringify(separateFont));
  }, [systemFont, separateFont])

  useEffect(() => {
    const result = Calculation({input: calculationArr, isDeg})
    const [errorPrefix, errorMessage] = result.split(":");

    let isDivision = input[input.length - 2];
    let lastInput = input[input.length - 1];
    let isDivideZero = isDivision + lastInput;
    setShowResult(false)
    //console.log(calculationArr)
    
    if (errorPrefix === "Math Error") {
      isDivideZero === "/0" ? setAnswer(errorMessage) : setAnswer(errorPrefix)
    } else if (errorPrefix === "Error") {
      setAnswer("")
    } else {
      if (!input) {
        Calculation({input: [], isDeg: null});
      }
      setAnswer(result)
    }
  }, [input])

  const getVisualLength = (item) => {
      if (item.startsWith("In(")) return 3;
      if (item.startsWith("sin(") || item.startsWith("cos(") || item.startsWith("tan(") || item.startsWith("log(")) return 4;
      if (item.startsWith("arcsin(") || item.startsWith("arccos(") || item.startsWith("arctan(")) return 7;
      if (item === "^(-1)") return 5;
      if (item === "sqrt" || item === "pi") return 1;

      return item.length
  }

  const getArraySelection = (start, end) => {
    let currentPos = 0;
    let startIndex = -1;
    let deleteCount = 0;

    for (let i = 0; i < calculationArr.length; i++) {
      const itemLen = getVisualLength(calculationArr[i]);

      if (currentPos === start) {
        startIndex = i;
      }

      if (startIndex !== -1 && currentPos < end) {
        deleteCount++;
      }
      currentPos += itemLen;
    }

    return { startIndex, deleteCount };
  }

  const handleSmartInsertion = (value, calcVal) => {
    let cursorStart = inputRef.current ? inputRef.current.selectionStart : input.length;
    let cursorEnd = inputRef.current ? inputRef.current.selectionEnd : input.length;
    const operators = ["+", "-", "/", "x", "^"]

    if (cursorStart !== cursorEnd) {
      const { startIndex, deleteCount } = getArraySelection(cursorStart, cursorEnd);

      if (startIndex !== -1) {
        const tempArr = [...calculationArr];
        tempArr.splice(startIndex, deleteCount);
        setCalculationArr(tempArr);

        const tempStr = input.slice(0, cursorStart) + input.slice(cursorEnd);
        setInput(tempStr);

        cursorEnd = cursorStart;

        var simulatedArr = tempArr;
        var simulatedInput = tempStr;
      }
    } else {
      var simulatedArr = calculationArr;
      var simulatedInput = input;
    }

    const isNewInputOperator = operators.includes(value) || value === "!";

    if (cursorStart === simulatedInput.length) {
      let lastInput = simulatedInput[simulatedInput.length - 1];

      if (!simulatedInput && (isNewInputOperator || value === "^(-1)" || value === "%")) {
        if (isNewInputOperator || value === "^(-1)" || value === "%") {
          setInput("0" + value);

          setCalculationArr(["0"])
          setCalculationArr((prevArr) => [...prevArr, calcVal]);
          return;
        }
      }
      
      if (simulatedInput === "0") {
        if (value === "0") {
          return
        }
      }
      
      if (showResult) {
        if (!isStartFresh) {
          if (isContinue) {
            if (isNewInputOperator && operators.includes(lastInput)) {
              setInput((prevInput) => prevInput.slice(0, -1) + value);
  
              setCalculationArr((prevArr) => [...prevArr.slice(0, -1), calcVal]);
              return;
            }
  
            setInput((prevInput) => prevInput + value);
            setCalculationArr((prevArr) => [...prevArr, calcVal]);
            return;
          }

          if (continueSmart) {
            if (isNewInputOperator || value === "^(-1)" || value === "%") {
              setInput("")
              setInput((prevInput) => prevInput + answer);
              setInput((prevInput) => prevInput + value);
  
              setCalculationArr([])
              setCalculationArr((prevArr) => [...prevArr, answer]);
              setCalculationArr((prevArr) => [...prevArr, calcVal]);
              return;
            } else {
              setInput("")
              setInput((prevInput) => prevInput + value);
  
              setCalculationArr([])
              setCalculationArr((prevArr) => [...prevArr, calcVal]);
              return;
            }
          } else if (!continueSmart) {
            setInput("")
            setInput((prevInput) => prevInput + answer);
            setInput((prevInput) => prevInput + value);
  
            setCalculationArr([])
            setCalculationArr((prevArr) => [...prevArr, answer]);
            setCalculationArr((prevArr) => [...prevArr, calcVal]);
            return;
          }
        } else if (isStartFresh) {
          setInput("")
          setInput((prevInput) => prevInput + value);

          setCalculationArr([])
          setCalculationArr((prevArr) => [...prevArr, calcVal]);
          return;
        }
      }

      if (isNewInputOperator && operators.includes(lastInput)) {
        setInput((prevInput) => prevInput.slice(0, -1) + value);

        setCalculationArr((prevArr) => [...prevArr.slice(0, -1), calcVal]);
        return;
      }

      setInput((prevInput) => prevInput + value);
      setCalculationArr((prevArr) => [...prevArr, calcVal]);
      return;
    }

    let currentPos = 0;
    let insertIndex = simulatedArr.length;

    for (let i = 0; i < simulatedArr.length; i++) {
      if (currentPos === cursorStart) {
        insertIndex = i;
        break;
      }
      currentPos += getVisualLength(simulatedArr[i]);
    }

    const prevItemVal = cursorStart > 0 ? simulatedInput[cursorStart - 1] : null;

    if (isNewInputOperator && operators.includes(prevItemVal)) {
      const newArr = [...simulatedArr];
      newArr.splice(insertIndex - 1, 1, calcVal);

      const newStr = simulatedInput.slice(0, cursorStart - 1) + value + simulatedInput.slice(cursorStart);

      setCalculationArr(newArr);
      setInput(newStr);

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(cursorStart, cursorStart);

          inputRef.current.focus();
        }
      }, 0);
      return
    }

    const newArr = [...simulatedArr];
    newArr.splice(insertIndex, 0, calcVal);

    const newStr = simulatedInput.slice(0, cursorStart) + value + simulatedInput.slice(cursorStart);

    setCalculationArr(newArr);
    setInput(newStr);

    setTimeout(() => {
      if (inputRef.current) {
        const visualLen = getVisualLength(value);
        const newCursor = cursorStart + visualLen;
        inputRef.current.setSelectionRange(newCursor, newCursor);

        inputRef.current.focus();
      }
    }, 0)
  }

  const findArrayIndex = (e, ref) => {
    if (calculationArr.length === 0) return;
    let cursorStart = ref.current.selectionStart;
    let cursorEnd = ref.current.selectionEnd;

    if (e === "Backspace") {
      if (cursorStart === 0) return;
    } else {
      if (cursorStart === input.length) return;
    }

    if (cursorStart !== cursorEnd) {
      const { startIndex, deleteCount } = getArraySelection(cursorStart, cursorEnd);

      if (startIndex !== -1) {
        const tempArr = [...calculationArr];
        tempArr.splice(startIndex, deleteCount);
        setCalculationArr(tempArr);

        const tempStr = input.slice(0, cursorStart) + input.slice(cursorEnd);
        setInput(tempStr);

        setTimeout(() => {
          if (ref.current) {
            ref.current.setSelectionRange(cursorStart, cursorStart);

            ref.current.focus();
          }
        }, 0)
      }
      return;
    }

    if (showResult) {
      if (isStartFresh || (!isContinue && continueSmart)) {
        setInput("")
        setCalculationArr([])
        return
      }
    }

    let currentPos = 0;
    let targetIndex = -1;
    let charsToRemove = 0;

    for (let i = 0; i < calculationArr.length; i++) {
      const itemLen = getVisualLength(calculationArr[i]);
      e === "Backspace" ? currentPos += itemLen : "";

      if (currentPos === cursorStart) {
        targetIndex = i;
        charsToRemove = itemLen;
        break;
      }
      e === "Delete" ? currentPos += itemLen : "";
    }

    if (targetIndex !== -1) {
      const newArr = [...calculationArr]
      newArr.splice(targetIndex, 1);

      let newStr
      e === "Backspace" ? newStr = input.slice(0, cursorStart - charsToRemove) + input.slice(cursorStart) : newStr = input.slice(0, cursorStart) + input.slice(cursorStart + charsToRemove);

      setCalculationArr(newArr);
      setInput(newStr);

      setTimeout(() => {
        if (ref.current) {
          if (e === "Backspace") {
            const newCursorPos = cursorStart - charsToRemove;
            ref.current.setSelectionRange(newCursorPos, newCursorPos);

            ref.current.focus();
          } else {
            ref.current.setSelectionRange(cursorStart, cursorStart);

            ref.current.focus();
          }
        }
      }, 0)
    }
  }

  const setAllowedKeys = (e) => setInput(e);
  const minResult = (e) => setShowResult(e);

  const countOpenInputBrackets = (arr) => {
    let openBrackets = 0;
    for (const element of arr) {
      if (element === '(' || element.endsWith('(')) {
        openBrackets++;
      } else if (element === ')') {
        openBrackets--;
      }
    }
    return openBrackets > 0 ? openBrackets : 0;
  }

  const countOpenCalcBrackets = (arr) => {
    let openBrackets = 0;
    for (const element of arr) {
      const strElement = String(element);

      const opens = (strElement.match(/\(/g) || []).length
      const closes = (strElement.match(/\)/g) || []).length

      openBrackets += (opens - closes);
    }
    return openBrackets > 0 ? openBrackets : 0;
  }

  const handleInput = (value, more, cancel, multiply, invSin, invCos, invTan, pow, inv) => {
   switch (value) {
    case 'C':
      setInput('');
      setCalculationArr([]);
      setAnswer('');
      Calculation({input: [], isDeg: null});
      break;
    case cancel:
      input.endsWith("Syntax Error") ? setInput('') : '';
      input.endsWith("Math Error") ? setInput('') : '';
      /*const newArr = [...calculationArr]
      const removedItem = newArr.pop();
      let charsToRemove

      if (removedItem === "sqrt" || removedItem === "pi") {
        charsToRemove = 1
      } else {
        charsToRemove = removedItem.length
      }

      setInput((prevInput) => prevInput.slice(0, -charsToRemove))
      setCalculationArr(newArr);*/
      findArrayIndex("Backspace", inputRef)
      break;
    case more:
      !moreKey ? setMoreKey(true) : setMoreKey(false);
      break;
    case multiply:
      input.endsWith("Syntax Error") ? setInput('') : '';
      input.endsWith("Math Error") ? setInput('') : '';

      handleSmartInsertion("x", "*")
      break;
    case 'Inv':
      !invKey ? setInvKey(true) : setInvKey(false);
      break;
    case 'Deg':
      setIsDeg(true);
      break;
    case 'Rad':
      setIsDeg(false);
      break;
    case invSin:
      input.endsWith("Syntax Error") ? setInput('') : '';
      input.endsWith("Math Error") ? setInput('') : '';

      handleSmartInsertion("arcsin(", "arcsin(")
      break;
    case invCos:
      input.endsWith("Syntax Error") ? setInput('') : '';
      input.endsWith("Math Error") ? setInput('') : '';
      
      handleSmartInsertion("arccos(", "arccos(")
      break;
    case invTan:
      input.endsWith("Syntax Error") ? setInput('') : '';
      input.endsWith("Math Error") ? setInput('') : '';
      
      handleSmartInsertion("arctan(", "arctan(")
      break;
    case pow:
      input.endsWith("Syntax Error") ? setInput('') : '';
      input.endsWith("Math Error") ? setInput('') : '';
      
      handleSmartInsertion("^", "^")
      break;
    case ")":
      input.endsWith("Syntax Error") ? setInput('') : '';
      input.endsWith("Math Error") ? setInput('') : '';

      if (countOpenInputBrackets(input) <= 0) return;

      handleSmartInsertion(")", ")");
      break;
    case "√x":
      input.endsWith("Syntax Error") ? setInput('') : '';
      input.endsWith("Math Error") ? setInput('') : '';

      handleSmartInsertion("√", "sqrt")
      break;
    case "x!":
      input.endsWith("Syntax Error") ? setInput('') : '';
      input.endsWith("Math Error") ? setInput('') : '';
      
      handleSmartInsertion("!", "!")
      break;
    case "π":
      input.endsWith("Syntax Error") ? setInput('') : '';
      input.endsWith("Math Error") ? setInput('') : '';

      handleSmartInsertion("π", "pi")
      break;
    case inv:
      input.endsWith("Syntax Error") ? setInput('') : '';
      input.endsWith("Math Error") ? setInput('') : '';

      handleSmartInsertion("^(-1)", "^(-1)")
      break;
    case '=':
      setCalculationArr((prevArr) => {
        const inputBracketsNeeded = countOpenInputBrackets(input);
        const calcBracketsNeeded = countOpenCalcBrackets(calculationArr);

        let closingInputBrackets = '';
        let closingCalcBrackets = calcBracketsNeeded;

        if (inputBracketsNeeded > 0) {
          closingInputBrackets = ')'.repeat(inputBracketsNeeded);
        }
      
        const result = Calculation({input: prevArr, isDeg})
        const [errorPrefix, errorMessage] = result.split(":");

        let isDivision = input[input.length - 2];
        let lastInput = input[input.length - 1];
        let isDivideZero = isDivision + lastInput;

        if (errorPrefix === "Math Error") {
          isDivideZero === "/0" ? setAnswer("Can't divide by zero") : setAnswer(errorMessage);
        } else if (errorPrefix === "Error") {
          setAnswer(errorMessage)
        } else {
          setAnswer(result)
          setInput(prevInput => {
            return prevInput + closingInputBrackets;
          })
          while (closingCalcBrackets > 0) {
            setCalculationArr(prevArr => {
              return [...prevArr, ")"];
            })
            closingCalcBrackets--
          }
        }
        input ? setShowResult(true) : "";
        const theHistory = new history(id, input, calculationArr, answer, timestamp);
        input && !showResult ? setDefHistory(prev => [...prev, theHistory]) : "";
        return prevArr
      })
      break;
    default:
      input.endsWith("Syntax Error") ? setInput('') : '';
      input.endsWith("Math Error") ? setInput('') : '';
      
      handleSmartInsertion(value, value)
      break;
    }
  }

  return (
    <main className={`relative h-screen flex justify-center items-center gap-10 ${isNative ? "pt-[calc(7rem+env(safe-area-inset-top))] pb-[calc(2rem+env(safe-area-inset-bottom))]" : "" } overflow-hidden`} onClick={() => setContextMenu({ show:false, x: 0, y: 0, selectedItem: null })}>
      <div className={`${isThemes || (isHistory && isWeb) || isExtra ? "md:motion-preset-slide-left md:motion-duration-500" : ""} relative w-full max-w-md min-w-[320px] sm:h-full sm:max-h-[600px] max-sm:h-screen ${isWeb ? "md:border border-gray-700 dark:border-white rounded-xl" : ""}`}>
        <Display input={input} setInput={setAllowedKeys} setInputRef={setInputRef} getVisualLength={getVisualLength} useDefKeys={findArrayIndex} calculationArr={calculationArr} answer={answer} setThemes={setIsThemes} setHistory={setIsHistory} setExtra={setIsExtra} showResult={showResult} setShowResult={minResult} />
        <Input setInput={handleInput} moreKey={moreKey} invKey={invKey} isDeg={isDeg} />
      </div>
      {
        isThemes ?
          <div className={`relative max-sm:fixed top-0 left-0 transition-transform duration-500 ease-in-out ${animateOut ? '-translate-x-full' : 'motion-preset-slide-right motion-duration-500'} w-full max-w-md min-w-[320px] max-sm:max-w-screen sm:h-full sm:max-h-[600px] max-sm:h-screen bg-app-lightest dark:bg-app-darkest ${isWeb ? "md:border border-gray-700 dark:border-white rounded-lg" : ""} overflow-auto`}>
            <Themes setThemes={setIsThemes} isBlue={isBlue} setIsBlue={setIsBlue} isGreen={isGreen} setIsGreen={setIsGreen} isYellow={isYellow} setIsYellow={setIsYellow} isRed={isRed} setIsRed={setIsRed} isPurple={isPurple} setIsPurple={setIsPurple} isOrange={isOrange} setIsOrange={setIsOrange} isAbel={isAbel} setIsAbel={setIsAbel} isOpen={isOpen} setIsOpen={setIsOpen} isBarlow={isBarlow} setIsBarlow={setIsBarlow} isJosefin={isJosefin} setIsJosefin={setIsJosefin} isMontserrat={isMontserrat} setIsMontserrat={setIsMontserrat} isDigital={isDigital} setIsDigital={setIsDigital} isGoogleSans={isGoogleSans} setIsGoogleSans={setIsGoogleSans} isDotty={isDotty} setIsDotty={setIsDotty} isOrbitron={isOrbitron} setIsOrbitron={setIsOrbitron} isTiny={isTiny} setIsTiny={setIsTiny} systemFont={systemFont} separateFont={separateFont} animateBack={handleBackAnimation} />
          </div>
        :
          <></>
      }
      {
        (isHistory && isWeb) || isNative ?
          <div className={`history relative max-sm:fixed bottom-0 left-0 transition-transform duration-500 ease-in-out ${isWeb && animateOut ? '-translate-x-full' : 'motion-preset-slide-right motion-duration-500'} w-full max-w-md min-w-[320px] max-sm:max-w-screen sm:h-full sm:max-h-[600px] max-sm:h-screen bg-app-lightest dark:bg-app-darkest transition-transform duration-500 ease-in-out ${isWeb ? "md:border border-gray-700 dark:border-white rounded-lg" : ""} overflow-auto z-50`} style={{ transform: (isHistory && isNative) ? 'translateY(0)' : (!isHistory && isNative) ? 'translateY(100%)' : '' }}>
            <History theHistory={isHistory} setHistory={setIsHistory} setDefHistory={setDefHistory} setInput={setInput} setCalculationArr={setCalculationArr} calculations={defHistory} contextMenu={contextMenu} setContextMenu={setContextMenu} separateFont={separateFont} shoWarning={shoWarning} setShoWarning={setShoWarning} animateOut={animateOut} animateBack={handleBackAnimation} />
          </div>
          :
          <></>
      }
      {
        isExtra ?
          <div className={`relative max-sm:fixed top-0 left-0 transition-transform duration-500 ease-in-out ${animateOut ? '-translate-x-full' : 'motion-preset-slide-right motion-duration-500'} w-full max-w-md min-w-[320px] max-sm:max-w-screen sm:h-full sm:max-h-[600px] max-sm:h-screen bg-app-lightest dark:bg-app-darkest ${isWeb ? "md:border border-gray-700 dark:border-white rounded-lg" : ""} overflow-auto`}>
            <Extra setExtra={setIsExtra} isContinue={isContinue} setContinue={setIsContinue} isSmart={continueSmart} setSmart={setContinueSmart} isFreshStart={isStartFresh} setFreshStart={setIsStartFresh} systemFont={systemFont} setSystemFont={setSystemFont} separateFont={separateFont} setSeparateFont={setSeparateFont} checkFont={checkFont} showAbout={showAbout} setShowAbout={setShowAbout} isdarkMode={isDarkMode} isblue={isBlue} isgreen={isGreen} isyellow={isYellow} isred={isRed} ispurple={isPurple} showSupport={showSupport} setShowSupport={setShowSupport} animateOut={animateOut} animateBack={handleBackAnimation} />
          </div>
        :
          <></>
      }
    </main>
  )
}

export default Main
