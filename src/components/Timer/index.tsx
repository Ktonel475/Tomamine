import { Flex, IconButton, Heading, Box } from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react"
import { PiPause, PiPlay } from "react-icons/pi"
import { RiResetLeftLine } from "react-icons/ri"
import { FaPlay } from "react-icons/fa"
import useSettings from '../sessionStorage'
import Core from './core'
import ReactHowler from 'react-howler'
import Audio from '../../assets/oversimplified-alarm-clock-113180.mp3'

interface timerprop {
  CompleteStatus?: string
  RestStatus?: string
}

const CircularTimer: React.FC<timerprop> = () => {
  const playerRef = useRef<ReactHowler | null>(null)
  const { time, notification, Theme } = useSettings()

  const convertToSeconds = (hours: number, minutes: number, seconds: number): number => {
    return hours * 3600 + minutes * 60 + seconds
  }

  const [iscomplete, setComplete] = useState<boolean>(false)
  const [timeBuffer, setTimeBuffer] = useState(time)
  const [restTimeBuffer, setRestTimeBuffer] = useState(time.restTime)
  const [resting, setResting] = useState<boolean>(false)
  const [restCount, setRestCount] = useState(time.restFrequency)
  const [isplaying, setplaying] = useState<boolean>(false)
  const [isRestplaying, setRestplaying] = useState<boolean>(false)
  const [isGrowing, setGrowing] = useState<boolean>(false)
  const [timeDetail, setTimeDetail] = useState({
    focusSeconds: convertToSeconds(time.hours, time.minutes, time.seconds),
    restSeconds: convertToSeconds(time.restTime.hours, time.restTime.minutes, time.restTime.seconds)
  })
  const [timeParts, setTimeParts] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [remainingTime, setRemainingTime] = useState(0)
  const [RremainingTime, setRremainingTime] = useState(0)
  const [timerTheme, setTimerTheme] = useState({
    color: Theme.Circle,
    restColor: Theme.Bcircle,
    trailColor: Theme.Trail
  })
  const [size, setSize] = useState(0)
  const [key, setKey] = useState(0)
  const [isConfirmationOpen, setConfirmationOpen] = useState(false)
  const [pendingOperation, setPendingOperation] = useState<(() => void) | null>(null)

  useEffect(() => {
    setTimerTheme({
      color: Theme.Circle,
      restColor: Theme.Bcircle,
      trailColor: Theme.Trail,
    })

    setRestCount(time.restFrequency)
    setTimeBuffer(time)
    setRestTimeBuffer(time.restTime)
  }, [Theme.Circle, Theme.Bcircle, Theme.Trail, time, time.restFrequency, time.restTime])


  useEffect(() => {
    if (!(isplaying || isRestplaying)) {
      setTimeDetail((prevTimeDetail) => ({
        ...prevTimeDetail,
        focusSeconds: convertToSeconds(timeBuffer.hours, timeBuffer.minutes, timeBuffer.seconds),
        restSeconds: convertToSeconds(
          restTimeBuffer.hours,
          restTimeBuffer.minutes,
          restTimeBuffer.seconds
        ),
      }))
    }
  }, [isRestplaying, isplaying, timeBuffer, restTimeBuffer])

  const updateState = (stateKey: "remainingTime" | "RremainingTime" | "size", childvalue: number) => {
    if (stateKey === "remainingTime") {
      setRemainingTime(childvalue)
    } else if (stateKey === "RremainingTime") {
      setRremainingTime(childvalue)
    } else if (stateKey === "size") {
      setSize(childvalue)
    }
  }

  const onSessionEnd = () => {
    const operation = () => {
      setplaying(false)
      setRestplaying(false)
      setGrowing((prev) => !prev)
      setResting((prev) => !prev)
      if (resting) {
        setRestCount((prevCount) => prevCount - 1)
        setKey((prev) => prev + 1)
        setplaying(true)
      } else {
        setRestplaying(true)
      }
      return {
        shouldRepeat: true
      }
    }
    const shouldConfirm =
      (Theme.SessionEnd === 'Focus Duration' && restCount > 0) ||
      (Theme.SessionEnd !== 'Focus Duration' && (restCount > 1 || !resting))

    if (shouldConfirm) {
      setPendingOperation(() => operation)
      setConfirmationOpen(true)
    } else {
      setComplete(true)
      setplaying(false)
      setRestplaying(false)
    }
  }

  const handleConfirmation = () => {
    if (pendingOperation) pendingOperation()
    setConfirmationOpen(false)
    playerRef.current?.stop()
    setPendingOperation(null)

  }

  const convertTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return { hours, minutes, seconds: remainingSeconds }
  }

  useEffect(() => {
    if (resting) {
      setTimeParts(convertTime(RremainingTime))
    } else {
      setTimeParts(convertTime(remainingTime))
    }

  }, [remainingTime, RremainingTime, resting])

  //Timer Control

  const togglePlay = () => {
    if (resting) {
      setRestplaying((prevState) => !prevState)
    } else {
      setplaying((prevState) => !prevState)
    }
  }

  const Reset = () => {
    setComplete(false)
    setKey((prev) => prev + 1)
    setResting(false)
    setGrowing(false)
    setplaying(false)
    setRestplaying(false)
    setRestCount(time.restFrequency)
    setTimeDetail((prevTimeDetail) => ({
      ...prevTimeDetail,
      focusSeconds: convertToSeconds(
        timeBuffer.hours,
        timeBuffer.minutes,
        timeBuffer.seconds
      ),
      restSeconds: convertToSeconds(
        restTimeBuffer.hours,
        restTimeBuffer.minutes,
        restTimeBuffer.seconds
      ),
    }))
  }

  return (
    <div style={{ height: size, width: size, position: 'relative' }}>
      <Core
        key={key}
        resting={resting}
        isplaying={isplaying}
        isRestplaying={isRestplaying}
        theme={timerTheme}
        timeDetail={timeDetail}
        isGrowing={isGrowing}
        remainingTime={(val) => updateState("remainingTime", val)}
        RremainingTime={(val) => updateState("RremainingTime", val)}
        onComplete={onSessionEnd}
        size={(val) => updateState("size", val)}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          fontSize: '1.5em',
        }}
      >
        {/*Adding animation to digit timer 
          1. Use of RenderTime component
            1.1 animation.tsx          
        */}
        <Heading size='3xl'>
          {isConfirmationOpen ? (
            <Flex direction='column' p={4}>
              <Heading size='3xl'>{resting ? 'Break' : 'Focus'} Session End</Heading>
              <Box>
                <IconButton onClick={() => handleConfirmation()} rounded='full' variant='outline' size='2xl'>
                  <FaPlay />
                </IconButton>
              </Box>
            </Flex>
          ) : iscomplete ? (notification.Complete) : resting ? (notification.Break) : (
            <>
              <Heading size='3xl'>{resting ? 'Break' : 'Focus'} Session</Heading>
              <Box p={2}>
                {String(timeParts.hours).padStart(2, '0')}:
                {String(timeParts.minutes).padStart(2, '0')}:
                {String(timeParts.seconds).padStart(2, '0')}
              </Box>
            </>
          )}
        </Heading>
      </div>

      <Flex justifyContent='space-between'>
        <IconButton onClick={() => togglePlay()} variant="ghost" rounded='full'>
          {isplaying || isRestplaying ? <PiPause /> : <PiPlay />}
        </IconButton>
        <IconButton onClick={() => Reset()} variant='ghost' rounded='full'>
          <RiResetLeftLine />
        </IconButton>
      </Flex>
      {isConfirmationOpen ?
        <ReactHowler
          src={Audio}
          playing={true}
          loop={true}
        /> : ''
      }
    </div>
  )
}

export default CircularTimer
