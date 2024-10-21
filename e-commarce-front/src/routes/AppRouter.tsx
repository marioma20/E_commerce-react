
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// layouts
const MainLayout = lazy(() => import("@components/layout/mainLayout/MainLayout"));
const ProfileLayout = lazy(() => import("@components/layout/profileLayout/ProfileLayout"));


// lotties animation
import { PageSusbince } from "@components/feedback/layout";
import LottieHandler from "@components/feedback/layout/lottieHandler/LottieHandler";
// pages
const Home = lazy(() => import("@pages/Home"));
const Wishlist = lazy(() => import("@pages/WishList"));
const Categories = lazy(() => import("@pages/Category"));
const Cart = lazy(() => import("@pages/Cart"));
const Products = lazy(() => import("@pages/Products"));
const AboutUs = lazy(() => import("@pages/AboutUS"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Profile = lazy(() => import("@pages/Profile"));
const Orders = lazy(() => import("@pages/Orders"));


import Error from "@pages/Error";

// protictedRoute
import ProtictedRoute from "@components/Auth/ProtictedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
      fallback={
        <div style={{ marginTop: "10%" }}>
          <LottieHandler type="loading" message="Loading please wait..." />
        </div>
      }
    >
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <PageSusbince>
            <Home />
          </PageSusbince>
        ),
      },
      {
        path: "/cart",
        element: (
          <PageSusbince>
             <Cart />
          </PageSusbince>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtictedRoute>
                <PageSusbince>
             <Wishlist />
          </PageSusbince>
          </ProtictedRoute>

        ),
      },
      {
        path: "/categories",
        element: (
          <PageSusbince>
            <Categories />
          </PageSusbince>
        ),
      },
      {
        path: "/categories/products/:prefix",
        element: (
          <PageSusbince>
              <Products />
          </PageSusbince>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "about-us",
        element: (
          <PageSusbince>
             <AboutUs />
          </PageSusbince>
        ),
      },
      {
        path: "login",
        element: (
          <PageSusbince>
               <Login />
          </PageSusbince>
        ),
      },
      {
        path: "register",
        element: (
          <PageSusbince>
             <Register />
          </PageSusbince>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtictedRoute>
             <PageSusbince>
             <ProfileLayout/>
          </PageSusbince>
          </ProtictedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PageSusbince>
              <Profile/>
           </PageSusbince>
            )
          },{
            path: "orders",
            element:(
              <PageSusbince>
                <Orders/>
           </PageSusbince>
          )
          }
        ]
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;