// ============================================================
// src/hooks/useUndoStack.jsx
//
// Custom hook implementing a LIFO Stack for undo/redo.
//
// DATA STRUCTURE — Two stacks:
//   undoStack  [ ...pastSnapshots ]   ← push() saves here
//   redoStack  [ futureSnapshots... ] ← populated by undo()
//
// API:
//   push(newState)  → save current state, adopt newState, clear redo
//   undo()          → pop from undoStack → state; move old state to redoStack
//   redo()          → pop from redoStack → state; move old state to undoStack
//   canUndo / canRedo / undoDepth
// ============================================================
import { useState, useCallback } from 'react';

export function useUndoStack(initialState) {
  const [state,     setState]     = useState(initialState);
  const [undoStack, setUndoStack] = useState([]);   // stack top = last element
  const [redoStack, setRedoStack] = useState([]);   // stack top = first element

  /**
   * push — commit a new state.
   * Saves current state as a snapshot on the undo stack.
   * Clears the redo branch (a new action invalidates forward history).
   */
  const push = useCallback((newState) => {
    setUndoStack(prev => [...prev, state]);  // push current → undo stack
    setRedoStack([]);                        // clear redo branch
    setState(newState);
  }, [state]);

  /**
   * undo — step backwards.
   * Pops the top of undoStack, moves current state → redoStack.
   */
  const undo = useCallback(() => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1));     // pop
    setRedoStack(prev => [state, ...prev]);       // push current → redo
    setState(previous);
  }, [undoStack, state]);

  /**
   * redo — step forwards.
   * Pops from redoStack top (index 0), moves current state → undoStack.
   */
  const redo = useCallback(() => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setRedoStack(prev => prev.slice(1));          // pop
    setUndoStack(prev => [...prev, state]);        // push current → undo
    setState(next);
  }, [redoStack, state]);

  return {
    state,
    push,
    undo,
    redo,
    canUndo:   undoStack.length > 0,
    canRedo:   redoStack.length > 0,
    undoDepth: undoStack.length,
  };
}
