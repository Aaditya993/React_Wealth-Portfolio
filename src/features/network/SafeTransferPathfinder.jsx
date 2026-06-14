// ============================================================
// src/features/network/SafeTransferPathfinder.jsx
// Dijkstra's algorithm on a weighted bank-node graph.
// Feature (g): Safe Transfer Route
// ============================================================
import React, { useState, useMemo } from 'react';
import { BANK_NODES, BANK_EDGES } from '../../data/mockData';
import { Card }   from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge }  from '../../components/ui/Badge';

// ── Graph construction ──────────────────────────────────────
function buildAdjacency() {
  const graph = {};
  BANK_NODES.forEach(n => { graph[n.id] = []; });
  BANK_EDGES.forEach(([a, b, w]) => {
    graph[a].push({ to: b, weight: w });
    graph[b].push({ to: a, weight: w });
  });
  return graph;
}
const GRAPH = buildAdjacency();
const NODE_MAP = Object.fromEntries(BANK_NODES.map(n => [n.id, n]));

// ── Dijkstra's shortest path ─────────────────────────────────
// Returns { path: string[], totalRisk: number }
function dijkstra(source, dest) {
  const dist    = {};
  const prev    = {};
  const visited = new Set();

  // Initialise
  BANK_NODES.forEach(n => { dist[n.id] = Infinity; prev[n.id] = null; });
  dist[source] = 0;

  while (true) {
    // Pick unvisited node with minimum tentative distance
    const candidates = BANK_NODES.filter(n => !visited.has(n.id));
    if (candidates.length === 0) break;
    const u = candidates.reduce((best, n) => dist[n.id] < dist[best.id] ? n : best, candidates[0]);
    if (dist[u.id] === Infinity || u.id === dest) break;

    visited.add(u.id);

    for (const { to, weight } of GRAPH[u.id]) {
      if (visited.has(to)) continue;
      const alt = dist[u.id] + weight;
      if (alt < dist[to]) {
        dist[to] = alt;
        prev[to] = u.id;
      }
    }
  }

  // Reconstruct path from prev[] pointers
  const path = [];
  let cur = dest;
  while (cur !== null) {
    path.unshift(cur);
    cur = prev[cur];
  }

  const valid = path.length > 0 && path[0] === source;
  return { path: valid ? path : [], totalRisk: valid ? dist[dest] : Infinity };
}

// ── Risk colour helpers ──────────────────────────────────────
function riskColor(score) {
  if (score <= 2) return { dot: 'bg-emerald-400', text: 'text-emerald-400' };
  if (score <= 4) return { dot: 'bg-amber-400',   text: 'text-amber-400'   };
  return            { dot: 'bg-rose-400',    text: 'text-rose-400'    };
}

function RiskDot({ score }) {
  const { dot, text } = riskColor(score);
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
      <span className={`text-xs font-semibold ${text}`}>Risk {score}</span>
    </div>
  );
}

function getEdgeWeight(a, b) {
  const edge = BANK_EDGES.find(([x, y]) => (x === a && y === b) || (y === a && x === b));
  return edge ? edge[2] : '?';
}

