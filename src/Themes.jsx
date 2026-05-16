import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Capacitor } from '@capacitor/core';
import { triggerHaptic } from './utils';
import { IonIcon } from '@ionic/react';
import { closeCircle, chevronDown, chevronUp } from 'ionicons/icons';

const Themes = ({setThemes, isBlue, setIsBlue, isGreen, setIsGreen, isYellow, setIsYellow, isRed, setIsRed, isPurple, setIsPurple, isOrange, setIsOrange, isAbel, setIsAbel, isOpen, setIsOpen, isBarlow, setIsBarlow, isJosefin, setIsJosefin, isMontserrat, setIsMontserrat, isDigital, setIsDigital, isGoogleSans, setIsGoogleSans, isDotty, setIsDotty, isOrbitron, setIsOrbitron, isTiny, setIsTiny, systemFont, separateFont, animateBack}) => {
    const root = window.document.documentElement;
    const platform = Capacitor.getPlatform();
    const isNative = platform === 'ios' || platform === 'android';
    const isWeb = platform === 'web';

    const [dropDown, setDropDown] = useState(false);
    const [dropDown2, setDropDown2] = useState(false);

    function chckActThm(mode) {
        const themeArray = ["blue", "green", "yellow", "red", "purple", "orange"]
        const fontArray = ["abel", "open", "barlow", "josefin", "montserrat", "digital", "googleSans", "dotty", "orbitron", "tiny"]

        let theme = isBlue ? "blue" : isGreen ? "green" : isYellow ? "yellow" : isRed ? "red" : isPurple ? "purple" : isOrange ? "orange" : "";
        let font = isAbel ? "abel" : isOpen ? "open" : isBarlow ? "barlow" : isJosefin ? "josefin" : isMontserrat ? "montserrat" : isDigital ? "digital" : isGoogleSans ? "googleSans" : isDotty ? "dotty" : isOrbitron ? "orbitron" : isTiny ? "tiny" : "";

        if (mode === "color") {
            for (let i = 0; i < themeArray.length; i++) {
                const element = themeArray[i]
                if (element === theme) {
                    if (element !== "blue") {
                        root.classList.remove(element);
                    }
                    element === "blue" ? setIsBlue(false) : element === "green" ? setIsGreen(false) : element === "yellow" ? setIsYellow(false) : element === "red" ? setIsRed(false) : element === "purple" ? setIsPurple(false) : element === "orange" ? setIsOrange(false) : "";
                }
            }
        } else if (mode === "font") {
            for (let i = 0; i < fontArray.length; i++) {
                const element = fontArray[i]
                if (element === font) {
                    root.classList.remove(element)
                    //console.log("removed", element)
                    element === "abel" ? setIsAbel(false) : element === "open" ? setIsOpen(false) : element === "barlow" ? setIsBarlow(false) : element === "josefin" ? setIsJosefin(false) : element === "montserrat" ? setIsMontserrat(false) : element === "digital" ? setIsDigital(false) : element === "googleSans" ? setIsGoogleSans(false) : element === "dotty" ? setIsDotty(false) : element === "orbitron" ? setIsOrbitron(false) : element === "tiny" ? setIsTiny(false) : "";
                }
            }
        }
    }

    const toTheme = (color) => {
        switch (color) {
            case 'blue':
                if (isBlue) {
                    setIsBlue(true)
                    console.log("Can't toggle off")
                } else {
                    chckActThm("color")
                    setIsBlue(true)
                    localStorage.setItem('colorScheme', JSON.stringify({blue: true, green: false, yellow: false, red: false, purple: false, orange: false}));
                }
                break;
            case 'green':
                if (isGreen) {
                    setIsGreen(true)
                    console.log("Can't toggle off")
                } else {
                    chckActThm("color")
                    root.classList.add("green")
                    setIsGreen(true)
                    localStorage.setItem('colorScheme', JSON.stringify({blue: false, green: true, yellow: false, red: false, purple: false, orange: false}));
                }
                break;
            case 'yellow':
                if (isYellow) {
                    setIsYellow(true)
                    console.log("Can't toggle off")
                } else {
                    chckActThm("color")
                    root.classList.add("yellow")
                    setIsYellow(true)
                    localStorage.setItem('colorScheme', JSON.stringify({blue: false, green: false, yellow: true, red: false, purple: false, orange: false}));
                }
                break;
            case 'red':
                if (isRed) {
                    setIsRed(true)
                    console.log("Can't toggle off")
                } else {
                    chckActThm("color")
                    root.classList.add("red")
                    setIsRed(true)
                    localStorage.setItem('colorScheme', JSON.stringify({blue: false, green: false, yellow: false, red: true, purple: false, orange: false}));
                }
                break;
            case 'purple':
                if (isPurple) {
                    setIsPurple(true)
                    console.log("Can't toggle off")
                } else {
                    chckActThm("color")
                    root.classList.add("purple")
                    setIsPurple(true)
                    localStorage.setItem('colorScheme', JSON.stringify({blue: false, green: false, yellow: false, red: false, purple: true, orange: false}));
                }
                break;
            case 'orange':
                if (isOrange) {
                    setIsOrange(true)
                    console.log("Can't toggle off")
                } else {
                    chckActThm("color")
                    root.classList.add("orange")
                    setIsOrange(true)
                    localStorage.setItem('colorScheme', JSON.stringify({blue: false, green: false, yellow: false, red: false, purple: false, orange: true}));
                }
                break;
            default:
                console.error("unknown theme")
                break;
        }
    }

    const toFont = (font) => {
        if (!systemFont) {
            switch (font) {
                case 'abel':
                    if (isAbel) {
                        setIsAbel(true)
                        console.log("Can't toggle off")
                    } else {
                        chckActThm("font")
                        root.classList.add("abel")
                        setIsAbel(true)
                        localStorage.setItem('font', JSON.stringify({abel: true, open: false, barlow: false, josefin: false, montserrat: false, digital: false, googleSans: false, dotty: false, orbitron: false, tiny: false}));
                    }
                    break;
                case 'open':
                    if (isOpen) {
                        setIsOpen(true)
                        console.log("Can't toggle off")
                    } else {
                        chckActThm("font")
                        root.classList.add("open")
                        setIsOpen(true)
                        localStorage.setItem('font', JSON.stringify({abel: false, open: true, barlow: false, josefin: false, montserrat: false, digital: false, googleSans: false, dotty: false, orbitron: false, tiny: false}));
                    }
                    break;
                case 'barlow':
                    if (isBarlow) {
                        setIsBarlow(true)
                        console.log("Can't toggle off")
                    } else {
                        chckActThm("font")
                        root.classList.add("barlow")
                        setIsBarlow(true)
                        localStorage.setItem('font', JSON.stringify({abel: false, open: false, barlow: true, josefin: false, montserrat: false, digital: false, googleSans: false, dotty: false, orbitron: false, tiny: false}));
                    }
                    break;
                case 'josefin':
                    if (isJosefin) {
                        setIsJosefin(true)
                        console.log("Can't toggle off")
                    } else {
                        chckActThm("font")
                        root.classList.add("josefin")
                        setIsJosefin(true)
                        localStorage.setItem('font', JSON.stringify({abel: false, open: false, barlow: false, josefin: true, montserrat: false, digital: false, googleSans: false, dotty: false, orbitron: false, tiny: false}));
                    }
                    break;
                case 'montserrat':
                    if (isMontserrat) {
                        setIsMontserrat(true)
                        console.log("Can't toggle off")
                    } else {
                        chckActThm("font")
                        root.classList.add("montserrat")
                        setIsMontserrat(true)
                        localStorage.setItem('font', JSON.stringify({abel: false, open: false, barlow: false, josefin: false, montserrat: true, digital: false, googleSans: false, dotty: false, orbitron: false, tiny: false}));
                    }
                    break;
                case 'digital':
                    if (isDigital) {
                        setIsDigital(true)
                        console.log("Can't toggle off")
                    } else {
                        chckActThm("font")
                        root.classList.add("digital")
                        setIsDigital(true)
                        localStorage.setItem('font', JSON.stringify({abel: false, open: false, barlow: false, josefin: false, montserrat: false, digital: true, googleSans: false, dotty: false, orbitron: false, tiny: false}));
                    }
                    break;
                case 'googleSans':
                    if (isGoogleSans) {
                        setIsGoogleSans(true)
                        console.log("Can't toggle off")
                    } else {
                        chckActThm("font")
                        root.classList.add("googleSans")
                        setIsGoogleSans(true)
                        localStorage.setItem('font', JSON.stringify({abel: false, open: false, barlow: false, josefin: false, montserrat: false, digital: false, googleSans: true, dotty: false, orbitron: false, tiny: false}));
                    }
                    break;
                case 'dotty':
                    if (isDotty) {
                        setIsDotty(true)
                        console.log("Can't toggle off")
                    } else {
                        chckActThm("font")
                        root.classList.add("dotty")
                        setIsDotty(true)
                        localStorage.setItem('font', JSON.stringify({abel: false, open: false, barlow: false, josefin: false, montserrat: false, digital: false, googleSans: false, dotty: true, orbitron: false, tiny: false}));
                    }
                    break;
                case 'orbitron':
                    if (isOrbitron) {
                        setIsOrbitron(true)
                        console.log("Can't toggle off")
                    } else {
                        chckActThm("font")
                        root.classList.add("orbitron")
                        setIsOrbitron(true)
                        localStorage.setItem('font', JSON.stringify({abel: false, open: false, barlow: false, josefin: false, montserrat: false, digital: false, googleSans: false, dotty: false, orbitron: true, tiny: false}));
                    }
                    break;
                case 'tiny':
                    if (isTiny) {
                        setIsTiny(true)
                        console.log("Can't toggle off")
                    } else {
                        chckActThm("font")
                        root.classList.add("tiny")
                        setIsTiny(true)
                        localStorage.setItem('font', JSON.stringify({abel: false, open: false, barlow: false, josefin: false, montserrat: false, digital: false, googleSans: false, dotty: false, orbitron: false, tiny: true}));
                    }
                    break;
                default:
                    console.error("unknown font")
                    break;
            }
        } else {
            console.log("System font in use")
        }
    }

    return (
        <div className={`themeBox ${separateFont ? "font-system" : "font-system abel:font-abel open:font-open barlow:font-barlow josefin:font-josefin montserrat:font-montserrat digital:font-digital googleSans:font-googleSans dotty:font-dotty orbitron:font-orbitron tiny:font-tiny"} w-full ${isNative ? "pt-10" : ""} text-app-darker dark:text-app-lighter`}>
            <div className="sticky top-0 left-0 flex flex-nowrap w-full h-16 md:h-20 justify-center items-end gap-[50%] pb-4 bg-app-lightest/50 dark:bg-app-darkest/50 backdrop-opacity-80 backdrop-blur-sm z-50">
                <h1 className={`${separateFont ? "text-2xl md:text-3xl" : "text-2xl md:text-3xl dotty:text-4xl dotty:md:text-5xl orbitron:text-xl orbitron:md:text-2xl googleSans:text-xl googleSans:md:text-2xl"} font-bold`}>Themes</h1>
                {isNative ?
                    <IonIcon icon={closeCircle} className="text-2xl md:text-lg cursor-pointer" onClick={()=> {
                    triggerHaptic()
                    animateBack()
                    }} />
                :
                    <FontAwesomeIcon icon={faXmarkCircle} className="text-2xl md:text-lg cursor-pointer" onClick={()=> {
                    triggerHaptic()
                    animateBack()
                    }} />       
                }
            </div>
            <div className="relative w-full grid gap-2 md:gap-3 grid-cols-[auto] text-app-darkest dark:text-app-lightest px-4 mx-auto">
                <h2 className={`relative ${separateFont ? "text-xl md:text-2xl" : "text-xl md:text-2xl dotty:text-3xl dotty:md:text-4xl orbitron:text-lg orbitron:md:text-xl googleSans:text-lg googleSans:md:text-xl"} font-bold py-1`}>Colors</h2>
                <div className="relative flex justify-left items-center py-2 md:py-3 hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg">
                    <h3 className={`${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-3 md:pl-5`}><i className='text-base opacity-50'>Default</i> Blue</h3>
                    <div id="toggleBlur" onClick={()=> toTheme("blue")} className={` ${isBlue ? "opacity-70 cursor-default" : "cursor-pointer"} absolute right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light`}>
                        <i className={`indicator absolute top-0 ${isBlue ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                    </div>
                </div>
                <div className="relative flex justify-left items-center py-2 md:py-3 hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg">
                    <h3 className={`${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-8 md:pl-10`}>Green</h3>
                    <div id="toggleBlur" onClick={()=> toTheme("green")} className={` ${isGreen ? "opacity-70 cursor-default" : "cursor-pointer"} absolute right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light`}>
                        <i className={`indicator absolute top-0 ${isGreen ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                    </div>
                </div>
                <div className="relative flex justify-left items-center py-2 md:py-3 hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg">
                    <h3 className={`${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-8 md:pl-10`}>Yellow</h3>
                    <div id="toggleBlur" onClick={()=> toTheme("yellow")} className={` ${isYellow ? "opacity-70 cursor-default" : "cursor-pointer"} absolute right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light`}>
                        <i className={`indicator absolute top-0 ${isYellow ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                    </div>
                </div>
                <div className="relative flex justify-left items-center py-2 md:py-3 hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg">
                    <h3 className={`${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-8 md:pl-10`}>Red</h3>
                    <div id="toggleBlur" onClick={()=> toTheme("red")} className={` ${isRed ? "opacity-70 cursor-default" : "cursor-pointer"} absolute right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light`}>
                        <i className={`indicator absolute top-0 ${isRed ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                    </div>
                </div>
                <div className="relative flex justify-left items-center py-2 md:py-3 hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg">
                    <h3 className={`${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-8 md:pl-10`}>Purple</h3>
                    <div id="toggleBlur" onClick={()=> toTheme("purple")} className={` ${isPurple ? "opacity-70 cursor-default" : "cursor-pointer"} absolute right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light`}>
                        <i className={`indicator absolute top-0 ${isPurple ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                    </div>
                </div>
                <div className="relative flex justify-left items-center py-2 md:py-3 hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg">
                    <h3 className={`${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-8 md:pl-10`}>Orange</h3>
                    <div id="toggleBlur" onClick={()=> toTheme("orange")} className={` ${isOrange ? "opacity-70 cursor-default" : "cursor-pointer"} absolute right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light`}>
                        <i className={`indicator absolute top-0 ${isOrange ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                    </div>
                </div>
                <div className="relative flex justify-left items-center py-2 md:py-3 opacity-70">
                    <h3 className={`${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-4 md:pl-6`}>Material You</h3>
                    <div id="toggleBlur" className="absolute right-7 w-8 h-4 rounded-3xl cursor-default z-2 duration-500 bg-app-dark dark:bg-app-light">
                        <i className="indicator absolute top-0 left-0 w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500"></i>
                    </div>
                </div>
                <h2 className={`relative ${separateFont ? "text-xl md:text-2xl" : "text-xl md:text-2xl dotty:text-3xl dotty:md:text-4xl orbitron:text-lg orbitron:md:text-xl googleSans:text-lg googleSans:md:text-x"}l font-bold py-1`}>Fonts</h2>
                <div className={`relative w-full mb-3 ${systemFont ? "opacity-70" : ""}`}>
                    <div className={`relative transition-all mb-2 md:mb-3 duration-300 ease-in-out ${dropDown ? "h-74 md:h-84 border border-app-dark dark:border-app-light" : "h-14 border border-transparent"} rounded-lg overflow-hidden`}>
                        <div className={`relative h-14 flex justify-left items-center ${dropDown ? "rounded-none" : "rounded-lg"} hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125`} onClick={()=> {
                            triggerHaptic();
                            setDropDown(!dropDown)
                            }}>
                                <h3 className={`absolute ${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-8 md:pl-10 font-bold`}>Modern</h3>
                                <div className="absolute right-3 md:right-7 px-2 py-1 rounded-lg cursor-pointer">
                                    {isNative ?
                                            <IonIcon icon={dropDown ? chevronUp : chevronDown} />
                                    :
                                            <FontAwesomeIcon icon={dropDown ? faChevronUp : faChevronDown} />
                                    }
                                </div>
                        </div>
                        <div className="relative h-12 md:h-14 flex justify-left items-center py-2 md:py-3 hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg">
                            <h3 className={`${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-8 md:pl-10`}>Abel</h3>
                            <div id="toggleBlur" onClick={()=> toFont("abel")} className={` ${isAbel || systemFont ? "opacity-70 cursor-default" : "cursor-pointer"} absolute right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light`}>
                                <i className={`indicator absolute top-0 ${isAbel ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                            </div>
                        </div>
                        <div className="relative h-12 md:h-14 flex justify-left items-center py-2 md:py-3 hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg">
                            <h3 className={`${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-8 md:pl-10`}>Open</h3>
                            <div id="toggleBlur" onClick={()=> toFont("open")} className={` ${isOpen || systemFont ? "opacity-70 cursor-default" : "cursor-pointer"} absolute right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light`}>
                                <i className={`indicator absolute top-0 ${isOpen ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                            </div>
                        </div>
                        <div className="relative h-12 md:h-14 flex justify-left items-center py-2 md:py-3 hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg">
                            <h3 className={`${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-8 md:pl-10`}>Barlow</h3>
                            <div id="toggleBlur" onClick={()=> toFont("barlow")} className={`${isBarlow || systemFont ? "opacity-70 cursor-default" : "cursor-pointer"} absolute right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light`}>
                                <i className={`indicator absolute top-0 ${isBarlow ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                            </div>
                        </div>
                        <div className="relative h-12 md:h-14 flex justify-left items-center py-2 md:py-3 hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg">
                            <h3 className={`${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-8 md:pl-10`}>Josefin</h3>
                            <div id="toggleBlur" onClick={()=> toFont("josefin")} className={` ${isJosefin || systemFont ? "opacity-70 cursor-default" : "cursor-pointer"} absolute right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light`}>
                                <i className={`indicator absolute top-0 ${isJosefin ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                            </div>
                        </div>
                        <div className="relative h-12 md:h-14 flex justify-left items-center py-2 md:py-3 hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg">
                            <h3 className={`${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-6 md:pl-8`}>Montserrat</h3>
                            <div id="toggleBlur" onClick={()=> toFont("montserrat")} className={` ${isMontserrat || systemFont ? "opacity-70 cursor-default" : "cursor-pointer"} absolute right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light`}>
                                <i className={`indicator absolute top-0 ${isMontserrat ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                            </div>
                        </div>
                    </div>
                    <div className={`relative transition-all duration-300 ease-in-out ${dropDown2 ? "h-74 md:h-84 border border-app-dark dark:border-app-light" : "h-14 border border-transparent"} rounded-lg overflow-hidden`}>
                        <div className={`relative h-14 flex justify-left items-center ${dropDown2 ? "rounded-none" : "rounded-lg"} hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125`} onClick={()=> {
                            triggerHaptic();
                            setDropDown2(!dropDown2)
                            }}>
                                <h3 className={`absolute ${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-8 md:pl-10 font-bold`}>Calculator Based</h3>
                                <div className="absolute right-3 md:right-7 px-2 py-1 rounded-lg cursor-pointer">
                                    {isNative ?
                                            <IonIcon icon={dropDown2 ? chevronUp : chevronDown} />
                                    :
                                            <FontAwesomeIcon icon={dropDown2 ? faChevronUp : faChevronDown} />
                                    }
                                </div>
                        </div>
                        <div className="relative h-12 md:h-14 flex justify-left items-center py-2 md:py-3 hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg">
                            <h3 className={`${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-6 md:pl-8`}>Digital-7</h3>
                            <div id="toggleBlur" onClick={()=> toFont("digital")} className={` ${isDigital || systemFont ? "opacity-70 cursor-default" : "cursor-pointer"} absolute right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light`}>
                                <i className={`indicator absolute top-0 ${isDigital ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                            </div>
                        </div>
                        <div className="relative h-12 md:h-14 flex justify-left items-center py-2 md:py-3 hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg">
                            <h3 className={`${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-6 md:pl-8`}>Google Sans Code</h3>
                            <div id="toggleBlur" onClick={()=> toFont("googleSans")} className={` ${isGoogleSans || systemFont ? "opacity-70 cursor-default" : "cursor-pointer"} absolute right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light`}>
                                <i className={`indicator absolute top-0 ${isGoogleSans ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                            </div>
                        </div>
                        <div className="relative h-12 md:h-14 flex justify-left items-center py-2 md:py-3 hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg">
                            <h3 className={`${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-6 md:pl-8`}>Dotty</h3>
                            <div id="toggleBlur" onClick={()=> toFont("dotty")} className={` ${isDotty || systemFont ? "opacity-70 cursor-default" : "cursor-pointer"} absolute right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light`}>
                                <i className={`indicator absolute top-0 ${isDotty ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                            </div>
                        </div>
                        <div className="relative h-12 md:h-14 flex justify-left items-center py-2 md:py-3 hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg">
                            <h3 className={`${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-6 md:pl-8`}>Orbitron</h3>
                            <div id="toggleBlur" onClick={()=> toFont("orbitron")} className={` ${isOrbitron || systemFont ? "opacity-70 cursor-default" : "cursor-pointer"} absolute right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light`}>
                                <i className={`indicator absolute top-0 ${isOrbitron ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                            </div>
                        </div>
                        <div className="relative h-12 md:h-14 flex justify-left items-center py-2 md:py-3 hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg">
                            <h3 className={`${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-6 md:pl-8`}>Tiny5</h3>
                            <div id="toggleBlur" onClick={()=> toFont("tiny")} className={` ${isTiny || systemFont ? "opacity-70 cursor-default" : "cursor-pointer"} absolute right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light`}>
                                <i className={`indicator absolute top-0 ${isTiny ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Themes