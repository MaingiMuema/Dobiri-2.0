import { Box, Button, HStack, Text } from '@chakra-ui/react'
import React from 'react'
// import { useState } from 'react';

export default function Already({onClick,data,show }) {
    // const [addre, setData] = useState(data);
    const { name, add, landmark, pin, mob } = data;
    
  return (
      <Box w={["100%","100%","70%"]} border="2px solid gray" borderRadius="10px" p="3vh" fontSize={{lg:"20px",md:"10px",base:"20px"} }fontWeight={500} >
          <Text as="p"><b>Name: </b> {name }</Text>
          <Text as="p"><b>Delivery Address: </b>{add}</Text>
          <HStack>
          <Text as="p"><b>Landmark: </b>{landmark}</Text>
          </HStack>
          <Text as="p"><b>Phone: </b>{mob}</Text>
          <Button width="80%" style={{ margin: "1rem 0" }} size='lg' colorScheme={"whatsapp"} onClick={()=>{onClick(true)}}>Change</Button>
      
    </Box>
  )
}
