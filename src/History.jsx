import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle, faRotateRight, faCopy, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Capacitor } from '@capacitor/core';
import { triggerHaptic } from './utils';
import { IonIcon } from '@ionic/react';
import { chevronDown, returnUpForward, copy, trash, trashOutline } from 'ionicons/icons';

const History = ({theHistory, setHistory, setDefHistory, setInput, setCalculationArr, calculations, contextMenu, setContextMenu, separateFont, shoWarning, setShoWarning, animateOut, animateBack}) => {
    const [selectedId, setSelectedId] = useState(null);
    const [deleteAll, setDeleteAll] = useState(false);

    const platform = Capacitor.getPlatform();
    const isNative = platform === 'ios' || platform === 'android';
    const isWeb = platform === 'web';

    const handlesRightClick = (e, historyItem) => {
        e.preventDefault()
        triggerHaptic();

        const rect = e.currentTarget.closest('.historyBox').getBoundingClientRect();

        let xPos = e.clientX - rect.left;
        let yPos = e.clientY - rect.top;
        const menuWidth = 138;
        const menuHeight = 140;

        if (xPos + menuWidth > rect.width) {
            xPos -= menuWidth;
        }
        
        if (yPos + menuHeight > rect.height) {
            yPos -= menuHeight;
        }

        setContextMenu({
            show: true,
            x: xPos,
            y: yPos,
            selectedItem: historyItem
        })
    }

    const shareHistory = () => {
        const data = contextMenu.selectedItem;
        console.log("hi", data)
        
        setInput(data.inputStr)
        setCalculationArr(data.calcArr)
    }

    const deleteHistory = () => {
        triggerHaptic();
        const data = selectedId;

        setDefHistory(prevHistory => prevHistory.filter(history => history.id !== data.id));
    }

    const copyHistory = () => {
        triggerHaptic();
        const data = contextMenu.selectedItem;
        const copyBox = document.querySelector('.historyBox');

        let calculation = data.inputStr
        let calculationArea = document.createElement('textarea');
        copyBox.appendChild(calculationArea);
        calculationArea.value = calculation;
        calculationArea.select();

        document.execCommand('copy');
        copyBox.removeChild(calculationArea);
    }

    let startY = 0;

    const handleTouchStart = (e) => {
        triggerHaptic();
        startY = e.touches[0].clientY;
    }

    const handleTouchMove = (e) => {
        const currentY = e.touches[0].clientY;
        const diff = currentY - startY;

        if (diff > 0) {
            e.currentTarget.closest('.history').style.transform = `translateY(${diff}px)`;
            e.currentTarget.closest('.history').style.transition = 'none';
            console.log(diff)
        }
    }

    const handleTouchEnd = (e) => {
        const endY = e.changedTouches[0].clientY;
        const diff = endY - startY;
        const panel = e.currentTarget.closest('.history');
        console.log(diff, theHistory)
        
        panel.style.transform = ''
        panel.style.transition = ''

        if (diff > 150) {
            animateBack();
        }
    }

    const historyItems = calculations.map((defHistory, index) => {
        const showDate = index === 0 || defHistory.time !== calculations[index - 1].time;
        return (
            <React.Fragment key={index}>
                {showDate && (
                    <div className="w-full py-2 text-center">
                        <span className={`${separateFont ? "text-xs dotty:text-base" : "text-xs dotty:text-base orbitron:text-[10px] googleSans:text-[10px]"} font-bold uppercase tracking-wides`}>{defHistory.time === new Date().toLocaleDateString() ? "Today" : defHistory.time}</span>
                    </div>
                )}
                <div className="relative w-full px-3 duration-300 hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg" onContextMenu={(e)=> handlesRightClick(e, defHistory)} key={index}>
                    <h2 className={`${separateFont ? "text-lg md:text-xl" : "text-lg md:text-xl dotty:text-2xl dotty:md:text-3xl orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg"} outline-none text-right selection:bg-app-dark dark:selection:bg-app-light selection:text-white dark:selection:text-black break-all`}>{defHistory.inputStr} =</h2>
                    <h4 className={`${separateFont ? "text-xl md:text-2xl" : "text-xl md:text-2xl dotty:text-3xl dotty:md:text-4xl orbitron:text-lg orbitron:md:text-xl googleSans:text-lg googleSans:md:text-xl"} outline-none text-right font-bold selection:bg-app-dark dark:selection:bg-app-light selection:text-white dark:selection:text-black break-all`}>{defHistory.answer}</h4>
                    <hr></hr>
                </div>
            </React.Fragment>
        )
    })

    return (
        <div className={`historyBox relative ${separateFont ? "font-system" : "font-system abel:font-abel open:font-open barlow:font-barlow josefin:font-josefin montserrat:font-montserrat digital:font-digital googleSans:font-googleSans dotty:font-dotty orbitron:font-orbitron tiny:font-tiny"} w-full h-full ${isNative ? "pt-10" : ""} text-app-darker dark:text-app-lighter`}>
            <div className="sticky top-0 left-0 flex flex-nowrap w-full h-16 md:h-20 justify-center items-center gap-[50%] bg-app-lightest/50 dark:bg-app-darkest/50 backdrop-opacity-80 backdrop-blur-sm z-100">
                <h1 className={`${separateFont ? "text-2xl md:text-3xl" : "text-2xl md:text-3xl dotty:text-4xl dotty:md:text-5xl orbitron:text-xl orbitron:md:text-2xl googleSans:text-xl googleSans:md:text-2xl"} font-bold`}>History</h1>
                {isNative ?
                    <IonIcon icon={trashOutline} className="text-lg cursor-pointer" onClick={()=> {
                        triggerHaptic();
                        setDeleteAll(true)
                        setShoWarning(true)
                    }} />
                :
                    <FontAwesomeIcon icon={faXmarkCircle} className={`text-lg cursor-pointer`} onClick={()=> {
                    triggerHaptic();
                    animateBack();
                    }} />       
                }
            </div>
            {isNative ?
                <div className="sticky bottom-0 left-0 w-full h-12 flex justify-center pt-2 bg-app-lightest/50 dark:bg-app-darkest/50 backdrop-opacity-80 backdrop-blur-sm z-100">
                    <IonIcon icon={chevronDown} className={`text-lg cursor-grab active:cursor-grabbing`} onClick={()=> {
                    triggerHaptic();
                    animateBack();
                    }} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} />
                </div>
            :
                <></>
            }
            <div className="relative w-full grid gap-2 md:gap-3 grid-cols-[auto] text-app-darkest dark:text-app-lightest px-4 pb-4 mx-auto">{historyItems}</div>
            {isWeb ?
                <div className="sticky bottom-0 left-0 w-full h-12 flex justify-end pt-2 bg-app-lightest/50 dark:bg-app-darkest/50 backdrop-opacity-80 backdrop-blur-sm z-50">
                    <FontAwesomeIcon icon={faTrashCan} className={`text-lg pr-5 cursor-pointer`} onClick={()=> {
                        triggerHaptic();
                        setDeleteAll(true)
                        setShoWarning(true)
                    }} />
                </div>
            :
                <></>
            }
            {contextMenu.show && (
                <div className={`${separateFont ? "text-sm md:text-base" : "text-sm md:text-base dotty:text-lg dotty:md:text-xl orbitron:text-xs orbitron:md:text-sm googleSans:text-xs googleSans:md:text-sm"} absolute w-32 md:w-37 py-2 motion-preset-slide-down-right-sm z-50 bg-app-lightest dark:bg-app-darkest border border-gray-700 dark:border-white rounded-lg shadow-xl overflow-hidden`} style={{ top: contextMenu.y, left: contextMenu.x }}>
                    <button className="w-9/10 px-1 py-2 duration-300 hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg" onClick={() => {
                        shareHistory()
                        isNative ? setHistory(false) : ''
                        }}>{isNative ? <IonIcon icon={returnUpForward} className={`${separateFont ? "" : "dotty:text-sm dotty:md:text-base googleSans:text-sm googleSans:md:text-base"}`} /> : <FontAwesomeIcon icon={faRotateRight} className={`${separateFont ? "" : "dotty:text-sm dotty:md:text-base googleSans:text-sm googleSans:md:text-base"}`} />} Recalculate</button>
                    <button className="w-9/10 px-4 py-2 duration-300 hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg" onClick={copyHistory}>{isNative ? <IonIcon icon={copy} className={`${separateFont ? "" : "dotty:text-sm dotty:md:text-base googleSans:text-sm googleSans:md:text-base"}`} /> : <FontAwesomeIcon icon={faCopy} className={`${separateFont ? "" : "dotty:text-sm dotty:md:text-base googleSans:text-sm googleSans:md:text-base"}`} />} Copy</button>
                    <button className="w-9/10 px-4 py-2 duration-300 hover:backdrop-brightness-90 dark:hover:backdrop-brightness-125 rounded-lg" onClick={() => {
                        triggerHaptic();
                        setSelectedId(contextMenu.selectedItem)
                        setShoWarning(true)
                    }}>{isNative ? <IonIcon icon={trash} className={`${separateFont ? "" : "dotty:text-sm dotty:md:text-base googleSans:text-sm googleSans:md:text-base"}`} /> : <FontAwesomeIcon icon={faTrashAlt} className={`${separateFont ? "" : "dotty:text-sm dotty:md:text-base googleSans:text-sm googleSans:md:text-base"}`} />} Delete</button>
                </div>
            )}
            {shoWarning && createPortal(
                <div className={`fixed inset-0 w-full flex justify-center items-center ${separateFont ? "font-system" : "font-system abel:font-abel open:font-open barlow:font-barlow josefin:font-josefin montserrat:font-montserrat digital:font-digital googleSans:font-googleSans dotty:font-dotty orbitron:font-orbitron tiny:font-tiny"} dark:text-white transition-transform duration-500 ease-in-out ${animateOut ? 'scale-50' : 'motion-preset-expand motion-duration-500'} bg-transparent backdrop-blur-xs backdrop-brightness-90 z-100`}>
                    <div className="relative w-7/10 md:w-4/10 h-30 bg-app-lightest dark:bg-app-darkest shadow-lg rounded-lg">
                        <div className="relative w-full h-4/10 flex justify-center items-end">
                            <p className="">Delete {deleteAll ? "all?" : "item?"}</p>
                        </div>
                        <div className="relative b-0 h-6/10 flex justify-center items-center gap-[15%]">
                            <button className="px-3 md:px-4 py-1 bg-danger rounded-sm cursor-pointer" onClick={()=> {
                                if (deleteAll) {
                                    triggerHaptic();
                                    setDefHistory([]);
                                    localStorage.removeItem('history');
                                    animateBack();
                                    setDeleteAll(false);
                                } else {
                                    triggerHaptic()
                                    deleteHistory()
                                    animateBack()
                                }
                            }}
                                >Delete</button>
                            <button className="px-3 md:px-4 py-1 bg-success rounded-sm cursor-pointer" onClick={()=> {
                                triggerHaptic();
                                animateBack();
                                setDeleteAll(false);
                                }}>Cancel</button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    )
}

export default History