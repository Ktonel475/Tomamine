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
  background: string
  title: string
  SessionEnd: string
}

type SettingsStore = {
  time: Time
  setTime: (newTime: ((prevTime: Time) => Time) | Time) => void
  notification: Status
  setNotify: (newNotify: ((prevNotify: Status) => Status) | Status) => void
  resetNotification: () => void
  Theme: Preference
  setTheme: (newTheme: ((prevTheme: Preference) => Preference) | Preference) => void
  resetTheme: () => void
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
  background: "#242424",
  title: 'Tomato Timer',
  SessionEnd: 'Focus Duration',
}

const useSettings = create<SettingsStore>((set) => ({
  time: (() => {
    const storedTime = sessionStorage.getItem('time')
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
      sessionStorage.setItem('time', JSON.stringify(updatedTime))
      return { time: updatedTime }
    })
  },
  notification: (() => {
    const storedNotification = sessionStorage.getItem('status')
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
      sessionStorage.setItem('status', JSON.stringify(updatedNotification))
      return { notification: updatedNotification }
    })
  },
  resetNotification: () => {
    set(() => {
      const defaultNotification: Status = {
        Complete: 'Task complete! Well done!',
        Break: 'Pause and refresh',
      }
      sessionStorage.setItem('status', JSON.stringify(defaultNotification))
      return { notification: defaultNotification }
    })
  },
  Theme: (() => {
    const storedTheme = sessionStorage.getItem('theme')
    try {
      return storedTheme ? JSON.parse(storedTheme) : defaultTheme
    } catch {
      return defaultTheme
    }
  })(),
  setTheme: (newTheme) => {
    set((state) => {
      const updatedTheme =
        typeof newTheme === 'function' ? newTheme(state.Theme) : newTheme
      sessionStorage.setItem('theme', JSON.stringify(updatedTheme))
      return { Theme: updatedTheme }
    })
  },
  resetTheme: () => {
    set(() => {
      const defaultTheme: Preference = {
        Circle: '#FF8D63',
        Trail: '#EEE',
        Bcircle: '#486BB8',
        Btrail: '#EEE',
        background: "#242424",
        title: 'Tomato Timer', 
        SessionEnd: 'Focus Duration'
      }
      sessionStorage.setItem('theme', JSON.stringify(defaultTheme))
      return { Theme: defaultTheme }
    })
  },
}))

export default useSettings
