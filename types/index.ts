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

export interface ProxyCredentials {
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
  proxy_creds: ProxyCredentials;
}

export interface ProxyData {
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
  proxy_creds: ProxyCredentials;
}

export interface ProxyListRowProps {
  proxyData: ProxyData;
}

export interface ProxyListTableProps {
  proxies: ProxyData[];
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
