import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import './ThermalChart.css';
import type { HTMLAttributes } from 'react';
import type { ThermalMonitoringData } from '../utils/Data';

interface ThermalChartProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  data: ThermalMonitoringData;
}

const ThermalChart = ({ title, data, ...props }: ThermalChartProps) => {
  const fixedMaxTime = 30;
  const xTicks = [5, 10, 15, 20, 25, 30];
  const domainMax = fixedMaxTime;

  // 가장 긴 데이터 길이 찾기
  const maxLength = Math.max(
    ...data.thermalStatus.map((thermal) => thermal.value.length),
    0,
  );

  // 실제 데이터 포인트 수 (최대 30개)
  const dataLength = Math.min(maxLength, fixedMaxTime);

  // 모든 thermal status의 데이터를 하나의 차트 데이터로 병합
  const chartData = Array.from({ length: fixedMaxTime }, (_v, timeIndex) => {
    const dataPoint: { time: number; [key: string]: number | null } = {
      time: timeIndex + 1,
    };

    data.thermalStatus.forEach((thermal, index) => {
      const n = thermal.value.length;
      let value: number | null = null;

      if (timeIndex < dataLength) {
        if (n >= fixedMaxTime) {
          // 데이터가 30개 이상이면 최근 30개 사용
          value = thermal.value[n - fixedMaxTime + timeIndex];
        } else if (timeIndex < n) {
          // 데이터가 30개 미만이면 처음부터 표시
          value = thermal.value[timeIndex];
        }
      }

      // 고유한 키 생성 (인덱스 포함)
      const uniqueKey = `line-${index}`;
      dataPoint[uniqueKey] = value;
    });

    return dataPoint;
  });

  const allValues: number[] = [];
  data.thermalStatus.forEach((thermal) => {
    thermal.value.forEach((val) => {
      if (val !== null && val !== undefined) {
        allValues.push(val);
      }
    });
  });

  const maxValue = allValues.length > 0 ? Math.max(...allValues) : 70;

  let yMax = Math.max(70, Math.ceil(maxValue / 20) * 20);

  const yAxisDomain = [20, yMax];
  const yAxisTicks = [];
  for (let i = 0; i <= yMax; i += 20) {
    yAxisTicks.push(i);
  }

  return (
    <div className="thermal-chart" {...props}>
      <div className="chart-title">{title}</div>
      <ResponsiveContainer width="100%" height={266}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
          />
          <XAxis
            dataKey="time"
            type="number"
            domain={[1, domainMax]}
            ticks={xTicks}
            tick={{
              fontFamily: 'Pretendard, Arial, sans-serif',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: 16,
              fill: '#1D1D1D',
            }}
          />
          <YAxis
            width={40}
            domain={yAxisDomain}
            ticks={yAxisTicks}
            axisLine={false}
            tick={{
              fontFamily: 'Pretendard, Arial, sans-serif',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: 16,
              fill: '#1D1D1D',
            }}
          />
          {data.thermalStatus.map((thermal, index) => (
            <Line
              key={`line-${index}`}
              type="natural"
              dataKey={`line-${index}`}
              stroke={thermal.lineColor}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              dot={false}
              activeDot={false}
              isAnimationActive={false}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ThermalChart;
