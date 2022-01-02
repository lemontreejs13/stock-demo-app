import moment from 'moment'

const fieldsData = {
  stocksTicker: {
    type: 'text',
    id: 'stocks-ticker',
    name: 'stocks-ticker',
    label: 'Stocks ticker (symbol)',
    maxlength: 5,
  },
  multiplier: {
    type: 'number',
    id: 'multiplier',
    name: 'multiplier',
    label: 'Multiplier',
    min: 1,
  },
  timespan: {
    type: 'text',
    id: 'timespan',
    name: 'timespan',
    label: 'Time span',
    options: ['minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'],
  },
  from: {
    type: 'date',
    id: 'from',
    name: 'from',
    label: 'Start date',
  },
  to: {
    type: 'date',
    id: 'to',
    name: 'to',
    label: 'End date',
    max: moment().format('YYYY-MM-DD'),
  },
}

export default fieldsData