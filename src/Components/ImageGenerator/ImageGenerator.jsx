import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import default_image from "../Assets/default_image.svg";

function ImageGenerator() {
  const [image_url, setImage_url] = useState("/");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const imageGenerator = async () => {
    setLoading(true);
    if (inputRef.current.value === "") {
      return 0;
    }

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

    // Accessing the environment variable

    const respose = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`, // Using the apiKey variable here
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );

    let data = await respose.json();
    let data_array = data.data;
    setImage_url(data_array[0].url);

    setLoading(false);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        Ai Image <span className="Generator-text"> GENERATOR</span>
      </div>
      <div className="image-loading">
        <div className="image">
          <img
            src={image_url === "/" ? default_image : image_url}
            alt=""
            className="main-image"
          />

          <div className="loading">
            <div className={loading ? "loading-bar-full" : "loading-bar"}>
              <div className={loading ? "loading-text" : "display-none"}>
                Generating.....
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="search-box">
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="What you want to generate?"
        />
        <div
          className="generate-btn"
          onClick={() => {
            imageGenerator();
          }}>
          Generate
        </div>
      </div>
    </div>
  );
}

export default ImageGenerator;
