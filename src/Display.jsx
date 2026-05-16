import React, { useRef, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faGears, faHistory, faMoon, faPaintBrush, faSun } from '@fortawesome/free-solid-svg-icons';
import { DarkModeContext } from './contexts/darkMode';
import { triggerHaptic } from './utils';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { Keyboard } from '@capacitor/keyboard';
import { IonIcon } from '@ionic/react';
import { desktopOutline, cog, moon, brush, sunny } from 'ionicons/icons';

const Display = ({input, setInput, setInputRef, getVisualLength, useDefKeys, calculationArr, answer, setThemes, setHistory, setExtra, showResult, setShowResult}) => {
    const root = window.document.documentElement;
    const platform = Capacitor.getPlatform();
    const isNative = platform === 'ios' || platform === 'android';
    const isWeb = platform === 'web';
    const smallScreen = window.matchMedia('(max-width: 768px)');
    const largeFont = root.classList.contains('montserrat') || root.classList.contains('orbitron');
    const { toggleDarkMode, useSystemTheme, useSystem } = useContext(DarkModeContext);
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            const isAtEnd = inputRef.current.selectionStart === input.length;

            if (isAtEnd) {
                inputRef.current.scrollLeft = inputRef.current.scrollWidth;
            }
        }
        setInputRef(inputRef)
    }, [input]);

    /*const handleInputFocus = async (e) => {
        if (isNative) {
            await Keyboard.hide();
        }
    }*/
    
    useEffect(() => {
        if (!isNative) return;
    
        // Listen for the app coming back from the background
        const appStateListener = App.addListener('appStateChange', async ({ isActive }) => {
            if (isActive) {
                await Keyboard.hide(); // Slam the keyboard shut instantly
                
                // Optional: completely remove focus from the input to be safe
                if (inputRef.current) {
                    inputRef.current.blur();
                }
            }
        });
    
        return () => {
            appStateListener.then(listener => listener.remove());
        };
    }, [isNative]);

    const disableKeyBoard = (e) => {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
        !allowedKeys.includes(e.key) ? e.preventDefault() : '';

        if (e.key === "Backspace" || e.key === "Delete") {
            e.preventDefault()
            useDefKeys(e.key, inputRef)
        }
    }

    const handleCursorSnap = () => {
        setShowResult(false)
        if (!inputRef.current) return;

        const start = inputRef.current.selectionStart;
        const end = inputRef.current.selectionEnd;

        const findNearestBoundary = (pos) => {
            let currentPos = 0;

            for (let i = 0; i < calculationArr.length; i++) {
                const itemLen = getVisualLength(calculationArr[i]);
                const tokenStart = currentPos;
                const tokenEnd = currentPos + itemLen;

                if (pos > tokenStart && pos < tokenEnd) {
                    return (pos - tokenStart > itemLen / 2) ? tokenEnd : tokenStart;
                }
                currentPos += itemLen;
            }
            return pos;
        }

        const newStart = findNearestBoundary(start);
        const newEnd = findNearestBoundary(end);

        if (newStart !== start || newEnd !== end) {
            inputRef.current.setSelectionRange(newStart, newEnd);
        }
    }

    const getDynamicTextSize = () => {
        if (showResult) return 'text-5xl md:text-6xl dotty:text-7xl dotty:md:text-8xl orbitron:text-[39px] orbitron:md:text-[48px] googleSans:text-[39px] googleSans:md:text-[48px]';

        const len = input ? input.length : 0;
        if (smallScreen.matches) {
            if (largeFont ? len < 10 : len < 14) return 'text-5xl md:text-6xl dotty:text-7xl dotty:md:text-8xl orbitron:text-[39px] orbitron:md:text-[48px] googleSans:text-[39px] googleSans:md:text-[48px]';
            if (largeFont ? len < 13 : len < 16) return 'text-4xl md:text-5xl dotty:text-6xl dotty:md:text-7xl orbitron:text-[33px] orbitron:md:text-[39px] googleSans:text-[33px] googleSans:md:text-[39px]';
            return 'text-3xl md:text-4xl dotty:text-5xl dotty:md:text-6xl orbitron:text-[28px] orbitron:md:text-[33px] googleSans:text-[28px] googleSans:md:text-[33px]';
        } else {
            if (largeFont ? len < 12 : len < 15) return 'text-5xl md:text-6xl dotty:text-7xl dotty:md:text-8xl orbitron:text-[39px] orbitron:md:text-[48px] googleSans:text-[39px] googleSans:md:text-[48px]';
            if (largeFont ? len < 15 : len < 20) return 'text-4xl md:text-5xl dotty:text-6xl dotty:md:text-7xl orbitron:text-[33px] orbitron:md:text-[39px] googleSans:text-[33px] googleSans:md:text-[39px]';
            return 'text-3xl md:text-4xl dotty:text-5xl dotty:md:text-6xl orbitron:text-[28px] orbitron:md:text-[33px] googleSans:text-[28px] googleSans:md:text-[33px]';
        }
    }

    return (
        <div className="displayBox relative flex flex-wrap justify-center items-end w-full h-1/3 dark:text-white font-system abel:font-abel open:font-open barlow:font-barlow josefin:font-josefin montserrat:font-montserrat digital:font-digital googleSans:font-googleSans dotty:font-dotty orbitron:font-orbitron tiny:font-tiny px-4 overflow-hidden">
            <div className="history absolute top-5 left-10 text-app-darker dark:text-app-lighter text-base md:text-lg cursor-pointer">
                <FontAwesomeIcon icon={faHistory} onClick={()=> {
                    triggerHaptic();
                    setExtra(false)
                    setThemes(false)
                    setHistory(true)
                }} />
            </div>
            <div className="options absolute top-3 right-5 h-8 inline-flex justify-center items-center pl-2 pr-5 text-app-darker dark:text-app-lighter text-base space-x-3 border rounded-2xl">
                <div className="themeBox relative h-8/10 inline-flex justify-center items-center border border-gray-900 dark:border-gray-500 rounded-2xl">
                    <div className={`system ${useSystemTheme ? 'active bg-app-lighter dark:bg-app-darker' : ''} w-full h-full flex justify-center items-center rounded-2xl`}>
                        {isNative ?
                                <IonIcon icon={desktopOutline} className="cursor-pointer px-2" onClick={useSystem} />
                        :
                                <FontAwesomeIcon icon={faDesktop} className="cursor-pointer px-2" onClick={useSystem} />
                        }
                    </div>
                    <div className={`saved ${!useSystemTheme ? 'active bg-app-lighter dark:bg-app-darker' : ''} w-full h-full inline-flex justify-center items-center rounded-2xl`}>
                        {isNative ? <IonIcon icon={sunny} id="lightIcon" className="px-2" onClick={()=> {
                            triggerHaptic();
                            toggleDarkMode(true)
                        }} /> : <FontAwesomeIcon icon={faSun} id="lightIcon" className="px-2" onClick={()=> {
                                triggerHaptic();
                                toggleDarkMode(true)
                            }} />}
                        {isNative ? <IonIcon icon={moon} id="darkIcon" className="px-2" onClick={()=> {
                            triggerHaptic();
                            toggleDarkMode(false)
                        }} /> : <FontAwesomeIcon icon={faMoon} id="darkIcon" className="px-2" onClick={()=> {
                                triggerHaptic();
                                toggleDarkMode(false)
                            }} />}
                    </div>
                </div>
                {isNative ?
                    <IonIcon icon={brush} className="text-xl md:text-base cursor-pointer" onClick={()=> {
                    triggerHaptic();
                    setHistory(false)
                    setExtra(false)
                    setThemes(true)
                    }} />
                :
                    <FontAwesomeIcon icon={faPaintBrush} className="text-base cursor-pointer" onClick={()=> {
                    triggerHaptic();
                    setHistory(false)
                    setExtra(false)
                    setThemes(true)
                    }} />
                }
                {isNative ?
                    <IonIcon icon={cog} className="text-xl md:text-base cursor-pointer" onClick={()=> {
                    triggerHaptic();
                    setThemes(false)
                    setHistory(false)
                    setExtra(true)
                    }} />
                :
                    <FontAwesomeIcon icon={faGears} className="text-base cursor-pointer" onClick={()=> {
                    triggerHaptic();
                    setThemes(false)
                    setHistory(false)
                    setExtra(true)
                    }} />
                }
            </div>
            <div className='relative w-full h-2/3 flex items-center justify-center'>
                <input className={`absolute w-full ${getDynamicTextSize()} outline-none text-right font-semibold origin-right transition-all duration-500 ease-in-out digital:leading-none digital:pb-2 ${showResult && !isNative ? 'bottom-1/10 scale-[60%] md:scale-50 px-4 cursor-default text-gray-600 dark:text-gray-300' : showResult && isNative ? 'bottom-3/10 scale-[60%] md:scale-50 px-4 cursor-default text-gray-600 dark:text-gray-300' : !showResult && !isNative ? 'bottom-[55%] md:bottom-5/10 px-2 scale-100' : 'bottom-[65%] md:bottom-5/10 px-2 scale-100'} caret-app-darker dark:caret-app-lighter selection:bg-app-dark dark:selection:bg-app-light selection:text-white dark:selection:text-black`} inputMode="none" type="text" onKeyDown={isWeb ? disableKeyBoard : undefined} onKeyUp={handleCursorSnap} ref={inputRef} value={input || 0} onChange={(e) => setInput(e.target.value)} onClick={handleCursorSnap} readOnly={showResult} />
                <input onMouseDown={(e) => e.preventDefault()} className={`absolute right-0 text-5xl md:text-6xl dotty:text-7xl dotty:md:text-8xl orbitron:text-4xl orbitron:md:text-5xl googleSans:text-[39px] googleSans:md:text-[48px] outline-none text-right font-semibold origin-right transition-all duration-500 ease-in-out digital:leading-none digital:pb-2 ${showResult && !isNative ? 'w-full bottom-[55%] md:bottom-5/10 px-2 scale-100' : showResult && isNative ? 'w-full bottom-[65%] md:bottom-5/10 px-2 scale-100' : !showResult && !isNative ? 'w-3/2 bottom-1/10 scale-[60%] md:scale-50 px-4 text-gray-600 dark:text-gray-300' : 'w-3/2 bottom-3/10 scale-[60%] md:scale-50 px-4 text-gray-600 dark:text-gray-300'} border-none selection:bg-[#0F5C91] dark:selection:bg-[#85C4EE] selection:text-white dark:selection:text-black ${answer ? 'motion-translate-y-in-25' : ''} cursor-default`} value={answer} readOnly />
            </div>
        </div>
    )
}

export default Display