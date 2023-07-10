import { Chart, ChartAxis, ChartGroup, ChartLine, ChartThemeColor, ChartVoronoiContainer } from '@patternfly/react-charts';
import { useEffect, useState } from 'react';
import { IStatictisSellerDay, IStatictisUserDay } from '../../common/statistic.interface';
import TotalBoxUser from '../totalBox/TotalBoxUser';

interface StatisticalChartProps {
    dataUserChart: IStatictisUserDay | undefined,
    dataSellerChart: IStatictisSellerDay | undefined,
}

const StatisticalUserChart = (props: StatisticalChartProps) => {

    const options = { day: 'numeric', month: 'numeric' };
    const [dataChart, setDataChart] = useState<any>([]); // state của component
    const [maxValue, setMaxValue] = useState<number>(0); // state của component
    const [dataUserChart, setDataUserChart] = useState<any[]>([]); // state của component
    const [dataSellerChart, setDataSellerChart] = useState<any[]>([]); // state của component
    const [totalUser, setTotalUser] = useState<number>(0); // state của component
    const [totalSeller, setTotalSeller] = useState<number>(0); // state của component
    useEffect(() => {
        if (props.dataUserChart && props.dataSellerChart && props.dataUserChart.items && props.dataSellerChart.items) {
            // setDataChart(props.data.items)
            console.log(props.dataUserChart);
            console.log(props.dataSellerChart);
            const maxTotalUser = Math.max(...props.dataUserChart.items.map((item: { totalUser: any; }) => item.totalUser));
            const maxTotalSeller = Math.max(...props.dataSellerChart.items.map((item: { totalSeller: any; }) => item.totalSeller));
            const max = Math.max(maxTotalUser, maxTotalSeller);
            console.log(max);

            setMaxValue(max);
            setTotalUser(props.dataUserChart.items.map((item: { totalUser: any; }) => item.totalUser).reduce((a: number, b: number) => a + b, 0));
            setTotalSeller(props.dataSellerChart.items.map((item: { totalSeller: any; }) => item.totalSeller).reduce((a: number, b: number) => a + b, 0));
            getValueUser(props.dataUserChart.items);
            getValueSeller(props.dataSellerChart.items);
        }

    }, [props.dataUserChart, props.dataSellerChart])

    const getValueUser = (items: any[]) => {
        const tmpLst: any[] = []
        items.map((item: any) => {
            const newDate = new Date(item.day);

            const time = newDate.toLocaleDateString('en-GB');
            const tmp = {
                name: 'Tài khoản người bán',
                x: time,
                y: item.totalUser
            }
            tmpLst.push(tmp)
        })

        setDataUserChart(tmpLst);
    }

    const getValueSeller = (items: any[]) => {
        const tmpLst: any[] = []
        items.map((item: any) => {
            const time = new Date(item.day).toLocaleDateString('en-GB');
            const tmp = {
                name: 'Tài khoản người mua',
                x: time,
                y: item.totalSeller
            }
            tmpLst.push(tmp)
        })

        setDataSellerChart(tmpLst);
    }

    const divideRangeIntoFourParts = (maxValue: number) => {
        const interval = maxValue / 4;
        const divisions = [];
        for (let i = 1; i <= 4; i++) {
            divisions.push(interval * i);
        }

        return divisions;
    }
    return (
        <>
            {(props.dataUserChart && props.dataSellerChart && maxValue > 0) &&
                <div className='main-statistical-chart'>
                    {(props.dataUserChart && props.dataSellerChart) &&
                        <div className='total-content'>
                            <TotalBoxUser
                                title='Tài khoản người bán'
                                number={totalUser}
                                icon=''
                            />
                            <TotalBoxUser
                                title='Tài khoản người mua'
                                number={totalSeller}
                                icon=''
                            />
                        </div>
                    }

                    <Chart
                        ariaDesc="Average number of pets"
                        ariaTitle="Line chart example"
                        containerComponent={<ChartVoronoiContainer labels={({ datum }) => `${datum.name}: ${datum.y}`} constrainToVisibleArea />}
                        legendData={[{ name: 'Tài khoản người bán' }, { name: 'Tài khoản người mua' }]}
                        legendOrientation="vertical"
                        legendPosition="right"
                        height={230}
                        maxDomain={{ y: maxValue }}
                        minDomain={{ y: 0 }}
                        name="chart1"
                        padding={{
                            bottom: 50,
                            left: 50,
                            right: 200, // Adjusted to accommodate legend
                            top: 50
                        }}
                        width={500}
                        themeColor={ChartThemeColor.multiUnordered}

                    >
                        <ChartAxis tickValues={divideRangeIntoFourParts(maxValue)} />
                        <ChartAxis dependentAxis showGrid tickValues={divideRangeIntoFourParts(maxValue)} />
                        <ChartGroup>
                            <ChartLine
                                data={dataUserChart}
                            />
                            <ChartLine
                                data={dataSellerChart}
                            />
                        </ChartGroup>
                    </Chart>
                </div>

            }
        </>
    )
}

export default StatisticalUserChart