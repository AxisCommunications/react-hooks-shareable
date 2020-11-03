# react-hooks-shareable

React hooks

This repository provides an explicit list of useful React hooks so you can re-use them across different projects.
The hooks that are provided in this repository are used by multiple projects

If you want to add a React hook or change an existing one, please create an issue or pull request.

## Install

```bash
yarn add -D react react-hooks-shareable
```

## Usage

<details>
  <summary>useAnalytics</summary>

A hook to expose convenience methods for sending page views or events to Google Analytics.

Note: You will still need to set up Google Analytics in your project manually, IE adding the script tag and initialize it and make sure gtag is available on the window object. You also need to have @types/gtag.js as devDependency in your project

```tsx
import { useEffect, useCallback } from 'react'
import { useAnalytics } from 'react-hooks-shareable'
import { Button } from 'someComponentLibrary'

const GoogleID = 'UA-00000000'

const MyComponent = () => {
  const { pageView, event } = useAnalytics(GoogleID)

  useEffect(() => {
    pageView({ page_path: '/myPage' })
  }, [pageView])

  const onClick = useCallback(() => {
    // A simple event
    event('Create', {
      event_category: 'EventCategory',
      event_label: 'Success',
      value: 10,
    })
    // An exception event
    event('exception', {
      description: 'Script error on line 32 in main.js',
      fatal: true, // set to true if the error is fatal
    })
  }, [event])

  return <Button label="Click me" onClick={onClick} />
}
```

</details>

<details>
  <summary>useBoolean</summary>

A hook for easy handling of boolean values. It exposes up to four values and functions in the returned array.

```tsx
const [currentValue, setTrue, setFalse, toggleValue] = useBoolean(initialValue)
```

```tsx
import { useBoolean } from 'react-hooks-shareable'
import { ConfirmDialog } from 'someComponentLibrary'

const MyComponent = () => {
  const [isOpen, open, close, toggle] = useBoolean(false)

  return (
    <ConfirmDialog
      open={isOpen}
      onClose={close}
      title="Dialog"
      message="Are you sure?"
      confirmAction={{
        label: 'OK',
        onClick: close,
      }}
      cancelAction={{
        label: 'Cancel',
        onClick: close,
      }}
    />
  )
}
```

</details>

<details>
  <summary>useDeferredTrigger</summary>

A hook for debouncing a changing boolean value, with different delays depending on the direction of the trigger (determined by the base value).

Note: the trailing delay takes into account the time already spent in the "on" state of the trigger.

Mainly useful for loading states where one wants to guarantee a period without spinner (delay triggering the loading state), but then when it's loading, make sure the spinner is shown for a minimum amount of time (trailing delay of the trigger).

Default values:

delay - 100ms
minDuration - 400ms

```tsx
import { useDeferredTrigger } from 'react-hooks-shareable'

const MyComponent = () => {
  const initializing =
    gqlClient === undefined || credentials === undefined || online === undefined

  const waiting = useDeferredTrigger(initializing, {
    delay: 200,
    minDuration: 500,
  })

  if (waiting) {
    return <Spinner>
  }

  return <YourComponent />
}
```

</details>

<details>
  <summary>useDraggable</summary>

A hook that provides a translation vector for an element that is being dragged.

```tsx
import { useDraggable } from 'react-hooks-shareable'

const MyComponent = () => {
  const [[tx], onDragStart, dragging] = useDraggable(onDragEnd)

  return (
    <ResizeContainer left={tx}>
      <ResizeHandle onPointerDown={onDragStart} />
      <ResizeMarker dragging={dragging} />
    </ResizeContainer>
  )
}
```

</details>

<details>
  <summary>useClickOutside</summary>

A hook that fires a callback when a click (pointerdown) was registered outside of a component. Outside is defined as outside of your react tree, which means that this works with portals.

```tsx
import { useDraggable } from 'react-hooks-shareable'

const MyComponent = () => {
  const handler = useClickOutside(e => {
    console.log('Clicked outside!')
  })

  return (
    <div onPointerDown={handler}>
      <span>Clicks here is inside</span>
      {ReactDOM.createPortal(
        <span>Clicks here are also inside</span>,
        portalContainer
      )}
    </div>
  )
}
```

</details>

<details>
  <summary>useFocusDetection</summary>

A hook which detects if the browser and your page is in focus.

```tsx
import { useFocusDetection } from 'react-hooks-shareable'

const MyComponent = () => {
  const hasFocus = useFocusDetection(1000)

  return <span>{`User ${hasFocus ? : 'is' : 'is not'} focusing on this page`}</span>
}
```

</details>

<details>
  <summary>useId</summary>

A hook that returns a unique id.

```tsx
import { useId } from 'react-hooks-shareable'

const MyComponent = () => {
  const id = useId('someId')

  return <YourComponent id={id} />
}
```

</details>

<details>
  <summary>useInterval</summary>

A hook for delaying the execution.

```tsx
import { useInterval } from 'react-hooks-shareable'

const MyComponent = () => {
  useInterval(() => console.log('Run'), 100)

  return <YourComponent />
}
```

</details>

<details>
  <summary>useLocalStorage</summary>

A hook for accessing from or saving the values to localStorage.

