import React from 'react'
import {Line} from "react-chartjs-2"
import {Chart as ChartJs,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from "chart.js"

ChartJs.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale
)
export const CryptoChart = ({arr=[],currency,days}) => {
  
  

  const prices=[];
  const date =[]
  console.log(arr,"arr")
  for(let i=0;i<arr.length;i++){
    if(days === "24h") date.push(new Date(arr[i][0]).toLocaleTimeString())
    else date.push(new Date(arr[i][0]).toLocaleDateString())
    prices.push(arr[i][1])
  }

  const data={
    labels:date ,
    datasets:[{
      label:`Prices in ${currency}`,
      data:prices,borderColor:"rgb(255,99,132)",
      backgroundColor:"rgba(255,99,132,0.4)",
      barPercentage: 0.8, // Adjust the width of the bars
      categoryPercentage: 0.6, // Adjust the space between the bars
    }],
    };
   
  return (
 <Line options={{
    responsive:true,
  }}
    data={data}
  />
  )
}

