import React from 'react'
import { Chart, ChartAxis, ChartGroup, ChartLine, ChartThemeColor, ChartVoronoiContainer } from '@patternfly/react-charts';

interface StatisticalChartProps {
    type: string,
    data: any
}

const StatisticalChart = (props: StatisticalChartProps) => {
    return (
        <Chart
            ariaDesc="Average number of pets"
            ariaTitle="Line chart example"
            containerComponent={<ChartVoronoiContainer labels={({ datum }) => `${datum.name}: ${datum.y}`} constrainToVisibleArea />}
            legendData={[{ name: 'Tiền thu từ khách' }, { name: 'Tiền trả người bán' }, { name: 'Tiền còn nợ' }, { name: 'Hoa hồng' }]}
            legendOrientation="vertical"
            legendPosition="right"
            height={250}
            maxDomain={{ y: 10 }}
            minDomain={{ y: 0 }}
            name="chart1"
            padding={{
                bottom: 50,
                left: 50,
                right: 200, // Adjusted to accommodate legend
                top: 50
            }}
            width={800}
            themeColor={ChartThemeColor.multiUnordered}

        >
            <ChartAxis tickValues={[2, 3, 4]} />
            <ChartAxis dependentAxis showGrid tickValues={[2, 5, 8]} />
            <ChartGroup>
                <ChartLine
                    data={[
                        { name: 'Tiền thu từ khách', x: 'Quý I', y: 1 },
                        { name: 'Tiền thu từ khách', x: 'Quý II', y: 2 },
                        { name: 'Tiền thu từ khách', x: 'Quý III', y: 5 },
                        { name: 'Tiền thu từ khách', x: 'Quý IV', y: 3 },

                    ]}
                />
                <ChartLine
                    data={[
                        { name: 'Tiền trả người bán', x: 'Quý I', y: 2 },
                        { name: 'Tiền trả người bán', x: 'Quý II', y: 1 },
                        { name: 'Tiền trả người bán', x: 'Quý III', y: 7 },
                        { name: 'Tiền trả người bán', x: 'Quý IV', y: 4 },

                    ]}

                />
                <ChartLine
                    data={[
                        { name: 'Tiền còn nợ', x: 'Quý I', y: 3 },
                        { name: 'Tiền còn nợ', x: 'Quý II', y: 4 },
                        { name: 'Tiền còn nợ', x: 'Quý III', y: 9 },
                        { name: 'Tiền còn nợ', x: 'Quý IV', y: 5 },

                    ]}
                />
                <ChartLine
                    data={[
                        { name: 'Hoa hồng', x: 'Quý I', y: 3 },
                        { name: 'Hoa hồng', x: 'Quý II', y: 3 },
                        { name: 'Hoa hồng', x: 'Quý III', y: 8 },
                        { name: 'Hoa hồng', x: 'Quý IV', y: 7 },

                    ]}
                />
            </ChartGroup>
        </Chart>
    )
}

export default StatisticalChart