import React,{useState, useEffect, useRef} from "react"

function Stopwatch(){

    const [isRunning,setRunning] = useState(false);
    const [time,setTime] = useState(0);
    let startTime = useRef(new Date);
    let intervalRef = useRef(null);


    useEffect(()=>{
        if (isRunning){
            intervalRef.current = setInterval(()=>{
                setTime(new Date() - startTime.current);
            },10);
        }
        return(() => clearInterval(intervalRef.current))
    },[isRunning])

    useEffect(()=>{
        if (isRunning || time != 0){
            document.title = formatTime();
        }
        return(()=>{
            document.title = "React Stopwatch";
        })
    })

    function handleStart(){
        startTime.current = new Date;
        setRunning(true);
    }

    function handleStop(){
        setRunning(false);
    }

    function handleReset(){
        setTime(0);
        handleStop();
    }

    function formatTime(){
        const minutes = Math.floor(time/60000);
        const seconds = Math.floor((time%60000)/1000);
        const ms = time%1000;
        return `${padNumber(minutes)}:${padNumber(seconds)}:${padNumber(ms)}`
    }

    function padNumber(num){
        return num<10 ? "0"+num : num<100 ? num : Math.floor(num/10);
    }

    return(
        <div className="stopwatch-container">
            <p className="time-display">{formatTime()}</p>
            <button onClick={handleStart} className="start-button">Start</button>
            <button onClick={handleStop} className="stop-button">Stop</button>
            <button onClick={handleReset} className="reset-button">Reset</button>
        </div>
    )
}

export default Stopwatch