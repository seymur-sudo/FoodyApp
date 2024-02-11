import React, { useEffect } from "react";
import Image from "next/image";
import enImg from "../../../public/svgs/en.svg";
import loginImg from "../../../public/svgs/LoginImg.svg";
import { GetServerSideProps } from "next";
import LoadingImg from "../../../public/loadingImg.gif";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FadeLoader } from "react-spinners";
import { ROUTER } from "../../../shared/constant/router";
import { isValidEmail } from "@/constant/ValidRegex";
import { signInUser } from "@/services";
import { useFormik } from "formik";
import { FormValues } from "@/interfaces";
import { getUser } from "@/services";
import { QUERIES } from "../../../constant/Queries";
import { useQuery } from "react-query";

const validate = (values: FormValues) => {
  let errors: Partial<FormValues> = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Invalid email address";
  }

  if (values.email !== "admin@gmail.com") {
    errors.email = "This is not Admin email";
  }
  if (values.password !== "1234567") {
    errors.password = "This is not Admin password";
  }

  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

const Login: React.FC = () => {
  const { data: userID } = useQuery(QUERIES.User, getUser);
  let userEmail =
    userID && userID.data && userID.data.user ? userID.data.user.email : null;

  const { push } = useRouter();
  const { t } = useTranslation("common");

  const { mutate: signinAdmin } = useMutation({
    mutationFn: signInUser,
    onSuccess: (data) => {
      if (data && data.data && data.data.user) {
        push(ROUTER.ADMIN);
        localStorage.setItem("refresh_token", data?.data.user.refresh_token);
        localStorage.setItem("access_token", data?.data.user.access_token);
        toast.success("Signin successfully!", { autoClose: 1000 });
      } else {
        toast.error("Please, Enter Correct Email and Password! ", {
          autoClose: 1000,
        });
      }
    },
    onError: () => {
      toast.error("Please, Enter Correct Email and Password!", {
        autoClose: 1000,
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      signinAdmin(values);
    },
  });

  return (
    <>
      <div className="bg-bgc h-screen">
        {!userEmail ? (
          <>
            <h1 className="ml-9px text-24 pt-[4] sm:pt-57px sm:ml-32px font-mukta font-weight800 sm:text-28 text-logocolor">
              <p
                className="text-logocolor font-mukta text-3xl font-extrabold leading-6 tracking-wider
        "
              >
                Foody
                <span className="text-logodotcolor text-4xl font-extrabold leading-6 tracking-wider">
                  .
                </span>
              </p>
            </h1>
            <div className="flex justify-center mt-75px sm:mt-110px">
              <div className="flex flex-col-reverse sm:flex-row">
                <form
                  className="sm:bg-loginBgc flex flex-col "
                  onSubmit={formik.handleSubmit}
                >
                  <h1 className="sm:mt-58px mt-18px mb-23px font-montserrat text-center text-24 sm:text-35 text-gray1 font-weight700 sm:ml-40px sm:mr-48px sm:mb-40px">
                    Welcome Admin
                  </h1>
                  <div className="">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      placeholder={t("E-mail")}
                      className="sm:pl-40px pl-19px inline mx-auto h-resinput w-207 text-14 sm:text-18 items-center text-gray1 font-weight400 sm:rounded-4 sm:ml-47px sm:mr-58px sm:w-318 bg-inputBg sm:h-input "
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-500 dark:text-red-400 text-sm ml-0 md:ml-12 mt-2 md:-mb-7  font-bold">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div className="my-6 md:my-10">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      placeholder={t("Password")}
                      className="sm:pl-40px pl-19px inline mx-auto h-resinput w-207 text-14 sm:text-18 items-center text-gray1 font-weight400 sm:rounded-4 sm:ml-47px sm:mr-58px sm:w-318 bg-inputBg sm:h-input "
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-red-500 dark:text-red-400 text-sm ml-0 md:ml-12 mt-2 md:-mb-7 font-bold">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className="text-white rounded-5 sm:rounded-4 sm:mb-58px sm:ml-47px sm:mr-58px font-medium text-14 sm:text-xl hover:bg-pink00 bg-loginBtn max-h-[50px] min-h-[50px] hover:opacity-75 transition-all duration-500 "
                  >
                    {formik.isSubmitting ? (
                      <div className="flex justify-center items-center mx-0 my-auto ">
                        <FadeLoader color="#fff" height={5} width={15} />
                      </div>
                    ) : (
                      t("Login")
                    )}
                  </button>
                </form>
                <div className="flex sm:w-405 sm:bg-white justify-center relative ">
                  <Image
                    src={enImg}
                    className="absolute right-2 top-2 hidden md:block"
                    alt="LoginImg"
                  />
                  <Image
                    src={loginImg}
                    className="w-174 sm:w-346  sm:mt-55 sm:ml-30 sm:mb-52 sm:mr-30"
                    alt="login img"
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <Image
            alt="LoadingImg"
            height={1000}
            width={1000}
            className="h-screen w-screen"
            src={LoadingImg}
          />
        )}
      </div>
    </>
  );
};

export default Login;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
