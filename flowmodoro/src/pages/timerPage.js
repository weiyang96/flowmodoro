import Timer from "../components/timer/timer"
import "./timerPage.css"

function TimerPage() {
    return (
        <div className="timerpage">
            <h2 className="title">Flowmodoro</h2>
            <div className="timer-container">
                <Timer />
            </div>
        </div>
    );
}

export default TimerPage;