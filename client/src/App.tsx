import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ECommerce from './pages/Dashboard/ECommerce';
import FormLayout from './pages/Form/Vender';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login'
import SignInN from "./pages/SignInN"
import PrivateRoutes from './components/PrivateRoutes';
import AddContractor from './pages/Form/AddContractor';
import EditeContractor from './pages/Form/EditeContractor';
import AddSeller from './pages/Form/AddSeller';
import TableTwo from './components/Tables/TableTwo';
import VendersTable from './components/Tables/VendersTable';
import Admin from './pages/Form/Admin';
import ContractorDetails from './pages/Form/ContractorDetails'
import VenderDetails from './pages/Form/VenderDetails';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from "./redux/slices/AuthSlice"
import SortingTrainList from './pages/Form/SortingTrainList';
import TableOne from './components/Tables/TableOne';
import ImgUpload from './pages/Dashboard/ImgUpload';
import EditVendor from './pages/Form/EditVendor';
import Master from './pages/Form/Master';
import UpdateAgency from './pages/Form/UpdateAgency';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, Token } = useSelector((state) => state.auth)

  console.log("User in side dashbord ", user);

  const getUserData = async () => {
    try {
      if (Token) {
        let res = await axios.post("http://localhost:3000/user/getUserDetails", {}, {
          headers: {
            Authorization: `Bearer ${Token}`,
          }
        })
        // console.log("res in dashebord ", res.data?.user);
        dispatch(setUser(res.data?.user));
      }
      else {
        navigate("/login")
        console.log("Token not found");
      }
    }
    catch (error) {
      console.error(error),
        console.log(error)
    }
  }

  useEffect(() => {
    getUserData();
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PrivateRoutes>
                <PageTitle title="Railway Dashboard" />{' '}
              </PrivateRoutes>
              <PrivateRoutes>
                {' '}
                <ECommerce />{' '}
              </PrivateRoutes>
            </>
          }
        />
        <Route
          // index
          path="/login"
          element={
            <>
              {/* <PageTitle title="/" /> */}
              <SignInN />
            </>
          }
        />
        <Route
          // index
          path="/dashboard"
          element={
            <>
              {/* <PageTitle title="/" /> */}
              <ECommerce />
            </>
          }
        />
        <Route
          // index
          path="/train"
          element={
            <>
              {/* <PageTitle title="/" /> */}
              <SortingTrainList />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile" />
              <Profile />
            </>
          }
        />

        <Route
          path="/AddInvigilator"
          element={
            <>
              <PageTitle title="Form Layout" />
              <FormLayout />
            </>
          }
        />

        <Route
          path="/AddContractors"
          element={
            <>
              <PageTitle title="Form Layout" />
              <AddContractor />
            </>
          }
        />
        <Route
          path="/EditeContractors"
          element={
            <>
              <PageTitle title="Edite Contractors Layout" />
              <EditeContractor />
            </>
          }
        />
        <Route
          path="/editVendor"
          element={
            <>
              <PageTitle title="Edite Contractors Layout" />
              <EditVendor />
            </>
          }
        />
        {user?.Role === 'SuperAdmin' ? (
          <Route
            path="/admin"
            element={
              <>
                <PageTitle title="Form Layout" />
                <Admin />
              </>
            }
          />
        ) : (
          ''
        )}
        <Route
          path="/AddSeller"
          element={
            <>
              <PageTitle title="Form Layout" />
              <AddSeller />
            </>
          }
        />
        <Route
          path="/contractortables"
          element={
            <>
              <PageTitle title="ContractorTables" />
              <TableOne />
            </>
          }
        />
        <Route
          path="/vendorsData"
          element={
            <>
              <PageTitle title="VendersData" />
              <TableTwo />
            </>
          }
        />
        <Route
          path="/updateAgency"
          element={
            <>
              <UpdateAgency />
            </>
          }
        />
        <Route
          path="/master"
          element={
            <>
              <PageTitle title="VendersData" />
              <Master />
            </>
          }
        />
        <Route
          path="/img"
          element={
            <>
              <PageTitle title="img" />
              <ImgUpload />
            </>
          }
        />
        <Route
          path="/venderstable"
          element={
            <>
              <PageTitle title="VendersTable" />
              <TableTwo />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings" />
              <Settings />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/contractorDetails/:qrcode"
          element={
            <>
              <ContractorDetails />
            </>
          }
        />

        <Route
          path="/venderDetails/:qrcode"
          element={
            <>
              <VenderDetails />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
