Monato Wealth Suite

<img width="3780" height="1890" alt="MONATO" src="https://github.com/user-attachments/assets/27aaeb4e-d966-4823-8cb5-6531d3ba0fe7" />


Project Overview:

Monato Wealth Suite is a personal wealth and investment management dashboard focused on portfolio tracking, trade execution, and risk assessment. Built as a dedicated product, the application combines modern financial interface design with fundamental computer science algorithms, inspired by professional platforms like Zerodha and Bloomberg. This project serves as an academic submission showcasing React.js architecture, custom hook state management, and applied data structures.

Core Features and Applied Data Structures:

The application uses a robust, dummy data backend (mockData.js) to prioritize frontend development capabilities.

The primary features include:

Investment Overview Dashboard:
Real-time calculation of net worth, equity value, unrealized gains and losses, and daily profit and loss metrics.

Money Change Log (Stack Algorithm):
A transaction ledger powered by a custom useUndoStack hook. This feature implements a Last-In-First-Out pattern to allow safe, step-by-step undo and redo functionality for financial transactions.

Trade Submission Queue (FIFO Algorithm):
An order book system utilizing a custom useTradeQueue hook. Buy and sell orders are processed strictly in First-In-First-Out order, updating the global portfolio state upon execution.

Safe Transfer Route (Graph Algorithm):
A built-in pathfinding tool implementing Dijkstra's algorithm to calculate the lowest-risk path for moving capital between a network of simulated banks.

Global Ticker Search:
Instant, client-side filtering of global market indexes.

Dynamic Portfolio Sorter:
Sorting of active holdings by multi-parameter criteria, including Alphabetical, Total Value, and Day Change.

Clearing Network Map:
An interactive, animated step-by-step visualization of the T+2 trade settlement workflow.

Diversification Advisor:
An automated calculator that compares current asset allocation against ideal risk profiles (Conservative vs. Aggressive) and generates precise rebalancing recommendations.

Tech Stack and Architecture:

The core library used is React 18 using functional components and hooks. Vite serves as the build tool for rapid development and optimized builds, while Tailwind CSS provides a custom dark-glassmorphic user interface. State management is handled through the React Context API (PortfolioContext.jsx). Routing is achieved through custom view-state routing, creating a seamless Single Page Application experience. Algorithmic logic is handled apart from the UI layer by custom data structure hooks useUndoStack and useTradeQueue.

Screenshots

The Main Dashboard
<img width="1470" height="956" alt="Screenshot 2026-06-14 at 10 35 12 PM" src="https://github.com/user-attachments/assets/63fd3dd5-1e03-4d07-9c45-3109ed477b95" />

Real-time metrics and sortable holdings table.

Transaction Ledger with Undo and Redo
<img width="1470" height="956" alt="Screenshot 2026-06-14 at 10 35 19 PM" src="https://github.com/user-attachments/assets/4e632f73-c589-4218-86fe-c0d280d7f65a" />

A demonstration of the LIFO stack implementation for transaction safety.

Trade Queue and Ticker Search
<img width="1470" height="956" alt="Screenshot 2026-06-14 at 10 35 29 PM" src="https://github.com/user-attachments/assets/f4198b87-1026-4d7c-b42b-2b12ea8a6316" />

Order book processing and instant ticker search functionality.

Network Pathfinder and Diversification Advisor
<img width="1470" height="956" alt="Screenshot 2026-06-14 at 11 26 07 PM" src="https://github.com/user-attachments/assets/5fcf199c-3cca-4d71-83ec-7c9675c81f95" />

<img width="1470" height="956" alt="Screenshot 2026-06-14 at 11 26 14 PM" src="https://github.com/user-attachments/assets/12005303-eaff-42a0-92a5-b5a603895a38" />




Visualizing the graph pathfinder and the risk-based asset rebalancing calculator.



Author
Aaditya, Designer
