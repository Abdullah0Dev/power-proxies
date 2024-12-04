"use client";
import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  Clock,
  Download,
  RotateCw,
  Zap,
  ArrowRight,
  XCircle,
} from "lucide-react";
import {
  fetchConnectionResults,
  fetchSpeedTestData,
  getProxyVPNSetting,
  rotateProxy,
} from "@/actions/getProxyList";
import type {
  SpeedTestParams,
  SpeedTestResult,
  ConnectionTestResponse,
  RotateProxyResponse,
  ApiError,
  ProxyData,
} from "@/types";
import Image from "next/image";

interface LoadingStateProps {
  message: string;
}

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

interface SpeedTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  imei: string;
}

interface ConnectionSpeedTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  imei: string;
}

interface RotateIPModalProps {
  isOpen: boolean;
  onClose: () => void;
  imei: string;
}

function LoadingState({ message }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <RotateCw className="h-8 w-8 animate-spin text-blue-500" />
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <XCircle className="h-12 w-12 text-red-500" />
      <div className="text-center">
        <p className="text-sm text-muted-foreground font-medium">{message}</p>
        {onRetry && (
          <Button variant="destructive" className="mt-4" onClick={onRetry}>
            <RotateCw className="mr-2 h-4 w-4" /> Retry
          </Button>
        )}
      </div>
    </div>
  );
}

