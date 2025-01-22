import { useEffect } from "react"
import { ColorFormat, useCountdown } from "react-countdown-circle-timer"

interface timeDetail {
    focusSeconds: number
    restSeconds: number
}

// Interface for theme colors
interface Theme {
    color: ColorFormat
    restColor: ColorFormat
    trailColor: ColorFormat
}

// Interface for the core function props
interface CoreProps {
    resting: boolean
    isplaying: boolean
    isRestplaying: boolean
    theme: Theme
    isGrowing: boolean
    onComplete: () => void
    remainingTime: (time: number) => void
    RremainingTime: (time: number) => void
    timeDetail: timeDetail
    size: (size: number) => void
}

const Core = ({ resting,
    isplaying,
    isRestplaying,
    theme,
    isGrowing,
    onComplete,
    remainingTime: passTime,
    RremainingTime: passRTime,
    timeDetail, 
    size: passSize
}: CoreProps) => {

    const {
        path,
        pathLength,
        stroke,
        strokeDashoffset,
        size,
        strokeWidth,
        remainingTime,
    } = useCountdown({
        isPlaying: isplaying,
        duration: timeDetail.focusSeconds,
        colors: theme.color,
        isGrowing: isGrowing,
        strokeLinecap: 'round',
        size: 300,
        onComplete: onComplete,
    })

    const {
        path: Rpath,
        pathLength: RpathLength,
        stroke: Rstroke,
        strokeDashoffset: RstrokeDashoffset,
        strokeWidth: RstrokeWidth,
        remainingTime: RremainingTime,
    } = useCountdown({
        isPlaying: isRestplaying,
        duration: timeDetail.restSeconds,
        colors: theme.restColor,
        isGrowing: isGrowing,
        strokeLinecap: 'round',
        size: 300,
        onComplete: onComplete
    })

    useEffect(() => {
        if (resting) {
            passRTime(RremainingTime)
        } else {
            passTime(remainingTime)
        }
    }, [remainingTime, passRTime, passTime, RremainingTime, resting])

    useEffect(() => {
        passSize(size)
    }, [passSize, size])

    return (
        <svg width={size} height={size}>
            <path
                d={path}
                fill="none"
                stroke={theme.trailColor}
                strokeWidth={strokeWidth - 1}
            />
            <path
                d={resting ? Rpath : path}
                fill="none"
                stroke={resting ? Rstroke : stroke}
                strokeWidth={resting ? RstrokeWidth : strokeWidth}
                strokeDasharray={resting ? RpathLength : pathLength}
                strokeDashoffset={resting ? RstrokeDashoffset : strokeDashoffset}
                style={{ transformOrigin: 'center' }}
            />
        </svg>
    )
}

export default Core