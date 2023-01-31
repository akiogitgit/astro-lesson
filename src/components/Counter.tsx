import { useState } from 'react'

export const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>UP</button>
      <button onClick={() => setCount(s => s - 1)}>Down</button>
    </div>
  )
}
