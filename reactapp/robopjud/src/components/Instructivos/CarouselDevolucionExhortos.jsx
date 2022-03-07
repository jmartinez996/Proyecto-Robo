import React from "react";
import Carousel from "react-material-ui-carousel";
import { Card, Paper, Button } from "@material-ui/core";
import pic1 from "../../assets/instructivoDevolucionExhortos/1.png";
import pic2 from "../../assets/instructivoDevolucionExhortos/2.png";
import pic3 from "../../assets/instructivoDevolucionExhortos/3.png";
import pic4 from "../../assets/instructivoDevolucionExhortos/4.png";
import pic5 from "../../assets/instructivoDevolucionExhortos/5.png";
import pic6 from "../../assets/instructivoDevolucionExhortos/6.png";
import pic7 from "../../assets/instructivoDevolucionExhortos/7.png";
import pic8 from "../../assets/instructivoDevolucionExhortos/8.png";

export default function CarouselDevolucionExhortos() {

  return (
    <Carousel>
      <div>
        <img src={pic1} style={{ height: "600px", width: "1100px" }} alt="" />
      </div>
      <div>
        <img src={pic2} style={{ height: "600px", width: "1100px" }} alt="" />
      </div>
      <div>
        <img src={pic3} style={{ height: "600px", width: "1100px" }} alt="" />
      </div>
      <div>
        <img src={pic4} style={{ height: "600px", width: "1100px" }} alt="" />
      </div>
      <div>
        <img src={pic5} style={{ height: "600px", width: "1100px" }} alt="" />
      </div>
      <div>
        <img src={pic6} style={{ height: "600px", width: "1100px" }} alt="" />
      </div>
      <div>
        <img src={pic7} style={{ height: "600px", width: "1100px" }} alt="" />
      </div>
      <div>
        <img src={pic8} style={{ height: "600px", width: "1100px" }} alt="" />
      </div>
    </Carousel>
  );
}
