import React from "react";
import Carousel from "react-material-ui-carousel";
import { Card, Paper, Button } from "@material-ui/core";
import pic1 from "../../assets/InstructivoIngresoExhortos/1.png";
import pic2 from "../../assets/InstructivoIngresoExhortos/2.png";
import pic3 from "../../assets/InstructivoIngresoExhortos/3.png";
import pic4 from "../../assets/InstructivoIngresoExhortos/4.png";
import pic5 from "../../assets/InstructivoIngresoExhortos/5.png";
import pic6 from "../../assets/InstructivoIngresoExhortos/6.png";
import pic7 from "../../assets/InstructivoIngresoExhortos/7.png";
import pic8 from "../../assets/InstructivoIngresoExhortos/8.png";

export default function CarouselIngresiExhortos() {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      img: pic1,
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      img: pic2,
    },
  ];

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
