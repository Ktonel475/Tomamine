import { useRef, useState } from "react"
import './index.css'

interface RenderTimeProps {
    remainingTime: number
}

const RenderTime: React.FC<RenderTimeProps> = ({ remainingTime }) => {
    const currentTime = useRef<number>(remainingTime)
    const prevTime = useRef<number | null>(null)
    const isNewTimeFirstTick = useRef<boolean>(false)
    const [, setOneLastRerender] = useState<number>(0)

    if (currentTime.current !== remainingTime) {
        isNewTimeFirstTick.current = true
        prevTime.current = currentTime.current
        currentTime.current = remainingTime
    } else {
        isNewTimeFirstTick.current = false
    }
    
    if (remainingTime === 0) {
        setTimeout(() => {
            setOneLastRerender((val) => val + 1)
        }, 20)
    }

    const isTimeUp = isNewTimeFirstTick.current

    return (
        <div className="time-wrapper">
            <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
                {remainingTime}
            </div>
            {prevTime.current !== null && (
                <div
                    key={prevTime.current}
                    className={`time ${!isTimeUp ? "down" : ""}`}
                >
                    {prevTime.current}
                </div>
            )}
        </div>
    )
}

export default RenderTime