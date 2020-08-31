import { useReducer, Reducer, useCallback } from 'react'

const EMPTY_SET: ReadonlySet<string> = new Set()

enum SelectionType {
  ADD,
  REMOVE,
  SET,
}

interface IUpdateSelectionAction {
  readonly ids: string | ReadonlyArray<string>
  readonly type: SelectionType
}

type Selection = ReadonlySet<string>
type SelectionIds = string | ReadonlyArray<string>

const updateSelection = (
  state: Selection,
  action: IUpdateSelectionAction
): Selection => {
  if (action.type === SelectionType.ADD) {
    // add id to set
    if (typeof action.ids === 'string') {
      return new Set([...state, action.ids])
    }
    return new Set([...state, ...action.ids])
  }
  if (action.type === SelectionType.REMOVE) {
    // remove id from set
    const newSet = new Set(state)
    if (typeof action.ids === 'string') {
      newSet.delete(action.ids)
    } else {
      for (const id of action.ids) {
        newSet.delete(id)
      }
    }
    return newSet
  }
  return new Set(action.ids)
}

export const useSelection = (): readonly [
  Selection,
  (ids: SelectionIds) => void,
  (ids: SelectionIds) => void,
  (ids: SelectionIds) => void
] => {
  const [selection, dispatchSelect] = useReducer<
    Reducer<Selection, IUpdateSelectionAction>
  >(updateSelection, EMPTY_SET)

  const add = useCallback(
    (ids: SelectionIds) => {
      dispatchSelect({ ids, type: SelectionType.ADD })
    },
    [dispatchSelect]
  )

  const remove = useCallback(
    (ids: SelectionIds) => {
      dispatchSelect({ ids, type: SelectionType.REMOVE })
    },
    [dispatchSelect]
  )

  const reset = useCallback(
    (ids: SelectionIds) => {
      dispatchSelect({ ids, type: SelectionType.SET })
    },
    [dispatchSelect]
  )

  return [selection, add, remove, reset]
}
