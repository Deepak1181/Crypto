import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import Error from "./Error";
import { Link } from "react-router-dom";
const Coins = () => {
  const [coins, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const currencySymbol=currency==="inr" ? "₹":currency==="eur" ? "€" : "$";
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const response = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );

       
        setCoin(response.data);
        //console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coin:", error);
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [currency, page]);

  if (error) {
    return <Error />;
  }

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btn = new Array(132).fill(1)
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
        <RadioGroup value={currency} onChange={setCurrency} p={8}>
          <HStack spacing={4}>
            <Radio value={"inr"}>₹ INR</Radio>
            <Radio value={"usd"}>$ USD</Radio>
            <Radio value={"eur"}>€ EUR</Radio>
          </HStack>
        </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((el,id) => (
              <ExchangeCard
                key={el.id}
                id={el.id}
                name={el.name}
                image={el.image}
                symbol={el.symbol}
                current_price={el.current_price}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack overflow={"auto"} w="full" p="8">
      {
        btn.map((item,index)=>(
            <Button
            key ={index}
              bgColor={"blackAlpha.900"}
              color={"purple"}
              onClick={() => changePage(index)}>
              {index+1}
            </Button>

        ))
      }
     
          </HStack>
        </>
      )}
    </Container>
  );
};
const ExchangeCard = ({ id,name, image, current_price,symbol,currencySymbol="₹" }) => (
  <Link to={`/coin/${id}`} >
    <VStack
      w={"52"}
      shadow={"lg"}
      transition={"all 0.3s"}
      m={"auto"}
      p={2}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}>
      <Image
        src={image}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
      />
       <Heading size={"md"} noOfLines={1}>
        {symbol}
      </Heading>
      <Text size={"md"} noOfLines={1}>{name}</Text>

      <Text size={"md"} noOfLines={1}>
        {current_price ? `${currencySymbol} ${ current_price}`:"NA"}
      </Text>
    </VStack>
  </Link>
);

export default Coins;
