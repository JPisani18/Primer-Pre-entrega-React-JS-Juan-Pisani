
import ItemListContainer from "./assets/components/ItemListContainer"
import NavBar from "./assets/components/NavBar"


const App = () => {
  return (
    <div>
      <NavBar/>
      <ItemListContainer greeting= {"Proximamente"} />
    </div>
  )
}

export default App