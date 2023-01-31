import React, { useState, useCallback } from 'react'

export const TodoList = () => {
  const [count, setCount] = useState(0)
  const [todos, setTodos] = useState<string[]>([])
  const [name, setName] = useState('')

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setTodos([name, ...todos])
      setName('')
    },
    [name],
  )

  const onRemove = useCallback(
    (todo: string) => {
      setTodos(todos.filter(v => v !== todo))
    },
    [todos],
  )

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>UP</button>
      <button onClick={() => setCount(s => s - 1)}>Down</button>

      <form onSubmit={onSubmit}>
        <input
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button type='submit'>追加</button>
      </form>

      <ul>
        {todos.map((todo, i) => (
          <li key={i} onClick={() => onRemove(todo)}>
            {todo}
          </li>
        ))}
      </ul>
    </div>
  )
}
