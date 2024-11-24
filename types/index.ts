export interface AndroidInfo {
  ANDROID_VERSION: string;
  IMEI: string;
  MODEL: string;
}

export interface ModemDetails {
  IMEI: string;
  ADDED_TIME: string;
  SIGNAL_STRENGTH: string;
  CONNECTION_TYPE: string;
}

export interface NetworkDetails {
  EXT_IP: string;
  CELLOP: string;
  DNS: string[];
  GATEWAY: string;
  CurrentNetworkType: string;
  ping_stats: string;
}

export interface ProxyCredential {
  LOGIN: string;
  PASS: string;
  HOST: string;
  PORT: string;
  SOCKS_PORT?: string;
}

export interface ProxyInfo {
  GENTIME: string;
  IS_LOCKED: string;
  IS_REBOOTING: string;
  IS_ROTATED: string;
  MSG: string;
  N: number;
  STATE: "added" | "removed" | "pending";
  android: AndroidInfo;
  modem_details: ModemDetails;
  net_details: NetworkDetails;
  proxy_creds: ProxyCredential;
}

interface ProxyCredentials {
  username: string;
  password: string;
}

interface UsageData {
  assignedDate: string;
  duration: string;
  lastUsed: string;
}

export interface ProxyData {
  ID: string;
  added_time: string;
  external_IP: string;
  is_online: string;
  network_type: string;
  operator: string;
  port: { http: number; socks: number };
  proxyCredentials: ProxyCredentials;
  status: string;
  usageData: UsageData;
  validUntil: string;
}

export interface ActiveUserData {
  HTTP_PORT: string;
  IS_EXPIRED: number;
  IS_OVER_QUOTA: number;
  LOGIN: string;
  OS: string;
  PASSWORD: string;
  PROXY_VALID_BEFORE: string;
  RESET_SECURE_LINK: Record<string, any>[]; // Array of objects with unknown structure
  SOCKS_PORT: string;
  http_creds: string;
  is_port_vpn_connected: null | boolean; // `null` or potentially a boolean if it might change
  portID: string;
  portName: string;
  redirector: Record<string, any>[]; // Array of objects with unknown structure
  socks5_creds: string;
}
export type ActiveUsers = Record<string, ActiveUserData[]>;
export interface ProxyListRowProps {
  proxyData: ProxyData;
  activeUserInfo: ActiveUsers;
}

export interface ProxyListTableProps {
  proxies: ProxyData[];
  activeUserInfo: ActiveUsers;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface RotateProxyResponse {
  result?: boolean;
  EXT_IP1?: string;
  [key: string]: any;
}

export interface SpeedTestParams {
  ipAddress: string;
  port: string;
  imei: string;
  username: string;
  password: string;
}

export interface SpeedTestResult {
  imei: string | null;
  nick: string;
  downloadSpeed: string;
  uploadSpeed: string;
  resultImage: string;
}

export interface ConnectionResult {
  connections: number;
  successRate: string;
  requestsPerSecond: number;
  timePerRequestMs: number;
}
export interface ConnectionTestResponse {
  imei: string | null;
  nick: string | null;
  results: ConnectionResult[];
}

export interface ProxyState {
  loading: boolean;
  error: ApiError | null;
  data: ProxyData | null;
}

export interface ProxyListState {
  loading: boolean;
  error: ApiError | null;
  data: ProxyData[];
}

export type ProxyActionTypes =
  | { type: "FETCH_PROXIES_REQUEST" }
  | { type: "FETCH_PROXIES_SUCCESS"; payload: ProxyData[] }
  | { type: "FETCH_PROXIES_FAILURE"; payload: ApiError }
  | { type: "ROTATE_PROXY_REQUEST"; payload: string }
  | { type: "ROTATE_PROXY_SUCCESS"; payload: RotateProxyResponse }
  | { type: "ROTATE_PROXY_FAILURE"; payload: ApiError };

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: ApiError;
};
