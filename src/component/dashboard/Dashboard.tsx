import Navbar from '../SubComponents/NavBar/Navbar'
import BillTable from '../SubComponents/BillTable/BillTable'
import Filter from '../SubComponents/Filter/Filter'

function Dashboard() {
    
  return (
    <div>
        <Navbar/>
        <div style={{margin:"50px 30px"}}>
            <Filter/>
            <BillTable/>
        </div>
       
    </div>
  )
}

export default Dashboard
