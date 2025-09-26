import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";


 const Dashboard = () => {

    const router = useRouter()

    console.log(router.query.notify)

  return (
    <>
    <div className="h1">Dashboard</div>

        <ToastContainer />
    </>
  )
}

export default Dashboard;
