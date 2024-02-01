import AddTodo from "../components/AddTodo"
import ViewTodo from "../components/VievTodo"
export default function Dashboard() {
  return (
    <main 
      style={{ flexGrow: 1 }}>
         <AddTodo />
         <ViewTodo />
        {/* <UpdateTodo />
        <DeleteTodo /> */}
      </main>
  )
}
