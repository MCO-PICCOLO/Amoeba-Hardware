import { useEffect, useState, useRef } from 'react';
import SystemArchitecture from '../components/SystemArchitecture';
// import { getSystemInfo } from '../utils/RestAPI';
import './SystemMonitor.css';
import type { SystemInfo, ThermalMonitoringData } from '../utils/Data';
import { getSystemInfo } from '../utils/RestAPI';
import ThermalMonitoring from '../components/ThermalMonitoring';

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
            ServerVM: {
              Temperature: {
                ChipPackage: 45 + Math.random() * 10,
                CpuCluster0: { avg: 50 + Math.random() * 15 },
                CpuCluster1: { avg: 48 + Math.random() * 12 },
                CpuCluster2: { avg: 42 + Math.random() * 8 },
                GPU: 55 + Math.random() * 20,
                NPU: 60 + Math.random() * 15,
              },
            },
          },
          SoC2: {
            ServerVM: {
              Temperature: {
                ChipPackage: 40 + Math.random() * 8,
                CpuCluster0: { avg: 45 + Math.random() * 10 },
                CpuCluster1: { avg: 43 + Math.random() * 10 },
                CpuCluster2: { avg: 38 + Math.random() * 7 },
                GPU: 50 + Math.random() * 18,
                NPU: 55 + Math.random() * 12,
              },
            },
          },
          System: {
            Camera1: { status: 'OK', power: 10, current: 1, voltage: 12 },
            Display1: {
              android_status: 'OK',
              status: 'OK',
              power: 15,
              current: 1.5,
              voltage: 12,
            },
            SoC1: { status: 'WARN', power: 25, current: 2.5, voltage: 12 },
            SoC2: { status: 'OK', power: 25, current: 2.5, voltage: 12 },
            PCIeSwitch: { status: 'OK', power: 8, current: 0.8, voltage: 12 },
            ETH1: { status: 'OK', power: 5, current: 0.5, voltage: 12 },
            SafetyMCU: { status: 'OK', power: 3, current: 0.3, voltage: 12 },
            NVMe: { status: 'OK', power: 7, current: 0.7, voltage: 12 },
            Health: {
              Camera1: 'ERROR',
              Display1: 'OK',
              SoC1: 'OK',
              SoC2: 'OK',
              PCIeSwitch: 'OK',
              ETH1: 'OK',
              SafetyMCU: 'OK',
              NVMe: 'OK',
              Zonal0: 'OK',
              Zonal1: 'OK',
              MCU0: 'OK',
              MCU1: 'OK',
              SWLESS0_0: 'OK',
              SWLESS0_1: 'OK',
              SWLESS1_0: 'OK',
              SWLESS1_1: 'OK',
            },
            power: 100,
          },
        },
      },
      {
        SystemInfo: {
          SoC1: {
            ServerVM: {
              Temperature: {
                ChipPackage: 50 + Math.random() * 12,
                CpuCluster0: { avg: 55 + Math.random() * 18 },
                CpuCluster1: { avg: 52 + Math.random() * 15 },
                CpuCluster2: { avg: 46 + Math.random() * 10 },
                GPU: 60 + Math.random() * 25,
                NPU: 65 + Math.random() * 18,
              },
            },
          },
          SoC2: {
            ServerVM: {
              Temperature: {
                ChipPackage: 44 + Math.random() * 10,
                CpuCluster0: { avg: 48 + Math.random() * 12 },
                CpuCluster1: { avg: 46 + Math.random() * 12 },
                CpuCluster2: { avg: 41 + Math.random() * 9 },
                GPU: 54 + Math.random() * 20,
                NPU: 58 + Math.random() * 15,
              },
            },
          },
          System: {
            Camera1: { status: 'OK', power: 11, current: 1.1, voltage: 12 },
            Display1: {
              android_status: 'WARN',
              status: 'OK',
              power: 16,
              current: 1.6,
              voltage: 12,
            },
            SoC1: { status: 'ERR', power: 28, current: 2.8, voltage: 12 },
            SoC2: { status: 'OK', power: 26, current: 2.6, voltage: 12 },
            PCIeSwitch: {
              status: 'ERROR',
              power: 9,
              current: 0.9,
              voltage: 12,
            },
            ETH1: { status: 'ERR', power: 6, current: 0.6, voltage: 12 },
            SafetyMCU: { status: 'OK', power: 3, current: 0.3, voltage: 12 },
            NVMe: { status: 'OK', power: 8, current: 0.8, voltage: 12 },
            Health: {
              Camera1: 'OK',
              Display1: 'OK',
              SoC1: 'OK',
              SoC2: 'OK',
              PCIeSwitch: 'ERROR',
              ETH1: 'ERR',
              SafetyMCU: 'OK',
              NVMe: 'OK',
              Zonal0: 'OK',
              Zonal1: 'ERR',
              MCU0: 'ERR',
              MCU1: 'OK',
              SWLESS0_0: 'OK',
              SWLESS0_1: 'ERR',
              SWLESS1_0: 'OK',
              SWLESS1_1: 'OK',
            },
            power: 110,
          },
        },
      },
      {
        SystemInfo: {
          SoC1: {
            ServerVM: {
              Temperature: {
                ChipPackage: 48 + Math.random() * 11,
                CpuCluster0: { avg: 53 + Math.random() * 16 },
                CpuCluster1: { avg: 50 + Math.random() * 14 },
                CpuCluster2: { avg: 44 + Math.random() * 9 },
                GPU: 58 + Math.random() * 22,
                NPU: 63 + Math.random() * 17,
              },
            },
          },
          SoC2: {
            ServerVM: {
              Temperature: {
                ChipPackage: 42 + Math.random() * 9,
                CpuCluster0: { avg: 47 + Math.random() * 11 },
                CpuCluster1: { avg: 45 + Math.random() * 11 },
                CpuCluster2: { avg: 40 + Math.random() * 8 },
                GPU: 52 + Math.random() * 19,
                NPU: 57 + Math.random() * 14,
              },
            },
          },
          System: {
            Camera1: { status: 'OK', power: 10, current: 1, voltage: 12 },
            Display1: {
              android_status: 'ERROR',
              status: 'OK',
              power: 15,
              current: 1.5,
              voltage: 12,
            },
            SoC1: { status: 'OK', power: 26, current: 2.6, voltage: 12 },
            SoC2: { status: 'OK', power: 25, current: 2.5, voltage: 12 },
            PCIeSwitch: { status: 'WARN', power: 8, current: 0.8, voltage: 12 },
            ETH1: { status: 'OK', power: 5, current: 0.5, voltage: 12 },
            SafetyMCU: { status: 'OK', power: 3, current: 0.3, voltage: 12 },
            NVMe: { status: 'OK', power: 7, current: 0.7, voltage: 12 },
            Health: {
              Camera1: 'OK',
              Display1: 'OK',
              SoC1: 'OK',
              SoC2: 'OK',
              PCIeSwitch: 'OK',
              ETH1: 'OK',
              SafetyMCU: 'OK',
              NVMe: 'OK',
              Zonal0: 'OK',
              Zonal1: 'OK',
              MCU0: 'OK',
              MCU1: 'OK',
              SWLESS0_0: 'OK',
              SWLESS0_1: 'OK',
              SWLESS1_0: 'OK',
              SWLESS1_1: 'OK',
            },
            power: 105,
          },
        },
      },
    ];

    // 샘플 인덱스를 순환
    const data = samples[sampleIndexRef.current % samples.length];
    sampleIndexRef.current += 1;

    return data;
  };

  const fetchSystemInfo = async () => {
    const startTime = Date.now();

    try {
      // const data = await getSystemInfo();
      const data = getTestSampleData();

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

        const newThermalStatus = Object.keys(temperatureData).map((key) => {
          const value = temperatureData[key];

          // 기존 thermalStatus에서 해당 모듈 찾기
          const existingModule = currentThermal.thermalStatus.find(
            (t) => t.moduleName === key,
          );

          let newValue: number;

          // CpuCluster로 시작하면 avg 사용, 아니면 값 자체 사용
          if (key.startsWith('CpuCluster')) {
            newValue = value?.avg ?? 0;
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
            ChipPackage: '#FF0000',
            CpuCluster0: '#00FF00',
            CpuCluster1: '#0000FF',
            CpuCluster2: '#FFA500',
            GPU: '#FF00FF',
            NPU: '#00FFFF',
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
      <ThermalMonitoring soc1Data={soc1Thermal} soc2Data={soc2Thermal} />
    </div>
  );
};

export default SystemMonitor;
