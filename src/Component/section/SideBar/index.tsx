import IconList from "../SideBar/IconList"

type Props = {}


const Sidebar = (props: Props) => {
  return (
    <div className="sidebar bg-blue-500 flex ">
      <IconList/>
       <div className="container-list"></div> 
    </div>
  )
}

export default Sidebar