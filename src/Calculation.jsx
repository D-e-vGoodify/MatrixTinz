export const Calculation = ({input, isDeg}) => {
    let processedArray = [];
    let conversionStack = []
    let openBrackets = 0;
    let innerRootBrackets = 0;
    let innerPowBrackets = 0;
    //let openDeg = 0;
    //let invDeg = 0;
    let openRoot = 0;
    let openPower = 0;
    let isLastNumber = false;

    const factorial = (n) => {
        if (n < 0 || !Number.isInteger(parseInt(n))) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }  
    
    try {      
        for (let index = 0; index < input.length; index++) {
            const element = input[index];
            if (!input) {
                processedArray = []
            }
    
            if (input) {
                if (element === "sin(") {
                    if (isDeg) {
                        isLastNumber ? processedArray.push("*Math.sin(") : processedArray.push("Math.sin(");
                        openBrackets++;
                    } else {
                        if (isLastNumber) {
                            let last = processedArray.pop()
                            
                            conversionStack.push({ type: "deg", startIndex: processedArray.length })
                            processedArray.push(`${last}*Math.sin((`)
                        } else {
                            conversionStack.push({ type: "deg", startIndex: processedArray.length })
                            processedArray.push("Math.sin((")
                        }
                        openBrackets += 2;
                    }
                } else if (element === "arcsin(") {
                    if (isLastNumber) {
                        let last = processedArray.pop()
                        
                        conversionStack.push({ type: "invDeg", startIndex: processedArray.length });
                        processedArray.push(`${last}*(Math.asin(`)
                    } else {
                        conversionStack.push({ type: "invDeg", startIndex: processedArray.length });
                        processedArray.push("(Math.asin(")
                    }
                    openBrackets += 2;
                } else if (element === "cos(") {
                    if (isDeg) {
                        isLastNumber ? processedArray.push("*Math.cos(") : processedArray.push("Math.cos(");
                        openBrackets++;
                    } else {
                        if (isLastNumber) {
                            let last = processedArray.pop()
                            
                            conversionStack.push({ type: "deg", startIndex: processedArray.length })
                            processedArray.push(`${last}*Math.cos((`)
                        } else {
                            conversionStack.push({ type: "deg", startIndex: processedArray.length })
                            processedArray.push("Math.cos((")
                        }
                        openBrackets += 2;
                    }
                } else if (element === "arccos(") {
                    if (isLastNumber) {
                        let last = processedArray.pop()
                        
                        conversionStack.push({ type: "invDeg", startIndex: processedArray.length })
                        processedArray.push(`${last}*(Math.acos(`)
                    } else {
                        conversionStack.push({ type: "invDeg", startIndex: processedArray.length })
                        processedArray.push("(Math.acos(")
                    }
                    openBrackets += 2;
                } else if (element === "tan(") {
                    if (isDeg) {
                        isLastNumber ? processedArray.push("*Math.tan(") : processedArray.push("Math.tan(");
                        openBrackets++;
                    } else {
                        if (isLastNumber) {
                            let last = processedArray.pop()
                            
                            conversionStack.push({ type: "deg", startIndex: processedArray.length })
                            processedArray.push(`${last}*Math.tan((`)
                        } else {
                            conversionStack.push({ type: "deg", startIndex: processedArray.length })
                            processedArray.push("Math.tan((")
                        }
                        openBrackets += 2;
                    }
                } else if (element === "arctan(") {
                    if (isLastNumber) {
                        let last = processedArray.pop()
                        
                        conversionStack.push({ type: "invDeg", startIndex: processedArray.length })
                        processedArray.push(`${last}*(Math.atan(`)
                    } else {
                        conversionStack.push({ type: "invDeg", startIndex: processedArray.length })
                        processedArray.push("(Math.atan(")
                    }
                    openBrackets += 2;
                } else if (element === "log(") {
                    if (isLastNumber) {
                        let last = processedArray.pop()
                        
                        conversionStack.push({ type: "plain", startIndex: processedArray.length })
                        processedArray.push(`${last}*Math.log10(`)
                    } else {
                        conversionStack.push({ type: "plain", startIndex: processedArray.length })
                        processedArray.push("Math.log10(")
                    }
                    openBrackets++;
                } else if (element === "In(") {
                    if (isLastNumber) {
                        let last = processedArray.pop()
                        
                        conversionStack.push({ type: "plain", startIndex: processedArray.length })
                        processedArray.push(`${last}*Math.log(`)
                    } else {
                        conversionStack.push({ type: "plain", startIndex: processedArray.length })
                        processedArray.push("Math.log(")
                    }
                    openBrackets++;
                } else if (element === "%") {
                    processedArray.push("/100");
                } else if (element === "^(-1)") {
                    let last = processedArray.pop();
                    let inverse = `Math.pow(${last},-1)`;
    
                    processedArray.push(inverse)
                } else if (element === "!") {
                    let last = processedArray.pop();
                    
                    let wrapped = `${factorial(eval(last))}`
    
                    processedArray.push(wrapped);
                } else if (element === "pi") {
                    isLastNumber ? processedArray.push("*Math.PI") : processedArray.push("Math.PI");
                } else if (element === "sqrt") {
                    while ((openRoot > 0 && isLastNumber) || (openPower > 0 && isLastNumber)) {
                        let conversion = conversionStack.pop();
    
                        processedArray.push(`)`)
                        openBrackets--;
                        openRoot > 0 ? openRoot-- : openPower--;
    
                        let affectedSection = processedArray.splice(conversion.startIndex);
                        let mergedString = affectedSection.join("");
    
                        processedArray.push(mergedString);
                    }
    
                    if (isLastNumber) {
                        let last = processedArray.pop()
                        
                        conversionStack.push({ type: "root", startIndex: processedArray.length })
                        processedArray.push(`${last}*Math.sqrt(`)
                    } else {
                        conversionStack.push({ type: "root", startIndex: processedArray.length })
                        processedArray.push("Math.sqrt(")
                    }
                    openBrackets++;
                    openRoot++;
                } else if (element === "^") {
                    while (openRoot > 0 && innerRootBrackets === 0) {
                        let conversion = conversionStack.pop();
                        console.log("Im the one")
    
                        processedArray.push(`)`)
                        openBrackets--;
                        openRoot--;
    
                        let affectedSection = processedArray.splice(conversion.startIndex);
                        let mergedString = affectedSection.join("");
    
                        processedArray.push(mergedString);
                    }
    
                    let last = processedArray.pop();
    
                    conversionStack.push({ type: "power", startIndex: processedArray.length })
                    let power = `Math.pow(${last},`;
                    openBrackets++;
                    openPower++;
                    
                    processedArray.push(power)
                } else if (element === "e") {
                    isLastNumber ? processedArray.push("*Math.E") : processedArray.push("Math.E");
                } else if (element === "+" || element === "-" || element === "*" || element === "/") {
                    while ((openRoot > 0 && innerRootBrackets === 0) || (openPower > 0 && innerPowBrackets === 0)) {
                        let conversion = conversionStack.pop();
                        console.log("it worked", innerRootBrackets, innerPowBrackets);
    
                        processedArray.push(`)`)
                        openBrackets--;
                        openRoot > 0 && innerRootBrackets === 0 ? openRoot-- : openPower--;
    
                        let affectedSection = processedArray.splice(conversion.startIndex);
                        let mergedString = affectedSection.join("");
    
                        processedArray.push(mergedString);
                    }
                    processedArray.push(element);
                } else if (element === "(") {
                    if ((openRoot > 0 && isLastNumber) || (openPower > 0 && isLastNumber)) {
                        processedArray.push(")*(")
                    } else if (isLastNumber) {
                        let last = processedArray.pop()
                        
                        conversionStack.push({ type: "plain", startIndex: processedArray.length })
                        processedArray.push(`${last}*(`)
                        openBrackets++;
                    } else {
                        if (openRoot > 0 || openPower > 0) {
                            let copyConversion = [...conversionStack];
                            let conversion = copyConversion.pop();

                            if (conversion.type === "root") {
                                innerRootBrackets++
                                conversionStack.push({ type: "root", startIndex: processedArray.length })
                                processedArray.push("(")
                                openBrackets++;
                                console.log("i started adding a root", innerRootBrackets, innerPowBrackets);
                            } else if (conversion.type === "power") {
                                if (innerPowBrackets === 0) {
                                    innerPowBrackets++
                                } else {
                                    conversionStack.push({ type: "power", startIndex: processedArray.length })
                                    processedArray.push("(")
                                    innerPowBrackets++
                                    openBrackets++;
                                }
                                console.log("i started adding a power", innerRootBrackets, innerPowBrackets);
                            }
                            //conversion.type === "root" ? innerRootBrackets++ : conversion.type === "power" ? innerPowBrackets++ : ""
                            //console.log("i started it", innerRootBrackets, innerPowBrackets);
                        } else {
                            conversionStack.push({ type: "plain", startIndex: processedArray.length })
                            processedArray.push("(")
                            openBrackets++;
                        }
                    }
                } else if (element === ")") {
                    let conversion = conversionStack.pop();
                    if (!conversion) throw new Error("Unmatched bracket");

                    if (conversion.type === "deg") {
                        processedArray.push(")*(Math.PI/180))")
                        openBrackets--;
                    } else if (conversion.type === "invDeg") {
                        processedArray.push(")*(180/Math.PI))")
                        openBrackets--;
                    } else {
                        if (conversion.type === "root") {
                            if (innerRootBrackets > 0) {
                                innerRootBrackets--
                                console.log("i started removing a root", innerRootBrackets, innerPowBrackets);
                            }
                            //innerRootBrackets > 0 ? innerRootBrackets-- : "";
                        } else if (conversion.type === "power") {
                            if (innerPowBrackets > 0) {
                                if (innerPowBrackets === 1) {
                                    openPower--
                                }
                                innerPowBrackets--;
                                console.log("i started removing a power", innerRootBrackets, innerPowBrackets);
                            }
                        } //innerPowBrackets > 0 ? innerPowBrackets-- : "";
                        processedArray.push(")");
                    }
                    openBrackets--;
    
                    let affectedSection = processedArray.splice(conversion.startIndex);
                    let mergedString = affectedSection.join("");
    
                    processedArray.push(mergedString);
                } else {
                    let lastElement = processedArray[processedArray.length - 1];
                    let operandToWrap = ""
    
                    if (lastElement) {
                        if (lastElement.endsWith(")")) {
                            operandToWrap = processedArray.pop() + "*";
                            console.log(operandToWrap)
                        } else if (parseInt(lastElement)) {
                            /*while (processedArray.length > 0 && (Number.isInteger(parseInt(processedArray[processedArray.length - 1])) || processedArray[processedArray.length - 1] === ".")) {
                                operandToWrap = processedArray.pop() + operandToWrap;
                            }*/
                            operandToWrap = processedArray.pop();
                        }
                    }
                    processedArray.push(operandToWrap+element);
                }
                if (parseInt(element) || element === "0" || element === "pi" || element === "e" || element === ")") {
                    isLastNumber = true;
                } else {
                    isLastNumber = false;
                }
            }
        }
        while (conversionStack.length > 0) {
            let conversion = conversionStack.pop();

            if (conversion.type === "deg") {
                processedArray.push(")*(Math.PI/180))");
                openBrackets -= 2;
            } else if (conversion.type === "invDeg") {
                processedArray.push(")*(180/Math.PI))");
                openBrackets -= 2;
            } else {
                if (conversion.type === "root") {
                    innerRootBrackets > 0 ? innerRootBrackets-- : openRoot--;
                } else if (conversion.type === "power") {
                    if (innerPowBrackets > 1) {
                        innerPowBrackets--
                    } else {
                        openPower--
                        innerPowBrackets = 0;
                    }
                }
                processedArray.push(")");
                openBrackets--
                //openRoot > 0 && innerRootBrackets === 0 ? openRoot-- : openPower--;
                console.log("Am i also a problem")
            }
            
            let affectedSection = processedArray.splice(conversion.startIndex);
            let mergedString = affectedSection.join("");

            processedArray.push(mergedString);
        }
        
        while (openBrackets > 0) {  
            processedArray.push(")");
            innerRootBrackets > 0 ? innerRootBrackets-- : innerPowBrackets > 0 ? innerPowBrackets-- : '';
            openBrackets--;
            console.log("Am i a problem")
        }

        let calculationStr = processedArray.join("");
        //console.log(processedArray)
        //console.log(calculationStr)
        let roughAnswer = eval(calculationStr);
        const answer = Number(parseFloat(roughAnswer).toFixed(10));

        if (calculationStr === "") {
            return ""
        } else if (!isFinite(answer)) {
            console.error("Error: Answer Infinite")
            return "Math Error:Infinite";
        }
        return answer.toString();
    } catch (error) {
        console.error(error.message)
        return "Error:Syntax Error";
    }
}