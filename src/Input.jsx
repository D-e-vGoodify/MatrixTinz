import React from 'react';
import { triggerHaptic } from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faMultiply, faUpRightAndDownLeftFromCenter, faDownLeftAndUpRightToCenter } from '@fortawesome/free-solid-svg-icons';
import { Capacitor } from '@capacitor/core';
import { IonIcon } from '@ionic/react';
import { backspace, close, expand, contract } from 'ionicons/icons';

const Input = ({setInput, moreKey, invKey, isDeg}) => {
    const platform = Capacitor.getPlatform();
    const isNative = platform === 'ios' || platform === 'android';
    const isWeb = platform === 'web';

    const more = isNative ? <IonIcon icon={expand} /> : <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
    const noMore = isNative ? <IonIcon icon={contract} /> : <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} />
    const cancel = isNative ? <IonIcon icon={backspace} /> : <FontAwesomeIcon icon={faDeleteLeft} />
    const multiply = isNative ? <IonIcon icon={close} /> : <FontAwesomeIcon icon={faMultiply} />
    
    const power = <span>x<sup>y</sup></span>;
    const inverse = <span>x<sup>-1</sup></span>;
    const invSin = <span>sin<sup>-1</sup>(</span>;
    const invCos = <span>cos<sup>-1</sup>(</span>;
    const invTan = <span>tan<sup>-1</sup>(</span>;

    const values = ["C", more, "%", "/", "7", "8", "9", multiply, "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", cancel, "="]
    const moreValues = ["Inv", "Deg", "sin(", "cos(", "tan(", power, "log(", "In(", "(", ")", "√x", "C", noMore, "%", "/", "x!", "7", "8", "9", multiply, inverse, "4", "5", "6", "-", "π", "1", "2", "3", "+", "e", "0", ".", cancel, "="]
    const speciaValues = ["C", more, noMore, "%", "/", multiply, "-", "+", "="]
    const icons = [more, noMore, cancel, multiply, "π"]
    if (invKey) {
        moreValues[2] = invSin
        moreValues[3] = invCos
        moreValues[4] = invTan
    }
    isDeg ? moreValues[1] = "Rad" : moreValues[1] = "Deg"

    return(
        <div className={`inputBox ${moreKey ? 'more text-base md:text-lg dotty:text-2xl dotty:md:text-3xl orbitron:text-sm orbitron:md:text-base googleSans:text-sm googleSans:md:text-base' : 'text-xl dotty:text-4xl orbitron:text-lg googleSans:text-lg'} absolute grid ${isNative ? "bottom-20 h-6/10 md:h-2/3" : "bottom-0 h-2/3"} w-full dark:text-white font-system abel:font-abel open:font-open barlow:font-barlow josefin:font-josefin montserrat:font-montserrat digital:font-digital googleSans:font-googleSans dotty:font-dotty orbitron:font-orbitron tiny:font-tiny`} onMouseDown={(e) => e.preventDefault()}>
            {values.map((value, index) => (
                <button key={index} onClick={() => {
                    triggerHaptic();
                    setInput(value, more, cancel, multiply)
                }} className={` ${moreKey ? 'hidden' : 'flex'} justify-center items-center outline-none rounded-xl cursor-pointer ${speciaValues.includes(value) ? 'special text-app-dark dark:text-app-light font-bold' : ''} ${icons.includes(value) ? 'dotty:text-xl orbitron:text-xl googleSans:text-xl' : ''}`}>{value}</button>
            ))}
            {moreValues.map((value, index) => (
                <button key={index} disabled={(invKey && value === "Deg") || (isDeg && value === "Inv")} onClick={() => {
                    triggerHaptic();
                    setInput(value, noMore, cancel, multiply, invSin, invCos, invTan, power, inverse)
                }} className={` ${moreKey ? 'flex' : 'hidden'} justify-center items-center outline-none rounded-xl cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${speciaValues.includes(value) ? 'special text-app-dark dark:text-app-light font-bold' : ''} ${icons.includes(value) ? 'dotty:text-base dotty:md:text-lg orbitron:text-base orbitron:md:text-lg googleSans:text-base googleSans:md:text-lg' : ''}`}>{value}</button>
            ))}
        </div>
    )
}

export default Input