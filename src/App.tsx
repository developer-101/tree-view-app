import TreeView from "./components/tree-view";
import json from './assets/menu.json'

export default function App() {

  return (
    <>
      <div className="main">
        <div className="menu-area">
          <TreeView menu={json} />
        </div>
        <div className="content-area"></div>
      </div>

    </>
  )
}