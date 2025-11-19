import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface LogEntry {
  timestamp: string;
  type: "info" | "warning" | "error";
  message: string;
}

const mockLogs: LogEntry[] = [
  { timestamp: new Date().toISOString(), type: "info", message: "System initialized successfully" },
  { timestamp: new Date(Date.now() - 60000).toISOString(), type: "info", message: "Monitoring 147 network endpoints" },
  { timestamp: new Date(Date.now() - 120000).toISOString(), type: "warning", message: "Unusual traffic pattern detected from IP 192.168.1.45" },
  { timestamp: new Date(Date.now() - 180000).toISOString(), type: "info", message: "Firewall rules updated" },
  { timestamp: new Date(Date.now() - 240000).toISOString(), type: "error", message: "Failed login attempt detected - brute force suspected" },
];

export const SecurityLog = () => {
  const getLogColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "info":
        return "text-terminal-green";
      case "warning":
        return "text-warning-amber";
      case "error":
        return "text-danger-red";
    }
  };

  return (
    <Card className="bg-card border border-border p-4 h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-primary">Security Event Log</h3>
        <p className="text-sm text-muted-foreground">Real-time system monitoring</p>
      </div>
      <ScrollArea className="h-[300px]">
        <div className="space-y-2 font-mono text-xs">
          {mockLogs.map((log, index) => (
            <div key={index} className="flex gap-2 border-l-2 border-border pl-3 py-1 hover:bg-secondary/50 transition-colors">
              <span className="text-muted-foreground whitespace-nowrap">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
              <span className={`${getLogColor(log.type)} font-semibold uppercase`}>
                [{log.type}]
              </span>
              <span className="text-foreground">{log.message}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
