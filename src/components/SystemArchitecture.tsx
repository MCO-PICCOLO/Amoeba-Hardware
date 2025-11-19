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
  // 모듈의 에러 상태를 체크하는 함수
  const getModuleErrorStatus = (moduleName: string) => {
    const module = modules.find((m) => m.name === moduleName);
    const hasPowerError = module?.powerSupply && module.powerSupply !== 'OK';
    const hasHealthError = module?.health !== 'OK';
    return {
      hasPowerError,
      hasHealthError,
      hasAnyError: hasPowerError || hasHealthError,
    };
  };

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
        className={`module ${
          getModuleErrorStatus('PCIeSwitch').hasAnyError ? 'error' : ''
        }`}
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
              getModuleErrorStatus('PCIeSwitch').hasPowerError ? 'err' : ''
            }`}
          >
            Power Supply:
          </div>
          <div
            className={`module-health ${
              getModuleErrorStatus('PCIeSwitch').hasHealthError ? 'err' : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className={`module ${
          getModuleErrorStatus('NVMe').hasAnyError ? 'error' : ''
        }`}
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
              getModuleErrorStatus('NVMe').hasPowerError ? 'err' : ''
            }`}
          >
            Power Supply:
          </div>
          <div
            className={`module-health ${
              getModuleErrorStatus('NVMe').hasHealthError ? 'err' : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className={`module ${
          getModuleErrorStatus('SoC1').hasAnyError ? 'error' : ''
        }`}
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
              getModuleErrorStatus('SoC1').hasPowerError ? 'err' : ''
            }`}
          >
            Power Supply:
          </div>
          <div
            className={`module-health ${
              getModuleErrorStatus('SoC1').hasHealthError ? 'err' : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className={`module ${
          getModuleErrorStatus('SafetyMCU').hasAnyError ? 'error' : ''
        }`}
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
              getModuleErrorStatus('SafetyMCU').hasPowerError ? 'err' : ''
            }`}
          >
            Power Supply:
          </div>
          <div
            className={`module-health ${
              getModuleErrorStatus('SafetyMCU').hasHealthError ? 'err' : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className={`module ${
          getModuleErrorStatus('SoC2').hasAnyError ? 'error' : ''
        }`}
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
              getModuleErrorStatus('SoC2').hasPowerError ? 'err' : ''
            }`}
          >
            Power Supply:
          </div>
          <div
            className={`module-health ${
              getModuleErrorStatus('SoC2').hasHealthError ? 'err' : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className={`module ${
          getModuleErrorStatus('Camera1').hasAnyError ? 'error' : ''
        }`}
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
              getModuleErrorStatus('Camera1').hasPowerError ? 'err' : ''
            }`}
          >
            Power Supply:
          </div>
          <div
            className={`module-health ${
              getModuleErrorStatus('Camera1').hasHealthError ? 'err' : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className={`module ${
          getModuleErrorStatus('ETH1').hasAnyError ? 'error' : ''
        }`}
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
              getModuleErrorStatus('ETH1').hasPowerError ? 'err' : ''
            }`}
          >
            Power Supply:
          </div>
          <div
            className={`module-health ${
              getModuleErrorStatus('ETH1').hasHealthError ? 'err' : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className={`module ${
          getModuleErrorStatus('Display1').hasAnyError ? 'error' : ''
        }`}
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
              getModuleErrorStatus('Display1').hasPowerError ? 'err' : ''
            }`}
          >
            Power Supply:
          </div>
          <div
            className={`module-health ${
              getModuleErrorStatus('Display1').hasHealthError ? 'err' : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>

      <div
        className={`module ${
          getModuleErrorStatus('Zonal0').hasAnyError ? 'error' : ''
        }`}
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
              getModuleErrorStatus('Zonal0').hasHealthError ? 'err' : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className={`module ${
          getModuleErrorStatus('SWLESS0_0').hasAnyError ? 'error' : ''
        }`}
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
              getModuleErrorStatus('SWLESS0_0').hasHealthError ? 'err' : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className={`module ${
          getModuleErrorStatus('SWLESS0_1').hasAnyError ? 'error' : ''
        }`}
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
              getModuleErrorStatus('SWLESS0_1').hasHealthError ? 'err' : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className={`module ${
          getModuleErrorStatus('MCU0').hasAnyError ? 'error' : ''
        }`}
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
              getModuleErrorStatus('MCU0').hasHealthError ? 'err' : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>

      <div
        className={`module ${
          getModuleErrorStatus('Zonal1').hasAnyError ? 'error' : ''
        }`}
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
              getModuleErrorStatus('Zonal1').hasHealthError ? 'err' : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className={`module ${
          getModuleErrorStatus('SWLESS1_0').hasAnyError ? 'error' : ''
        }`}
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
              getModuleErrorStatus('SWLESS1_0').hasHealthError ? 'err' : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className={`module ${
          getModuleErrorStatus('SWLESS1_1').hasAnyError ? 'error' : ''
        }`}
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
              getModuleErrorStatus('SWLESS1_1').hasHealthError ? 'err' : ''
            }`}
          >
            Health:
          </div>
        </div>
      </div>
      <div
        className={`module ${
          getModuleErrorStatus('MCU1').hasAnyError ? 'error' : ''
        }`}
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
              getModuleErrorStatus('MCU1').hasHealthError ? 'err' : ''
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
