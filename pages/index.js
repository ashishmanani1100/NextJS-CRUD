import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Image from "next/image";
import Toast from "../Components/Toast/Toast";
import { deleteUser, getUsers } from "../App/Feature/CrudSlice";
import Loading from "../Components/Loading/Loading";
import { openToast } from "../App/Toast/toastSlice";

export default function Home() {
  const { push } = useRouter();
  const dispatch = useDispatch();
  
  const [isOpen, setIsOpen] = useState(false)
  const [userIdForDelete, setUserIdForDelete] = useState(null)

  const {loading, usersData} = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const handlerToggleModalForDelete = (userId=null) => {
    setUserIdForDelete(userId)
    setIsOpen(!isOpen)
  }

  const deleteData = () => {
    dispatch(deleteUser(userIdForDelete)).then((res)=>{
      dispatch(getUsers())
      dispatch(openToast({message:"User Deleted Successfully !", type:"success"}))
    });
    setIsOpen(!isOpen)
    push("/");
  };

  return (
    <div className="p-4 dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <div className="fs-1 fw-bolder my-3">Users Crud Operation</div>

        <Button
          color="primary"
          onClick={() => push("/user/add")}
          className="btn btn-primary"
        >
          Add User
        </Button>
      </div>

      <div className="all-users-wrapper d-flex flex-wrap">
        {loading ? <Loading /> :
          usersData?.length ? (
            usersData?.map((boardData, ind) => (
              <div className="user-card p-3 m-4 bg-body rounded border" key={ind}>
                <div className="avatar-img text-center ">
                  <Image src="/images/avtar.jpg" width={210} height={210} />
                </div>
                <div className="details">
                  <div className="name-wrapper text-center fs-4 fw-semibold">
                    {boardData?.firstName + "  " + boardData?.lastName}
                  </div>
                  <div className="user-actions d-flex gap-4 my-3 justify-content-evenly">
                    <div
                      className="action-icons"
                      onClick={() =>
                        push({ pathname: `/user/show/${boardData?.id}` })
                      }
                    >
                      <Image src="/images/eye-solid.svg" width={25} height={25} />
                    </div>
                    <div
                      className="action-icons"
                      onClick={() => {
                        push({
                          pathname: "user/update",
                          query: { uid: boardData.id },
                        });
                      }}
                    >
                      <Image
                        src="/images/pen-to-square-solid.svg"
                        width={25}
                        height={25}
                      />
                    </div>
                    <div
                      className="action-icons"
                      onClick={() => handlerToggleModalForDelete(boardData?.id)}
                    >
                      <Image
                        src="/images/trash-solid.svg"
                        width={25}
                        height={25}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-user-found">No Users Founds !</div>
          )}
      </div>

      <Modal centered isOpen={isOpen} toggle={handlerToggleModalForDelete}>
        <ModalHeader toggle={handlerToggleModalForDelete}>Are you sure to delete this user ?</ModalHeader>
        <ModalBody>
          This user will be permanently deleted in the API. You cannot restore
          later.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={deleteData}>Delete</Button>
          <Button color="secondary" onClick={handlerToggleModalForDelete}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Toast />
    </div>
  );
}
