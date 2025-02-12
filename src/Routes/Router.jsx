import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Home from "./Home";
import JoinAsHr from "../Auth/JoinAsHr";
import AddAssets from "./AddAssets";
import Private from "../Shared/Private";
import AssetsList from "./AssetsList";
import AdminPrivate from "../Shared/AdminPrivate";
import Payment from "./Payment";
import Allrequests from "./Allrequests";
import UpdateAsset from "./UpdateAsset";
import AddMoreEmployee from "./AddMoreEmployee";
import AddAmount from "./AddAmount";
import MyEmployee from "./MyEmployee";
import MyRequests from "../Pages/MyRequests";
import MyTeam from "../Pages/MyTeam";
import MyAssets from "../Pages/MyAssets";
import PrintPage from "./PrintPage";
import ProfileUpdate from "./ProfileUpdate";


 export const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      children:[
        {
          path:"/",
          element:<Home></Home>
        },
        {
            path:"login",
            element:<Login></Login>,
        },
        {
            path:"register",
            element:<Register></Register>
        },
        {
            path:"registerAsHr",
            element:<JoinAsHr></JoinAsHr>
        },
        // admin access
        {
            path:"addAssets",
            element:<Private><AdminPrivate><AddAssets></AddAssets></AdminPrivate></Private>
        },
        {
            path:"assetsList",
            element:<Private><AdminPrivate><AssetsList></AssetsList></AdminPrivate></Private>
        },
        {
            path:"allRequests",
            element:<Private><AdminPrivate><Allrequests></Allrequests></AdminPrivate></Private>
        },
        {
            path:"addEmployee",
            element:<Private><AdminPrivate><AddMoreEmployee></AddMoreEmployee></AdminPrivate></Private>
        },
        {
            path:"increaseLimit",
            element:<Private><AdminPrivate><AddAmount></AddAmount></AdminPrivate></Private>
        },
        {
            path:"myEmployee",
            element:<Private><AdminPrivate><MyEmployee></MyEmployee></AdminPrivate></Private>
        },
        {
          path:"/update/:id",
          element:<Private><AdminPrivate><UpdateAsset></UpdateAsset></AdminPrivate></Private>
        },
        {
            path:"payment",
            element:<Private><Payment></Payment></Private>
        },
        {
            path:"profileUpdate",
            element:<Private><ProfileUpdate></ProfileUpdate></Private>
        },
        {
          path:'requestAnAsset',
          element:<Private><MyRequests></MyRequests></Private>
        },
        {
          path:'requestedAssets',
          element:<Private><MyAssets></MyAssets></Private>
        },
        {
          path:'print',
          element:<Private><PrintPage></PrintPage></Private>
        },
        {
          path:'sameTeamMember',
          element:<Private><MyTeam></MyTeam></Private>
        },
      ]
    },
  ]);