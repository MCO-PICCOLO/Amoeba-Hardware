export interface ModuleStatus {
  name: string;
  powerSupply?: string;
  health: string;
}

export interface SystemArchitecture {
  systemPower: number;
  modules: ModuleStatus[];
}

export interface SystemInfo {
  systemArchitecture: SystemArchitecture;
}
