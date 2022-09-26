import { useEffect, useState } from 'react';
import './timer.css'
import Howl from 'react-howler'
import Click from './click.mp3'
import Ring from './ring.mp3'

function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [rounds, setRounds] = useState(1)

    let timer;
    let totalTimeInSeconds = 0;
    let breakTime = 0;

    const sound = new Audio(Click)
    const ring = new Audio(Ring)

    function toggle() {
        sound.play()
        totalTimeInSeconds = seconds + minutes * 60 + hours * 60 * 60
        setIsActive(!isActive)
        if (isActive) {
            setRounds(rounds + 1)
        }
        if (totalTimeInSeconds > 0) {
            breakTime = Math.floor(totalTimeInSeconds / 5)
            console.log(breakTime)
            let breakHours = Math.floor(breakTime / 3600)
            let breakMinutes = Math.floor((breakTime - breakHours * 3600) / 60)
            let breakSeconds = Math.floor(breakTime - breakHours * 3600 - breakMinutes * 60)
            setHours(breakHours)
            setMinutes(breakMinutes)
            setSeconds(breakSeconds)
        }
    }

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
        else{
            if (seconds > 0) {
            timer = setInterval(() => {
                setSeconds(seconds - 1)
                breakTime -= 1
                console.log(breakTime)

                if (breakTime <= 0) {
                    ring.play()
                }

                if (hours >= 1 && minutes === 0 && seconds === 0) {
                    setHours(hours - 1)
                    setMinutes(59)
                    setSeconds(59)
                }

                else if (minutes >= 1 && seconds === 0) {
                    setMinutes(minutes - 1)
                    setSeconds(59)
                }
            },1000)
            return ()=> clearInterval(timer)
        }
        }
    },[isActive,seconds])

    // const clearTimer = () => {
    //     setSeconds(0);
    //     setMinutes(0);
    //     setHours(0);
    //     setRounds(1)
    //     breakTime = 0
    //     totalTimeInSeconds = 0
    //     clearInterval(timer)
    // }

    return (
        <div className="timer">
            <h2>{isActive? "Round " + rounds : "Break"}</h2>
            <h2 className="timerText">{hours < 10? "0"+ hours: hours }:{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</h2>
            <div className="button-container">
                <button className='start-stop' onClick={toggle}>{isActive? "Break" : "Start"}</button>
            </div>
        </div>
        
    )
}

export default Timer;