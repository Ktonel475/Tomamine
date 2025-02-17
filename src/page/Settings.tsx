import React, { useEffect } from "react"
import { Input, Flex, Button, parseColor, Color } from "@chakra-ui/react"
import { Field } from '@/components/ui/field'
import { SegmentedControl } from "@/components/ui/segmented-control"
import useSettings from "../components/sessionStorage"
import { useState } from "react"
import { ColorFormat } from 'react-countdown-circle-timer'
import {
    ColorPickerArea,
    ColorPickerContent,
    ColorPickerControl,
    ColorPickerInput,
    ColorPickerRoot,
    ColorPickerSliders,
    ColorPickerTrigger,
} from "@/components/ui/color-picker"
import { Toaster, toaster } from '@/components/ui/toaster'

const Settings: React.FC = () => {
    const { notification, setNotify, resetNotification, TimerTheme, setTheme, resetTheme } = useSettings()
    const [complete, setComplete] = useState<string>('')
    const [breakT, setBreakT] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [color, setColor] = useState(parseColor(TimerTheme.Circle))
    const [color2, setColor2] = useState(parseColor(TimerTheme.Bcircle))
    const [sessionEnd, setSessionEnd] = useState<boolean>(true)
    const [change, setChange] = useState<boolean>(false)

    const save = () => {
        const updates: {
            condition: boolean | string | undefined | Color
            action: () => void
        }[] = [
                { condition: breakT, action: () => { setNotify((prevState) => ({ ...prevState, Break: breakT })); setBreakT('') } },
                { condition: complete, action: () => { setNotify((prevState) => ({ ...prevState, Complete: complete })); setComplete('') } },
                { condition: title, action: () => { setTheme((prevState) => ({ ...prevState, TimerTitle: title })); setTitle('') } },
                { condition: color != parseColor(TimerTheme.Circle), action: () => { setTheme((prevState) => ({ ...prevState, Circle: color.toString("hex") as ColorFormat })) } },
                { condition: color2 != parseColor(TimerTheme.Bcircle), action: () => { setTheme((prevState) => ({ ...prevState, Bcircle: color2.toString("hex") as ColorFormat })) } },
                { condition: sessionEnd, action: () => { setTheme((prevState) => ({ ...prevState, SessionEnd: sessionEnd })) } }
            ]

        updates.forEach(({ condition, action }) => {
            if (condition) {
                action()
                setChange(true)
            }
        })
    }

    useEffect(() => {
        if (change) {
            toaster.create({
                title: 'Saved successfully',
                type: 'custom',
                duration: 1000
            })
            setChange(false)
        }
    }, [change])

    const reset = () => {
        resetNotification()
        resetTheme()
        setColor(parseColor(TimerTheme.Circle))
        setColor2(parseColor(TimerTheme.Bcircle))
    }
    return (
        <Flex
            gap={5}
            wrap='wrap'
            justify='flex-start'
            align='start'
        >
            <Toaster />
            <Flex
                gap={2}
                wrap='wrap'
                justify='flex-start'
                align='start'
                direction='column'
            >

                <Field label="Break Notification" width='auto'>
                    <Input placeholder={notification.Break}
                        maxWidth={350}
                        onChange={(val) => setBreakT(val.target.value)}
                        value={breakT}
                    />
                </Field>
                <Field label="Completion Notification" width='auto'>
                    <Input placeholder={notification.Complete}
                        maxWidth={350}
                        onChange={(val) => setComplete(val.target.value)}
                        value={complete}
                    />
                </Field>
                <Field label="Timer Title" width='auto'>
                    <Input placeholder={TimerTheme.TimerTitle}
                        maxWidth={150}
                        onChange={(val) => setTitle(val.target.value)}
                        value={title}
                    />
                </Field>
            </Flex>
            <Flex
                gap={2}
                wrap='wrap'
                justify='flex-start'
                align='start'
                direction='column'
            >
                <Field label='Focus Duration Color' width='auto'>
                    <ColorPickerRoot defaultValue={parseColor(TimerTheme.Circle)}
                        maxW="200px"
                        onValueChange={(e) => setColor(e.value)}
                        value={color}
                    >
                        <ColorPickerControl>
                            <ColorPickerInput onChange={(e) => console.log(e.target.value)} />
                            <ColorPickerTrigger />
                        </ColorPickerControl>
                        <ColorPickerContent zIndex="1500" >
                            <ColorPickerArea />
                            <ColorPickerSliders />
                        </ColorPickerContent>
                    </ColorPickerRoot>
                </Field>
                <Field label='Break Duration Color' width='auto'>
                    <ColorPickerRoot defaultValue={parseColor(TimerTheme.Bcircle)}
                        maxW="200px"
                        onValueChange={(e) => setColor2(e.value)}
                        value={color2}
                    >
                        <ColorPickerControl >
                            <ColorPickerInput />
                            <ColorPickerTrigger />
                        </ColorPickerControl>
                        <ColorPickerContent zIndex="1500">
                            <ColorPickerArea />
                            <ColorPickerSliders />
                        </ColorPickerContent>
                    </ColorPickerRoot>
                </Field>
                <Field label='Session End Preference' width='auto'>
                    <SegmentedControl
                        defaultValue={TimerTheme.SessionEnd ? 'Focus Duration' : 'Break Duration'}
                        items={['Focus Duration', 'Break Duration']}
                        onValueChange={(e) => e ? setSessionEnd(true) : setSessionEnd(false)}
                    />
                </Field>
                <Flex width={75} gap={5} pt={5}>
                    <Button width='100%' variant='outline' onClick={() => save()}>
                        Save
                    </Button>
                    <Button width='100%' variant='subtle' onClick={() => reset()}>
                        Reset
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )

}

export default Settings