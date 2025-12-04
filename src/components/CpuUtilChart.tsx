import './CpuUtilChart.css';
import type { HTMLAttributes } from 'react';
import {
  BarChart,
  Bar,
  LabelList,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Rectangle,
} from 'recharts';

interface CpuUtilChartProps extends HTMLAttributes<HTMLDivElement> {
  cpu1Value: number;
  cpu2Value: number;
}

const CpuUtilChart = ({
  cpu1Value,
  cpu2Value,
  ...props
}: CpuUtilChartProps) => {
  // 샘플 데이터: SoC1, SoC2 CPU 사용률 (0-100)
  const soc1Data = [{ name: 'SoC1', value: cpu1Value }];
  const soc2Data = [{ name: 'SoC2', value: cpu2Value }];

  const SOC1_COLOR = '#9296FF';
  const SOC2_COLOR = '#EFA4FA';
  const SOC1_BG = 'rgba(146, 150, 255, 0.2)';
  const SOC2_BG = 'rgba(239, 164, 250, 0.2)';

  const BackgroundRect = (fill: string) => (props: any) => {
    const { x, y, width, height } = props;
    return (
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        radius={[10, 10, 10, 10]}
      />
    );
  };

  const CustomLabel = (props: any) => {
    const { x, y, width, height, value } = props as any;
    const cx = (x ?? 0) + (width ?? 0) + 15;
    const cy = (y ?? 0) + (height ?? 0) / 2;
    const label = value != null ? `${value}%` : '';

    return (
      <text
        x={10}
        y={cy}
        textAnchor="start"
        dominantBaseline="middle"
        fontFamily="Pretendard"
        fontStyle="normal"
        fontWeight={500}
        fontSize={28}
        fill="#2F3279"
      >
        {label}
      </text>
    );
  };

  return (
    <div id="cpu-util-chart" {...props}>
      <div className="cpu-util-header">
        <div className="cpu-util-title">CPU Utilization</div>
        <div className="cpu-util-legend">
          <div className="legend-item">
            <div
              className="legend-icon"
              style={{ backgroundColor: SOC1_COLOR }}
            />
            <span className="legend-label">SoC1</span>
          </div>
          <div className="legend-item">
            <div
              className="legend-icon"
              style={{ backgroundColor: SOC2_COLOR }}
            />
            <span className="legend-label">SoC2</span>
          </div>
        </div>
      </div>
      <div className="inner-contents">
        <div className="cpu-util-item">
          <div className="cpu-util-bar">
            <ResponsiveContainer width="100%" height={70}>
              <BarChart
                data={soc1Data}
                layout="vertical"
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis type="category" dataKey="name" hide />
                <Bar
                  dataKey="value"
                  barSize={95}
                  name=""
                  isAnimationActive={false}
                  fill={SOC1_COLOR}
                  radius={[10, 10, 10, 10]}
                  background={BackgroundRect(SOC1_BG)}
                  shape={<Rectangle rx={10} ry={10} />}
                >
                  <LabelList dataKey="value" content={CustomLabel} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="cpu-util-item">
          <div className="cpu-util-bar">
            <ResponsiveContainer width="100%" height={70}>
              <BarChart
                data={soc2Data}
                layout="vertical"
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis type="category" dataKey="name" hide />
                <Bar
                  dataKey="value"
                  barSize={95}
                  name=""
                  isAnimationActive={false}
                  fill={SOC2_COLOR}
                  radius={[10, 10, 10, 10]}
                  background={BackgroundRect(SOC2_BG)}
                  shape={<Rectangle rx={10} ry={10} />}
                >
                  <LabelList dataKey="value" content={CustomLabel} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CpuUtilChart;
