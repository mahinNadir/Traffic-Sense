import React, { useEffect, useState } from "react";
import useStyles from "./style";
import Header from "../../components/Header";
import api from "../../config/api";

const Prediction = (props) => {
  const classes = useStyles(props);
  const [selectedImages, setSelectedImages] = useState({
    east: null,
    west: null,
    south: null,
    north: null,
  });
  const [intersection, setIntersection] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState({});

  const regions = ["east", "west", "south", "north"];

  const handleImageSelect = (e, region) => {
    const file = e.target.files[0];
    const fileName = file.name;
    console.log(fileName);
    if (!fileName.includes(region)) {
      alert(`Please select ${region.toUpperCase()} image`);
      return;
    }
    setSelectedImages((prevImages) => ({
      ...prevImages,
      [region]: file,
    }));
  };

  const handleImageUpload = async () => {
    try {
      setIsLoading(true); // Show loader
      
      const formData = new FormData();
      
      if (!intersection) {
        alert("Please enter intersection");
        setIsLoading(false); // Hide loader
        return;
      }
      
      // Check if regions are all 4
      if (regions.some((region) => !selectedImages[region])) {
        alert("Please select all images with correct names");
        setIsLoading(false); // Hide loader
        return;
      }
      
      regions.forEach((region) => {
        if (selectedImages[region]) {
          formData.append("images", selectedImages[region]);
        }
      });
      formData.append("intersectionId", intersection);
      
      const response = await api.predict(formData);
      
      setCountdown(20);
      setPrediction(response.predictions);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false); // Hide loader
      // Handle error
    }
  };

  const handleReset = () => {
    setSelectedImages({
      east: null,
      west: null,
      south: null,
      north: null,
    });
    setPrediction([]);
    setIntersection("");
  };

  useEffect(() => {
    if (!prediction.name) return;

    const interval = setInterval(() => {
      handleImageUpload();
    }, 20000);

    return () => clearInterval(interval);
  }, [prediction]);

  const [countdown, setCountdown] = useState(20);

  useEffect(() => {
    let interval;
    if (prediction.name) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [prediction.name]);

  return (
    <>
      <Header />
      <div className={classes.maincontainer}>
        <div className={classes.container}>
          {regions.map((region) => (
            <div key={region} className={classes.imageSelect}>
              {prediction.name !== region && (
                <div className={classes.signalSignRed}></div>
              )}
              {prediction.name === region && !isLoading && (
                <div className={classes.signalSignGreen}></div>
              )}
              {prediction.name === region && isLoading && (
                <div className={classes.signalSignRed}></div>
              )}
              <input
                key={
                  selectedImages[region]
                    ? selectedImages[region].name
                    : `${region}-image`
                }
                // disabled={isLoading || prediction.name}
                accept="image/*"
                className={classes.input}
                id={`${region}-image`}
                name={`${region}-image`}
                type="file"
                onChange={(e) => handleImageSelect(e, region)}
              />
              {!prediction.name && (
                <label htmlFor={`${region}-image`} className={classes.text}>
                  Click to select {region.toUpperCase()} image
                </label>
              )}
              {prediction.name && (
                <label htmlFor={`${region}-image`} className={classes.text}>
                  {region.toUpperCase()} Image
                </label>
              )}
              {selectedImages[region] && (
                <div className={classes.imageDisplay}>
                  {selectedImages[region] && (
                    <img
                      className={classes.dpImg}
                      src={URL.createObjectURL(selectedImages[region])}
                      alt={`${region.toUpperCase()} Image`}
                    />
                  )}
                </div>
              )}
              {selectedImages[region] && prediction.name && (
                <div className={classes.timer}>
                  <span
                    className={
                      region == prediction.name &&
                      prediction?.detected_ambulance
                        ? classes.statusPrURGENT
                        : classes.statusPrNORMAL
                    }
                  >
                    {region == prediction.name && prediction?.detected_ambulance
                      ? "URGENT"
                      : region == prediction.name && !isLoading
                      ? "NORMAL" + " (" + countdown + ")"
                      : "NORMAL"}
                  </span>
                </div>
              )}

              {selectedImages[region] && !prediction.name && (
                <div className={classes.timer}>
                  <span className={classes.statusPrNORMAL}>
                    {isLoading ? "Processing" : "Ready To Process"}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={classes.intersectionInp}>
          <input
            type="text"
            id="intersection"
            name="intersection"
            disabled={isLoading || prediction.name}
            className={classes.intersection}
            placeholder="Enter Intersection"
            onChange={(e) => setIntersection(e.target.value)}
          />
        </div>

        <div className={classes.btnCont}>
          {/* {prediction.name && (
            <button className={classes.btnReset} onClick={handleReset}>
              Reset
            </button>
          )} */}
          {!prediction.name && (
            <button className={classes.btnStart} onClick={handleImageUpload}>
              {isLoading ? "Loading..." : "Start"}
            </button>
          )}
          {prediction.name && (
            <button className={classes.btnStart} onClick={handleImageUpload}>
              {isLoading ? "Loading..." : countdown}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Prediction;
