'use client';

import React, { useState } from "react";
import { Plus, Trash2, Database, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ServerNode {
  id: string;
  name: string;
  angle: number; // 0 to 359
}

interface DataKey {
  id: string;
  name: string;
  angle: number; // 0 to 359
}

export function ConsistentHashingSimulator() {
  const [servers, setServers] = useState<ServerNode[]>([
    { id: "A", name: "Server Node A", angle: 60 },
    { id: "B", name: "Server Node B", angle: 180 },
    { id: "C", name: "Server Node C", angle: 300 },
  ]);

  const [keys, setKeys] = useState<DataKey[]>([
    { id: "k1", name: "Session Cache #1", angle: 10 },
    { id: "k2", name: "Product DB Key #42", angle: 120 },
    { id: "k3", name: "User Auth Session", angle: 250 },
  ]);

  const [keyCount, setKeyCount] = useState(4);
  const [nodeList] = useState(["D", "E", "F"]);
  const [addedNodeCount, setAddedNodeCount] = useState(0);

  const addServer = () => {
    if (addedNodeCount >= nodeList.length) return;
    const nextLetter = nodeList[addedNodeCount];
    const newAngle = Math.floor(Math.random() * 360);
    setServers((prev) => [...prev, { id: nextLetter, name: `Server Node ${nextLetter}`, angle: newAngle }]);
    setAddedNodeCount((prev) => prev + 1);
  };

  const removeServer = (id: string) => {
    if (servers.length <= 1) return;
    setServers((prev) => prev.filter((s) => s.id !== id));
    if (["D", "E", "F"].includes(id)) {
      setAddedNodeCount((prev) => Math.max(0, prev - 1));
    }
  };

  const addKey = () => {
    const newAngle = Math.floor(Math.random() * 360);
    setKeys((prev) => [
      ...prev,
      { id: `k${keyCount}`, name: `Dynamic Key #${keyCount}`, angle: newAngle },
    ]);
    setKeyCount((prev) => prev + 1);
  };

  const resetAll = () => {
    setServers([
      { id: "A", name: "Server Node A", angle: 60 },
      { id: "B", name: "Server Node B", angle: 180 },
      { id: "C", name: "Server Node C", angle: 300 },
    ]);
    setKeys([
      { id: "k1", name: "Session Cache #1", angle: 10 },
      { id: "k2", name: "Product DB Key #42", angle: 120 },
      { id: "k3", name: "User Auth Session", angle: 250 },
    ]);
    setKeyCount(4);
    setAddedNodeCount(0);
  };

  const getAssignedServer = (keyAngle: number): ServerNode => {
    if (servers.length === 0) return { id: "", name: "None", angle: 0 };
    const sorted = [...servers].sort((a, b) => a.angle - b.angle);
    const target = sorted.find((s) => s.angle >= keyAngle);
    return target || sorted[0];
  };

  return (
    <Card className="bg-card/40 border border-border w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <Database className="w-5 h-5 text-foreground" />
          Interactive Consistent Hashing Ring
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Add/remove servers or add keys to see how keys are routed clockwise to the nearest server node. Notice how scaling only relocates adjacent keys.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={addKey}
            className="flex-1 min-w-[120px] font-bold cursor-pointer transition-all duration-300 hover:scale-[1.01]"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Data Key
          </Button>
          <Button 
            variant="secondary"
            onClick={addServer}
            disabled={addedNodeCount >= nodeList.length}
            className="flex-1 min-w-[120px] font-semibold cursor-pointer transition-all duration-300 hover:scale-[1.01]"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Server Node
          </Button>
          <Button 
            variant="ghost"
            onClick={resetAll}
            className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Reset Ring
          </Button>
        </div>

        {/* Visual Hash Ring and Grid */}
        <div className="grid md:grid-cols-2 gap-6 pt-2 items-center">
          {/* SVG ring */}
          <div className="flex justify-center border border-border/40 rounded-xl p-4 bg-background/20 relative aspect-square w-full max-w-[320px] mx-auto">
            <svg viewBox="0 0 300 300" className="w-full h-full text-foreground fill-none stroke-current" strokeWidth="1.5">
              <circle cx="150" cy="150" r="100" strokeDasharray="3 3" className="stroke-muted-foreground/30" />
              
              {keys.map((key) => {
                const srv = getAssignedServer(key.angle);
                if (!srv.id) return null;
                const keyRad = (key.angle * Math.PI) / 180;
                const kx = 150 + 100 * Math.sin(keyRad);
                const ky = 150 - 100 * Math.cos(keyRad);
                
                const srvRad = (srv.angle * Math.PI) / 180;
                const sx = 150 + 100 * Math.sin(srvRad);
                const sy = 150 - 100 * Math.cos(srvRad);

                return (
                  <path 
                    key={key.id} 
                    d={`M ${kx} ${ky} Q 150 150 ${sx} ${sy}`} 
                    className="stroke-muted-foreground/30" 
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                );
              })}

              {keys.map((key) => {
                const rad = (key.angle * Math.PI) / 180;
                const x = 150 + 100 * Math.sin(rad);
                const y = 150 - 100 * Math.cos(rad);
                return (
                  <g key={key.id}>
                    <circle cx={x} cy={y} r="5" className="fill-foreground stroke-background" strokeWidth="1.5" />
                    <text 
                      x={x + (x > 150 ? 8 : -8)} 
                      y={y + 3} 
                      fontSize="7" 
                      textAnchor={x > 150 ? "start" : "end"} 
                      className="stroke-none fill-muted-foreground font-mono font-medium"
                    >
                      {key.id.toUpperCase()}
                    </text>
                  </g>
                );
              })}

              {servers.map((srv) => {
                const rad = (srv.angle * Math.PI) / 180;
                const x = 150 + 100 * Math.sin(rad);
                const y = 150 - 100 * Math.cos(rad);
                return (
                  <g key={srv.id}>
                    <circle cx={x} cy={y} r="9" className="fill-foreground stroke-background" strokeWidth="2" />
                    <text 
                      x={x} 
                      y={y + 3} 
                      fontSize="8" 
                      textAnchor="middle" 
                      className="stroke-none fill-background font-mono font-black"
                    >
                      {srv.id}
                    </text>
                    <text 
                      x={x + (x > 150 ? 12 : -12)} 
                      y={y + 3} 
                      fontSize="8" 
                      textAnchor={x > 150 ? "start" : "end"} 
                      className="stroke-none fill-foreground font-bold font-mono"
                    >
                      Node {srv.id}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="absolute bottom-2 left-2 text-[10px] text-muted-foreground/60 font-mono">
              traversal: clockwise ↻
            </div>
          </div>

          {/* Mapping table and details */}
          <div className="space-y-4 font-sans">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Active Ring Maps</h4>
            
            <div className="border border-border rounded-xl bg-background/20 max-h-56 overflow-y-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/40 font-mono text-[10px] text-muted-foreground">
                    <th className="p-2.5 text-left">Data Key</th>
                    <th className="p-2.5 text-left">Angle</th>
                    <th className="p-2.5 text-right">Target Server</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 font-mono">
                  {keys.map((key) => {
                    const srv = getAssignedServer(key.angle);
                    return (
                      <tr key={key.id} className="hover:bg-muted/15">
                        <td className="p-2.5 font-semibold text-foreground">{key.name} <span className="text-[10px] text-muted-foreground">({key.id.toUpperCase()})</span></td>
                        <td className="p-2.5 text-muted-foreground">{key.angle}°</td>
                        <td className="p-2.5 text-right font-bold text-foreground">Node {srv.id || "None"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="space-y-2">
              <h5 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Server Cluster Nodes ({servers.length})</h5>
              <div className="flex flex-wrap gap-2">
                {servers.map((srv) => (
                  <Badge 
                    key={srv.id} 
                    variant="secondary" 
                    className="flex items-center gap-1.5 py-1 px-2.5 border border-border"
                  >
                    <span className="font-bold">Node {srv.id}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">({srv.angle}°)</span>
                    <button 
                      onClick={() => removeServer(srv.id)} 
                      disabled={servers.length <= 1}
                      className="text-muted-foreground hover:text-destructive hover:scale-105 transition-all focus:outline-none cursor-pointer disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
