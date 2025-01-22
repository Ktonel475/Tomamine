import React from "react"
import {
    NumberInputField,
    NumberInputLabel,
    NumberInputRoot,
} from "../components/ui/number-input"
import { Flex, Heading, Box } from "@chakra-ui/react"
import useSettings from '../components/sessionStorage'

const Edit: React.FC = () => {
    const { time, setTime } = useSettings()

    return (
        <div>
            <Flex
                gap={5}
                wrap='wrap'
                justify='flex-start'
                align='start'
            >
                <Box>
                    <Heading as="h1" size="lg" pb={2}>
                        Focusing Duration
                    </Heading>
                    <Flex
                        gap={2}
                        wrap="wrap"
                        justify="flex-start"
                        align="start"
                    >
                        <NumberInputRoot defaultValue={String(time.hours)} width="100px" allowMouseWheel min={0}
                            formatOptions={{
                                style: 'unit',
                                unit: 'hour',
                                unitDisplay: 'long',
                            }}
                            onValueChange={(val) => setTime((prevTime) => {
                                return { ...prevTime, hours: val.valueAsNumber }
                            })}
                        >
                            <NumberInputLabel />
                            <NumberInputField />
                        </NumberInputRoot>
                        <NumberInputRoot defaultValue={String(time.minutes)} width="120px" allowMouseWheel min={0}
                            formatOptions={{
                                style: 'unit',
                                unit: 'minute',
                                unitDisplay: 'long',
                            }}
                            onValueChange={(val) => setTime((prevTime) => {
                                return { ...prevTime, minutes: val.valueAsNumber }
                            })}
                        >
                            <NumberInputLabel />
                            <NumberInputField />
                        </NumberInputRoot>
                        <NumberInputRoot defaultValue={String(time.seconds)} width="130px" allowMouseWheel min={0}
                            formatOptions={{
                                style: 'unit',
                                unit: 'second',
                                unitDisplay: 'long',
                            }}
                            onValueChange={(val) => setTime((prevTime) => {
                                return { ...prevTime, seconds: val.valueAsNumber }
                            })}
                        >
                            <NumberInputLabel />
                            <NumberInputField />
                        </NumberInputRoot>
                    </Flex>
                </Box>
                <Box>
                    <Heading as="h1" size="lg" pb={2}>
                        Break Duration
                    </Heading>
                    <Flex
                        gap={2}
                        wrap="wrap"
                        justify="flex-start"
                        align="start"
                    >
                        <NumberInputRoot defaultValue={String(time.restTime.hours)} width="100px" allowMouseWheel min={0}
                            formatOptions={{
                                style: 'unit',
                                unit: 'hour',
                                unitDisplay: 'long',
                            }}
                            onValueChange={(val) => setTime((prevTime) => {
                                return { ...prevTime, restTime: { ...prevTime.restTime, hours: val.valueAsNumber }}
                            })}
                        >
                            <NumberInputLabel />
                            <NumberInputField />
                        </NumberInputRoot>
                        <NumberInputRoot defaultValue={String(time.restTime.minutes)} width="120px" allowMouseWheel min={0}
                            formatOptions={{
                                style: 'unit',
                                unit: 'minute',
                                unitDisplay: 'long',
                            }}
                            onValueChange={(val) => setTime((prevTime) => {
                                return { ...prevTime, restTime: { ...prevTime.restTime, minutes: val.valueAsNumber }}
                            })}
                        >
                            <NumberInputLabel />
                            <NumberInputField />
                        </NumberInputRoot>
                        <NumberInputRoot defaultValue={String(time.restTime.seconds)} width="130px" allowMouseWheel min={0}
                            formatOptions={{
                                style: 'unit',
                                unit: 'second',
                                unitDisplay: 'long',
                            }}
                            onValueChange={(val) => setTime((prevTime) => {
                                return { ...prevTime, restTime: { ...prevTime.restTime, seconds: val.valueAsNumber }}
                            })}
                        >
                            <NumberInputLabel />
                            <NumberInputField />
                        </NumberInputRoot>
                    </Flex>
                </Box>
                <Box>
                    <Heading as="h1" size="lg" pb={2}>
                        Break Frequency
                    </Heading>
                    <Flex
                        gap={2}
                        wrap="wrap"
                        justify="flex-start"
                        align="start"
                    >
                        <NumberInputRoot defaultValue={String(time.restFrequency)} width="70px" allowMouseWheel min={0}
                            onValueChange={(val) => setTime((prevTime) => {
                                return { ...prevTime, restFrequency: val.valueAsNumber}
                            })}
                        >
                            <NumberInputLabel />
                            <NumberInputField />
                        </NumberInputRoot>
                    </Flex>
                </Box>
            </Flex>
        </div>
    )

}

export default Edit