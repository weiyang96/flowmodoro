import { useEffect, useState } from 'react';
import './timer.css'

function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [isActive, setIsActive] = useState(false);

    function toggle() {
        setIsActive(!isActive)
    }

    let timer;


    useEffect (() => {
        if (isActive) {
            timer = setInterval(() => {
                setSeconds(seconds + 1)

                if (minutes === 59 && seconds === 59) {
                    setHours(hours + 1)
                    setMinutes(0)
                    setSeconds(0)
                }
    
                else if(seconds === 59) {
                    setMinutes(minutes + 1)
                    setSeconds(0)
                }
                
            },1000)
            return ()=> clearInterval(timer)
        }
    },[isActive,seconds])

    const clearTimer = () => {
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        clearInterval(timer)
    }

    return (
        <div className="timer">
            <h2 className="timerText">{hours < 10? "0"+ hours: hours }:{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</h2>
            <div className="button-container">
                <button className='start-stop' onClick={toggle}>{isActive? "Stop" : "Start"}</button>
                <button className='clear' onClick={clearTimer}>Clear</button>
            </div>
        </div>
    )
}

export default Timer;