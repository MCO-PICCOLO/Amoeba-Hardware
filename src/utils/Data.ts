export interface ModuleStatus {
  name: string;
  powerSupply?: string;
  powerSupplyAndroid?: string;
  health?: string;
}

export interface SystemArchitecture {
  systemPower: number;
  modules: ModuleStatus[];
}

export interface ThermalStatus {
  moduleName: string;
  lineColor: string;
  value: number[];
}

export interface ThermalMonitoringData {
  thermalStatus: ThermalStatus[];
}

export interface SystemInfo {
  systemArchitecture: SystemArchitecture;
}
