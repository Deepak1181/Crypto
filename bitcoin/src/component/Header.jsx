import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <HStack p={"4"} shadow={"base"} bgColor={"blackAlpha.900"}  >
        <Button color={"white"}variant={"unstyled"} >
            <Link to="/">Home</Link>
        </Button>
        <Button color={"white"}variant={"unstyled"} >
            <Link to="/exchange">Exhanges</Link>
        </Button>
        <Button color={"white"}variant={"unstyled"} >
            <Link to="/coin">Coins</Link>
        </Button>
    </HStack>
  )
}

export default Header