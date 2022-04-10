import { onSnapshot, doc } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../firebase-config";
import { UserContext } from "../contexts/UserContext";
import { Container, Image } from "react-bootstrap";
import avatar from "../assets/blank-profile.png";
export default function User({ user, selectUser, user1, chat }) {
  const user2 = user?.uid;
  const [data, setData] = useState("");
  //   const [data, setData] = useContext(UserContext);

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMessage", id), (doc) => {
      setData(doc.data());
    });
    //unsubscribing from realtime listener.
    return () => unsub();
  }, []);
  // console.log(data);
  //should log the last message sent.

  return (
    //The chat 3 lines down is the "selected_user". This is the chat highlight functionality.
    <>
      <Container
        className={`user_wrapper ${chat.name === user.name && "selected_user"}`}
        onClick={() => {
          selectUser(user);
        }}
      >
        <div className="user_info p-2">
          <Image
            src={user.imageURL || avatar}
            height="55"
            width="55"
            roundedCircle
          />
          <div className="">
            <h6 className="justify-content-start px-5">
              {user.name}{" "}
              {data?.from !== user1 && data?.unread && (
                <small className="unread">New</small>
              )}
            </h6>

            {data && (
              <p className="truncate px-5">
                <strong>{data.from === user1 ? "sent:" : "received:"}</strong>
                {data.text}
              </p>
            )}
            {/* <div
            className={`user_status ${user.isOnline ? "online" : "offline"}`}
          ></div> */}
          </div>
          {/* Line below shows most recent sent message truncated under the selected user. */}
        </div>
      </Container>
    </>
  );
}
