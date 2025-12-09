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
    let powerSupplyStatus: 'OK' | 'ERROR' | 'WARN' | undefined = undefined;
    if (module && module.powerSupply) {
      if (module.powerSupply === 'ERROR') powerSupplyStatus = 'ERROR';
      else if (module.powerSupply === 'WARN') powerSupplyStatus = 'WARN';
      else powerSupplyStatus = 'OK';
    }
    let powerSupplyAndroidStatus: 'OK' | 'ERROR' | 'WARN' | undefined =
      undefined;
    if (module && module.powerSupplyAndroid) {
      if (module.powerSupplyAndroid === 'ERROR')
        powerSupplyAndroidStatus = 'ERROR';
      else if (module.powerSupplyAndroid === 'WARN')
        powerSupplyAndroidStatus = 'WARN';
      else powerSupplyAndroidStatus = 'OK';
    }
    const hasPowerError = powerSupplyStatus === 'ERROR';
    const hasPowerWarn = powerSupplyStatus === 'WARN';
    const hasPowerAndroidError = powerSupplyAndroidStatus === 'ERROR';
    const hasPowerAndroidWarn = powerSupplyAndroidStatus === 'WARN';
    const hasHealthError = module?.health !== 'OK';
    return {
      hasPowerError,
      hasPowerWarn,
      hasPowerAndroidError,
      hasPowerAndroidWarn,
      hasHealthError,
      hasAnyError: hasPowerError || hasHealthError,
      powerSupplyStatus,
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
      {/* PCIeSwitch */}
      <div
        className={`health24 ${
          getModuleErrorStatus('PCIeSwitch').hasHealthError ? 'err' : ''
        }`}
        style={{ position: 'absolute', top: '49px', left: '560px' }}
      />
      <div
        className={`ps16 ${
          getModuleErrorStatus('PCIeSwitch').hasPowerError
            ? 'err'
            : getModuleErrorStatus('PCIeSwitch').hasPowerWarn
            ? 'warn'
            : ''
        }`}
        style={{ position: 'absolute', top: '128px', left: '508px' }}
      >
        Power
      </div>
      {/* SoC1 */}
      <div
        className={`health24 ${
          getModuleErrorStatus('SoC1').hasHealthError ? 'err' : ''
        }`}
        style={{ position: 'absolute', top: '136px', left: '268px' }}
      />
      <div
        className={`ps16 ${
          getModuleErrorStatus('SoC1').hasPowerError
            ? 'err'
            : getModuleErrorStatus('SoC1').hasPowerWarn
            ? 'warn'
            : ''
        }`}
        style={{ position: 'absolute', top: '262px', left: '207px' }}
      >
        Power
      </div>
      {/* Camera1 */}
      <div
        className={`health24 ${
          getModuleErrorStatus('Camera1').hasHealthError ? 'err' : ''
        }`}
        style={{ position: 'absolute', top: '335px', left: '178px' }}
      />
      <div
        className={`ps16 ${
          getModuleErrorStatus('Camera1').hasPowerError
            ? 'err'
            : getModuleErrorStatus('Camera1').hasPowerWarn
            ? 'warn'
            : ''
        }`}
        style={{ position: 'absolute', top: '417px', left: '130px' }}
      >
        Power
      </div>
      {/* Display1 */}
      <div
        className={`ps-linux ${
          getModuleErrorStatus('Display1').hasPowerError
            ? 'err'
            : getModuleErrorStatus('Display1').hasPowerWarn
            ? 'warn'
            : ''
        }`}
        style={{ position: 'absolute', top: '417px', left: '264px' }}
      />
      <div
        className={`ps-android ${
          getModuleErrorStatus('Display1').hasPowerAndroidError
            ? 'err'
            : getModuleErrorStatus('Display1').hasPowerAndroidWarn
            ? 'warn'
            : ''
        }`}
        style={{ position: 'absolute', top: '448px', left: '264px' }}
      />
      {/* ETH1 */}
      <div
        className={`health24 ${
          getModuleErrorStatus('ETH1').hasHealthError ? 'err' : ''
        }`}
        style={{ position: 'absolute', top: '328px', left: '462px' }}
      />
      <div
        className={`ps16 ${
          getModuleErrorStatus('ETH1').hasPowerAndroidError
            ? 'err'
            : getModuleErrorStatus('ETH1').hasPowerAndroidWarn
            ? 'warn'
            : ''
        }`}
        style={{ position: 'absolute', top: '437px', left: '417px' }}
      >
        Power
      </div>
      {/* SoC2 */}
      <div
        className={`health24 ${
          getModuleErrorStatus('SoC2').hasHealthError ? 'err' : ''
        }`}
        style={{ position: 'absolute', top: '136px', left: '869px' }}
      />
      <div
        className={`ps16 ${
          getModuleErrorStatus('SoC2').hasPowerError
            ? 'err'
            : getModuleErrorStatus('SoC2').hasPowerWarn
            ? 'warn'
            : ''
        }`}
        style={{ position: 'absolute', top: '262px', left: '808px' }}
      >
        Power
      </div>
      {/* Camera2 */}
      <div
        className={`health24 ${
          getModuleErrorStatus('Camera2').hasHealthError ? 'err' : ''
        }`}
        style={{ position: 'absolute', top: '335px', left: '782px' }}
      />
      <div
        className={`ps16 ${
          getModuleErrorStatus('Camera2').hasPowerError
            ? 'err'
            : getModuleErrorStatus('Camera2').hasPowerWarn
            ? 'warn'
            : ''
        }`}
        style={{ position: 'absolute', top: '427px', left: '732px' }}
      >
        Power
      </div>
      {/* Display2 */}
      <div
        className={`ps-linux ${
          getModuleErrorStatus('Display2').hasPowerError
            ? 'err'
            : getModuleErrorStatus('Display2').hasPowerWarn
            ? 'warn'
            : ''
        }`}
        style={{ position: 'absolute', top: '417px', left: '864px' }}
      />
      {/* ETH2 */}
      <div
        className={`health24 ${
          getModuleErrorStatus('ETH2').hasHealthError ? 'err' : ''
        }`}
        style={{ position: 'absolute', top: '328px', left: '644px' }}
      />
      <div
        className={`ps16 ${
          getModuleErrorStatus('ETH2').hasPowerAndroidError
            ? 'err'
            : getModuleErrorStatus('ETH2').hasPowerAndroidWarn
            ? 'warn'
            : ''
        }`}
        style={{ position: 'absolute', top: '437px', left: '599px' }}
      >
        Power
      </div>
      {/* Zonal0 */}
      <div
        className={`health24 ${
          getModuleErrorStatus('Zonal0').hasHealthError ? 'err' : ''
        }`}
        style={{ position: 'absolute', top: '570px', left: '280px' }}
      />
      {/* MCU0 */}
      <div
        className={`health18 ${
          getModuleErrorStatus('MCU0').hasHealthError ? 'err' : ''
        }`}
        style={{ position: 'absolute', top: '732px', left: '107px' }}
      />
      {/* SWLESS0_0 */}
      <div
        className={`health18 ${
          getModuleErrorStatus('SWLESS0_0').hasHealthError ? 'err' : ''
        }`}
        style={{ position: 'absolute', top: '732px', left: '275px' }}
      />
      {/* SWLESS0_1 */}
      <div
        className={`health18 ${
          getModuleErrorStatus('SWLESS0_1').hasHealthError ? 'err' : ''
        }`}
        style={{ position: 'absolute', top: '732px', left: '443px' }}
      />
      {/* Zonal1 */}
      <div
        className={`health24 ${
          getModuleErrorStatus('Zonal1').hasHealthError ? 'err' : ''
        }`}
        style={{ position: 'absolute', top: '570px', left: '835px' }}
      />
      {/* MCU1 */}
      <div
        className={`health18 ${
          getModuleErrorStatus('MCU1').hasHealthError ? 'err' : ''
        }`}
        style={{ position: 'absolute', top: '732px', left: '662px' }}
      />
      {/* SWLESS1_0 */}
      <div
        className={`health18 ${
          getModuleErrorStatus('SWLESS1_0').hasHealthError ? 'err' : ''
        }`}
        style={{ position: 'absolute', top: '732px', left: '830px' }}
      />
      {/* SWLESS1_1 */}
      <div
        className={`health18 ${
          getModuleErrorStatus('SWLESS1_1').hasHealthError ? 'err' : ''
        }`}
        style={{ position: 'absolute', top: '732px', left: '998px' }}
      />{' '}
    </div>
  );
};

export default SystemArchitecture;
