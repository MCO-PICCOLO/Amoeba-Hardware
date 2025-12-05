import { useEffect, useState, useRef } from 'react';
import SystemArchitecture from '../components/SystemArchitecture';
// import { getSystemInfo } from '../utils/RestAPI';
import './SystemMonitor.css';
import type { SystemInfo, ThermalMonitoringData } from '../utils/Data';
import { getSystemInfo } from '../utils/RestAPI';
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
                  avg: 33.3,
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
                  avg: 34.8,
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
                  avg: 33.8,
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
                GPU: 33,
                NPU: 33.7,
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
                  avg: 34.4,
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
                  avg: 34.4,
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
                GPU: 33.6,
                NPU: 34.4,
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
              android_status: 'WARN',
              current: 0.00213626,
              power: 0.00703363605,
              status: 'WARN',
              voltage: 3.2925,
            },
            Display2: {
              acc_power: 112.36678110485312,
              android_status: 'OK',
              current: 0.16064675199999998,
              power: 0.5249132621599999,
              status: 'OK',
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
              status: 'OK',
              voltage: 11.776250000000001,
            },
            SafetyMCU: {
              acc_power: 0,
              current: 0,
              power: 0,
              status: 'OK',
              voltage: 0,
            },
            SoC1: {
              acc_power: 11095.508894813624,
              current: 4.37857005,
              power: 51.628814102062506,
              status: 'OK',
              voltage: 11.79125,
            },
            SoC2: {
              acc_power: 5005.205202280277,
              current: 2.2371433526,
              power: 26.41227370663375,
              status: 'OK',
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

  // 테스트용 샘플 데이터 생성 함수
  // const getTestSampleData = () => {
  //   const samples = [
  //     {
  //       SystemInfo: {
  //         SoC1: {
  //           ServerVM: {
  //             Temperature: {
  //               ChipPackage: 45 + Math.random() * 10,
  //               CpuCluster0: { avg: 50 + Math.random() * 15 },
  //               CpuCluster1: { avg: 48 + Math.random() * 12 },
  //               CpuCluster2: { avg: 42 + Math.random() * 8 },
  //               GPU: 55 + Math.random() * 20,
  //               NPU: 60 + Math.random() * 15,
  //             },
  //             cpus: {
  //               cpu0: { utilization: 65 + Math.random() * 10 },
  //               cpu1: { utilization: 62 + Math.random() * 10 },
  //               cpu2: { utilization: 68 + Math.random() * 10 },
  //               cpu3: { utilization: 61 + Math.random() * 10 },
  //               cpu4: { utilization: 70 + Math.random() * 10 },
  //               cpu5: { utilization: 64 + Math.random() * 10 },
  //               cpu6: { utilization: 67 + Math.random() * 10 },
  //               cpu7: { utilization: 63 + Math.random() * 10 },
  //               cpu8: { utilization: 66 + Math.random() * 10 },
  //               cpu9: { utilization: 62 + Math.random() * 10 },
  //               cpu10: { utilization: 69 + Math.random() * 10 },
  //               cpu11: { utilization: 65 + Math.random() * 10 },
  //               cpu12: { utilization: 71 + Math.random() * 10 },
  //               cpu13: { utilization: 64 + Math.random() * 10 },
  //               cpu14: { utilization: 68 + Math.random() * 10 },
  //               cpu15: { utilization: 63 + Math.random() * 10 },
  //               cpu16: { utilization: 70 + Math.random() * 10 },
  //               cpu17: { utilization: 65 + Math.random() * 10 },
  //             },
  //           },
  //         },
  //         SoC2: {
  //           ServerVM: {
  //             Temperature: {
  //               ChipPackage: 40 + Math.random() * 8,
  //               CpuCluster0: { avg: 45 + Math.random() * 10 },
  //               CpuCluster1: { avg: 43 + Math.random() * 10 },
  //               CpuCluster2: { avg: 38 + Math.random() * 7 },
  //               GPU: 50 + Math.random() * 18,
  //               NPU: 55 + Math.random() * 12,
  //             },
  //             cpus: {
  //               cpu0: { utilization: 55 + Math.random() * 10 },
  //               cpu1: { utilization: 52 + Math.random() * 10 },
  //               cpu2: { utilization: 58 + Math.random() * 10 },
  //               cpu3: { utilization: 51 + Math.random() * 10 },
  //               cpu4: { utilization: 60 + Math.random() * 10 },
  //               cpu5: { utilization: 54 + Math.random() * 10 },
  //               cpu6: { utilization: 57 + Math.random() * 10 },
  //               cpu7: { utilization: 53 + Math.random() * 10 },
  //               cpu8: { utilization: 56 + Math.random() * 10 },
  //               cpu9: { utilization: 52 + Math.random() * 10 },
  //               cpu10: { utilization: 59 + Math.random() * 10 },
  //               cpu11: { utilization: 55 + Math.random() * 10 },
  //               cpu12: { utilization: 61 + Math.random() * 10 },
  //               cpu13: { utilization: 54 + Math.random() * 10 },
  //               cpu14: { utilization: 58 + Math.random() * 10 },
  //               cpu15: { utilization: 53 + Math.random() * 10 },
  //               cpu16: { utilization: 60 + Math.random() * 10 },
  //               cpu17: { utilization: 55 + Math.random() * 10 },
  //             },
  //           },
  //         },
  //         System: {
  //           Camera1: { status: 'OK', power: 10, current: 1, voltage: 12 },
  //           Display1: {
  //             android_status: 'OK',
  //             status: 'OK',
  //             power: 15,
  //             current: 1.5,
  //             voltage: 12,
  //           },
  //           SoC1: { status: 'WARN', power: 25, current: 2.5, voltage: 12 },
  //           SoC2: { status: 'OK', power: 25, current: 2.5, voltage: 12 },
  //           PCIeSwitch: { status: 'OK', power: 8, current: 0.8, voltage: 12 },
  //           ETH1: { status: 'OK', power: 5, current: 0.5, voltage: 12 },
  //           SafetyMCU: { status: 'OK', power: 3, current: 0.3, voltage: 12 },
  //           NVMe: { status: 'OK', power: 7, current: 0.7, voltage: 12 },
  //           Health: {
  //             Camera1: 'ERROR',
  //             Display1: 'OK',
  //             SoC1: 'OK',
  //             SoC2: 'OK',
  //             PCIeSwitch: 'OK',
  //             ETH1: 'OK',
  //             SafetyMCU: 'OK',
  //             NVMe: 'OK',
  //             Zonal0: 'OK',
  //             Zonal1: 'OK',
  //             MCU0: 'OK',
  //             MCU1: 'OK',
  //             SWLESS0_0: 'OK',
  //             SWLESS0_1: 'OK',
  //             SWLESS1_0: 'OK',
  //             SWLESS1_1: 'OK',
  //           },
  //           power: 100,
  //         },
  //       },
  //     },
  //     {
  //       SystemInfo: {
  //         SoC1: {
  //           ServerVM: {
  //             Temperature: {
  //               ChipPackage: 50 + Math.random() * 12,
  //               CpuCluster0: { avg: 55 + Math.random() * 18 },
  //               CpuCluster1: { avg: 52 + Math.random() * 15 },
  //               CpuCluster2: { avg: 46 + Math.random() * 10 },
  //               GPU: 60 + Math.random() * 25,
  //               NPU: 65 + Math.random() * 18,
  //             },
  //             cpus: {
  //               cpu0: { utilization: 72 + Math.random() * 10 },
  //               cpu1: { utilization: 70 + Math.random() * 10 },
  //               cpu2: { utilization: 75 + Math.random() * 10 },
  //               cpu3: { utilization: 71 + Math.random() * 10 },
  //               cpu4: { utilization: 78 + Math.random() * 10 },
  //               cpu5: { utilization: 73 + Math.random() * 10 },
  //               cpu6: { utilization: 76 + Math.random() * 10 },
  //               cpu7: { utilization: 72 + Math.random() * 10 },
  //               cpu8: { utilization: 77 + Math.random() * 10 },
  //               cpu9: { utilization: 71 + Math.random() * 10 },
  //               cpu10: { utilization: 79 + Math.random() * 10 },
  //               cpu11: { utilization: 74 + Math.random() * 10 },
  //               cpu12: { utilization: 80 + Math.random() * 10 },
  //               cpu13: { utilization: 73 + Math.random() * 10 },
  //               cpu14: { utilization: 76 + Math.random() * 10 },
  //               cpu15: { utilization: 72 + Math.random() * 10 },
  //               cpu16: { utilization: 78 + Math.random() * 10 },
  //               cpu17: { utilization: 74 + Math.random() * 10 },
  //             },
  //           },
  //         },
  //         SoC2: {
  //           ServerVM: {
  //             Temperature: {
  //               ChipPackage: 44 + Math.random() * 10,
  //               CpuCluster0: { avg: 48 + Math.random() * 12 },
  //               CpuCluster1: { avg: 46 + Math.random() * 12 },
  //               CpuCluster2: { avg: 41 + Math.random() * 9 },
  //               GPU: 54 + Math.random() * 20,
  //               NPU: 58 + Math.random() * 15,
  //             },
  //             cpus: {
  //               cpu0: { utilization: 62 + Math.random() * 10 },
  //               cpu1: { utilization: 60 + Math.random() * 10 },
  //               cpu2: { utilization: 65 + Math.random() * 10 },
  //               cpu3: { utilization: 61 + Math.random() * 10 },
  //               cpu4: { utilization: 68 + Math.random() * 10 },
  //               cpu5: { utilization: 63 + Math.random() * 10 },
  //               cpu6: { utilization: 66 + Math.random() * 10 },
  //               cpu7: { utilization: 62 + Math.random() * 10 },
  //               cpu8: { utilization: 67 + Math.random() * 10 },
  //               cpu9: { utilization: 61 + Math.random() * 10 },
  //               cpu10: { utilization: 69 + Math.random() * 10 },
  //               cpu11: { utilization: 64 + Math.random() * 10 },
  //               cpu12: { utilization: 70 + Math.random() * 10 },
  //               cpu13: { utilization: 63 + Math.random() * 10 },
  //               cpu14: { utilization: 66 + Math.random() * 10 },
  //               cpu15: { utilization: 62 + Math.random() * 10 },
  //               cpu16: { utilization: 68 + Math.random() * 10 },
  //               cpu17: { utilization: 64 + Math.random() * 10 },
  //             },
  //           },
  //         },
  //         System: {
  //           Camera1: { status: 'OK', power: 11, current: 1.1, voltage: 12 },
  //           Display1: {
  //             android_status: 'WARN',
  //             status: 'OK',
  //             power: 16,
  //             current: 1.6,
  //             voltage: 12,
  //           },
  //           SoC1: { status: 'ERR', power: 28, current: 2.8, voltage: 12 },
  //           SoC2: { status: 'OK', power: 26, current: 2.6, voltage: 12 },
  //           PCIeSwitch: {
  //             status: 'ERROR',
  //             power: 9,
  //             current: 0.9,
  //             voltage: 12,
  //           },
  //           ETH1: { status: 'ERR', power: 6, current: 0.6, voltage: 12 },
  //           SafetyMCU: { status: 'OK', power: 3, current: 0.3, voltage: 12 },
  //           NVMe: { status: 'OK', power: 8, current: 0.8, voltage: 12 },
  //           Health: {
  //             Camera1: 'OK',
  //             Display1: 'OK',
  //             SoC1: 'OK',
  //             SoC2: 'OK',
  //             PCIeSwitch: 'ERROR',
  //             ETH1: 'ERR',
  //             SafetyMCU: 'OK',
  //             NVMe: 'OK',
  //             Zonal0: 'OK',
  //             Zonal1: 'ERR',
  //             MCU0: 'ERR',
  //             MCU1: 'OK',
  //             SWLESS0_0: 'OK',
  //             SWLESS0_1: 'ERR',
  //             SWLESS1_0: 'OK',
  //             SWLESS1_1: 'OK',
  //           },
  //           power: 110,
  //         },
  //       },
  //     },
  //     {
  //       SystemInfo: {
  //         SoC1: {
  //           ServerVM: {
  //             Temperature: {
  //               ChipPackage: 48 + Math.random() * 11,
  //               CpuCluster0: { avg: 53 + Math.random() * 16 },
  //               CpuCluster1: { avg: 50 + Math.random() * 14 },
  //               CpuCluster2: { avg: 44 + Math.random() * 9 },
  //               GPU: 58 + Math.random() * 22,
  //               NPU: 63 + Math.random() * 17,
  //             },
  //             cpus: {
  //               cpu0: { utilization: 68 + Math.random() * 10 },
  //               cpu1: { utilization: 66 + Math.random() * 10 },
  //               cpu2: { utilization: 71 + Math.random() * 10 },
  //               cpu3: { utilization: 67 + Math.random() * 10 },
  //               cpu4: { utilization: 74 + Math.random() * 10 },
  //               cpu5: { utilization: 69 + Math.random() * 10 },
  //               cpu6: { utilization: 72 + Math.random() * 10 },
  //               cpu7: { utilization: 68 + Math.random() * 10 },
  //               cpu8: { utilization: 73 + Math.random() * 10 },
  //               cpu9: { utilization: 67 + Math.random() * 10 },
  //               cpu10: { utilization: 75 + Math.random() * 10 },
  //               cpu11: { utilization: 70 + Math.random() * 10 },
  //               cpu12: { utilization: 76 + Math.random() * 10 },
  //               cpu13: { utilization: 69 + Math.random() * 10 },
  //               cpu14: { utilization: 72 + Math.random() * 10 },
  //               cpu15: { utilization: 68 + Math.random() * 10 },
  //               cpu16: { utilization: 74 + Math.random() * 10 },
  //               cpu17: { utilization: 70 + Math.random() * 10 },
  //             },
  //           },
  //         },
  //         SoC2: {
  //           ServerVM: {
  //             Temperature: {
  //               ChipPackage: 42 + Math.random() * 9,
  //               CpuCluster0: { avg: 47 + Math.random() * 11 },
  //               CpuCluster1: { avg: 45 + Math.random() * 11 },
  //               CpuCluster2: { avg: 40 + Math.random() * 8 },
  //               GPU: 52 + Math.random() * 19,
  //               NPU: 57 + Math.random() * 14,
  //             },
  //             cpus: {
  //               cpu0: { utilization: 58 + Math.random() * 10 },
  //               cpu1: { utilization: 56 + Math.random() * 10 },
  //               cpu2: { utilization: 61 + Math.random() * 10 },
  //               cpu3: { utilization: 57 + Math.random() * 10 },
  //               cpu4: { utilization: 64 + Math.random() * 10 },
  //               cpu5: { utilization: 59 + Math.random() * 10 },
  //               cpu6: { utilization: 62 + Math.random() * 10 },
  //               cpu7: { utilization: 58 + Math.random() * 10 },
  //               cpu8: { utilization: 63 + Math.random() * 10 },
  //               cpu9: { utilization: 57 + Math.random() * 10 },
  //               cpu10: { utilization: 65 + Math.random() * 10 },
  //               cpu11: { utilization: 60 + Math.random() * 10 },
  //               cpu12: { utilization: 66 + Math.random() * 10 },
  //               cpu13: { utilization: 59 + Math.random() * 10 },
  //               cpu14: { utilization: 62 + Math.random() * 10 },
  //               cpu15: { utilization: 58 + Math.random() * 10 },
  //               cpu16: { utilization: 64 + Math.random() * 10 },
  //               cpu17: { utilization: 60 + Math.random() * 10 },
  //             },
  //           },
  //         },
  //         System: {
  //           Camera1: { status: 'OK', power: 10, current: 1, voltage: 12 },
  //           Display1: {
  //             android_status: 'ERROR',
  //             status: 'OK',
  //             power: 15,
  //             current: 1.5,
  //             voltage: 12,
  //           },
  //           SoC1: { status: 'OK', power: 26, current: 2.6, voltage: 12 },
  //           SoC2: { status: 'OK', power: 25, current: 2.5, voltage: 12 },
  //           PCIeSwitch: { status: 'WARN', power: 8, current: 0.8, voltage: 12 },
  //           ETH1: { status: 'OK', power: 5, current: 0.5, voltage: 12 },
  //           SafetyMCU: { status: 'OK', power: 3, current: 0.3, voltage: 12 },
  //           NVMe: { status: 'OK', power: 7, current: 0.7, voltage: 12 },
  //           Health: {
  //             Camera1: 'OK',
  //             Display1: 'OK',
  //             SoC1: 'OK',
  //             SoC2: 'OK',
  //             PCIeSwitch: 'OK',
  //             ETH1: 'OK',
  //             SafetyMCU: 'OK',
  //             NVMe: 'OK',
  //             Zonal0: 'OK',
  //             Zonal1: 'OK',
  //             MCU0: 'OK',
  //             MCU1: 'OK',
  //             SWLESS0_0: 'OK',
  //             SWLESS0_1: 'OK',
  //             SWLESS1_0: 'OK',
  //             SWLESS1_1: 'OK',
  //           },
  //           power: 105,
  //         },
  //       },
  //     },
  //   ];

  //   // 샘플 인덱스를 순환
  //   const data = samples[sampleIndexRef.current % samples.length];
  //   sampleIndexRef.current += 1;

  //   return data;
  // };

  const fetchSystemInfo = async () => {
    const startTime = Date.now();

    try {
      const data = await getSystemInfo();
      // const data = getTestSampleData();

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

      // System에서 android_status가 있는 모듈 수집
      Object.keys(systemData).forEach((key) => {
        if (
          key !== 'power' &&
          key !== 'Health' &&
          (systemData as any)[key]?.android_status !== undefined
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
        powerSupplyAndroid:
          (systemData as any)[key]?.android_status !== undefined
            ? (systemData as any)[key].android_status
            : undefined,
        health:
          (healthData as any)[key] !== undefined
            ? (healthData as any)[key]
            : 'UNKNOWN',
      }));

      // SoC Thermal 데이터 처리 함수
      const processThermalData = (
        socData: any,
        currentThermal: ThermalMonitoringData,
      ): ThermalMonitoringData => {
        const temperatureData = socData?.ServerVM?.Temperature || {};
        const maxDataPoints = 30; // 최대 데이터 포인트 수

        // CpuCluster의 최대값 찾기
        let maxCPUClusterValue = 0;
        Object.keys(temperatureData).forEach((key) => {
          if (key.startsWith('CPUCluster')) {
            const value = temperatureData[key]?.avg ?? 0;
            maxCPUClusterValue = Math.max(maxCPUClusterValue, value);
          }
        });

        const newThermalStatus = Object.keys(temperatureData)
          .filter(
            (key) =>
              (!key.startsWith('CPUCluster') || key === 'CPUCluster0') &&
              key !== 'ChipPackage',
          )
          .map((key) => {
            const value = temperatureData[key];

            // 기존 thermalStatus에서 해당 모듈 찾기
            const existingModule = currentThermal.thermalStatus.find(
              (t) => t.moduleName === key,
            );

            let newValue: number;

            // CPUCluster0이면 최대 CPUCluster 값 사용, 아니면 값 자체 사용
            if (key === 'CPUCluster0') {
              newValue = maxCPUClusterValue;
            } else {
              newValue = typeof value === 'number' ? value : 0;
            }

            // 기존 값 배열 가져오기
            let valueArray = existingModule ? [...existingModule.value] : [];

            // 새 값 추가
            valueArray.push(newValue);

            // 최대 개수를 초과하면 왼쪽으로 시프트 (가장 오래된 값 제거)
            if (valueArray.length > maxDataPoints) {
              valueArray = valueArray.slice(-maxDataPoints);
            }

            // lineColor 생성 (모듈별 고유 색상)
            const colorMap: { [key: string]: string } = {
              CPUCluster0: '#FF0AFB',
              GPU: '#800AFF',
              NPU: '#01A4FF',
            };
            const lineColor = colorMap[key] || '#808080';

            return {
              moduleName: key,
              lineColor: existingModule?.lineColor || lineColor,
              value: valueArray,
            };
          });

        return { thermalStatus: newThermalStatus };
      };

      // SoC1 Thermal 데이터 업데이트
      const soc1Data = data.SystemInfo?.SoC1;
      if (soc1Data) {
        const newSoc1Thermal = processThermalData(
          soc1Data,
          soc1ThermalRef.current,
        );
        soc1ThermalRef.current = newSoc1Thermal;
        setSoc1Thermal(newSoc1Thermal);
      }

      // SoC2 Thermal 데이터 업데이트
      const soc2Data = data.SystemInfo?.SoC2;
      if (soc2Data) {
        const newSoc2Thermal = processThermalData(
          soc2Data,
          soc2ThermalRef.current,
        );
        soc2ThermalRef.current = newSoc2Thermal;
        setSoc2Thermal(newSoc2Thermal);
      }

      // CPU Utilization 계산 함수
      const calculateCpuUtilization = (cpusData: any): number => {
        if (!cpusData) return 0;

        const utilizations: number[] = [];
        for (let i = 0; i <= 17; i++) {
          const cpuKey = `cpu${i}`;
          const util = Number(cpusData[cpuKey]?.utilization);
          if (!isNaN(util)) {
            utilizations.push(util);
          }
        }

        if (utilizations.length === 0) return 0;
        const sum = utilizations.reduce((a, b) => a + b, 0);
        return Math.round(sum / utilizations.length);
      };

      // SoC1 CPU 값 계산
      const soc1CpuValue = calculateCpuUtilization(soc1Data?.ServerVM?.cpus);
      setCpu1Value(soc1CpuValue);

      // SoC2 CPU 값 계산
      const soc2CpuValue = calculateCpuUtilization(soc2Data?.ServerVM?.cpus);
      setCpu2Value(soc2CpuValue);

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
