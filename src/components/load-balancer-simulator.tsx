'use client';

import React, { useState } from "react";
import { Play, RotateCcw, Zap, Server, ChevronRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ServerNode {
  id: string;
  name: string;
  activeConnections: number;
  totalRequests: number;
  health: number;
  lastActive: boolean;
}

export function LoadBalancerSimulator() {
  const [algo, setAlgo] = useState<'round-robin' | 'random' | 'least-connections'>('round-robin');
  const [servers, setServers] = useState<ServerNode[]>([
    { id: "A", name: "Server Node A", activeConnections: 2, totalRequests: 0, health: 100, lastActive: false },
    { id: "B", name: "Server Node B", activeConnections: 5, totalRequests: 0, health: 98, lastActive: false },
    { id: "C", name: "Server Node C", activeConnections: 1, totalRequests: 0, health: 95, lastActive: false }
  ]);
  const [requestLog, setRequestLog] = useState<{ id: number; server: string; algo: string; time: string }[]>([]);
  const [nextIndex, setNextIndex] = useState(0);

  const resetStats = () => {
    setServers([
      { id: "A", name: "Server Node A", activeConnections: 2, totalRequests: 0, health: 100, lastActive: false },
      { id: "B", name: "Server Node B", activeConnections: 5, totalRequests: 0, health: 98, lastActive: false },
      { id: "C", name: "Server Node C", activeConnections: 1, totalRequests: 0, health: 95, lastActive: false }
    ]);
    setRequestLog([]);
    setNextIndex(0);
  };

  const handleRequest = (count = 1) => {
    let currentServers = [...servers];
    let currIndex = nextIndex;
    const newLogs: typeof requestLog = [];

    for (let k = 0; k < count; k++) {
      let targetServerId = "";

      if (algo === 'round-robin') {
        targetServerId = currentServers[currIndex].id;
        currIndex = (currIndex + 1) % currentServers.length;
      } else if (algo === 'random') {
        const randIdx = Math.floor(Math.random() * currentServers.length);
        targetServerId = currentServers[randIdx].id;
      } else if (algo === 'least-connections') {
        let minServer = currentServers[0];
        for (let i = 1; i < currentServers.length; i++) {
          if (currentServers[i].activeConnections < minServer.activeConnections) {
            minServer = currentServers[i];
          }
        }
        targetServerId = minServer.id;
      }

      currentServers = currentServers.map((srv) => {
        if (srv.id === targetServerId) {
          const newActive = count === 1 ? srv.activeConnections + 1 : srv.activeConnections;
          return {
            ...srv,
            totalRequests: srv.totalRequests + 1,
            activeConnections: newActive,
            lastActive: true
          };
        }
        return { ...srv, lastActive: false };
      });

      newLogs.unshift({
        id: Date.now() + Math.random(),
        server: `Server Node ${targetServerId}`,
        algo: algo === 'round-robin' ? 'Round Robin' : algo === 'random' ? 'Random' : 'Least Connections',
        time: new Date().toLocaleTimeString()
      });
    }

    setNextIndex(currIndex);
    setServers(currentServers);
    setRequestLog((prev) => [...newLogs, ...prev].slice(0, 5));

    if (count === 1) {
      setTimeout(() => {
        setServers((prevServers) =>
          prevServers.map((srv) => {
            if (srv.lastActive) {
              return {
                ...srv,
                activeConnections: Math.max(0, srv.activeConnections - 1),
                lastActive: false
              };
            }
            return srv;
          })
        );
      }, 800);
    }
  };

  return (
    <Card className="bg-card/40 border border-border w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <Activity className="w-5 h-5 text-foreground animate-pulse" />
          Interactive Load Balancer Playground
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Simulate how an API Gateway / Load Balancer routes traffic to target nodes using different scheduling algorithms.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Algo selectors */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant={algo === 'round-robin' ? 'default' : 'outline'}
            onClick={() => setAlgo('round-robin')}
            className="flex-1 cursor-pointer transition-all duration-300 font-semibold"
          >
            Round Robin
          </Button>
          <Button 
            variant={algo === 'least-connections' ? 'default' : 'outline'}
            onClick={() => setAlgo('least-connections')}
            className="flex-1 cursor-pointer transition-all duration-300 font-semibold"
          >
            Least Connections
          </Button>
          <Button 
            variant={algo === 'random' ? 'default' : 'outline'}
            onClick={() => setAlgo('random')}
            className="flex-1 cursor-pointer transition-all duration-300 font-semibold"
          >
            Random Distribution
          </Button>
        </div>

        {/* Simulator Grid */}
        <div className="grid md:grid-cols-3 gap-6 pt-2">
          {/* Client Request Control */}
          <div className="border border-border rounded-xl p-4 flex flex-col justify-between bg-background/30 gap-4">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">Request Controller</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Generate simulated HTTP/HTTPS traffic. Watch how requests route based on the selected policy.
              </p>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={() => handleRequest(1)}
                className="w-full font-bold cursor-pointer transition-all duration-300 hover:scale-[1.01]"
              >
                <Zap className="w-4 h-4 mr-1.5 fill-current" />
                Send 1 Request
              </Button>
              <Button 
                variant="secondary"
                onClick={() => handleRequest(10)}
                className="w-full font-semibold cursor-pointer transition-all duration-300 hover:scale-[1.01]"
              >
                <Play className="w-4 h-4 mr-1.5 fill-current" />
                Flood 10 Requests
              </Button>
              <Button 
                variant="ghost" 
                onClick={resetStats}
                className="w-full text-xs text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Reset Counter
              </Button>
            </div>
          </div>

          {/* Backend Nodes View */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Backend Cluster Node Pool</h4>
            
            <div className="grid sm:grid-cols-3 gap-4">
              {servers.map((srv) => (
                <div 
                  key={srv.id}
                  className={`border rounded-xl p-4 transition-all duration-300 ${
                    srv.lastActive 
                      ? "border-foreground bg-muted/20 scale-[1.03]" 
                      : "border-border bg-background/20"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <Server className={`w-5 h-5 ${srv.lastActive ? 'text-foreground' : 'text-muted-foreground'}`} />
                    <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                      Node {srv.id}
                    </Badge>
                  </div>
                  <h5 className="font-bold text-sm mb-2">{srv.name}</h5>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Connections:</span>
                      <span className="font-semibold text-foreground font-mono">{srv.activeConnections}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Requests:</span>
                      <span className="font-semibold text-foreground font-mono">{srv.totalRequests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Health Check:</span>
                      <span className="font-semibold text-foreground font-mono">{srv.health}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Request Logs */}
        <div className="border border-border rounded-xl p-4 bg-background/30">
          <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Gateway Routing Log (Recent 5)</h4>
          <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
            {requestLog.length === 0 ? (
              <p className="text-xs text-muted-foreground italic text-center py-4">No active requests. Send a request to start logs.</p>
            ) : (
              requestLog.map((log) => (
                <div key={log.id} className="flex justify-between items-center text-xs border-b border-border/40 pb-1.5 last:border-b-0">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <ChevronRight className="w-3.5 h-3.5 text-foreground" />
                    <span>Route request using</span>
                    <Badge variant="secondary" className="text-[10px] py-0 px-1 font-mono">{log.algo}</Badge>
                  </div>
                  <div className="flex gap-3 text-right">
                    <span className="font-semibold font-mono">{log.server}</span>
                    <span className="text-[10px] text-muted-foreground/60">{log.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
