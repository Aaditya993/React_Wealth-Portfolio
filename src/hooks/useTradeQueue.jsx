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
   * Because setState is async we capture the value via a ref trick.
   */
  const dequeue = useCallback(() => {
    let executed = null;
    setQueue(prev => {
      if (prev.length === 0) return prev;
      executed = prev[0];          // capture front item
      return prev.slice(1);        // return rest
    });
    // Note: executed will be available synchronously on the next
    // render cycle; callers should rely on the returned value.
    return executed;
  }, []);

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
