import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import { TodoList } from './Pages/TodoList'




createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <TodoList />
  </StrictMode>,
)
