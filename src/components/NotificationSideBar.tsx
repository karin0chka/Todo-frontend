import { useEffect, useRef } from "react"
import api from "../utils/api"
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useDisclosure,
} from "@chakra-ui/react"

export function NotificationSideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  const fetchData = async () => {
    const eventSource = await api.Notification.connectToNotifications()

    //when sse is open -> getAlluser notification and store them
    eventSource.onopen = () => console.log(">>> Connection opened!")
    eventSource.onerror = (e) => console.log("ERROR!", e)
    //use JSON parse(parse data) && push it to notifications state
    eventSource.onmessage = (e) => {
      console.log(">>>", e.data)
    }

    return () => eventSource.close()
  }
  useEffect(() => {
    fetchData()
    return () => {}
  }, [])
  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
