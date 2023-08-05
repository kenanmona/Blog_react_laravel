import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/admin//home/Home";

import AdminLayout from "./components/layouts/admin/layout/AdminLayout";
import { Provider } from "react-redux";
import admin from "./store/admin/index";
import user from "./store/user/index";
import Register from "./pages/Auth/register/Register";
import ForgetPassword from "./pages/Auth/forgetpassword/ForgetPassword";
import UserLayout from "./components/layouts/user/layout/UserLayout";
import UserHome from "./pages/user/home/UserHome";
import MainUserLayout from "./components/layouts/user/layout/MainUserLayout";
import Filter from "./pages/user/filter/Filter";
import Details from "./pages/user/details/Details";
import About from "./pages/user/about/About";
import { QueryClientProvider, QueryClient } from "react-query";
import ConfirmEmail from "./pages/Auth/confirmemail/ConfirmEmail";
import Login from "./pages/Auth/login/Login";
import ChangePassword from "./pages/Auth/changepassword/ChangePassword";
import ListCategory from "./pages/admin/category/listCategory/ListCategory";
import NewCategory from "./pages/admin/category/newCategory/NewCategory";
import UpdateCategory from "./pages/admin/category/updateCategory/UpdateCategory";
import AuthLayout from "./components/layouts/auth/layout/AuthLayout";
import PageNotFound from "./pages/pagenotfound/PageNotFound";
import NewArticle from "./pages/admin/article/newarticle/NewArticle";
import ListArticle from "./pages/admin/article/listarticle/ListArticle";
import UpdateArticle from "./pages/admin/article/updatearticle/UpdateArticle";
import NewImageArticle from "./pages/admin/article/newimagearticle/NewImageArticle";
import ShowIamgeArticle from "./pages/admin/article/showimagearticle/ShowIamgeArticle";
import ShowComment from "./pages/admin/article/showcomment/ShowComment";
import ListTag from "./pages/admin/tag/listTag/ListTag";
import NewTag from "./pages/admin/tag/newTag/NewTag";
import UpdateTag from "./pages/admin/tag/updateTag/UpdateTag";
import ListUser from "./pages/admin/user/listUser/ListUser";
import ResendEmail from "./pages/Auth/resendemail/ResendEmail";
import UserProfile from "./pages/user/userProfile/UserProfile";

const queryClient = new QueryClient();
function App() {
    return (
        <div>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <Routes>
                        {/* Auth routes */}
                        <Route
                            path="/"
                            element={
                                <Provider store={user}>
                                    <AuthLayout />
                                </Provider>
                            }
                        >
                            <Route path="login" element={<Login />}></Route>
                            <Route
                                path="register"
                                element={<Register />}
                            ></Route>
                            {/* <Route
                path="verification/verify/:id"
                element={<ConfirmEmail />}
              ></Route> */}
                            <Route
                                path="resend-email"
                                element={<ResendEmail />}
                            ></Route>
                            <Route
                                path="password/reset/:token"
                                element={<ChangePassword />}
                            ></Route>

                            <Route
                                path="forget-password"
                                element={<ForgetPassword />}
                            ></Route>
                        </Route>
                        <Route
                            path="/verification/verify/:id"
                            element={
                                <Provider store={user}>
                                    <ConfirmEmail />
                                </Provider>
                            }
                        ></Route>
                        {/* admin routes */}
                        <Route
                            path="/"
                            element={
                                <Provider store={admin}>
                                    <AdminLayout />
                                </Provider>
                            }
                        >
                            <Route path="admin/home" element={<Home />}></Route>

                            <Route path="admin/users">
                                <Route index element={<ListUser />}></Route>
                                {/* <Route path="new" element={<NewUser />}></Route> */}
                            </Route>

                            <Route path="admin/tag">
                                <Route index element={<ListTag />}></Route>
                                <Route path="new" element={<NewTag />}></Route>
                                <Route
                                    path="update/:id"
                                    element={<UpdateTag />}
                                ></Route>
                            </Route>

                            <Route path="admin/category">
                                <Route index element={<ListCategory />}></Route>
                                <Route
                                    path="new"
                                    element={<NewCategory />}
                                ></Route>
                                <Route
                                    path="update/:id"
                                    element={<UpdateCategory />}
                                ></Route>
                            </Route>

                            <Route path="admin/article">
                                <Route index element={<ListArticle />}></Route>
                                <Route
                                    path="new"
                                    element={<NewArticle />}
                                ></Route>
                                <Route
                                    path="update/:id"
                                    element={<UpdateArticle />}
                                ></Route>
                                <Route
                                    path="new/image/:article"
                                    element={<NewImageArticle />}
                                ></Route>
                                <Route
                                    path="show/image/:article"
                                    element={<ShowIamgeArticle />}
                                ></Route>
                                <Route
                                    path="show/comment/:article"
                                    element={<ShowComment />}
                                ></Route>
                            </Route>
                        </Route>
                        {/* user routes */}
                        <Route
                            path="/"
                            element={
                                <Provider store={user}>
                                    <MainUserLayout />
                                </Provider>
                            }
                        >
                            <Route index element={<UserHome />}></Route>
                        </Route>

                        <Route
                            path="/"
                            element={
                                <Provider store={user}>
                                    <UserLayout />
                                </Provider>
                            }
                        >
                            <Route
                                path="filter/category/:category"
                                element={<Filter />}
                            ></Route>
                            <Route
                                path="filter/tag/:tag"
                                element={<Filter />}
                            ></Route>
                            <Route
                                path="details/:id"
                                element={<Details />}
                            ></Route>
                        </Route>

                        <Route
                            path="/about"
                            element={
                                <Provider store={user}>
                                    <About />
                                </Provider>
                            }
                        ></Route>
                        <Route
                            path="/user-profile"
                            element={
                                <Provider store={user}>
                                    <UserProfile />
                                </Provider>
                            }
                        ></Route>
                        <Route path="*" element={<PageNotFound />}></Route>
                    </Routes>
                </QueryClientProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
