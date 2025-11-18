import { useEffect, useState, useRef } from 'react';
import SystemArchitecture from '../components/SystemArchitecture';
// import { getSystemInfo } from '../utils/RestAPI';
import './SystemMonitor.css';
import type { SystemInfo } from '../utils/Data';
import { getSystemInfo } from '../utils/RestAPI';

interface SystemMonitorProps {}

const SystemMonitor = ({}: SystemMonitorProps) => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    systemArchitecture: {
      systemPower: 0,
      modules: [
        { name: 'Camera1', powerSupply: 'OK', health: 'OK' },
        { name: 'Display1', powerSupply: 'OK', health: 'OK' },
        { name: 'SoC1', powerSupply: 'OK', health: 'OK' },
        { name: 'SoC2', powerSupply: 'OK', health: 'OK' },
        { name: 'PCIeSwitch', powerSupply: 'OK', health: 'OK' },
        { name: 'ETH1', powerSupply: 'OK', health: 'OK' },
        { name: 'SafetyMCU', powerSupply: 'OK', health: 'OK' },
        { name: 'NVMe', powerSupply: 'OK', health: 'OK' },
        { name: 'Zonal0', health: 'OK' },
        { name: 'Zonal1', health: 'OK' },
        { name: 'MCU0', health: 'OK' },
        { name: 'MCU1', health: 'OK' },
        { name: 'SWLESS0_0', health: 'OK' },
        { name: 'SWLESS0_1', health: 'OK' },
        { name: 'SWLESS1_0', health: 'OK' },
        { name: 'SWLESS1_1', health: 'OK' },
      ],
    },
  });
  const timeoutRef = useRef<number | null>(null);

  const fetchSystemInfo = async () => {
    const startTime = Date.now();

    try {
      const data = await getSystemInfo();
      //   const data = {
      //     SystemInfo: {
      //       SoC1: {
      //         AndroidVM: {
      //           cpus: {},
      //           memory: {},
      //         },
      //         ServerVM: {
      //           Temperature: {
      //             ChipPackage: 0,
      //             CpuCluster0: {
      //               avg: 0,
      //             },
      //             CpuCluster1: {
      //               avg: 0,
      //             },
      //             CpuCluster2: {
      //               avg: 0,
      //             },
      //             GPU: 0,
      //             NPU: 0,
      //           },
      //           cpus: {
      //             cpu0: {
      //               utilization: '14.3',
      //             },
      //             cpu1: {
      //               utilization: '18.2',
      //             },
      //             cpu2: {
      //               utilization: '15.5',
      //             },
      //             cpu3: {
      //               utilization: '14.1',
      //             },
      //             cpu4: {
      //               utilization: '17.3',
      //             },
      //             cpu5: {
      //               utilization: '17.3',
      //             },
      //             cpu6: {
      //               utilization: '15.0',
      //             },
      //             cpu7: {
      //               utilization: '14.0',
      //             },
      //           },
      //           gpu: {},
      //           memory: {
      //             TotalMemory: '24574976',
      //             UsedMemory: '10483712',
      //             usage: 42.66011083795158,
      //           },
      //           network: {
      //             tap0: {},
      //           },
      //           storage: {
      //             ufs: {},
      //           },
      //         },
      //         YoctoVM: {
      //           cpus: {},
      //           memory: {},
      //         },
      //       },

      //       SoC2: {
      //         AndroidVM: {
      //           cpus: {},
      //           memory: {},
      //         },
      //         ServerVM: {
      //           Temperature: {
      //             ChipPackage: 0,
      //             CpuCluster0: {
      //               avg: 0,
      //             },
      //             CpuCluster1: {
      //               avg: 0,
      //             },
      //             CpuCluster2: {
      //               avg: 0,
      //             },
      //             GPU: 0,
      //             NPU: 0,
      //           },
      //           cpus: {
      //             cpu0: {
      //               utilization: '14.3',
      //             },
      //             cpu1: {
      //               utilization: '18.2',
      //             },
      //             cpu2: {
      //               utilization: '15.5',
      //             },
      //             cpu3: {
      //               utilization: '14.1',
      //             },
      //             cpu4: {
      //               utilization: '17.3',
      //             },
      //             cpu5: {
      //               utilization: '17.3',
      //             },
      //             cpu6: {
      //               utilization: '15.0',
      //             },
      //             cpu7: {
      //               utilization: '14.0',
      //             },
      //           },
      //           gpu: {},
      //           memory: {
      //             TotalMemory: '24574976',
      //             UsedMemory: '10483712',
      //             usage: 42.66011083795158,
      //           },
      //           network: {
      //             tap0: {},
      //           },
      //           storage: {
      //             ufs: {},
      //           },
      //         },
      //         YoctoVM: {
      //           cpus: {},
      //           memory: {},
      //         },
      //       },
      //       System: {
      //         Audio: {
      //           acc_power: 0,
      //           current: 0,
      //           power: 0,
      //           status: 'OK',
      //           voltage: 0,
      //         },
      //         Camera1: {
      //           acc_power: 0,
      //           current: 0,
      //           power: 0,
      //           status: 'OK',
      //           voltage: 0,
      //         },
      //         Camera2: {
      //           acc_power: 0,
      //           current: 0,
      //           power: 0,
      //           status: 'OK',
      //           voltage: 0,
      //         },
      //         Display1: {
      //           acc_power: 0,
      //           current: 0,
      //           power: 0,
      //           status: 'OK',
      //           voltage: 0,
      //         },
      //         Display2: {
      //           acc_power: 0,
      //           current: 0,
      //           power: 0,
      //           status: 'OK',
      //           voltage: 0,
      //         },
      //         ETH1: {
      //           acc_power: 0,
      //           current: 0,
      //           power: 0,
      //           status: 'OK',
      //           voltage: 0,
      //         },
      //         ETH2: {
      //           acc_power: 0,
      //           current: 0,
      //           power: 0,
      //           status: 'OK',
      //           voltage: 0,
      //         },
      //         Health: {
      //           Camera1: 'OK',
      //           Display1: 'OK',
      //           ETH1: 'ERR',
      //           MCU0: 'ERR',
      //           MCU1: 'OK',
      //           NVMe: 'OK',
      //           PCIe0: 'OK',
      //           PCIe1: 'OK',
      //           PCIeSwitch: 'ERR',
      //           SWLESS0_0: 'OK',
      //           SWLESS0_1: 'ERR',
      //           SWLESS1_0: 'ERR',
      //           SWLESS1_1: 'ERR',
      //           SafetyECU: 'OK',
      //           SoC1: 'OK',
      //           SoC2: 'OK',
      //           Zonal0: 'OK',
      //           Zonal1: 'OK',
      //         },
      //         HwMon: {
      //           enable: 'true',
      //         },
      //         NVMe: {
      //           acc_power: 0,
      //           current: 0,
      //           power: 0,
      //           status: 'OK',
      //           voltage: 0,
      //         },
      //         PCIeSwitch: {
      //           acc_power: 0,
      //           current: 0,
      //           power: 0,
      //           status: 'ERR',
      //           voltage: 0,
      //         },
      //         SoC1: {
      //           acc_power: 0,
      //           current: 0,
      //           power: 0,
      //           status: 'OK',
      //           voltage: 0,
      //         },
      //         SoC2: {
      //           acc_power: 0,
      //           current: 0,
      //           power: 0,
      //           status: 'ERR',
      //           voltage: 0,
      //         },
      //         USB1: {
      //           acc_power: 0,
      //           current: 0,
      //           power: 0,
      //           status: 'OK',
      //           voltage: 0,
      //         },
      //         USB2: {
      //           acc_power: 0,
      //           current: 0,
      //           power: 0,
      //           status: 'OK',
      //           voltage: 0,
      //         },
      //         VBAT1: {
      //           valid: true,
      //         },
      //         VBAT2: {
      //           valid: true,
      //         },
      //         acc_power: 0,
      //         power: 0,
      //         runningTime: 22139,
      //       },
      //     },
      //   };

      // data.SystemInfo.System의 각 속성에서 status를 추출하여 modules 배열 생성
      const systemData = data.SystemInfo?.System || {};
      const healthData = systemData.Health || {};

      // System에 status가 있는 모듈과 Health에만 정의된 모듈을 모두 수집
      const moduleNames = new Set<string>();

      // System에서 status가 있는 모듈 수집
      Object.keys(systemData).forEach((key) => {
        if (
          key !== 'power' &&
          key !== 'Health' &&
          (systemData as any)[key]?.status !== undefined
        ) {
          moduleNames.add(key);
        }
      });

      // Health에 정의된 모듈도 추가
      Object.keys(healthData).forEach((key) => {
        moduleNames.add(key);
      });

      // 모듈 배열 생성
      const modules = Array.from(moduleNames).map((key) => ({
        name: key,
        powerSupply:
          (systemData as any)[key]?.status !== undefined
            ? (systemData as any)[key].status
            : undefined,
        health:
          (healthData as any)[key] !== undefined
            ? (healthData as any)[key]
            : 'UNKNOWN',
      }));

      console.log('Fetched modules:', modules);

      // JSON 구조체를 내부 구조체에 할당
      setSystemInfo({
        systemArchitecture: {
          systemPower: systemData.power || 0,
          modules: modules,
        },
      });
    } catch (error) {
      console.error('Failed to fetch system info:', error);
    } finally {
      // 실행 완료 또는 timeout 후 1초 대기
      const elapsedTime = Date.now() - startTime;
      const delay = Math.max(1000 - elapsedTime, 0);

      timeoutRef.current = setTimeout(() => {
        fetchSystemInfo();
      }, delay);
    }
  };

  useEffect(() => {
    // 컴포넌트 mount 시 실행
    fetchSystemInfo();

    // cleanup: 컴포넌트 unmount 시 타이머 정리
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div id="system-monitor">
      <div className="title-area">
        <div className="title">System Hardware Architecture</div>
        <div className="subtitle">
          Real-time hardware resource monitoring and health status
        </div>
      </div>
      <SystemArchitecture
        systemPower={systemInfo.systemArchitecture.systemPower}
        modules={systemInfo.systemArchitecture.modules}
      />
    </div>
  );
};

export default SystemMonitor;
