import { ChatInterface } from "@/components/ChatInterface";
import { ThreatAlert } from "@/components/ThreatAlert";
import { SecurityLog } from "@/components/SecurityLog";
import { Shield } from "lucide-react";

const Index = () => {
  const mockThreats = [
    {
      severity: "high" as const,
      title: "Suspicious Port Scan Detected",
      description: "Multiple connection attempts from external IP address",
      timestamp: "2 minutes ago",
    },
    {
      severity: "medium" as const,
      title: "Outdated SSL Certificate",
      description: "Certificate expires in 7 days - renewal required",
      timestamp: "15 minutes ago",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-primary animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary" style={{ textShadow: "0 0 20px hsl(var(--cyber-glow))" }}>
              CyberShield AI
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Advanced Threat Detection & Security Analysis System
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-terminal-green">
            <span className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></span>
            <span>System Status: OPERATIONAL</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 h-[600px]">
            <ChatInterface />
          </div>

          {/* Side Panel - Threat Alerts and Logs */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <span className="w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
                Active Threats
              </h3>
              {mockThreats.map((threat, index) => (
                <ThreatAlert key={index} {...threat} />
              ))}
            </div>

            <SecurityLog />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground pt-8 border-t border-border">
          <p>Powered by Advanced AI Neural Networks | Real-time Monitoring Active</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
