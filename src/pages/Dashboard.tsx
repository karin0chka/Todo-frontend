import AddTodo from "../components/AddTodo"
import style from "../style.module.css"
export default function Dashboard() {
  return (
    <main
      className={style.wrapper}
      style={{ flexGrow: 1 }}>
         <AddTodo />
        {/* <ViewTodo />
        <UpdateTodo />
        <DeleteTodo /> */}
      </main>
  )
}
