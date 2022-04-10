import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Image,
  Form,
} from "react-bootstrap";
import { doc, getDocs, collection, updateDoc } from "firebase/firestore";
import profilePic from "../assets/blank-profile.png";
import { useState, useEffect, useContext, useRef } from "react";
import { db, storage } from "../firebase-config";
import { UserContext } from "../contexts/UserContext";
import dogIcon from "../assets/dogIcon.png";
import catIcon from "../assets/catIcon.png";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function EditProfile({ users, setUsers }) {
  const { user } = useContext(UserContext);
  // const [prof, setProf] = useState(null);
  const [newName, setNewName] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newPostcode, setNewPostcode] = useState("");
  const [newDog, setNewDog] = useState("");
  const [newCat, setNewCat] = useState("");
  const [nameEdit, setNameEdit] = useState(false);
  const [bioEdit, setBioEdit] = useState(false);
  const [priceEdit, setPriceEdit] = useState(false);
  const [postcodeEdit, setPostcodeEdit] = useState(false);
  const [catEdit, setCatEdit] = useState(false);
  const [dogEdit, setDogEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUpload, setImageUpload] = useState(null);
  const usersCollectionRef = collection(db, "users");

  const inputRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);

      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
    setIsLoading(false);
  }, [setUsers, usersCollectionRef]);

  const usersCopy = [...users];

  const arr = usersCopy.filter((profile) => {
    return profile.uid === user?.uid;
  });

  const currentUser = arr[0];
  const userId = currentUser?.id;

  const handleImageUpload = async () => {
    console.log(imageUpload);
    if (imageUpload == null) return;

    try {
      const imageRef = ref(storage, `images/${imageUpload.name + user?.uid}`);

      await uploadBytes(imageRef, imageUpload);
      alert("uploaded");
      const image = await getDownloadURL(imageRef);
      const updateRef = doc(db, "users", userId);
      await updateDoc(updateRef, {
        imageURL: image,
      });
    } catch (error) {
      alert("failed");
      console.log(error.message);
    }
    setImageUpload(null);
  };

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    const updateRef = doc(db, "users", userId);
    // set state
    await updateDoc(updateRef, {
      name: newName,
    });
    setNameEdit(false);
  };

  const handleBioUpdate = async (e) => {
    e.preventDefault();
    const updateRef = doc(db, "users", userId);
    // set state
    await updateDoc(updateRef, {
      bio: newBio,
    });
    setBioEdit(false);
  };

  const handlePriceUpdate = async (e) => {
    e.preventDefault();
    const updateRef = doc(db, "users", userId);
    // set state
    await updateDoc(updateRef, {
      price: newPrice,
    });
    setPriceEdit(false);
  };

  const handlePostcodeUpdate = async (e) => {
    e.preventDefault();
    const updateRef = doc(db, "users", userId);
    // set state
    await updateDoc(updateRef, {
      postcode: newPostcode,
    });
    setPostcodeEdit(false);
  };

  const handleDogUpdate = async (e) => {
    e.preventDefault();
    const updateRef = doc(db, "users", userId);
    // set state
    await updateDoc(updateRef, {
      isDogSitter: newDog,
    });
    setDogEdit(false);
  };

  const handleCatUpdate = async (e) => {
    e.preventDefault();
    const updateRef = doc(db, "users", userId);
    // set state
    await updateDoc(updateRef, {
      isCatSitter: newCat,
    });
    setCatEdit(false);
  };

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <Container>
      <Card className="justify-content-center mx-2 shadow-sm" border="light">
        <Card.Body>
          <Row>
            <Col md="4" lg="4">
              <Image
                roundedCircle
                src={currentUser?.imageURL ? currentUser?.imageURL : profilePic}
                width="130"
                height="130"
              />
              <br />
              <br />
              {!imageUpload ? (
                <>
                  <Button
                    style={{ color: "#fdba74" }}
                    className="btn-light mb-3"
                    onClick={() => inputRef.current.click()}
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#fdba74"
                      class="bi bi-camera"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                      <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                    </svg>{" "}
                    Add photo
                  </Button>

                  <Form.Control
                    className="d-none"
                    ref={inputRef}
                    type="file"
                    size="sm"
                    onChange={(event) => setImageUpload(event.target.files[0])}
                  />
                </>
              ) : (
                <Button className="btn-sign mb-3" onClick={handleImageUpload}>
                  Upload & save
                </Button>
              )}
              <br />
              {currentUser && currentUser.pet === "Both" ? (
                <>
                  {" "}
                  Pets I own:
                  <Image src={catIcon} width="30" className="p-1" />
                  <Image src={dogIcon} width="30" className="p-1" />{" "}
                </>
              ) : null}
              {currentUser && currentUser.pet === "Dog" ? (
                <>
                  Pets I own:
                  <Image src={dogIcon} width="30" className="p-1" />
                </>
              ) : null}
              {currentUser && currentUser.pet === "Cat" ? (
                <>
                  Pets I own:
                  <Image src={catIcon} width="30" className="p-1" />
                </>
              ) : null}
            </Col>

            <Col md="8" lg="8">
              <Row>
                <Col xs="10">
                  <Card.Title className="p-1 mt-3">
                    {currentUser?.name}
                  </Card.Title>
                </Col>
                <Col xs="2">
                  <Button
                    onClick={() => setNameEdit(!nameEdit)}
                    className="ms-auto btn-light mt-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#fdba74"
                      class="bi bi-pencil-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg>
                  </Button>
                </Col>
              </Row>
              {nameEdit ? (
                <Form
                  onSubmit={handleNameUpdate}
                  className="p-3 form-group"
                  width="40"
                >
                  <Form.Control
                    placeholder="Name"
                    className="m-2"
                    onChange={(e) => setNewName(e.target.value)}
                    value={newName}
                  />
                  <Button type="submit" className="ms-auto btn-sign my-3">
                    save
                  </Button>
                </Form>
              ) : (
                ""
              )}
              <Row>
                <Col xs="10">
                  <Card.Text className="p-2">{currentUser?.bio}</Card.Text>
                </Col>
                <Col xs="2">
                  <Button
                    onClick={() => setBioEdit(!bioEdit)}
                    className="ms-auto btn-light"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#fdba74"
                      class="bi bi-pencil-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg>
                  </Button>
                </Col>
              </Row>
              {bioEdit ? (
                <Form
                  onSubmit={handleBioUpdate}
                  className="p-3 form-group"
                  width="40"
                >
                  <Form.Control
                    placeholder="Bio"
                    className="m-2"
                    onChange={(e) => setNewBio(e.target.value)}
                    value={newBio}
                  />
                  <Button type="submit" className="ms-auto btn-sign my-3">
                    save
                  </Button>
                </Form>
              ) : (
                ""
              )}

              {/* Sitter section */}
              {currentUser && currentUser.isSitter ? (
                <>
                  <Row>
                    <Col xs="10">
                      <Card.Text className="p-2">
                        {currentUser.isSitter
                          ? "£ " + currentUser.price + " per day"
                          : null}{" "}
                      </Card.Text>
                    </Col>
                    <Col xs="2">
                      <Button
                        onClick={() => setPriceEdit(!priceEdit)}
                        className="ms-auto btn-light"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#fdba74"
                          class="bi bi-pencil-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>
                      </Button>
                    </Col>
                  </Row>
                  {priceEdit ? (
                    <Form
                      onSubmit={handlePriceUpdate}
                      className="p-3 form-group"
                      width="40"
                    >
                      <Form.Control
                        placeholder="Price"
                        className="m-2"
                        onChange={(e) => setNewPrice(e.target.value)}
                        value={newPrice}
                      />
                      <Button type="submit" className="ms-auto btn-sign my-3">
                        save
                      </Button>
                    </Form>
                  ) : (
                    ""
                  )}
                  <Row>
                    <Col xs="10">
                      <Card.Text className="p-2">
                        {" "}
                        Dog sitter:
                        {currentUser.isDogSitter ? " yes" : "no"}
                      </Card.Text>
                    </Col>
                    <Col xs="2">
                      <Button
                        onClick={() => setDogEdit(!dogEdit)}
                        className="ms-auto btn-light"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#fdba74"
                          class="bi bi-pencil-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>
                      </Button>
                    </Col>
                  </Row>

                  {dogEdit ? (
                    <Form
                      onSubmit={handleDogUpdate}
                      className="p-3 form-group"
                      width="40"
                    >
                      <Form.Check
                        type="checkbox"
                        id={`dog sitting`}
                        label={`Dog Sitting`}
                        onChange={(e) => {
                          setNewDog(!currentUser.isDogSitter);
                        }}
                      />

                      <Button type="submit" className="ms-auto btn-sign my-3">
                        save
                      </Button>
                    </Form>
                  ) : (
                    ""
                  )}
                  <Row>
                    <Col xs="10">
                      <Card.Text className="p-2">
                        {" "}
                        Cat sitter:
                        {currentUser.isCatSitter ? " yes" : "no"}
                      </Card.Text>
                    </Col>
                    <Col xs="2">
                      <Button
                        onClick={() => setCatEdit(!catEdit)}
                        className="ms-auto btn-light"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#fdba74"
                          class="bi bi-pencil-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>
                      </Button>
                    </Col>
                  </Row>
                  {catEdit ? (
                    <Form
                      onSubmit={handleCatUpdate}
                      className="p-3 form-group"
                      width="40"
                    >
                      <Form.Check
                        type="checkbox"
                        id={`cat sitting`}
                        label={`Cat Sitting`}
                        onChange={(e) => {
                          setNewCat(!currentUser.isCatSitter);
                        }}
                      />
                      <Button type="submit" className="ms-auto btn-sign my-3">
                        save
                      </Button>
                    </Form>
                  ) : (
                    ""
                  )}

                  <Row>
                    <Col xs="10">
                      <Card.Text className="p-2">
                        Postcode: {currentUser ? currentUser.postcode : null}
                      </Card.Text>
                    </Col>
                    <Col xs="2">
                      <Button
                        onClick={() => setPostcodeEdit(!postcodeEdit)}
                        className="ms-auto btn-light"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#fdba74"
                          class="bi bi-pencil-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>
                      </Button>
                    </Col>
                  </Row>
                  {postcodeEdit ? (
                    <Form
                      onSubmit={handlePostcodeUpdate}
                      className="p-3 form-group"
                      width="40"
                    >
                      <Form.Control
                        placeholder="Postcode"
                        className="m-2"
                        onChange={(e) => setNewPostcode(e.target.value)}
                        value={newPostcode}
                      />
                      <Button type="submit" className="ms-auto btn-sign my-3">
                        save
                      </Button>
                    </Form>
                  ) : (
                    ""
                  )}
                </>
              ) : null}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
