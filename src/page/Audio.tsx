import { Code, Flex } from '@chakra-ui/react'
import { Field } from '@/components/ui/field'
import { Slider } from "@/components/ui/slider"
import useSettings from '@/components/sessionStorage'
import { useEffect, useState } from 'react'
import {
    FileUploadRoot,
    FileInput
} from "@/components/ui/file-upload"
import {
    Button,
} from '@chakra-ui/react'
import { fileToBase64 } from '@/components/convertion'

const Audio = () => {
    const { Audio, setAudio, resetAudio } = useSettings()
    const [volume, setVolume] = useState([Audio.Volume * 100])
    const [file, saveFile] = useState<File[] | null>(null)

    const valueHandle = (value: number[]) => {
        setAudio((prevState) => ({
            ...prevState,
            Volume: value[0] / 100,
        }))
    }

    const save = async () => {
        if (!file?.length) return
        const result = await fileToBase64(file[0])
        setAudio((prevState) => ({
            ...prevState,
            Audio: result,
            Default: false
        }))
    }

    const reset = () => {
        resetAudio()
    }


    useEffect(() => {
        setVolume([Audio.Volume * 100])
    }, [Audio])

    return (
        <div>
            <Flex gap={5}
                wrap='wrap'
                justify='flex-start'
                align='start'
            >
                <Field label='Volumn' width='auto'>
                    <Slider
                        defaultValue={volume}
                        size='lg'
                        value={volume}
                        max={100}
                        min={0}
                        width='200px'
                        onValueChangeEnd={(e) => valueHandle(e.value)}
                        onValueChange={(e) => setVolume(e.value)}
                    />{volume}
                </Field>
                <FileUploadRoot
                    accept={["audio/*"]}
                    onFileAccept={(e) => saveFile(e.files)}
                    maxFileSize={3000000}
                >
                    <Code>File size must not exceed 3MB</Code>
                    <FileInput width='270px' />
                    Reload Page to apply change
                </FileUploadRoot>
                <Flex width={75} gap={5} pt={5}>
                    <Button width='100%' variant='outline' onClick={() => save()}>
                        Save
                    </Button>
                    <Button width='100%' variant='subtle' onClick={() => reset()}>
                        Reset
                    </Button>
                </Flex>
            </Flex>
        </div>
    )
}

export default Audio



