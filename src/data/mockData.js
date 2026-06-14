// ============================================================
// src/data/mockData.js
// All static seed / reference data for PortfolioWealth Suite.
// ============================================================

/** Initial portfolio holdings with realistic prices */
export const INITIAL_HOLDINGS = [
  { id: 'AAPL',  name: 'Apple Inc.',           sector: 'Technology',  qty: 45,  avgCost: 162.30, currentPrice: 213.50, change: +2.14 },
  { id: 'MSFT',  name: 'Microsoft Corp.',       sector: 'Technology',  qty: 30,  avgCost: 310.00, currentPrice: 415.20, change: +1.08 },
  { id: 'GOOGL', name: 'Alphabet Inc.',         sector: 'Technology',  qty: 12,  avgCost: 128.00, currentPrice: 172.80, change: +0.75 },
  { id: 'AMZN',  name: 'Amazon.com Inc.',       sector: 'Consumer',    qty: 18,  avgCost: 175.00, currentPrice: 198.40, change: +1.32 },
  { id: 'NVDA',  name: 'NVIDIA Corp.',          sector: 'Technology',  qty: 25,  avgCost: 420.00, currentPrice: 875.60, change: +3.21 },
  { id: 'JPM',   name: 'JPMorgan Chase & Co.', sector: 'Financials',  qty: 40,  avgCost: 155.00, currentPrice: 201.70, change: -0.44 },
  { id: 'JNJ',   name: 'Johnson & Johnson',     sector: 'Healthcare',  qty: 35,  avgCost: 148.00, currentPrice: 155.30, change: -0.22 },
  { id: 'V',     name: 'Visa Inc.',             sector: 'Financials',  qty: 28,  avgCost: 230.00, currentPrice: 272.50, change: +0.88 },
  { id: 'XOM',   name: 'Exxon Mobil Corp.',     sector: 'Energy',      qty: 50,  avgCost:  98.00, currentPrice: 116.40, change: +1.55 },
  { id: 'BRK.B', name: 'Berkshire Hathaway B',  sector: 'Financials',  qty: 20,  avgCost: 310.00, currentPrice: 382.10, change: +0.30 },
  { id: 'UNH',   name: 'UnitedHealth Group',    sector: 'Healthcare',  qty: 10,  avgCost: 485.00, currentPrice: 527.60, change: -1.10 },
  { id: 'PG',    name: 'Procter & Gamble',      sector: 'Consumer',    qty: 22,  avgCost: 142.00, currentPrice: 163.20, change: +0.18 },
];

