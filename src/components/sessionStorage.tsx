import { ColorFormat } from 'react-countdown-circle-timer'
import { create } from 'zustand'

type Time = {
  hours: number
  minutes: number
  seconds: number
  restTime: {
    hours: number
    minutes: number
    seconds: number
  }
  restFrequency: number
}

type Status = {
  Complete: string
  Break: string
}

type Preference = {
  Circle: ColorFormat
  Trail: ColorFormat
  Bcircle: ColorFormat
  Btrail: string
  AppBackground: string
  TimerTitle: string
  SessionEnd: boolean
}

type AudioPref = {
  Volume: number
  Audio: string
}

type SettingsStore = {
  time: Time
  setTime: (newTime: ((prevTime: Time) => Time) | Time) => void
  notification: Status
  setNotify: (newNotify: ((prevNotify: Status) => Status) | Status) => void
  resetNotification: () => void
  TimerTheme: Preference
  setTheme: (newTheme: ((prevTheme: Preference) => Preference) | Preference) => void
  resetTheme: () => void
  Audio: AudioPref
  setAudio: (newAudio: ((prevAudio: AudioPref) => AudioPref) | AudioPref) => void
  resetAudio: () => void
}

const defaultTime: Time = {
  hours: 0,
  minutes: 40,
  seconds: 0,
  restTime: {
    hours: 0,
    minutes: 10,
    seconds: 0,
  },
  restFrequency: 4,
}

const defaultNotification: Status = {
  Complete: 'Task Complete! Well Done!',
  Break: 'Pause & Refresh',
}

const defaultTheme: Preference = {
  Circle: '#FF8D63',
  Trail: '#EEE',
  Bcircle: '#486BB8',
  Btrail: '#EEE',
  AppBackground: "#242424",
  TimerTitle: 'Tomato%20Timer',
  SessionEnd: true,
}

const defaultAudio: AudioPref = {
  Volume: 1.0,
  Audio: '',
}

const useSettings = create<SettingsStore>((set) => ({
  time: (() => {
    const storedTime = localStorage.getItem('time')  // Use localStorage here
    try {
      return storedTime ? JSON.parse(storedTime) : defaultTime
    } catch {
      return defaultTime
    }
  })(),
  setTime: (newTime) => {
    set((state) => {
      const updatedTime =
        typeof newTime === 'function' ? newTime(state.time) : newTime
      localStorage.setItem('time', JSON.stringify(updatedTime))  // Use localStorage here
      return { time: updatedTime }
    })
  },
  notification: (() => {
    const storedNotification = localStorage.getItem('status')  // Use localStorage here
    try {
      return storedNotification ? JSON.parse(storedNotification) : defaultNotification
    } catch {
      return defaultNotification
    }
  })(),
  setNotify: (newNotify) => {
    set((state) => {
      const updatedNotification =
        typeof newNotify === 'function' ? newNotify(state.notification) : newNotify
      localStorage.setItem('status', JSON.stringify(updatedNotification))  // Use localStorage here
      return { notification: updatedNotification }
    })
  },
  resetNotification: () => {
    set(() => {
      localStorage.setItem('status', JSON.stringify(defaultNotification))
      return { notification: defaultNotification }
    })
  },
  TimerTheme: (() => {
    const storedTheme = localStorage.getItem('timerTheme')
    try {
      return storedTheme ? JSON.parse(storedTheme) : defaultTheme
    } catch {
      return defaultTheme
    }
  })(),
  setTheme: (newTheme) => {
    set((state) => {
      const updatedTheme =
        typeof newTheme === 'function' ? newTheme(state.TimerTheme) : newTheme
      localStorage.setItem('timerTheme', JSON.stringify(updatedTheme))
      return { TimerTheme: updatedTheme }
    })
  },
  resetTheme: () => {
    set(() => {
      localStorage.setItem('timerTheme', JSON.stringify(defaultTheme))
      return { TimerTheme: defaultTheme }
    })
  },
  Audio: (() => {
    const storedAudio = localStorage.getItem('Audio')
    try {
      return storedAudio ? JSON.parse(storedAudio) : defaultAudio
    } catch {
      return defaultAudio
    }
  })(),
  setAudio: (newAudio) => {
    set((state) => {
      const updatedAudio =
        typeof newAudio === 'function' ? newAudio(state.Audio) : newAudio
      localStorage.setItem('Audio', JSON.stringify(updatedAudio))
      return { Audio: updatedAudio }
    })
  },
  resetAudio: () => {
    set(() => {
      localStorage.setItem('Audio', JSON.stringify(defaultAudio))
      return { Audio: defaultAudio }
    })
  },
}))

export default useSettings
