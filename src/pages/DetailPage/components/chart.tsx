import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

interface IProps {
  name: string
  temp: number
}

const Chart = ({ data }: { data: IProps[] }) => {
  return (
    <BarChart
      width={330}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey='temp' fill='#8884d8' name='t &#8451;' />
    </BarChart>
  )
}

export default Chart
