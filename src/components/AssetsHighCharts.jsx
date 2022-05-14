import React, {useState, useEffect} from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import axios from "axios";

const AssetsHighCharts = () => {
    const [prices, setPrices] = useState([])

    useEffect(() => {
        (async () => {
            const data = await axios.get('http://191.252.205.198:3000/binance-history?filter=EVERY_HOUR&limit=1000000&page=1', {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            })
            const pricesArr = []
            data.data.forEach((price) => {
                if (price.asset === "LRC") {
                    const obj = [
                        Date.parse(price.data),
                        parseFloat(price.totalBalanceBRL)
                    ]
                    pricesArr.push(obj)
                }
            })
            setPrices(pricesArr.reverse())
        })()
    }, [])


    const options = {
        title: {
            text: 'Binance TOTAL'
        },
        series: [{
            name: 'Preço',
            type: 'area',
            data: prices,
            gapSize: 2,
            tooltip: {
                valueDecimals: 1
            },
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            threshold: null
        }]

    }


    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'stockChart'}
                options={options}
            />
        </div>
    )
}

export default AssetsHighCharts