export function ConnectionSpeedTestModal({
  isOpen,
  onClose,
  imei,
}: ConnectionSpeedTestModalProps) {
  if (!imei) {
    console.error("IMEI is missing");
  }
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<ConnectionTestResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const fetchData = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchConnectionResults(imei);

      const formattedResponse: ConnectionTestResponse = {
        imei: response.imei || null,
        nick: response.nick || null,
        results: response.results.map((result) => ({
          connections: result.connections,
          successRate: result.successRate,
          requestsPerSecond: result.requestsPerSecond,
          timePerRequestMs: result.timePerRequestMs,
        })),
      };
      setResult(formattedResponse);
    } catch (error) {
      setError({
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch connection results",
      });
    } finally {
      setLoading(false);
    }
  }, [imei]);

  React.useEffect(() => {
    if (isOpen) {
      fetchData();
    } else {
      setResult(null);
      setError(null);
    }
  }, [isOpen, fetchData]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Connection Speed Test Results</DialogTitle>
          <DialogDescription>
            Detailed performance metrics for proxy {imei}
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <LoadingState message="Running connection speed test..." />
        ) : error ? (
          <ErrorState message={error.message} onRetry={fetchData} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {result?.results.map((result, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{result.connections} Connections</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-2 text-sm">
                    <dt>Success Rate:</dt>
                    <dd className="font-medium text-right">
                      {result.successRate}
                    </dd>
                    <dt>Requests/sec:</dt>
                    <dd className="font-medium text-right">
                      {result.requestsPerSecond.toFixed(2)}
                    </dd>
                    <dt>Time/Request:</dt>
                    <dd className="font-medium text-right">
                      {result.timePerRequestMs.toFixed(2)} ms
                    </dd>
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function SpeedTestModal({ isOpen, onClose, imei }: SpeedTestModalProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SpeedTestResult | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchSpeedTest = React.useCallback(async () => {
    if (!imei) return; // Ensure IMEI is provided
    setLoading(true);
    setError(null);

    try {
      console.log("Starting speed test for IMEI:", imei);
      const data = await fetchSpeedTestData({ imei });
      setResult(data);
      console.log("Speed test result:", data);
    } catch (err) {
      setError({
        message:
          err instanceof Error ? err.message : "Failed to perform speed test",
      });
    } finally {
      setLoading(false);
    }
  }, [imei]);

  React.useEffect(() => {
    if (isOpen && !loading && !result) {
      fetchSpeedTest();
    }
  }, [isOpen, fetchSpeedTest, loading, result]);

  const handleClose = () => {
    // Reset state only when closing
    setResult(null);
    setError(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Speed Test Result</DialogTitle>
          <DialogDescription>
            Network speed test results for this proxy
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <LoadingState message="Running speed test..." />
        ) : error ? (
          <ErrorState message={error.message} onRetry={fetchSpeedTest} />
        ) : result ? (
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">IMEI</span>
                    <span className="font-mono text-sm">{result.imei}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Nickname</span>
                    <span className="text-sm">{result.nick}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-green-100 bg-green-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-green-600">
                      Download
                    </p>
                    <p className="text-2xl font-bold text-green-700">
                      {result.downloadSpeed}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-blue-100 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-blue-600">Upload</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {result.uploadSpeed}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-4">
              <Image
                width={520}
                height={520}
                src={result.resultImage}
                alt="Speed test result"
                className="w-full rounded-lg border"
              />
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

export function RotateIPModal({ isOpen, onClose, imei }: RotateIPModalProps) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<RotateProxyResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  console.log(imei);

  const fetchRotateProxy = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await rotateProxy(imei);
      setResult(data);
    } catch (error) {
      setError({
        message: error instanceof Error ? error.message : "Failed to rotate IP",
      });
    } finally {
      setLoading(false);
    }
  }, [imei]); // Dependency on imei

  React.useEffect(() => {
    if (isOpen) {
      fetchRotateProxy();
    } else {
      setResult(null);
      setError(null);
    }
  }, [isOpen, fetchRotateProxy]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>IP Rotation Result</DialogTitle>
          <DialogDescription>
            The IP rotation process has been initiated
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <LoadingState message="Rotating IP..." />
        ) : error ? (
          <ErrorState message={error.message} onRetry={fetchRotateProxy} />
        ) : (
          result && (
            <div className="space-y-4">
              <Card className="border-green-100 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status</span>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800"
                    >
                      {String(result.result)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              {result.EXT_IP1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Previous IP
                      </p>
                      <p className="text-sm text-muted-foreground font-mono">
                        {result.EXT_IP1}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">New IP</p>
                      <p className="text-sm text-muted-foreground font-mono">
                        {result.EXT_IP2}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
}

interface ProxyListRowProps {
  proxy: ProxyData;
}

const ProxyListRow: React.FC<ProxyListRowProps> = ({ proxy }) => {
  const [rotateModalOpen, setRotateModalOpen] = useState(false);
  const [speedTestModalOpen, setSpeedTestModalOpen] = useState(false);
  const [connectionTestModalOpen, setConnectionTestModalOpen] = useState(false);

  const handleDownloadVPNSettings = async () => {
    const data = await getProxyVPNSetting(proxy.port.portID);
    console.log(data?.downloadUrl);
    if (data?.downloadUrl && proxy.port.portID) {
      // Use window.location.assign() to navigate to the URL
      window.location.assign(data.downloadUrl);
    } else {
      console.log("Download URL not available");
    }
  };
  return (
    <TableRow className="hover:bg-blue-50 dark:hover:bg-darkMode-2/60 transition-colors duration-200">
      <TableCell className="py-4">
        <div className="font-medium">{proxy?.ID}</div>
      </TableCell>
      <TableCell className="py-4">
        <Badge
          variant="outline"
          className={
            proxy?.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }
        >
          {proxy?.status}
        </Badge>
      </TableCell>
      <TableCell className="py-4">
        <div className="font-medium">{proxy?.operator}</div>
      </TableCell>
      <TableCell className="py-4 font-mono">{proxy?.external_IP}</TableCell>
      <TableCell className="py-4">
        <div className="flex flex-  space-y-1">
          <div className="flex flex-col gap-y-2 w-32 items-center ">
            <div className="flex gap-x-6">
              <p className="font-bold"> HTTP </p>
              <p className="">{proxy?.port.http}</p>
            </div>
            {/* <span className="h-px w-full bg-slate-500" /> */}
            {`\n`}
            <div className="flex gap-x-6">
              <p className="font-bold"> SOCKS </p>
              <p className="">{proxy?.port.socks}</p>
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="">
        <div className="flex items-center justify-center">
          <span className=" max-w-[100px]">
            {proxy?.proxyCredentials.username}/{" "}
            {proxy?.proxyCredentials.username}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div className=" flex items-center justify-center">
          <span className=" max-w-[100px]">{proxy?.network_type}</span>
        </div>
      </TableCell>
      <TableCell className="py-4 w-48">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-blue-500 flex-shrink-0" />
          <span className="text-sm"> {proxy?.added_time}</span>
        </div>
      </TableCell>
      <TableCell className="py-4">
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-green-100 text-green-600 hover:bg-green-200 shadow-sm"
                  onClick={() => setSpeedTestModalOpen(true)}
                >
                  <Activity className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Speed Test</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-blue-100 text-blue-600 hover:bg-blue-200 shadow-sm"
                  onClick={() => setConnectionTestModalOpen(true)}
                >
                  <Zap className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Connection Speed Test</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-purple-100 text-purple-600 hover:bg-purple-200 shadow-sm"
                  onClick={handleDownloadVPNSettings}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download VPN Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-orange-100 text-orange-600 hover:bg-orange-200 shadow-sm"
                  onClick={() => setRotateModalOpen(true)}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rotate IP</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <SpeedTestModal
          isOpen={speedTestModalOpen}
          onClose={() => setSpeedTestModalOpen(false)}
          imei={proxy.ID}
        />
        <ConnectionSpeedTestModal
          isOpen={connectionTestModalOpen}
          onClose={() => setConnectionTestModalOpen(false)}
          imei={proxy.ID}
        />
        <RotateIPModal
          isOpen={rotateModalOpen}
          imei={proxy.ID}
          onClose={() => setRotateModalOpen(false)}
        />
      </TableCell>
    </TableRow>
  );
};

export default ProxyListRow;
