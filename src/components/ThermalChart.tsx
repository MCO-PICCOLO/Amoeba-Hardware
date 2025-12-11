import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { useMemo, memo } from 'react';
import './ThermalChart.css';
import type { HTMLAttributes } from 'react';
import type { ThermalMonitoringData } from '../utils/Data';

interface ThermalChartProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  data: ThermalMonitoringData;
}

// 스타일 상수 (메모리 재할당 방지)
const TICK_STYLE = {
  fontFamily: 'Pretendard, Arial, sans-serif',
  fontStyle: 'normal' as const,
  fontWeight: 500,
  fontSize: 16,
  fill: '#1D1D1D',
};

const CHART_MARGIN = { top: 5, right: 15, left: 0, bottom: 5 } as const;
const GRIDLINE_STYLE = { strokeDasharray: '3 3' } as const;
const CHART_CONTAINER_STYLE = {
  position: 'absolute' as const,
  top: '66px',
  left: '20px',
};

const ThermalChart = memo(({ title, data, ...props }: ThermalChartProps) => {
  const fixedMaxTime = 300; // 5분 * 60초 = 300개 데이터 포인트
  const xTicks = [60, 120, 180, 240, 300]; // 1분, 2분, 3분, 4분, 5분
  const domainMax = fixedMaxTime;

  // chartData를 useMemo로 최적화
  // 항상 최신 300개 데이터를 Queue처럼 표시 (슬라이딩 윈도우)
  const chartData = useMemo(() => {
    return Array.from({ length: fixedMaxTime }, (_v, timeIndex) => {
      const dataPoint: { time: number; [key: string]: number | null } = {
        time: timeIndex + 1,
      };

      data.thermalStatus.forEach((thermal) => {
        const n = thermal.value.length;
        let value: number | null = null;

        // 항상 최신 300개 데이터 포인트만 사용 (Queue 동작)
        if (n >= fixedMaxTime) {
          // 데이터가 300개 이상이면 최신 300개만 사용
          const startIndex = n - fixedMaxTime;
          value = thermal.value[startIndex + timeIndex];
        } else if (timeIndex < n) {
          // 데이터가 300개 미만이면 처음부터 표시
          value = thermal.value[timeIndex];
        }

        dataPoint[thermal.moduleName] = value;
      });

      return dataPoint;
    });
  }, [data]);

  // console.log('ThermalChart data:', data);

  const yAxisDomain = [20, 90];
  const yAxisTicks = [20, 45, 70, 90];

  // X축 라벨 포매터 - 초를 분으로 변환
  const formatXAxisLabel = (value: number) => {
    return `${Math.round(value / 60)}`;
  };

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
                {thermal.moduleName === 'CPUCluster0'
                  ? 'CPU'
                  : thermal.moduleName}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div style={CHART_CONTAINER_STYLE}>
        <ResponsiveContainer width={573} height={223}>
          <LineChart data={chartData} margin={CHART_MARGIN}>
            <CartesianGrid
              strokeDasharray={GRIDLINE_STYLE.strokeDasharray}
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="time"
              type="number"
              domain={[1, domainMax]}
              ticks={xTicks}
              tickFormatter={formatXAxisLabel}
              tick={TICK_STYLE}
            />
            <YAxis
              width={50}
              domain={yAxisDomain}
              ticks={yAxisTicks}
              axisLine={true}
              tick={TICK_STYLE}
            />
            <ReferenceLine y={90} stroke="#FF0000" strokeWidth={2} />
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
});

ThermalChart.displayName = 'ThermalChart';

export default ThermalChart;
