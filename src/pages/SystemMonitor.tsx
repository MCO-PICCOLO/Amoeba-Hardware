import { useEffect, useState, useRef } from 'react';
import SystemArchitecture from '../components/SystemArchitecture';
import { getSystemInfo } from '../utils/RestAPI';
import './SystemMonitor.css';
import type { SystemInfo, ThermalMonitoringData } from '../utils/Data';
import ThermalMonitoring from '../components/ThermalMonitoring';
import CpuUtilChart from '../components/CpuUtilChart';

interface SystemMonitorProps {}

const SystemMonitor = ({}: SystemMonitorProps) => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    systemArchitecture: {
      systemPower: 0,
      modules: [
        { name: 'PCIeSwitch', powerSupply: 'OK', health: 'OK' },
        { name: 'SoC1', powerSupply: 'OK', health: 'OK' },
        { name: 'Camera1', powerSupply: 'OK', health: 'OK' },
        {
          name: 'Display1',
          powerSupplyAndroid: 'OK',
          powerSupply: 'OK',
          health: 'OK',
        },
        { name: 'Display1Android', powerSupply: 'OK', health: 'OK' },
        { name: 'ETH1', powerSupply: 'OK', health: 'OK' },
        { name: 'SoC2', powerSupply: 'OK', health: 'OK' },
        { name: 'Camera2', powerSupply: 'OK', health: 'OK' },
        { name: 'Display2', powerSupply: 'OK', health: 'OK' },
        { name: 'ETH2', powerSupply: 'OK', health: 'OK' },
        // { name: 'SafetyMCU', powerSupply: 'OK', health: 'OK' },
        // { name: 'NVMe', powerSupply: 'OK', health: 'OK' },
        { name: 'Zonal0', health: 'OK' },
        { name: 'MCU0', health: 'OK' },
        { name: 'SWLESS0_0', health: 'OK' },
        { name: 'SWLESS0_1', health: 'OK' },
        { name: 'Zonal1', health: 'OK' },
        { name: 'MCU1', health: 'OK' },
        { name: 'SWLESS1_0', health: 'OK' },
        { name: 'SWLESS1_1', health: 'OK' },
      ],
    },
  });

  const [soc1Thermal, setSoc1Thermal] = useState<ThermalMonitoringData>({
    thermalStatus: [],
  });

  const [soc2Thermal, setSoc2Thermal] = useState<ThermalMonitoringData>({
    thermalStatus: [],
  });
  const [cpu1Value, setCpu1Value] = useState<number>(0);
  const [cpu2Value, setCpu2Value] = useState<number>(0);

  const timeoutRef = useRef<number | null>(null);
  const sampleIndexRef = useRef<number>(0);
  const soc1ThermalRef = useRef<ThermalMonitoringData>({ thermalStatus: [] });
  const soc2ThermalRef = useRef<ThermalMonitoringData>({ thermalStatus: [] });
  const systemInfoRef = useRef<any>(null);

  // 테스트용 샘플 데이터 생성 함수
  const getTestSampleData = () => {
    const samples = [
      {
        SystemInfo: {
          SoC1: {
            AndroidVM: {
              cpus: {},
              memory: {},
            },
            ServerVM: {
              Temperature: {
                CPUCluster0: {
                  avg: 33.3 + Math.random() * 15,
                  cores: {
                    'Core 0': 33,
                    'Core 1': 33.3,
                    'Core 2': 32.9,
                    'Core 3': 32.9,
                    'Core 4': 32.6,
                    'Core 5': 33,
                  },
                },
                CPUCluster1: {
                  avg: 34.8 + Math.random() * 15,
                  cores: {
                    'Core 0': 33.4,
                    'Core 1': 33,
                    'Core 2': 32.6,
                    'Core 3': 33,
                    'Core 4': 32.6,
                    'Core 5': 34.8,
                  },
                },
                CPUCluster2: {
                  avg: 33.8 + Math.random() * 15,
                  cores: {
                    'Core 0': 33.4,
                    'Core 1': 33.4,
                    'Core 2': 33,
                    'Core 3': 33.2,
                    'Core 4': 33.8,
                    'Core 5': 33.2,
                  },
                },
                ChipPackage: 40.18,
                GPU: 33 + Math.random() * 15,
                NPU: 33.7 + Math.random() * 15,
              },
              cpus: {
                cpu0: {
                  utilization: '1.5',
                },
                cpu1: {
                  utilization: '2.1',
                },
                cpu10: {
                  utilization: '0.1',
                },
                cpu11: {
                  utilization: '0.7',
                },
                cpu12: {
                  utilization: '0.3',
                },
                cpu13: {
                  utilization: '0.3',
                },
                cpu14: {
                  utilization: '0.4',
                },
                cpu15: {
                  utilization: '0.6',
                },
                cpu16: {
                  utilization: '0.6',
                },
                cpu17: {
                  utilization: '0.6',
                },
                cpu2: {
                  utilization: '3.6',
                },
                cpu3: {
                  utilization: '2.1',
                },
                cpu4: {
                  utilization: '2.5',
                },
                cpu5: {
                  utilization: '2.5',
                },
                cpu6: {
                  utilization: '1.0',
                },
                cpu7: {
                  utilization: '0.3',
                },
                cpu8: {
                  utilization: '0.1',
                },
                cpu9: {
                  utilization: '0.4',
                },
              },
              gpu: {},
              memory: {
                TotalMemory: '10911208',
                UsedMemory: '8707148',
                usage: 79.80003680619048,
              },
              network: {
                tap0: {},
              },
              storage: {
                ufs: {},
              },
            },
            YoctoVM: {
              cpus: {},
              memory: {},
            },
          },
          SoC2: {
            AndroidVM: {
              cpus: {},
              memory: {},
            },
            ServerVM: {
              Temperature: {
                CPUCluster0: {
                  avg: 34.4 + Math.random() * 15,
                  cores: {
                    'Core 0': 34.2,
                    'Core 1': 34.4,
                    'Core 2': 34,
                    'Core 3': 34,
                    'Core 4': 34,
                    'Core 5': 33.6,
                  },
                },
                CPUCluster1: {
                  avg: 34.4 + Math.random() * 15,
                  cores: {
                    'Core 0': 33.8,
                    'Core 1': 33.8,
                    'Core 2': 34,
                    'Core 3': 34.2,
                    'Core 4': 33.6,
                    'Core 5': 34.4,
                  },
                },
                CPUCluster2: {
                  avg: 37.6,
                  cores: {
                    'Core 0': 35.2,
                    'Core 1': 37.6,
                    'Core 2': 34.4,
                    'Core 3': 34.4,
                    'Core 4': 35.2,
                    'Core 5': 34.8,
                  },
                },
                ChipPackage: 43.07,
                GPU: 33.6 + Math.random() * 15,
                NPU: 34.4 + Math.random() * 15,
              },
              cpus: {
                cpu0: {
                  utilization: '0.5',
                },
                cpu1: {
                  utilization: '0.5',
                },
                cpu10: {
                  utilization: '0.5',
                },
                cpu11: {
                  utilization: '0.5',
                },
                cpu12: {
                  utilization: '1.1',
                },
                cpu13: {
                  utilization: '5.9',
                },
                cpu14: {
                  utilization: '6.3',
                },
                cpu15: {
                  utilization: '0.5',
                },
                cpu16: {
                  utilization: '0.5',
                },
                cpu17: {
                  utilization: '2.1',
                },
                cpu2: {
                  utilization: '2.6',
                },
                cpu3: {
                  utilization: '1.1',
                },
                cpu4: {
                  utilization: '1.1',
                },
                cpu5: {
                  utilization: '0.5',
                },
                cpu6: {
                  utilization: '1.1',
                },
                cpu7: {
                  utilization: '1.1',
                },
                cpu8: {
                  utilization: '1.1',
                },
                cpu9: {
                  utilization: '0.0',
                },
              },
              gpu: {},
              memory: {
                TotalMemory: '10911140',
                UsedMemory: '8084692',
                usage: 74.09575901326534,
              },
              network: {
                tap0: {},
              },
              storage: {
                ufs: {},
              },
            },
            YoctoVM: {
              cpus: {},
              memory: {},
            },
          },
          System: {
            Audio: {
              acc_power: 23.890330407950042,
              current: 0.02258332,
              power: 0.1118438923,
              status: 'OK',
              voltage: 4.9525,
            },
            Camera1: {
              acc_power: 242.5996542837373,
              current: 0.22744760220000002,
              power: 1.1315518209450002,
              status: 'OK',
              voltage: 4.9750000000000005,
            },
            Camera2: {
              acc_power: 337.6587937072011,
              current: 0.31616648,
              power: 1.5745090704000002,
              status: 'OK',
              voltage: 4.98,
            },
            Display1: {
              acc_power: 1.119051953325001,
              android_status: 'ERROR',
              current: 0.00213626,
              power: 0.00703363605,
              status: 'OK',
              voltage: 3.2925,
            },
            Display2: {
              acc_power: 112.36678110485312,
              android_status: 'OK',
              current: 0.16064675199999998,
              power: 0.5249132621599999,
              status: 'WARN',
              voltage: 3.2675,
            },
            ETH1: {
              acc_power: 848.5661241842489,
              current: 0.79468872,
              power: 3.9396693294000005,
              status: 'OK',
              voltage: 4.9575000000000005,
            },
            ETH2: {
              acc_power: 770.5911281209493,
              current: 0.72052998,
              power: 3.583735988025,
              status: 'OK',
              voltage: 4.97375,
            },
            Health: {
              Camera1: 'OK',
              Camera2: 'OK',
              Display1: 'OK',
              ETH1: 'OK',
              MCU0: 'ERR',
              MCU1: 'ERR',
              NVMe: 'OK',
              PCIe0: 'ERR',
              PCIe1: 'ERR',
              PCIeSwitch: 'OK',
              SWLess0_0: 'ERR',
              SWLess0_1: 'ERR',
              SWLess1_0: 'ERR',
              SWLess1_1: 'ERR',
              SafetyECU: 'OK',
              SoC1: 'OK',
              SoC2: 'OK',
              Zonal0: 'ERR',
              Zonal1: 'ERR',
            },
            HwMon: {
              enable: 'true',
            },
            NVMe: {
              acc_power: 0,
              current: 0,
              power: 0,
              status: 'OK',
              voltage: 0,
            },
            PCIeSwitch: {
              acc_power: 3545.3343391640983,
              current: 1.4070049238,
              power: 16.56924173389975,
              status: 'WARN',
              voltage: 11.776250000000001,
            },
            SafetyMCU: {
              acc_power: 0,
              current: 0,
              power: 0,
              status: 'ERROR',
              voltage: 0,
            },
            SoC1: {
              acc_power: 11095.508894813624,
              current: 4.37857005,
              power: 51.628814102062506,
              status: 'ERROR',
              voltage: 11.79125,
            },
            SoC2: {
              acc_power: 5005.205202280277,
              current: 2.2371433526,
              power: 26.41227370663375,
              status: 'WARN',
              voltage: 11.80625,
            },
            USB1: {
              acc_power: 0.6597831380500001,
              current: 0.00061036,
              power: 0.00303425215,
              status: 'WARN',
              voltage: 4.97125,
            },
            USB2: {
              acc_power: 21285.88991476367,
              current: 19.81564258,
              power: 98.9791346871,
              status: 'WARN',
              voltage: 4.995,
            },
            VBAT1: {
              valid: true,
            },
            VBAT2: {
              valid: true,
            },
            acc_power: 0,
            power: 204,
            runningTime: 14,
          },
        },
      },
    ];

    // 샘플 인덱스를 순환
    const data = samples[sampleIndexRef.current % samples.length];
    sampleIndexRef.current += 1;

    return data;
  };

  // 모듈 데이터를 처리하는 분리된 함수
  const processModuleData = (systemData: any): any[] => {
    const healthData = systemData.Health || {};
    const moduleNames = new Set<string>();

    // 모든 모듈 이름을 한 번에 수집
    Object.keys(systemData).forEach((key) => {
      if (key !== 'power' && key !== 'Health') {
        const module = systemData[key];
        if (
          module?.status !== undefined ||
          module?.android_status !== undefined
        ) {
          moduleNames.add(key);
        }
      }
    });

    // Health에 정의된 모듈도 추가
    Object.keys(healthData).forEach((key) => moduleNames.add(key));

    // 모듈 배열 생성 (메모리 할당 최소화)
    return Array.from(moduleNames).map((key) => {
      const module = systemData[key] || {};
      return {
        name: key,
        powerSupply: module.status,
        powerSupplyAndroid: module.android_status,
        health: healthData[key] || 'UNKNOWN',
      };
    });
  };

  // CPU 사용률 계산 함수 (메모리 효율적)
  const calculateCpuUtilization = (cpusData: any): number => {
    if (!cpusData) return 0;

    let sum = 0;
    let count = 0;

    // Array 생성 없이 직접 계산
    for (let i = 0; i <= 17; i++) {
      const util = Number(cpusData[`cpu${i}`]?.utilization);
      if (!isNaN(util)) {
        sum += util;
        count++;
      }
    }

    return count > 0 ? Math.round(sum / count) : 0;
  };

  const fetchSystemInfo = async () => {
    const startTime = Date.now();

    try {
      // const data = await getSystemInfo();
      const data = getTestSampleData();
      const systemData = data.SystemInfo?.System || {};

      // 모듈 데이터 처리
      const modules = processModuleData(systemData);

      // 메모리 누수 방지 최적화된 Thermal 데이터 처리 함수
      const updateThermalData = (
        socData: any,
        thermalRef: any,
        socName: string,
      ) => {
        const temperatureData = socData?.ServerVM?.Temperature;
        if (!temperatureData) return false;

        const maxDataPoints = 300;

        // CPU Cluster 최대값 계산 (메모리 효율적)
        let maxCPUClusterValue = 0;
        for (const key in temperatureData) {
          if (key.startsWith('CPUCluster')) {
            const value = temperatureData[key]?.avg ?? 0;
            if (value > maxCPUClusterValue) maxCPUClusterValue = value;
          }
        }

        // 색상 맵 (재사용)
        const colorMap: Record<string, string> = {
          CPUCluster0: '#FF0AFB',
          GPU: '#800AFF',
          NPU: '#01A4FF',
        };

        let hasNewData = false;

        // 기존 모듈 업데이트 (안전한 방식)
        thermalRef.current.thermalStatus.forEach((module: any) => {
          const key = module.moduleName;

          if (
            key === 'ChipPackage' ||
            (key.startsWith('CPUCluster') && key !== 'CPUCluster0')
          ) {
            return;
          }

          if (temperatureData[key] !== undefined) {
            const value = temperatureData[key];
            const newValue =
              key === 'CPUCluster0'
                ? maxCPUClusterValue
                : typeof value === 'number'
                ? value
                : 0;

            // 직접 push로 메모리 효율적 추가
            module.value.push(newValue);

            // 배열 크기 제한 (shift로 메모리 누수 방지)
            if (module.value.length > maxDataPoints) {
              // console.log(`[${socName}] shifting data for ${key}`);
              module.value.shift();
            }

            hasNewData = true;
          }
        });

        // if (hasNewData) {
        //   console.log(
        //     `[${socName}] `,
        //     'Thermal data updated:',
        //     thermalRef.current.thermalStatus.length,
        //     'modules',
        //   );
        // }

        // 새 모듈 추가 체크
        for (const key in temperatureData) {
          if (
            key === 'ChipPackage' ||
            (key.startsWith('CPUCluster') && key !== 'CPUCluster0')
          ) {
            continue;
          }

          const existingModule = thermalRef.current.thermalStatus.find(
            (m: any) => m.moduleName === key,
          );

          if (!existingModule) {
            const value = temperatureData[key];
            const newValue =
              key === 'CPUCluster0'
                ? maxCPUClusterValue
                : typeof value === 'number'
                ? value
                : 0;

            thermalRef.current.thermalStatus.push({
              moduleName: key,
              lineColor: colorMap[key] || '#808080',
              value: [newValue],
            });
            hasNewData = true;
          }
        }

        return hasNewData;
      };

      // SoC 데이터 처리 (메모리 효율적)
      const soc1Data = data.SystemInfo?.SoC1;
      const soc2Data = data.SystemInfo?.SoC2;

      // Thermal 데이터 업데이트 (메모리 효율적 + 확실한 갱신)
      if (soc1Data && updateThermalData(soc1Data, soc1ThermalRef, 'SoC1')) {
        // 최소한의 복사로 React 변경 감지 (메모리 효율적)
        setSoc1Thermal({
          thermalStatus: soc1ThermalRef.current.thermalStatus,
        });
      }

      if (soc2Data && updateThermalData(soc2Data, soc2ThermalRef, 'SoC2')) {
        // 최소한의 복사로 React 변경 감지 (메모리 효율적)
        setSoc2Thermal({
          thermalStatus: soc2ThermalRef.current.thermalStatus,
        });
      }

      // CPU 값 업데이트 (중복 계산 방지)
      const soc1CpuValue = calculateCpuUtilization(soc1Data?.ServerVM?.cpus);
      const soc2CpuValue = calculateCpuUtilization(soc2Data?.ServerVM?.cpus);

      if (soc1CpuValue !== cpu1Value) setCpu1Value(soc1CpuValue);
      if (soc2CpuValue !== cpu2Value) setCpu2Value(soc2CpuValue);

      // 시스템 정보 업데이트 (변경 감지 최적화)
      const currentPower = systemData.power || 0;
      const moduleCount = modules.length;

      if (
        !systemInfoRef.current ||
        systemInfoRef.current.systemArchitecture.systemPower !== currentPower ||
        systemInfoRef.current.systemArchitecture.modules.length !== moduleCount
      ) {
        const newSystemInfo = {
          systemArchitecture: {
            systemPower: currentPower,
            modules: modules,
          },
        };

        systemInfoRef.current = newSystemInfo;
        setSystemInfo(newSystemInfo);
      }
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

    // cleanup: 컴포넌트 unmount 시 메모리 누수 방지
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // 참조 정리로 메모리 누수 방지
      soc1ThermalRef.current = { thermalStatus: [] };
      soc2ThermalRef.current = { thermalStatus: [] };
      systemInfoRef.current = null;
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
      <div className="chart-area">
        <div className="inner-chart-area">
          <ThermalMonitoring soc1Data={soc1Thermal} soc2Data={soc2Thermal} />
          <CpuUtilChart cpu1Value={cpu1Value} cpu2Value={cpu2Value} />
        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;
