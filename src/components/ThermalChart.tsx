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

  console.log('ThermalChart data:', data);

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

    data.thermalStatus.forEach((thermal) => {
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

      // 고유한 키 생성 (모듈 이름 사용)
      dataPoint[thermal.moduleName] = value;
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

  const yAxisDomain = [0, 70];
  const yAxisTicks = [0, 20, 45, 70];

  return (
    <div className="thermal-chart" {...props}>
      <div className="chart-title-legend">
        <div className="chart-title">{title}</div>
        <div className="chart-legend">
          {data.thermalStatus.map((thermal, index) => (
            <div key={`legend-${index}`} className="legend-item">
              <div
                className="legend-icon"
                style={{ borderColor: thermal.lineColor }}
              />
              <span className="legend-label">
                {thermal.moduleName === 'CpuCluster0'
                  ? 'CPU'
                  : thermal.moduleName}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', top: '66px', left: '20px' }}>
        <ResponsiveContainer width={573} height={223}>
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
                dataKey={thermal.moduleName}
                stroke={thermal.lineColor}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                dot={false}
                activeDot={false}
                isAnimationActive={false}
                connectNulls={false}
                name={thermal.moduleName}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ThermalChart;
