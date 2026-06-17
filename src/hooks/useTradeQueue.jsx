// ============================================================
// src/hooks/useTradeQueue.jsx
//
// Custom hook implementing a FIFO Queue for trade orders.
//
// DATA STRUCTURE — Single array, treated as a queue:
//   Front of queue = index 0  (next to be executed)
//   Back  of queue = last idx (most recently enqueued)
//
// API:
//   enqueue(order)  → append to back
//   dequeue()       → remove & return front item
//   cancel(id)      → remove specific order by id
//   peek()          → inspect front without removing
//   queue / size / isEmpty
// ============================================================
import { useState, useCallback } from 'react';

export function useTradeQueue(initialQueue = []) {
  const [queue, setQueue] = useState(initialQueue);

  /**
   * enqueue — add a new order to the back of the queue.
   * Stamps each order with a unique id and ISO timestamp.
   */
  const enqueue = useCallback((order) => {
    const stamped = {
      ...order,
      id:       `order-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      queuedAt: new Date().toISOString(),
    };
    setQueue(prev => [...prev, stamped]);
  }, []);

/**
   * dequeue — remove and return the front order (FIFO).
   */
  const dequeue = useCallback(() => {
    // 1. Read directly from the current synchronous state
    if (queue.length === 0) return null;
    const executed = queue[0];
    
    // 2. Tell React to update the visual list in the background
    setQueue(prev => prev.slice(1));
    
    // 3. Return the captured item instantly to the math engine
    return executed;
  }, [queue]); // Make sure to add 'queue' to this dependency array!

  /**
   * cancel — remove a specific order from the queue by id.
   */
  const cancel = useCallback((id) => {
    setQueue(prev => prev.filter(o => o.id !== id));
  }, []);

  /**
   * peek — non-destructive read of the front order.
   */
  const peek = useCallback(() => queue[0] ?? null, [queue]);

  return {
    queue,
    enqueue,
    dequeue,
    cancel,
    peek,
    size:    queue.length,
    isEmpty: queue.length === 0,
  };
}
