import { Box, Flex, Heading, IconButton, Button } from '@chakra-ui/react'
import { FaGithub } from "react-icons/fa"
import { IoSettingsOutline } from "react-icons/io5"
import { FiEdit } from "react-icons/fi"
import { LuAudioLines } from "react-icons/lu"
import Timer from './components/Timer'
import {
  DrawerBody,
  DrawerActionTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,

} from "@/components/ui/drawer"
import Audio from './page/Audio'
import Settings from './page/Settings'
import Edit from './page/Edit'
import useSettings from './components/sessionStorage'
import { useState, useEffect } from 'react'


function App() {
  const { TimerTheme: Theme } = useSettings()
  const [title, setTitle] = useState('')

  const replacePercent20 = (input: string): void => {
    let result = ""
    for (let i = 0; i < input.length; i++) {
      if (input[i] === '%' && input[i + 1] === '2' && input[i + 2] === '0') {
        result += ' '
        i += 2; // Skip the next two characters ('2' and '0')
      } else {
        result += input[i]
      }
    }
    setTitle(result)
  }

  useEffect(() => {
    replacePercent20(Theme.TimerTitle)
  }, [Theme.TimerTitle])

  return (
    <>
      <Flex direction='column' p={4} width='100vw' height='100vh'>
        <Flex justify='space-between' className='Header'>
          <Heading size='2xl' p={4}>
            Focus Timer
          </Heading>
          <Box>
            <DrawerRoot placement='bottom' size='sm'>
              <DrawerTrigger asChild>
                <IconButton bg='transparent' variant='ghost' size='2xl' >
                  <FiEdit style={{ color: 'white' }} />
                </IconButton>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle asChild>
                    <Heading size='2xl'>Edit</Heading>
                  </DrawerTitle>
                </DrawerHeader>
                <DrawerBody>
                  <Edit />
                </DrawerBody>
                <DrawerFooter>
                  <DrawerActionTrigger asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerActionTrigger>
                </DrawerFooter>
              </DrawerContent>
            </DrawerRoot>
            <DrawerRoot placement='bottom' size='sm'>
              <DrawerTrigger asChild >
                <IconButton bg='transparent' variant='ghost' size='2xl'>
                  <IoSettingsOutline style={{ color: 'white' }} />
                </IconButton>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle asChild>
                    <Heading size='2xl'>Settings</Heading>
                  </DrawerTitle>
                </DrawerHeader>
                <DrawerBody>
                  <Settings />
                </DrawerBody>
                <DrawerFooter>
                  <DrawerActionTrigger asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerActionTrigger>
                </DrawerFooter>
              </DrawerContent>
            </DrawerRoot>
            <DrawerRoot placement='bottom' size='sm'>
              <DrawerTrigger asChild>
                <IconButton bg='transparent' variant='ghost' size='2xl' >
                  <LuAudioLines style={{ color: 'white' }} />
                </IconButton>
              </DrawerTrigger>
              <DrawerContent >
                <DrawerHeader>
                  <DrawerTitle asChild>
                    <Heading size='2xl'>Audio</Heading>
                  </DrawerTitle>
                </DrawerHeader>
                <DrawerBody>
                  <Audio />
                </DrawerBody>
                <DrawerFooter>
                  <DrawerActionTrigger asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerActionTrigger>
                </DrawerFooter>
              </DrawerContent>
            </DrawerRoot>
          </Box>
        </Flex>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width='100%'
        >
          <Flex direction='Column' alignItems='center'>
            <Heading size='2xl' p={4}>
              {title}
            </Heading>
            <Timer />
          </Flex>
        </Box>
        <div className="footer">
          <Flex justify='flex-end'>
            <Box>
              <Heading size='sm' p={6} pr={0}>
                Made by Ktonel475
              </Heading>
            </Box>
            <Box />
            <Box>
              <IconButton variant="ghost" size='2xl' rounded='full'>
                <FaGithub style={{ color: 'white' }} />
              </IconButton>
            </Box>
          </Flex>
        </div>
      </Flex>
    </>
  )
}

export default App