export function SafeTransferPathfinder() {
  const [source, setSource] = useState('A');
  const [dest,   setDest]   = useState('H');
  const [result, setResult] = useState(null);

  const bankOptions = BANK_NODES.map(b => ({ value: b.id, label: `${b.id} — ${b.name}` }));

  const compute = () => {
    if (source === dest) {
      setResult({ error: 'Source and destination must be different banks.' });
      return;
    }
    const { path, totalRisk } = dijkstra(source, dest);
    if (path.length === 0) {
      setResult({ error: 'No path found between the selected banks.' });
    } else {
      setResult({ path, totalRisk });
    }
  };

  return (
    <Card title="Safe Transfer Pathfinder" subtitle="Dijkstra's algorithm — minimise total institutional risk score">
      <div className="px-5 pb-5 pt-4 space-y-5">

        {/* Bank risk index */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Bank Risk Index</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {BANK_NODES.map(b => (
              <div key={b.id} className="bg-slate-800/50 border border-slate-700/40 rounded-lg px-3 py-2.5">
                <p className="text-xs font-black text-slate-200">{b.id} — {b.name.split(' ')[0]}</p>
                <p className="text-[10px] text-slate-500 mb-1.5 truncate">{b.name}</p>
                <RiskDot score={b.riskScore} />
              </div>
            ))}
          </div>
        </div>

        {/* Source / destination selectors */}
        <div className="flex items-end gap-3 flex-wrap">
          <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Source Bank</label>
            <select
              value={source}
              onChange={e => setSource(e.target.value)}
              className="bg-slate-900/80 border border-slate-600 text-slate-100 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500 transition-colors"
            >
              {BANK_NODES.map(b => <option key={b.id} value={b.id}>{b.id} — {b.name}</option>)}
            </select>
          </div>
          <span className="text-slate-500 text-2xl mb-2 flex-shrink-0">→</span>
          <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Destination Bank</label>
            <select
              value={dest}
              onChange={e => setDest(e.target.value)}
              className="bg-slate-900/80 border border-slate-600 text-slate-100 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500 transition-colors"
            >
              {BANK_NODES.map(b => <option key={b.id} value={b.id}>{b.id} — {b.name}</option>)}
            </select>
          </div>
          <Button variant="primary" onClick={compute} className="flex-shrink-0 mb-0.5">
            Find Safest Route
          </Button>
        </div>

        {/* Result panel */}
        {result && (
          <div className="animate-fade-in">
            {result.error ? (
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-3 text-rose-400 text-sm">
                ⚠ {result.error}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <p className="text-sm font-bold text-emerald-400">✓ Optimal route found</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">Total accumulated risk:</span>
                    <span className="text-amber-400 font-bold font-mono tabular">{result.totalRisk.toFixed(1)}</span>
                  </div>
                </div>

                {/* Path visualisation */}
                <div className="flex items-center flex-wrap gap-2 bg-slate-800/40 rounded-xl p-4">
                  {result.path.map((nodeId, i) => {
                    const node  = NODE_MAP[nodeId];
                    const isF   = i === 0;
                    const isL   = i === result.path.length - 1;
                    const next  = result.path[i + 1];
                    const edgeW = next ? getEdgeWeight(nodeId, next) : null;
                    return (
                      <div key={nodeId} className="flex items-center gap-2">
                        {/* Node card */}
                        <div className={[
                          'rounded-xl px-3 py-2.5 border text-center min-w-[64px]',
                          isF ? 'bg-cyan-500/15 border-cyan-500/40' :
                          isL ? 'bg-emerald-500/15 border-emerald-500/40' :
                                'bg-slate-700/50 border-slate-600/50',
                        ].join(' ')}>
                          <p className={`text-lg font-black ${isF ? 'text-cyan-400' : isL ? 'text-emerald-400' : 'text-slate-200'}`}>
                            {nodeId}
                          </p>
                          <p className="text-[10px] text-slate-400 leading-tight">{node.name.split(' ')[0]}</p>
                          <RiskDot score={node.riskScore} />
                        </div>

                        {/* Edge weight */}
                        {edgeW !== null && (
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="text-slate-500">→</span>
                            <span className="text-[10px] text-amber-400/80 font-mono">{edgeW}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="bg-slate-700/20 border border-slate-700/40 rounded-xl px-4 py-3">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong className="text-slate-300">Algorithm:</strong> Dijkstra's shortest path on a weighted undirected graph.
                    Edge weights represent the averaged risk of connected nodes.
                    Route <span className="text-cyan-400 font-mono">{result.path.join(' → ')}</span> achieves
                    a total risk score of <span className="text-amber-400 font-mono">{result.totalRisk.toFixed(1)}</span>,
                    the minimum achievable between {NODE_MAP[source]?.name} and {NODE_MAP[dest]?.name}.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
