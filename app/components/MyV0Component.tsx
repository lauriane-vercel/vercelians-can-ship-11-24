'use client'

import { useState } from 'react'
import { Plus, Trash } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function VercelTodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">My To Do List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a task (or your wildest dream)"
            className="flex-grow"
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <Button onClick={addTodo} size="icon">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add todo</span>
          </Button>
        </div>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center justify-between p-2 rounded-md bg-secondary">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`${todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}
                >
                  {todo.text}
                </label>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeTodo(todo.id)}>
                <Trash className="h-4 w-4 text-destructive" />
                <span className="sr-only">Remove todo</span>
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
