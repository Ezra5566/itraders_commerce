import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import ContactPage from "./pages/shopping-view/contact";
import AboutPage from "./pages/shopping-view/about";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import PageTransition from "./components/common/page-transition";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  //console.log(isLoading, user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<ShoppingLayout />}>
            <Route
              index
              element={
                <PageTransition>
                  <ShoppingHome />
                </PageTransition>
              }
            />
            <Route
              path="listing"
              element={
                <PageTransition>
                  <ShoppingListing />
                </PageTransition>
              }
            />
            <Route
              path="contact"
              element={
                <PageTransition>
                  <ContactPage />
                </PageTransition>
              }
            />
            <Route
              path="about"
              element={
                <PageTransition>
                  <AboutPage />
                </PageTransition>
              }
            />
            <Route
              path="search"
              element={
                <PageTransition>
                  <SearchProducts />
                </PageTransition>
              }
            />
          </Route>

          {/* Protected Routes */}
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route
              path="login"
              element={
                <PageTransition>
                  <AuthLogin />
                </PageTransition>
              }
            />
            <Route
              path="register"
              element={
                <PageTransition>
                  <AuthRegister />
                </PageTransition>
              }
            />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route
              path="dashboard"
              element={
                <PageTransition>
                  <AdminDashboard />
                </PageTransition>
              }
            />
            <Route
              path="products"
              element={
                <PageTransition>
                  <AdminProducts />
                </PageTransition>
              }
            />
            <Route
              path="orders"
              element={
                <PageTransition>
                  <AdminOrders />
                </PageTransition>
              }
            />
            <Route
              path="features"
              element={
                <PageTransition>
                  <AdminFeatures />
                </PageTransition>
              }
            />
          </Route>

          {/* Protected Shopping Routes */}
          <Route
            path="/shop"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingLayout />
              </CheckAuth>
            }
          >
            <Route
              path="checkout"
              element={
                <PageTransition>
                  <ShoppingCheckout />
                </PageTransition>
              }
            />
            <Route
              path="account"
              element={
                <PageTransition>
                  <ShoppingAccount />
                </PageTransition>
              }
            />
            <Route
              path="paypal-return"
              element={
                <PageTransition>
                  <PaypalReturnPage />
                </PageTransition>
              }
            />
            <Route
              path="payment-success"
              element={
                <PageTransition>
                  <PaymentSuccessPage />
                </PageTransition>
              }
            />
          </Route>

          <Route
            path="/unauth-page"
            element={
              <PageTransition>
                <UnauthPage />
              </PageTransition>
            }
          />
          <Route
            path="*"
            element={
              <PageTransition>
                <NotFound />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
