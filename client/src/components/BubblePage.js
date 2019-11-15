import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import AxiosWithAuth from "../utils/AxiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  // Obtains url from http://localhost:5000/api/colors and on a successful response, sets the colorList to they array
  useEffect(() => {
    AxiosWithAuth()
      .get('/api/colors')
      .then(response => setColorList(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
