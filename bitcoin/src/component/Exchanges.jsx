import React, { useEffect, useState } from 'react'
import axios from "axios"
import { server } from '../index'
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react'
import Loader from './Loader'
import Error from './Error'
const Exchanges = () => {
   const [exchanges,setExchanges]= useState([])
   const [loading,setLoading]= useState(true)
   const [error,setError]= useState(false)

     useEffect(()=>{
        const fetchExchange=async()=>{
            try {
                const response = await axios.get(`${server}/exchanges`);
                setExchanges(response.data);
                console.log(response.data)
                setLoading(false);
              } catch (error) {
                console.error("Error fetching exchanges:", error);
                setError(true)
                setLoading(false);

              }
            };
        fetchExchange()
     },[])

     if(error){
        return <Error/>
     }
    
  return (
    <Container maxW={"container.xl"}  >
        {
            loading?<Loader/>:<>
            <HStack wrap={"wrap"} justifyContent={"space-evenly"} >
                {
                    exchanges.map((el,id)=>(
                       <ExchangeCard
                       key={el.id}
                        name={el.name}
                        image={el.image}
                        trust_score_rank={el.trust_score_rank}
                        
                        />
                    ))
                }
            </HStack>
            </>
        }
    </Container>
  )
}
const ExchangeCard=({name,image,trust_score_rank,url})=>(

    <VStack w={"52"} shadow={"lg"}  transition={"all 0.3s"}
    m={"auto"} 
    p={3}
    mt={4}
    css={{
        "&:hover":{
            transform:"scale(1.1)"
        }
    }}
    >
        <Image
        src={image}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
        />
        <Heading size={"md"} noOfLines={1}>{trust_score_rank}</Heading>
        <Text noOfLines={1}>{name}</Text>
    </VStack>

);

    
export default Exchanges