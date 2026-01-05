import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { PlusSquareIcon } from '@chakra-ui/icons';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';


const Navbar = () => {
  /*
    useColorMode: Hook to get current color mode and function to toggle it
    colorMode: current color mode ("light" or "dark")
    toggleColorMode: function to toggle between light and dark modes
  */
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    /*
      Container component to center navbar content
      maxW: 1140px for large screens
      px: 4 for padding on x-axis
      bg: background color based on color mode
        - gray.100 for light mode
        - gray.900 for dark mode
    */
    <Container maxW={"1140px"} px={4}>
      {/*
        Flex container to hold the navbar content
        h: height of 16
        alignItems: center vertically
        justifyContent: space-between to separate logo and buttons
        flexDir: column for base (mobile), row for small screens and above
      */}
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base:"column",
          sm:"row"
        }}
      >
        {/*
          Text component for the logo
          bgGradient: gradient from cyan.400 to blue.500 (from left to right)
          bgClip: clip background to text (makes gradient visible)
          fontSize: 22 for base, 28 for small screens and above
        */}
        <Text
          bgGradient='linear(to-r, cyan.400, blue.500)'
          bgClip='text'
          fontSize={{ base: "22", sm: "28" }}
          fontWeight='bold'
          textTransform={"uppercase"}
          textAlign={"center"}
        >
          <Link to={"/"}> Product Store 🛒</Link>
        </Text>

        {/*
          HStack to hold the buttons with spacing of 2
          Link to /create page with PlusSquareIcon button
          Button to toggle color mode with IoMoon and LuSun icons
        */}
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20}/>
            </Button>
          </Link>
          <Button onClick={toggleColorMode}> {/* Button to toggle color mode */}
            {colorMode === "light" ? <IoMoon /> : <LuSun />}
          </Button>

        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar