import { useState } from "react";

function InfoPage() {
  const [picture, setPicture] = useState({});

  let imagePreview = (
    <div className="previewText image-container">
      Please select an Image for Preview
    </div>
  );
  if (picture.imagePreviewUrl) {
    imagePreview = (
      <div className="image-container">
        <img src={picture.imagePreviewUrl} alt="icon" width="200" />{" "}
      </div>
    );
  }

  const fileChangedHandler = (event) => {
    setPicture({
      selectedFile: event.target.files[0],
    });

    let reader = new FileReader();

    reader.onloadend = () => {
      setPicture({
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  const submit = () => {
    console.log("this is the image to send:", picture);
  };

  return (
    <div className="App">
      <input type="file" name="avatar" onChange={fileChangedHandler} />
      <button type="button" onClick={submit}>
        {" "}
        Upload{" "}
      </button>
      {imagePreview}
    </div>
  );
}

export default InfoPage;
