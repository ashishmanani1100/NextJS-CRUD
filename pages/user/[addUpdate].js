import React from "react";
import { Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import * as yup from "yup";
import Toast from "../../Components/Toast/Toast";
import { getUser } from "../../Utils/apiServices";
import { editUser, getUsers, setUser } from "../../App/Feature/CrudSlice";
import { openToast } from "../../App/Toast/toastSlice";

export const getServerSideProps = async (context) => {
  const { query, params } = context;
  try {
    const data = await getUser(`${query.uid}`);
    return {
      props: {
        formData: params?.addUpdate === "update" ? data : {},
      },
    };
  } catch (error) {
    return {
      props: {
        formData: {},
      },
    };
  }
};

const AddUpdate = ({ formData }) => {
  const { query, push } = useRouter();
  const dispatch = useDispatch();

  const initialValues = {
    firstName: formData?.firstName ? formData?.firstName : "",
    lastName: formData?.lastName ? formData?.lastName : "",
    contactNo: formData?.contactNo ? formData?.contactNo : "",
    email: formData?.email ? formData?.email : "",
    gender: formData?.gender ? formData?.gender : "",
    dob: formData?.dob ? formData?.dob : "",
    address: formData?.address ? formData?.address : "",
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().min(3).required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    contactNo: yup
      .string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .required("Phone Number must be required"),
    email: yup
      .string()
      .email("Enter Valid Email")
      .required("Email is required"),
    gender: yup.string().required("Gender is required"),
    dob: yup.date().required("DOB is required").max(new Date()),
    address: yup.string().required("address is required"),
  });

  const updateData = async (values) => {
    try {
      dispatch(editUser(values)).then(() => {
        dispatch(openToast({message:"User Updated Successfully !", type:"success"}))
        dispatch(getUsers())
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addData = async (values) => {
    try {
      dispatch(setUser(values)).then(() => {
        dispatch(openToast({message:"User Added Successfully !", type:"success"}))
        dispatch(getUsers())
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-2 w-50 mx-auto">
      <h2 className="my-5">
        {query?.addUpdate === "update" ? "Update User" : "Add User"}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (formData?.id) {
            updateData({ ...values, id: formData?.id });
          } else {
            addData({ ...values, id: new Date().getTime() });
          }
          push("/");
        }}
      >
        {({ values, handleChange, errors, handleBlur, touched }) => {
          return (
            <Form>
              <div
                className={`w-100 d-flex shadow my-4 p-2 rounded align-items-center  border ${
                  errors?.firstName && touched.firstName
                    ? "border border-danger"
                    : ""
                }`}
              >
                <div className="label w-25 fw-semibold">First Name :</div>
                <Field
                  className="w-75 rounded border bg-light p-2"
                  name="firstName"
                  type="text"
                  placeholder="Please Enter Your First Name"
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>

              <div
                className={`w-100 d-flex shadow my-4 p-2 rounded align-items-center  border ${
                  errors?.lastName && touched.lastName
                    ? "border border-danger"
                    : ""
                }`}
              >
                <div className="label w-25 fw-semibold">Last Name :</div>
                <Field
                  className="w-75 rounded border bg-light p-2"
                  name="lastName"
                  type="text"
                  placeholder="Please Enter Your Last Name"
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>

              <div
                className={`w-100 d-flex shadow my-4 p-2 rounded align-items-center  border ${
                  errors?.contactNo && touched.contactNo
                    ? "border border-danger"
                    : ""
                }`}
              >
                <div className="label w-25 fw-semibold">Contact No :</div>
                <Field
                  className="w-75 rounded border bg-light p-2"
                  name="contactNo"
                  placeholder="Please Enter Your Contact Number"
                  value={values.contactNo}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>

              <div
                className={`w-100 d-flex shadow my-4 p-2 rounded align-items-center  border ${
                  errors?.email && touched.email ? "border border-danger" : ""
                }`}
              >
                <div className="label w-25 fw-semibold">Email :</div>
                <Field
                  className="w-75 rounded border bg-light p-2"
                  name="email"
                  placeholder="Please Enter Your Email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>

              <div
                className={`w-100 d-flex shadow my-4 p-2 rounded align-items-center  border ${
                  errors?.gender && touched.gender ? "border border-danger" : ""
                }`}
              >
                <div className="label w-25 fw-semibold">Gender :</div>
                <div className="w-75 rounded border bg-light p-2 d-flex align-items-center gap-2">
                  <label>
                    <Field
                      className="me-2"
                      type="radio"
                      name="gender"
                      value="male"
                      checked={values.gender === "male" ? true : false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    Male
                  </label>
                  <label>
                    <Field
                      className="me-2"
                      type="radio"
                      name="gender"
                      value="female"
                      checked={values.gender === "female" ? true : false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    Female
                  </label>
                </div>
              </div>

              <div
                className={`w-100 d-flex shadow my-4 p-2 rounded align-items-center  border ${
                  errors?.dob && touched.dob ? "border border-danger" : ""
                }`}
              >
                <div className="label w-25 fw-semibold">Date Of Birth :</div>
                <Field
                  className="w-75 rounded border bg-light p-2"
                  type="date"
                  name="dob"
                  value={values.dob}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>

              <div
                className={`w-100 d-flex shadow my-4 p-2 rounded align-items-center  border ${
                  errors?.address && touched.address
                    ? "border border-danger"
                    : ""
                }`}
              >
                <div className="label w-25 fw-semibold">Address :</div>
                <Field
                  className="w-75 rounded border bg-light p-2"
                  type="text"
                  name="address"
                  placeholder="Please Enter Your Address"
                  value={values.address}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-end">
                <Button type="submit" color="primary">
                  {formData?.id ? "Update" : "Submit"}
                </Button>
                <Button
                  className="ms-3"
                  color="secondary"
                  onClick={() => push("/")}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>

      <Toast />
    </div>
  );
};

export default AddUpdate;
