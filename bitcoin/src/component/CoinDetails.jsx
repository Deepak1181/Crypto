import { Badge, Box, Container,Button, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../index';
import { CryptoChart } from '../component/CryptoChart';

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const currencySymbol = currency==="inr" ? "₹":currency==="eur" ? "€" : "$";
  const [days,setDays]= useState("24h")
  const [chartArray,setChartArray]= useState([])

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "365d":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };


  const {id} = useParams()
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const response = await axios.get( 
          `${server}/coins/${id}`
        );

        const {data:chartData} = await axios.get( 
          `${server}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        //console.log(chartData.prices,"prices")
        setCoin(response.data);
        setChartArray(chartData.prices)
        //console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Coin:", error);
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id,currency,days]);

  return (
    <Container maxW="80%" >
      {
        loading?<Loader/>:(
          <>
          <Box width="full" borderWidth={1} mt={20} maxW="100%" maxH="100%"> 
          <CryptoChart  arr={chartArray} currency={currencySymbol} days={days}  />
          </Box>
          <HStack p="4" overflowX={"auto"}>
            {btns.map((i) => (
              <Button
                disabled={days === i}
                key={i}
                onClick={() => switchChartStats(i)}
              >
                {i}
              </Button>
            ))}
          </HStack>
          <RadioGroup value={currency} onChange={setCurrency} p={8}>
          <HStack spacing={4}>
            <Radio value={"inr"}>₹ INR</Radio>
            <Radio value={"usd"}>$ USD</Radio>
            <Radio value={"eur"}>€ EUR</Radio>
          </HStack>
        </RadioGroup>
        <VStack p={16} spacing={4}  alignItems={"flex-start"}>
          <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
            last Updated on {Date(coin.market_data.last_updated).split("G")[0]}
          </Text>
          <Image src={coin.image.large}  w={"16"}  h={"16"}/>
         <Stat>
          <StatLabel>
            {coin.name}
          </StatLabel>
          <StatNumber>
            {currencySymbol} {coin.market_data.current_price[currency]}
          </StatNumber>
          {/* <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" :"decrease"} StatArrow /> */}
            {coin.market_data.price_change_percentage_24h}%
         
         </Stat>

         <Badge fontSize={"xl"} bgColor={"blackAlpha.800"}color={"white"} >
          {`#${coin.market_cap_rank}`}
         </Badge>

         <CustomBar
              high={`${currencySymbol} ${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol} ${coin.market_data.low_24h[currency]}`}
            />

            <Box w={"full"} p="4">
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={`${currencySymbol} ${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currencySymbol} ${coin.market_data.atl[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencySymbol} ${coin.market_data.ath[currency]}`}
              />
            </Box>
         
        </VStack>
          </>
        )
      }
    </Container>
  )
}

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
);

export default CoinDetails