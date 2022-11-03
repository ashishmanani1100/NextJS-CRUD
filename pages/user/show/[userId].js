import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "reactstrap";
import { getUser, getUserData } from "../../../Utils/apiServices";

export const getStaticPaths = async () => {
  const data = await getUserData();
  const paths = data.map((ele) => {
    return {
      params: {
        userId: `${ele.id}`,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context?.params?.userId;
  const userData = await getUser(id);
  const allUser = await getUserData();
  return {
    props: {
      userData,
      allUser,
    },
  };
};

const ShowUser = ({ userData, allUser }) => {
  const { push } = useRouter();

  return (
    <div>
      <div className="p-2 w-100 mx-auto d-flex">
        <div className="ms-3 w-25">
          <h2 className="mt-5 w-50 text-center">All User</h2>
          <div className="w-50 vh-100 overflow-auto">
            {allUser?.map((user) => (
              <div
                key={user?.id}
                onClick={() => push({ pathname: `/user/show/${user?.id}` })}
                className={`side-item my-3 rounded w-auto p-2 text-center ${
                  user?.id === userData?.id ? "show-item" : ""
                }`}
              >
                {user?.firstName + " " + user?.lastName}
              </div>
            ))}
          </div>
        </div>
        <div className="w-50">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="my-5">User Details</h1>
            <div className="d-flex justify-content-end mb-3">
              <Button onClick={() => push("/")}>Back</Button>
            </div>
          </div>
          <div className="show-wrapper d-flex gap-4 rounded align-items-center shadow-lg">
            <div className="left-show w-25 ps-3">
              <div className="w-100 text-center">
                <Image
                  src="/images/avtar.jpg"
                  width={210}
                  height={210}
                  className="border rounded-circle"
                />
              </div>
              <div className="detail-value w-100 fs-5 fw-normal text-center mt-3">
                {userData?.id}
              </div>
            </div>

            <div className="right-show w-100 p-3">
              <div className="fs-2 fw-bold p-2">
                {userData?.firstName + " " + userData?.lastName}
              </div>

              <div className="d-flex align-items-center w-100 border-bottom p-2 my-3 bg-body">
                <div className="detail-label w-100 fs-5 fw-bolder">
                  Contact No
                </div>
                <div className="detail-value w-100 fs-5 fw-normal border-start ps-3">
                  {userData?.contactNo}
                </div>
              </div>
              <div className="d-flex align-items-center w-100 border-bottom p-2 my-3 bg-body">
                <div className="detail-label w-100 fs-5 fw-bolder">Email</div>
                <div className="detail-value w-100 fs-5 fw-normal border-start ps-3">
                  {userData?.email}
                </div>
              </div>
              <div className="d-flex align-items-center w-100 border-bottom p-2 my-3 bg-body">
                <div className="detail-label w-100 fs-5 fw-bolder">D.O.B.</div>
                <div className="detail-value w-100 fs-5 fw-normal border-start ps-3">
                  {userData?.dob}
                </div>
              </div>
              <div className="d-flex align-items-center w-100 border-bottom p-2 my-3 bg-body">
                <div className="detail-label w-100 fs-5 fw-bolder">Gender</div>
                <div className="detail-value w-100 fs-5 fw-normal border-start ps-3">
                  {userData?.gender}
                </div>
              </div>
              <div className="d-flex align-items-center w-100 border-bottom p-2 my-3 bg-body">
                <div className="detail-label w-100 fs-5 fw-bolder">Address</div>
                <div className="detail-value w-100 fs-5 fw-normal border-start ps-3">
                  {userData?.address}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowUser;
