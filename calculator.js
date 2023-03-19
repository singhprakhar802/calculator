let buffer='0'
let runningTotal= 0;
let preoperator;
const screen =document.querySelector('.diplay')
function buttonClick(value)
{
    if(isNaN(parseInt(value)))
    {
        handleSymbol(value);
    }
    else
    {
        handleNumber(value);
    }
    rerender();
}
function handleSymbol(symbol)
{
    switch (symbol){
        case 'C':
            buffer= '0';
            break;
        case '=':
            if(preoperator === null)
            {
                // need do number to do math
                return;
            }
            flushOperation(parseInt(buffer));
            preoperator=null;
            buffer="" + runningTotal;
            runningTotal=0;
            break;
        case '←' :
            if(buffer.length === 1)
            {
                buffer = '0';
            }
            else
            {
                buffer=buffer.substring(0,buffer.length-1);
            }
            break;
        case '+':
        case '-':
        case '/':
        case '*':
            handleMaths(symbol)
            break;
    }
}
function flushOperation(intBuffer)
{
    if(preoperator === '+')
    {
        runningTotal+=intBuffer;
    }
    else if(preoperator === '-')
    {
        runningTotal-=intBuffer;
    }
    else if(preoperator === '/')
    {
        runningTotal/=intBuffer;
    }
    else if(preoperator === '*')
    {
        runningTotal*=intBuffer;
    }
}
function handleMaths(value)
{
    if(buffer === 0)
    {
        // do nothing 
        return;
    }

    const intBuffer= parseInt(buffer);
    if(runningTotal === 0)
    {
        runningTotal=intBuffer;
    }
    else
    {
        flushOperation(intBuffer);
    }

    preoperator=value;
    buffer='0';
    console.log(runningTotal);
}
function handleNumber(number)
{
    if(buffer === '0')
    {
        buffer=number;
    }
    else
    {
        buffer+=number;
    }
}
function init()
{
    console.log("HELLO")
    document
    .querySelector('.inputs')
    .addEventListener("click", function(event){
        buttonClick(event.target.innerText);
    })
}
function rerender()
{
    screen.innerText = buffer;
}
init();