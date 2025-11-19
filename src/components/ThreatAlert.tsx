import { AlertTriangle, Shield, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ThreatAlertProps {
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  timestamp: string;
}

export const ThreatAlert = ({ severity, title, description, timestamp }: ThreatAlertProps) => {
  const severityConfig = {
    low: {
      color: "text-terminal-green",
      bg: "bg-terminal-green/10",
      border: "border-terminal-green/30",
      icon: Shield,
    },
    medium: {
      color: "text-warning-amber",
      bg: "bg-warning-amber/10",
      border: "border-warning-amber/30",
      icon: Activity,
    },
    high: {
      color: "text-destructive",
      bg: "bg-destructive/10",
      border: "border-destructive/30",
      icon: AlertTriangle,
    },
    critical: {
      color: "text-danger-red",
      bg: "bg-danger-red/10",
      border: "border-danger-red/30",
      icon: AlertTriangle,
    },
  };

  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <Card className={`p-4 ${config.bg} border-2 ${config.border} transition-all hover:shadow-[var(--glow-shadow)]`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${config.color} mt-0.5`} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`font-semibold ${config.color} uppercase text-sm`}>{severity} THREAT</h3>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
          <h4 className="font-medium text-foreground mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
};
