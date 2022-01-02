import { useState, useEffect } from 'react'

import axios from 'axios'
import moment from 'moment'

import './styles/globals.css';
import './styles/spacing.css';
import './styles/themes.css';
import './styles/text.css';

import Container from './components/container'
import Card from './components/card'
import BaseInput from './components/baseInput'
import BaseSelect from './components/baseSelect'
import Graph from './components/graph'


import fieldsData from './data/fields'

// Axios config
axios.defaults.baseURL = 'https://api.polygon.io/'
axios.defaults.headers.get.Authorization = 'Bearer hLQRvjSF4pxnwChozfDrCf_eA5IpAbBB'

function App() {
  const stocksTicker = useState('AMZN')
  const multiplier = useState(1)
  const timespan = useState('day')
  const from = useState(moment().subtract(1, 'month').format('YYYY-MM-DD'))
  const to = useState(moment().format('YYYY-MM-DD'))
  const model = { stocksTicker, multiplier, timespan, from, to }

  const close = useState([])
  const open = useState([])
  const high = useState([])
  const low = useState([])
  const labels = useState([])
  const data = {
    labels: labels[0],
    datasets: [
      {
        label: 'close',
        data: close[0],
        borderColor: '#c026d3',
        backgroundColor: '#c026d3',
      },
      {
        label: 'high',
        data: high[0],
        borderColor: '#dc2626',
        backgroundColor: '#dc2626',
      },
      {
        label: 'low',
        data: low[0],
        borderColor: '#4f46e5',
        backgroundColor: '#4f46e5',
      },
      {
        label: 'open',
        data: open[0],
        borderColor: '#16a34a',
        backgroundColor: '#16a34a',
      },
    ],
  };

  function aggregates() {
    axios
      .get(`/v2/aggs/ticker/${stocksTicker[0]}/range/${multiplier[0]}/${timespan[0]}/${from[0]}/${to[0]}`, {
        params: {
          sort: 'asc',
          limit: 10,
        }
      })
      .then(({data: response }) => {
        close[1](response.results.map((item) => {
          return item.c
        }))
        high[1](response.results.map((item) => {
          return item.h
        }))
        low[1](response.results.map((item) => {
          return item.l
        }))
        open[1](response.results.map((item) => {
          return item.o
        }))
        labels[1](response.results.map((item) => {
          return moment(item.t).format('hh:mm A')
        }))
      })
  }
  useEffect(() => {
    aggregates()
  }, [])

  const fields = Object.keys(fieldsData).map((key) => {
    if (key === 'timespan') {
      return (
        <BaseSelect
          key={ key }
          field={ fieldsData[key] }
          model={ model[key] }
        />
      )
    }
    else {
      return (
        <BaseInput
          key={ key }
          field={ fieldsData[key] }
          model={ model[key] }
        />
      )
    }
  })

  return (
    <div className='light background min-h-screen'>
      <Container>
        <main className='space-y-4'>
          <div className='px-4 py-4 rounded-lg overflow-hidden shadow bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
            { fields }
          </div>
          <div className='flex place-center'>
            <button className='px-4 py-1 shadow rounded-lg' onClick={ aggregates }>
              Search
            </button>
          </div>
          <div>
            <Card>
              <div className='max-w-3xl mx-auto'>
                <Graph data={ data }/>
              </div>
            </Card>
          </div>
        </main>
      </Container>
    </div>
  );
}

export default App;
