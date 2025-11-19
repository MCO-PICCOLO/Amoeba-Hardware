import type { ThermalMonitoringData } from '../utils/Data';
import ThermalChart from './ThermalChart';
import './ThermalMonitoring.css';
import type { HTMLAttributes } from 'react';

interface ThermalMonitoringProps extends HTMLAttributes<HTMLDivElement> {
  soc1Data: ThermalMonitoringData;
  soc2Data: ThermalMonitoringData;
}

const ThermalMonitoring = ({
  soc1Data,
  soc2Data,
  ...props
}: ThermalMonitoringProps) => {
  return (
    <div id="thermal-monitoring" {...props}>
      <div className="inner-frame">
        <div className="title">SoC Level Thermal Status Monitoring</div>
        <ThermalChart
          title="SoC1 Thermal"
          data={soc1Data}
          style={{ left: '0px', top: '61px' }}
        />
        <ThermalChart
          title="SoC2 Thermal"
          data={soc2Data}
          style={{ left: '0px', top: '493px' }}
        />
      </div>
    </div>
  );
};

export default ThermalMonitoring;