/** Global ticker universe used by TickerSearch */
export const GLOBAL_TICKERS = [
  { symbol: 'AAPL',  name: 'Apple Inc.',              exchange: 'NASDAQ', price: 213.50,  change: +2.14 },
  { symbol: 'MSFT',  name: 'Microsoft Corp.',          exchange: 'NASDAQ', price: 415.20,  change: +1.08 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.',            exchange: 'NASDAQ', price: 172.80,  change: +0.75 },
  { symbol: 'AMZN',  name: 'Amazon.com Inc.',          exchange: 'NASDAQ', price: 198.40,  change: +1.32 },
  { symbol: 'NVDA',  name: 'NVIDIA Corp.',             exchange: 'NASDAQ', price: 875.60,  change: +3.21 },
  { symbol: 'TSLA',  name: 'Tesla Inc.',               exchange: 'NASDAQ', price: 248.50,  change: -2.11 },
  { symbol: 'META',  name: 'Meta Platforms Inc.',      exchange: 'NASDAQ', price: 512.30,  change: +1.87 },
  { symbol: 'JPM',   name: 'JPMorgan Chase & Co.',     exchange: 'NYSE',   price: 201.70,  change: -0.44 },
  { symbol: 'JNJ',   name: 'Johnson & Johnson',        exchange: 'NYSE',   price: 155.30,  change: -0.22 },
  { symbol: 'V',     name: 'Visa Inc.',                exchange: 'NYSE',   price: 272.50,  change: +0.88 },
  { symbol: 'XOM',   name: 'Exxon Mobil Corp.',        exchange: 'NYSE',   price: 116.40,  change: +1.55 },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway B',     exchange: 'NYSE',   price: 382.10,  change: +0.30 },
  { symbol: 'UNH',   name: 'UnitedHealth Group',       exchange: 'NYSE',   price: 527.60,  change: -1.10 },
  { symbol: 'PG',    name: 'Procter & Gamble',         exchange: 'NYSE',   price: 163.20,  change: +0.18 },
  { symbol: 'MA',    name: 'Mastercard Inc.',          exchange: 'NYSE',   price: 471.80,  change: +1.02 },
  { symbol: 'HD',    name: 'Home Depot Inc.',          exchange: 'NYSE',   price: 342.50,  change: -0.55 },
  { symbol: 'BAC',   name: 'Bank of America Corp.',    exchange: 'NYSE',   price:  38.90,  change: -0.77 },
  { symbol: 'ABBV',  name: 'AbbVie Inc.',              exchange: 'NYSE',   price: 172.40,  change: +0.62 },
  { symbol: 'PFE',   name: 'Pfizer Inc.',              exchange: 'NYSE',   price:  28.60,  change: -1.40 },
  { symbol: 'COST',  name: 'Costco Wholesale Corp.',   exchange: 'NASDAQ', price: 812.30,  change: +0.95 },
  { symbol: 'AVGO',  name: 'Broadcom Inc.',            exchange: 'NASDAQ', price: 1340.20, change: +2.44 },
  { symbol: 'WMT',   name: 'Walmart Inc.',             exchange: 'NYSE',   price:  68.10,  change: +0.20 },
  { symbol: 'DIS',   name: 'Walt Disney Co.',          exchange: 'NYSE',   price: 112.40,  change: -0.88 },
  { symbol: 'NFLX',  name: 'Netflix Inc.',             exchange: 'NASDAQ', price: 628.90,  change: +2.10 },
  { symbol: 'ADBE',  name: 'Adobe Inc.',               exchange: 'NASDAQ', price: 441.30,  change: +1.33 },
  { symbol: 'CRM',   name: 'Salesforce Inc.',          exchange: 'NYSE',   price: 282.70,  change: +0.51 },
  { symbol: 'ORCL',  name: 'Oracle Corp.',             exchange: 'NYSE',   price: 138.50,  change: +0.44 },
  { symbol: 'AMD',   name: 'Advanced Micro Devices',   exchange: 'NASDAQ', price: 168.90,  change: +4.10 },
  { symbol: 'INTC',  name: 'Intel Corp.',              exchange: 'NASDAQ', price:  31.20,  change: -2.30 },
  { symbol: 'PYPL',  name: 'PayPal Holdings Inc.',     exchange: 'NASDAQ', price:  63.40,  change: -0.90 },
];

/** Seed ledger entries */
export const INITIAL_LEDGER = [
  { id: 'txn-001', type: 'BUY',      symbol: 'NVDA',  qty: 10, price: 820.00, amount:  8200.00, date: '2025-11-20', note: 'Added to NVDA position on dip'  },
  { id: 'txn-002', type: 'DIVIDEND', symbol: 'JPM',   qty:  0, price:   0,    amount:   184.50, date: '2025-11-18', note: 'Q3 dividend payment'              },
  { id: 'txn-003', type: 'SELL',     symbol: 'TSLA',  qty: 15, price: 255.30, amount:  3829.50, date: '2025-11-15', note: 'Reduced TSLA exposure'            },
  { id: 'txn-004', type: 'BUY',      symbol: 'AAPL',  qty:  5, price: 207.00, amount:  1035.00, date: '2025-11-12', note: 'Added on earnings dip'            },
  { id: 'txn-005', type: 'DEPOSIT',  symbol: 'CASH',  qty:  0, price:   0,    amount: 25000.00, date: '2025-11-10', note: 'Monthly contribution'             },
  { id: 'txn-006', type: 'BUY',      symbol: 'XOM',   qty: 20, price: 112.00, amount:  2240.00, date: '2025-11-05', note: 'Energy sector re-balance'         },
  { id: 'txn-007', type: 'SELL',     symbol: 'META',  qty:  8, price: 498.00, amount:  3984.00, date: '2025-10-28', note: 'Took profit after rally'          },
  { id: 'txn-008', type: 'DIVIDEND', symbol: 'JNJ',   qty:  0, price:   0,    amount:   124.25, date: '2025-10-22', note: 'Q3 dividend payment'              },
];

/** Steps in the clearing/settlement pipeline */
export const CLEARING_STEPS = [
  { id: 1, label: 'Order Initiated',   icon: '📋', desc: 'Client submits a trade via the broker interface. The order is validated for format, account limits, and session state.' },
  { id: 2, label: 'Broker Validation', icon: '🏦', desc: 'Broker checks margin availability, KYC/AML status, order parameters, and routes to the correct exchange or dark pool.' },
  { id: 3, label: 'Exchange Matching', icon: '⚡', desc: "The exchange's matching engine pairs the order against resting limit orders or contra-side market orders in microseconds." },
  { id: 4, label: 'Clearing House',    icon: '🔄', desc: 'The Central Counterparty (CCP, e.g. DTCC/OCC) steps in as buyer to every seller and seller to every buyer via novation.' },
  { id: 5, label: 'Risk Assessment',   icon: '🛡️', desc: "CCP's risk engine calculates initial margin and variation margin. Members post collateral to cover potential default exposure." },
  { id: 6, label: 'Settlement (T+2)',  icon: '💰', desc: 'Securities and cash are exchanged between custodian banks. Buyer receives shares; seller receives proceeds. Net obligations settle.' },
  { id: 7, label: 'Confirmation',      icon: '✅', desc: 'Trade is confirmed on the books of both counterparties. Portfolio systems update positions; regulatory reports are filed.' },
];

/** Bank nodes for Dijkstra pathfinding (riskScore: 1=safest, 6=riskiest) */
export const BANK_NODES = [
  { id: 'A', name: 'Apex Capital',       riskScore: 1 },
  { id: 'B', name: 'Bridgepoint Bank',   riskScore: 3 },
  { id: 'C', name: 'Clearwater Trust',   riskScore: 2 },
  { id: 'D', name: 'Delta Securities',   riskScore: 5 },
  { id: 'E', name: 'Eastgate Finance',   riskScore: 4 },
  { id: 'F', name: 'First National',     riskScore: 2 },
  { id: 'G', name: 'GlobalVault Bank',   riskScore: 6 },
  { id: 'H', name: 'Harbor Investments', riskScore: 1 },
];

/** Weighted edges: [nodeA, nodeB, edgeWeight] */
export const BANK_EDGES = [
  ['A', 'B', 2.0], ['A', 'C', 1.5], ['A', 'F', 1.5],
  ['B', 'D', 4.0], ['B', 'E', 3.5], ['B', 'C', 2.5],
  ['C', 'F', 2.0], ['C', 'E', 3.0],
  ['D', 'G', 5.5], ['D', 'H', 3.0],
  ['E', 'G', 5.0], ['E', 'H', 2.5],
  ['F', 'H', 1.5],
  ['G', 'H', 3.5],
];

/** Ideal sector allocation targets per risk profile */
export const IDEAL_ALLOCATIONS = {
  Conservative: { Technology: 25, Financials: 20, Healthcare: 25, Consumer: 15, Energy: 10, Other: 5 },
  Aggressive:   { Technology: 55, Financials: 10, Healthcare: 10, Consumer: 15, Energy:  5, Other: 5 },
};

/** Representative ticker per sector for rebalancing suggestions */
export const SECTOR_REPS = {
  Technology: 'NVDA',
  Financials: 'JPM',
  Healthcare: 'JNJ',
  Consumer:   'PG',
  Energy:     'XOM',
  Other:      'V',
};
