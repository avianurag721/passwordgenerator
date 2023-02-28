const slider =document.getElementById('passwordslider')
const passlength =document.getElementById('passlength')
const displayArea =document.getElementById('displaypassword')
const symbolcheck =document.getElementById('symbols')
const numbercheck =document.getElementById('numbers')
const lowercheck =document.getElementById('lowecase')
const uppercheck =document.getElementById('uppercase')
const indicator =document.getElementsByClassName('indicator')
const allcheckbox=document.querySelector("input[type=checkbox]");

const symbols ='!@#$%^&*(){}"?><:/.,;[]=-';

let password='';
let passwordlength=0;
let checkcount=0;
handleSlider();

function handleSlider(){
    slider.value=passwordlength;
    passlength.innerText=passwordlength

}

function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase() {  
       return String.fromCharCode(getRndInteger(97,123))
}
function generateUpperCase() {  
    return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercheck.checked) hasUpper = true;
    if (lowercheck.checked) hasLower = true;
    if (numbercheck.checked) hasNum = true;
    if (symbolcheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordlength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordlength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

}
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    checkcount = 0;
    allcheckbox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkcount++;
    });

    //special condition
    if(passwordlength < checkcount ) {
        passwordlength = checkcount;
        handleSlider();
    }
}

allcheckbox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})


copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected

    if(checkcount == 0) 
        return;

    if(passwordLength < checkCount) {
        passwordlength = checkCount;
        handleSlider();
    }

    console.log("Starting the Journey");
    //remove old password
    password = "";

 

    let funcArr = [];

    if(uppercheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercheck.checked)
        funcArr.push(generateLowerCase);

    if(numbercheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolcheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("COmpulsory adddition done");

    //remaining adddition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrength();
});

