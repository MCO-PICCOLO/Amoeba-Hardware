import type { ModuleStatus } from '../utils/Data';
import './SystemArchitecture.css';
import type { HTMLAttributes } from 'react';

interface SystemArchitureProps extends HTMLAttributes<HTMLDivElement> {
  systemPower: number;
  modules: ModuleStatus[];
}

const SystemArchitecture = ({
  systemPower,
  modules = [],
  ...props
}: SystemArchitureProps) => {
  return (
    <div id="system-architecture" {...props}>
      <div className="hpc-area">
        <div className="hpc">
          <div className="text">HPC</div>
        </div>
        <div className="syspower">
          <div className="gray-box">
            <div className="text">Sys.Power.{systemPower}W</div>
          </div>
        </div>
      </div>
      <div
        className="module"
        style={{
          position: 'absolute',
          top: '20px',
          left: '440px',
          width: '205px',
          height: '131px',
        }}
      >
        <div className="module-name">PCIe swith</div>
        <div className="module-info">
          <div
            className={`module-ps ${
              modules.find((m) => m.name === 'PCIeSwitch')?.powerSupply !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Power Supply:
          </div>
          <div
            className={`module-health ${
              modules.find((m) => m.name === 'PCIeSwitch')?.health !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className="module"
        style={{
          position: 'absolute',
          top: '20px',
          left: '778px',
          width: '205px',
          height: '131px',
        }}
      >
        <div className="module-name">NVMe</div>
        <div className="module-info">
          <div
            className={`module-ps ${
              modules.find((m) => m.name === 'NVMe')?.powerSupply !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Power Supply:
          </div>
          <div
            className={`module-health ${
              modules.find((m) => m.name === 'NVMe')?.health !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className="module"
        style={{
          position: 'absolute',
          top: '180px',
          left: '89px',
          width: '225px',
          height: '151px',
        }}
      >
        <div className="module-name">SoC1</div>
        <div className="module-info">
          <div
            className={`module-ps ${
              modules.find((m) => m.name === 'SoC1')?.powerSupply !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Power Supply:
          </div>
          <div
            className={`module-health ${
              modules.find((m) => m.name === 'SoC1')?.health !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className="module"
        style={{
          position: 'absolute',
          top: '190px',
          left: '440px',
          width: '205px',
          height: '131px',
        }}
      >
        <div className="module-name">Saftey MCU</div>
        <div className="module-info">
          <div
            className={`module-ps ${
              modules.find((m) => m.name === 'SafetyMCU')?.powerSupply !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Power Supply:
          </div>
          <div
            className={`module-health ${
              modules.find((m) => m.name === 'SafetyMCU')?.health !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className="module"
        style={{
          position: 'absolute',
          top: '180px',
          left: '768px',
          width: '225px',
          height: '151px',
        }}
      >
        <div className="module-name">SoC2</div>
        <div className="module-info">
          <div
            className={`module-ps ${
              modules.find((m) => m.name === 'SoC2')?.powerSupply !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Power Supply:
          </div>
          <div
            className={`module-health ${
              modules.find((m) => m.name === 'SoC2')?.health !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className="module"
        style={{
          position: 'absolute',
          top: '360px',
          left: '101px',
          width: '205px',
          height: '131px',
        }}
      >
        <div className="module-name">Camera1</div>
        <div className="module-info">
          <div
            className={`module-ps ${
              modules.find((m) => m.name === 'Camera1')?.powerSupply !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Power Supply:
          </div>
          <div
            className={`module-health ${
              modules.find((m) => m.name === 'Camera1')?.health !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className="module"
        style={{
          position: 'absolute',
          top: '360px',
          left: '440px',
          width: '205px',
          height: '131px',
        }}
      >
        <div className="module-name">ETH1</div>
        <div className="module-info">
          <div
            className={`module-ps ${
              modules.find((m) => m.name === 'ETH1')?.powerSupply !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Power Supply:
          </div>
          <div
            className={`module-health ${
              modules.find((m) => m.name === 'ETH1')?.health !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className="module"
        style={{
          position: 'absolute',
          top: '360px',
          left: '778px',
          width: '205px',
          height: '131px',
        }}
      >
        <div className="module-name">Display1</div>
        <div className="module-info">
          <div
            className={`module-ps ${
              modules.find((m) => m.name === 'Display1')?.powerSupply !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Power Supply:
          </div>
          <div
            className={`module-health ${
              modules.find((m) => m.name === 'Display1')?.health !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>

      <div
        className="module"
        style={{
          position: 'absolute',
          top: '561px',
          left: '152px',
          width: '225px',
          height: '114px',
        }}
      >
        <div className="module-name">Zonal0</div>
        <div className="module-info">
          <div
            className={`module-health ${
              modules.find((m) => m.name === 'Zonal0')?.health !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className="module"
        style={{
          position: 'absolute',
          top: '707px',
          left: '30px',
          width: '138px',
          height: '99px',
        }}
      >
        <div className="module-name">SW-less</div>
        <div className="module-info">
          <div
            className={`module-health ${
              modules.find((m) => m.name === 'SWLESS0_0')?.health !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className="module"
        style={{
          position: 'absolute',
          top: '707px',
          left: '202px',
          width: '138px',
          height: '99px',
        }}
      >
        <div className="module-name">SW-less</div>
        <div className="module-info">
          <div
            className={`module-health ${
              modules.find((m) => m.name === 'SWLESS0_1')?.health !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className="module"
        style={{
          position: 'absolute',
          top: '707px',
          left: '360px',
          width: '138px',
          height: '99px',
        }}
      >
        <div className="module-name">MCU</div>
        <div className="module-info">
          <div
            className={`module-health ${
              modules.find((m) => m.name === 'MCU0')?.health !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>

      <div
        className="module"
        style={{
          position: 'absolute',
          top: '561px',
          left: '710px',
          width: '225px',
          height: '114px',
        }}
      >
        <div className="module-name">Zonal</div>
        <div className="module-info">
          <div
            className={`module-health ${
              modules.find((m) => m.name === 'Zonal1')?.health !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className="module"
        style={{
          position: 'absolute',
          top: '707px',
          left: '588px',
          width: '138px',
          height: '99px',
        }}
      >
        <div className="module-name">SW-less</div>
        <div className="module-info">
          <div
            className={`module-health ${
              modules.find((m) => m.name === 'SWLESS1_0')?.health !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className="module"
        style={{
          position: 'absolute',
          top: '707px',
          left: '760px',
          width: '138px',
          height: '99px',
        }}
      >
        <div className="module-name">SW-less</div>
        <div className="module-info">
          <div
            className={`module-health ${
              modules.find((m) => m.name === 'SWLESS1_1')?.health !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className="module"
        style={{
          position: 'absolute',
          top: '707px',
          left: '918px',
          width: '138px',
          height: '99px',
        }}
      >
        <div className="module-name">MCU</div>
        <div className="module-info">
          <div
            className={`module-health ${
              modules.find((m) => m.name === 'MCU1')?.health !== 'OK'
                ? 'err'
                : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>

      {/* <div className="module-status">
        {modules.map((module) => (
          <div key={module.name} className="module">
            <div className="module-name">{module.name}</div>
            {module.powerSupply && (
              <div className="module-power">
                Power Supply: {module.powerSupply}
              </div>
            )}
            <div className="module-health">Health: {module.health}</div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default SystemArchitecture;
