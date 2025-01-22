import { Box, Flex, Heading, IconButton, Button } from '@chakra-ui/react'
import { FaGithub } from "react-icons/fa"
import { IoSettingsOutline } from "react-icons/io5"
import { FiEdit } from "react-icons/fi"
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

} from "./components/ui/drawer"
import Settings from './page/Settings'
import Edit from './page/Edit'
import useSettings from './components/sessionStorage'


function App() {
  const { Theme } = useSettings()

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
                  <FiEdit />
                </IconButton>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle asChild>
                    <Heading size='2xl'>Edit</Heading>
                  </DrawerTitle>
                </DrawerHeader>
                <DrawerBody>
                  <Edit/>
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
                <IconButton bg='transparent' variant='ghost' size='2xl'>
                  <IoSettingsOutline />
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
              {Theme.title}
            </Heading>
            <Timer/>
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
                <FaGithub />
              </IconButton>
            </Box>
          </Flex>
        </div>
      </Flex>
    </>
  )
}

export default App
