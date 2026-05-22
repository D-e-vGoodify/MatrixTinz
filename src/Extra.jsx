import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faChevronDown, faChevronRight, faChevronUp, faInfoCircle, faXmarkCircle, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Iconsvg, FDroidsvg, IzzyDroidsvg, QRsvg } from './Svgs';
import { Capacitor } from '@capacitor/core';
import { triggerHaptic } from './utils';
import { Browser } from '@capacitor/browser';
import { IonIcon } from '@ionic/react';
import { closeCircle, chevronDown, chevronForward, informationCircle, chevronUp, arrowBackCircle, logoGithub, wallet, logoBitcoin, copyOutline } from 'ionicons/icons';

const Extra = ({setExtra, isContinue, setContinue, isSmart, setSmart, isFreshStart, setFreshStart, systemFont, setSystemFont, separateFont, setSeparateFont, checkFont, showAbout, setShowAbout, isdarkMode, isblue, isgreen, isyellow, isred, ispurple, showSupport, setShowSupport, animateOut, animateBack}) => {
    const platform = Capacitor.getPlatform();
    const isNative = platform === 'ios' || platform === 'android';
    const isWeb = platform === 'web';
    const [showDroid, setShowDroid] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [imgSrc, setImgSrc] = useState("https://github.com/D-e-vGoodify.png");
    const [expandCrypto, setExpandCrypto] = useState(false);
    const donateRef = useRef(null);

    const applySetting = (setting) => {
        if (setting === "smart") {
            if (isContinue || isFreshStart) return
            if (isSmart) {
                setSmart(false)
            } else {
                setSmart(true)
            }
        } else if (setting === "off") {
            if (isFreshStart) return
            if (isContinue) {
                setContinue(false)
            } else {
                setContinue(true)
            }
        } else {
            if (isFreshStart) {
                setFreshStart(false)
            } else {
                setFreshStart(true)
            }
        }
    }

    const applyFont = (setting) => {
        if (setting === "system") {
            if (separateFont) return;

            if (!systemFont) {
                const root = window.document.documentElement;
        
                root.classList.remove("abel");
                root.classList.remove("open");
                root.classList.remove("barlow");
                root.classList.remove("josefin");
                root.classList.remove("montserrat");
                root.classList.remove("digital");
                root.classList.remove("googleSans");
                root.classList.remove("dotty");
                root.classList.remove("orbitron");
                root.classList.remove("tiny");
                setSystemFont(true)
            } else {
                setSystemFont(false)
                checkFont();
            }
        } else {
            if (systemFont) return;

            if (separateFont) {
                setSeparateFont(false)
            } else {
                setSeparateFont(true)
            }
        }
    }

    const copyCrypto = () => {
        triggerHaptic();
        const data = document.querySelector('.cryptoAddress');
        const copyBox = document.querySelector('.cryptoBox');

        let addressArea = document.createElement('textarea');
        copyBox.appendChild(addressArea);
        addressArea.value = data.innerHTML;
        addressArea.select();

        document.execCommand('copy');
        copyBox.removeChild(addressArea);
    }

    const openRepo = async() => {
        await Browser.open({url: 'https://github.com/D-e-vGoodify/MatrixTinz'});
    }

    const openGithub = async() => {
        await Browser.open({url: 'https://github.com/D-e-vGoodify'});
    }

    const openNotetinz = async() => {
        await Browser.open({url: 'https://notetinz.web.app'});
    }

    const handleClickOutside = (e) => {
        if (donateRef.current && !donateRef.current.contains(e.target)) {
            animateBack();
        }
    }

    return (
        <div className={`extraBox relative ${separateFont ? "font-system" : "font-system abel:font-abel open:font-open barlow:font-barlow josefin:font-josefin montserrat:font-montserrat digital:font-digital googleSans:font-googleSans dotty:font-dotty orbitron:font-orbitron tiny:font-tiny"} w-full h-full ${isNative ? "pt-10" : ""} text-app-darker dark:text-app-lighter overflow-hidden`}>
            <div className={`flex w-[200%] h-full transition-transform duration-500 ease-in-out ${showAbout ? "-translate-x-1/2" : "translate-x-0"}`}>
                <div className="relative w-1/2 min-h-full overflow-y-auto">
                    <div className="sticky top-0 left-0 flex flex-nowrap w-full h-20 justify-center items-end pb-3 gap-[50%] bg-app-lightest/50 dark:bg-app-darkest/50 backdrop-opacity-80 backdrop-blur-sm z-50">
                        <h1 className={`${separateFont ? "text-2xl md:text-3xl" : "text-2xl md:text-3xl dotty:text-4xl dotty:md:text-5xl orbitron:text-xl orbitron:md:text-2xl googleSans:text-xl googleSans:md:text-2xl"} font-bold`}>Settings</h1>
                        {isNative ?
                            <IonIcon icon={closeCircle} className="text-2xl md:text-lg cursor-pointer" onClick={()=> {
                            triggerHaptic();
                            animateBack();
                            }} />
                        :
                            <FontAwesomeIcon icon={faXmarkCircle} className="text-2xl md:text-lg cursor-pointer" onClick={()=> {
                            triggerHaptic();
                            animateBack();
                            }} />       
                        }
                    </div>
                    <div className="relative w-full grid gap-5 grid-cols-[auto] text-app-darkest dark:text-app-lightest px-4 mx-auto">
                        <div className={`relative transition-all duration-300 ease-in-out ${dropDown ? "h-58 border border-app-dark dark:border-app-light" : "h-22 border border-transparent"} rounded-lg overflow-hidden`}>
                            <div className={`relative h-22 flex justify-left items-center mb-1 ${dropDown ? "rounded-none" : "rounded-lg"} hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125`} onClick={()=> {
                                triggerHaptic();
                                setDropDown(!dropDown)
                                }}>
                                <h3 className={`absolute top-2 ${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-3 md:pl-5 font-bold`}>Continue with answer</h3>
                                <p className={`absolute w-8/10 ${separateFont ? "text-sm md:text-base" : "text-sm md:text-base dotty:text-lg dotty:md:text-xl orbitron:text-xs orbitron:md:text-sm googleSans:text-xs googleSans:md:text-sm"} pt-8 pl-3 md:pl-5 leading-4 md:leading-5 text-left`}>After you equate the answer continue your calculation from there</p>
                                <div className="absolute right-3 md:right-7 px-2 py-1 rounded-lg cursor-pointer">
                                    {isNative ?
                                            <IonIcon icon={dropDown ? chevronUp : chevronDown} />
                                    :
                                            <FontAwesomeIcon icon={dropDown ? faChevronUp : faChevronDown} />
                                    }
                                </div>      
                            </div>
                            <div className="h-16 flex justify-left items-center mb-1 backdrop-brightness-105">
                                <h3 className={`absolute top-2 ${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-3 md:pl-5 font-bold`}>Smart</h3>
                                <p className={`absolute w-8/10 ${separateFont ? "text-sm md:text-base" : "text-sm md:text-base dotty:text-lg dotty:md:text-xl orbitron:text-xs orbitron:md:text-sm googleSans:text-xs googleSans:md:text-sm"} pt-8 pl-3 md:pl-5 leading-4 md:leading-5 text-left`}>Continue when an operator is used</p>
                                <div id="toggleBlur" onClick={()=> applySetting("smart")} className={` ${isContinue || isFreshStart ? "opacity-70 cursor-default" : "cursor-pointer"} absolute right-3 md:right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light`}>
                                    <i className={`indicator absolute top-0 ${isSmart ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                                </div>
                            </div>
                            <div className="relative h-18 flex justify-left items-center backdrop-brightness-105 rounded-b-lg">
                                <h3 className={`absolute top-2 ${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} pl-3 md:pl-5 font-bold`}>Off</h3>
                                <p className={`absolute w-8/10 ${separateFont ? "text-sm md:text-base" : "text-sm md:text-base dotty:text-lg dotty:md:text-xl orbitron:text-xs orbitron:md:text-sm googleSans:text-xs googleSans:md:text-sm"} pt-8 pl-3 md:pl-5 leading-4 md:leading-5 text-left`}>Continue with the calculation instead</p>
                                <div id="toggleBlur" onClick={()=> applySetting("off")} className={` ${isFreshStart ? "opacity-70 cursor-default" : "cursor-pointer"} absolute right-3 md:right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light`}>
                                    <i className={`indicator absolute top-0 ${isContinue ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-18 md:h-22 flex justify-left items-center hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg">
                            <h3 className={`absolute top-2 ${separateFont ? "top-2 text-lg md:text-xl" : "top-2 text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:te"} pl-3 md:pl-5 font-bold`}>Start Afresh</h3>
                            <p className={`absolute w-8/10 ${separateFont ? "text-sm md:text-base" : "text-sm md:text-base dotty:text-lg dotty:md:text-xl orbitron:text-xs orbitron:md:text-sm googleSans:text-xs googleSans:md:text-sm"} pt-8 pl-3 md:pl-5 leading-4 md:leading-5 text-left`}>After you equate the answer start from a cleanstate</p>
                            <div id="toggleBlur" onClick={()=> applySetting("fresh")} className={`absolute right-3 md:right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light cursor-pointer`}>
                                <i className={`indicator absolute top-0 ${isFreshStart ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                            </div>
                        </div>
                        <div className="relative h-16 flex justify-left items-center hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg">
                            <h3 className={`absolute top-2 ${separateFont ? "top-2 text-lg md:text-xl" : "top-2 text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:te"} pl-3 md:pl-5 font-bold`}>Use System Font</h3>
                            <p className={`absolute w-8/10 ${separateFont ? "text-sm md:text-base" : "text-sm md:text-base dotty:text-lg dotty:md:text-xl orbitron:text-xs orbitron:md:text-sm googleSans:text-xs googleSans:md:text-sm"} pt-8 pl-3 md:pl-5 leading-4 md:leading-5 text-left`}>Use the current font of your device</p>
                            <div id="toggleBlur" onClick={()=> applyFont("system")} className={`${separateFont ? "opacity-70 cursor-default" : "cursor-pointer"} absolute right-3 md:right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light`}>
                                <i className={`indicator absolute top-0 ${systemFont ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                            </div>
                        </div>
                        <div className="relative h-24 flex justify-left items-center hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg">
                            <h3 className={`absolute top-2 ${separateFont ? "top-2 text-lg md:text-xl" : "top-2 text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:te"} pl-3 md:pl-5 font-bold`}>Use Separate Fonts</h3>
                            <p className={`absolute w-8/10 ${separateFont ? "text-sm md:text-base" : "text-sm md:text-base dotty:text-lg dotty:md:text-xl orbitron:text-xs orbitron:md:text-sm googleSans:text-xs googleSans:md:text-sm"} pt-8 pl-3 md:pl-5 leading-4 md:leading-5 text-left`}>Use the custom font on the main calculator and the system font everywhere else</p>
                            <div id="toggleBlur" onClick={()=> applyFont("separate")} className={`${systemFont ? "opacity-70 cursor-default" : "cursor-pointer"} absolute right-3 md:right-7 w-8 h-4 rounded-3xl z-2 duration-500 bg-app-dark dark:bg-app-light`}>
                                <i className={`indicator absolute top-0 ${separateFont ? "left-4" : "left-0"} w-4 h-4 bg-app-lightest dark:bg-app-darkest rounded-[50%] transform scale-90 duration-500`}></i>
                            </div>
                        </div>
                        <div className="relative h-16 flex justify-left items-center hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg" onClick={()=> {
                                triggerHaptic();
                                setShowAbout(true)
                            }}>
                            <h3 className={`absolute top-2 ${separateFont ? "top-2 text-lg md:text-xl" : "top-2 text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:te"} pl-3 md:pl-5 font-bold`}>About {isNative ? <IonIcon icon={informationCircle} className={`${separateFont ? "" : "dotty:text-lg dotty:md:text-xl orbitron:text-lg orbitron:md:text-xl googleSans:text-lg googleSans:md:text-xl"}`} /> : <FontAwesomeIcon icon={faInfoCircle} className={`${separateFont ? "" : "dotty:text-lg dotty:md:text-xl orbitron:text-lg orbitron:md:text-xl googleSans:text-lg googleSans:md:text-xl"}`} />}</h3>
                            <p className={`absolute w-8/10 ${separateFont ? "text-sm md:text-base" : "text-sm md:text-base dotty:text-lg dotty:md:text-xl orbitron:text-xs orbitron:md:text-sm googleSans:text-xs googleSans:md:text-sm"} pt-8 pl-3 md:pl-5 leading-4 md:leading-5 text-left`}>Check out the creator and more</p>
                            <div className="absolute right-3 md:right-7 px-2 py-1 rounded-lg cursor-pointer">
                                {isNative ?
                                        <IonIcon icon={chevronForward} />
                                :
                                        <FontAwesomeIcon icon={faChevronRight} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative w-1/2 h-full" id='aboutBox'>
                    <h1 className={`relative ${separateFont ? "text-2xl md:text-3xl" : "text-2xl md:text-3xl dotty:text-4xl dotty:md:text-5xl orbitron:text-xl orbitron:md:text-2xl googleSans:text-xl googleSans:md:text-2xl"} pt-7 font-bold`}>About</h1>
                    {isNative ?
                            <IonIcon icon={arrowBackCircle} className="absolute top-7 left-9 text-2xl md:text-lg cursor-pointer" onClick={()=> {
                                triggerHaptic();
                                animateBack();
                            }} />
                    :
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} className="absolute top-7 left-9 text-2xl md:text-lg cursor-pointer" onClick={()=> {
                                triggerHaptic();
                                animateBack();
                            }} />
                    }
                    <div className="relative w-full flex flex-wrap justify-center items-center gap-3 mt-4">
                        <div className="relative w-7/10 h-52 flex justify-center items-center gap-2 md:gap-3 px-4 bg-app-lighter dark:bg-app-darker rounded-2xl">
                            <div className="relative w-38 h-8/10 flex flex-wrap justify-center items-center">
                                <Iconsvg isdarkmode={isdarkMode} isblue={isblue} isgreen={isgreen} isyellow={isyellow} isred={isred} ispurple={ispurple} />
                                <div className="relative bottom-4 w-8/10 h-10 grid grid-cols-[auto]">
                                    <h2 className={`${separateFont ? "text-base md:text-lg" : "text-base md:text-lg dotty:text-xl dotty:md:text-2xl orbitron:text-sm orbitron:md:text-base googleSans:text-sm googleSans:md:text-base"} font-semibold`}>MatrixTinz</h2>
                                    <h3 className={`relative bottom-2 dotty:bottom-4 ${separateFont ? "text-sm md:text-base" : "text-sm md:text-base dotty:text-lg dotty:md:text-xl orbitron:text-xs orbitron:md:text-sm googleSans:text-xs googleSans:md:text-sm"}`}>Version 1.0.1</h3>
                                </div>
                            </div>
                            <div className="relative w-12 h-9/10 flex flex-wrap justify-center items-center text-xl gap-3">
                                {isWeb ?
                                    <>
                                        <a 
                                            href="https://github.com/D-e-vGoodify/MatrixTinz"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <div className="relative w-9 h-9 md:w-11 md:h-11 flex justify-center items-center text-app-lightest dark:text-app-darkest bg-app-darker dark:bg-app-lighter rounded-[50%] cursor-pointer">
                                                {isNative ?
                                                    <IonIcon icon={logoGithub} />
                                                :
                                                    <FontAwesomeIcon icon={faGithub} />       
                                                }
                                            </div>
                                        </a>
                                        <div className="relative w-9 h-9 md:w-11 md:h-11 flex justify-center items-center text-app-lighter dark:text-app-darker bg-app-darker dark:bg-app-lighter rounded-[50%] cursor-pointer" onClick={()=>{
                                        setShowDroid(true)
                                        setTimeout(()=> {setShowDroid(false)}, 3000)
                                        }}><FDroidsvg /></div>
                                        <div className="relative w-9 h-9 md:w-11 md:h-11 flex justify-center items-center text-app-lighter dark:text-app-darker bg-app-darker dark:bg-app-lighter rounded-[50%] cursor-pointer" onClick={()=>{
                                        setShowDroid(true)
                                        setTimeout(()=> {setShowDroid(false)}, 3000)
                                        }}><IzzyDroidsvg /></div>
                                    </>
                                :
                                    <>
                                        <div className="relative w-9 h-9 md:w-11 md:h-11 flex justify-center items-center text-app-lightest dark:text-app-darkest bg-app-darker dark:bg-app-lighter rounded-[50%] cursor-pointer" onClick={openRepo}>
                                            {isNative ?
                                                <IonIcon icon={logoGithub} />
                                            :
                                                <FontAwesomeIcon icon={faGithub} />       
                                            }
                                        </div>
                                        <div className="relative w-9 h-9 md:w-11 md:h-11 flex justify-center items-center text-app-lighter dark:text-app-darker bg-app-darker dark:bg-app-lighter rounded-[50%] cursor-pointer" onClick={()=>{
                                        setShowDroid(true)
                                        setTimeout(()=> {setShowDroid(false)}, 3000)
                                        }}><FDroidsvg /></div>
                                        <div className="relative w-9 h-9 md:w-11 md:h-11 flex justify-center items-center text-app-lighter dark:text-app-darker bg-app-darker dark:bg-app-lighter rounded-[50%] cursor-pointer" onClick={()=>{
                                        setShowDroid(true)
                                        setTimeout(()=> {setShowDroid(false)}, 3000)
                                        }}><IzzyDroidsvg /></div>
                                    </>
                                }
                            </div>
                        </div>
                        <div className={`relative w-full grid grid-cols-[auto] backdrop-brightness-105 dark:backdrop-brightness-125 ${separateFont ? "text-sm md:text-base" : "text-sm md:text-base dotty:text-lg dotty:md:text-xl orbitron:text-xs orbitron:md:text-sm googleSans:text-xs googleSans:md:text-sm"} mx-3 rounded-lg mt-4 pb-2`}>
                            {isWeb ?
                                <>
                                    <a 
                                        href="https://github.com/D-e-vGoodify"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="flex justify-left items-start gap-3 mx-2 py-2 md:py-3 border-b border-b-gray dark:border-b-light">
                                            <div className="w-8 h-8 bg-app-lighter dark:bg-app-darker border border-gray dark:border-light rounded-full"><img src={imgSrc} onError={() => setImgSrc("/assets/creator-fallback.png")} alt="Developer profile" className="w-full h-full rounded-full" /></div>
                                            <p className="">D-e-vGoodify</p>
                                            <h3 className="absolute top-7 left-12 transform scale-80 opacity-70">Creator</h3>
                                        </div>
                                    </a>
                                    <a 
                                        href="https://notetinz.web.app"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="flex justify-left items-center gap-3 mx-2 py-2 md:py-3 border-b border-b-gray dark:border-b-light">
                                            <div className="w-8 h-8 bg-app-lighter dark:bg-app-darker border border-gray dark:border-light rounded-full"><img src="/assets/notetinz-icon.png" alt="Notetinz webapp" className="w-full h-full rounded-full" /></div>
                                            <p>Notetinz</p>
                                        </div>
                                    </a>
                                </>
                            :
                                <>
                                    <button className="flex justify-left items-start gap-3 mx-2 py-2 md:py-3 border-b border-b-gray dark:border-b-light cursor-pointer" onClick={openGithub}>
                                        <div className="w-8 h-8 bg-app-lighter dark:bg-app-darker border border-gray dark:border-light rounded-full"><img src={imgSrc} onError={() => setImgSrc("/assets/creator-fallback.png")} alt="Developer profile" className="w-full h-full rounded-full" /></div>
                                        <p className="">D-e-vGoodify</p>
                                        <h3 className="absolute top-7 left-12 transform scale-80 opacity-70">Creator</h3>
                                    </button>
                                    <button className="flex justify-left items-center gap-3 mx-2 py-2 md:py-3 border-b border-b-gray dark:border-b-light cursor-pointer" onClick={openNotetinz}>
                                        <div className="w-8 h-8 bg-app-lighter dark:bg-app-darker border border-gray dark:border-light rounded-full"><img src="/assets/notetinz-icon.png" alt="Notetinz webapp" className="w-full h-full rounded-full" /></div>
                                        <p>Notetinz</p>
                                    </button>
                                </>
                            }
                            <div className="flex justify-left items-center gap-3 mx-2 py-2 md:py-3 border-b border-b-gray dark:border-b-light cursor-pointer" onClick={() => {
                                triggerHaptic()
                                setShowSupport(true)
                            }}>
                                <div className="w-8 h-8 bg-app-lighter dark:bg-app-darker flex justify-center items-center border border-gray dark:border-light rounded-full"><FontAwesomeIcon icon={faHandHoldingHeart} /></div>
                                <p>Donate</p>
                            </div>
                        </div>
                        {showSupport && createPortal(  
                            <div className={`supportBox ${isNative ? 'fixed top-0 left-0' : 'absolute top-0 left-0'} w-full min-h-screen flex justify-center items-center ${separateFont ? "font-system" : "font-system abel:font-abel open:font-open barlow:font-barlow josefin:font-josefin montserrat:font-montserrat digital:font-digital googleSans:font-googleSans dotty:font-dotty orbitron:font-orbitron tiny:font-tiny"} dark:text-white motion-preset-expand motion-duration-500 bg-transparent backdrop-blur-xs backdrop-brightness-90 z-100`} ref={null} onMouseDown={handleClickOutside}>
                                <div className={`relative w-8/10 ${expandCrypto ? "h-100" : "h-50"} flex justify-center items-center bg-app-lightest dark:bg-app-darkest px-2 shadow-lg rounded-lg`} ref={donateRef} onMouseDown={handleClickOutside}>
                                    <div className={`relative w-8/10 ${expandCrypto ? "h-90" : "h-30"} flex flex-wrap gap-2 justify-center items-center`}>
                                        <p className="text-sm text-center font-bold pb-4">Support MatrixTinz and Me, the Dev, by donating a small gift. Any amount is appreciated 🤗</p>
                                        <div className={`cryptoBox w-full ${expandCrypto ? "h-60" : "h-10"} flex justify-center items-center text-sm md:text-base border border-app-darker dark:border-app-lighter hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-sm cursor-pointer`} onClick={() => setExpandCrypto(!expandCrypto)}>
                                            <span className={`${expandCrypto ? "hidden" : ""}`}><IonIcon className="absolute left-4 md:left-7" icon={logoBitcoin} />Crypto</span>
                                            <div className={`${expandCrypto ? "relative w-full grid grid-cols-[auto] gap-2 motion-preset-blur-down-sm" : "hidden"}`}>
                                                <span className="relative w-full inline-flex justify-center items-center gap-2"><img src={`${isdarkMode ? "/assets/icon_TON_white.png" : "/assets/icon_TON_color.png"}`} className="size-7" /> TON</span>
                                                <div className="relative w-full inline-flex justify-center items-center">
                                                    <QRsvg isdarkmode={isdarkMode} isblue={isblue} isgreen={isgreen} isyellow={isyellow} isred={isred} ispurple={ispurple} />
                                                </div>
                                                <span className="relative w-full inline-flex justify-center items-center gap-0.5 font-bold"><p className="cryptoAddress w-8/10 text-xs md:text-sm break-all line-clamp-1 md:line-clamp-2 text-ellipsis bg-app-lighter dark:bg-app-darker p-0.5 md:p-0 rounded-xs">UQDOpupnBDAGnvP4FmnyJJ9ATEDfxcTWue1s58YYzB5vdh34</p><p className="text-sm md:text-base"><IonIcon icon={copyOutline} onClick={copyCrypto} className="cursor-pointer" /></p></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>,
                            isWeb ? document.getElementById('aboutBox') : document.body
                        )}
                    </div>
                    <div className={`absolute bottom-0 w-full ${isNative ? 'h-15' : 'h-10'} ${showDroid ? 'flex' : 'hidden'} justify-center items-center motion-preset-slide-up bg-warning border-t-2 border-app-dark`}>
                        <span className="text-sm md:text-lg text-app-darker">{isNative ? <IonIcon icon={informationCircle} className={`${separateFont ? "" : "dotty:text-lg dotty:md:text-xl orbitron:text-lg orbitron:md:text-xl googleSans:text-lg googleSans:md:text-xl"}`} /> : <FontAwesomeIcon icon={faInfoCircle} className={`${separateFont ? "" : "dotty:text-lg dotty:md:text-xl orbitron:text-lg orbitron:md:text-xl googleSans:text-lg googleSans:md:text-xl"}`} />} Coming Soon...</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Extra