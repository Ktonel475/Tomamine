import { Flex } from '@chakra-ui/react'
import { Field } from '@/components/ui/field'
import { Slider } from "@/components/ui/slider"
import useSettings from '@/components/sessionStorage'
import { useEffect, useState } from 'react'

const Audio = () => {
    const { Audio, setAudio } = useSettings()
    const [volume, setVolume] = useState([Audio.Volume * 100])

    const valueHandle = (value: number[]) => {
        setAudio((prevState) => ({
            ...prevState,
            Volume: value[0] / 100,
        }))
    }

    useEffect(() => {

    }, [volume, setAudio])

    return (
        <div>
            <Flex gap={5}
                wrap='wrap'
                justify='flex-start'
                align='start'
            >
                <Field label='Volumn' width='auto'>
                    <Slider
                        defaultValue={[Audio.Volume * 100]}
                        size='lg'
                        value={volume}
                        max={100}
                        min={0}
                        width='200px'
                        onValueChangeEnd={(e) => valueHandle(e.value)}
                        onValueChange={(e) => setVolume(e.value)}
                    />{volume}
                </Field>
                Default Alarm by<a href="https://pixabay.com/users/lesiakower-25701529/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=113180">Lesiakower</a >
                from < a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=113180"> Pixabay</a >
            </Flex>
        </div>
    )
}

export default Audio