```tsx
import { useLocalStorage, getLocalStorage } from 'react-hooks-shareable'
import { Switch } from 'someComponentLibrary'

// Without hook
const storage = getLocalStorage()
const theme: ITheme | null = storage['theme']

// With hook
const MyComponent = () => {
  const [analytics, setAnalytics] = useLocalStorage<boolean | null>('analytics')

  return (
    <Switch
      label={t('label.shareData')}
      value={analytics === true}
      onChange={setAnalytics}
    />
  )
}
```

</details>

<details>
  <summary>usePressed</summary>

A hook for easy detecting if the component is pressed.

```tsx
import { usePressed } from 'react-hooks-shareable'

const MyComponent = () => {
  const ref = React.createRef<HTMLInputElement>()
  const pressed = usePressed(ref)

  useEffect(() => {
    if (pressed) {
      document.addEventListener('pointermove', posSetter)
      return () => document.removeEventListener('pointermove', posSetter)
    }
  }, [posSetter, pressed])

  return <YourComponent />
}
```

</details>

<details>
  <summary>useResetScroll</summary>

A hook for easy resetting the scroll to top of ref.

```tsx
import { useResetScroll } from 'react-hooks-shareable'

const MyComponent = () => {
  const tableContentRef = useRef<HTMLDivElement>(null)

  // Scroll to top when scrollKey changes
  useResetScroll(tableContentRef)

  return <TableContainer ref={tableRef} />
}
```

</details>

<details>
  <summary>useScrollPosition</summary>

A hook for translating the scroll position for an element into atTop and atBottom boolean values, indicating if the scroll position is at the beginning or end of an element.

To signal that the onScroll function hasn't computed any position yet, atTop and atBottom can be undefined!

```tsx
import { useScrollPosition } from 'react-hooks-shareable'

const MyComponent = () => {
  const { atTop, atBottom, scrollRef } = useScrollPosition()

  return (
    <ScrollContainer
      topHidden={atTop === false}
      bottomHidden={atBottom === false}
      ref={scrollRef}
    >
      {children}
    </ScrollContainer>
  )
}
```

</details>

<details>
  <summary>useSelection</summary>

A hook to keep track of the selected items.

```tsx
import { useSelection } from 'react-hooks-shareable'
import { Table, TableHeader, Typography, Menu } from 'someComponentLibrary'

const MyComponent = () => {
  const [selection, add, remove, reset] = useSelection()

  const onSelect = useCallback(
    (selected: boolean, id?: string) => {
      if (selected) {
        if (id !== undefined) {
          add(id)
        } else {
          reset(LONG_DEVICE_LIST.map(device => device.id))
        }
      } else {
        if (id !== undefined) {
          remove(id)
        } else {
          reset([])
        }
      }
    },
    [add, remove, reset]
  )

  return (
    <Table onSelect={onSelect} hasMenu={true}>
      <TableHeader
        selected={
          selection.size !== 0 && selection.size === LONG_DEVICE_LIST.length
        }
        partial={selection.size > 0 && selection.size < LONG_DEVICE_LIST.length}
        overlay={
          selection.size === 0 ? undefined : (
            <div>
              <Typography>Actions overlay</Typography>
            </div>
          )
        }
        menu={
          <Menu
            align="right"
            items={MENU_ITEMS.map(({ label, ...item }) => ({
              ...item,
              label,
              onClick: onClickHandler(label),
            }))}
          />
        }
      >
        {TABLE_HEADER_DATA.map(({ title }, id) => (
          <Typography key={id}>{title}</Typography>
        ))}
      </TableHeader>
    </Table>
  )
}
```

</details>

<details>
  <summary>useTrigger</summary>

A hook implementing a generic event.

The event can, for example, be used to trigger changes to effects.

The initial state of the event is undefined, otherwise nothing should be assumed of the event returns a triplet consisting of:

0. an event
1. a function to trigger the event
2. a function to reset the event to its initial state

```tsx
import { useCallback, useMemo } from 'react'
import { useTrigger } from 'react-hooks-shareable'

const MyComponent = () => {
  const [clearEvent, triggerClearEvent] = useTrigger()

  const tabs = useMemo(
    () => [
      {
        id: 'myId',
        label: 'myLabel',
      },
    ],
    []
  )

  const onTabSelected = useCallback(
    (tab: Tab) => {
      triggerClearEvent()
      setCurrentTab(tab)
    },
    [triggerClearEvent]
  )
  return (
    <YourComponent
      tabs={tabs}
      onTabSelected={onTabSelected}
      selectedTab={currentTab}
      clearEvent={clearEvent}
    />
  )
}
```

</details>

<details>
  <summary>useUserActive</summary>

A hook for listening to activity on an element by the user.

```tsx
import { useScrollPosition } from 'react-hooks-shareable'

const MyComponent = () => {
  const ref = React.createRef<HTMLInputElement>()
  const [userActivity, startUserActive, stopUserActive] = useUserActive(
    ref,
    4000
  )

  return <YourComponent />
}
```

</details>

<details>
  <summary>useVisibleFocus</summary>

A hook for easy handling of component's focus.

```tsx
import { useVisibleFocus } from 'react-hooks-shareable'

const MyComponent = () => {
  const {
    isPointerOn,
    isPointerOff,
    determineVisibleFocus,
    visibleFocus,
  } = useVisibleFocus()

  return (
    <Button
      onPointerDown={isPointerOn}
      onPointerUp={isPointerOff}
      onFocus={determineVisibleFocus}
      visibleFocus={visibleFocus}
    >
      Content
    </Button>
  )
}
```

</details>
