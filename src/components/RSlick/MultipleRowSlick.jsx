import React, { Component } from "react";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styleSlick from "./MultipleRowSlick.module.css";
import Film from "../Film/Film";
import Film_Flip from "../Film/Film_Flip";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_SAP_CHIEU,
} from "../../redux/actions/types/QuanLyPhimTypes";
import useSelection from "antd/lib/table/hooks/useSelection";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "-50px" }}
      onClick={onClick}
    ></div>
  );
}

const MultipleRowSlick = (props) => {
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  const dispatch = useDispatch();
  const renderFilms = () => {
    return props.arrFilm.map((item, index) => {
      return (
        <div className={`${styleSlick["width-item"]}`} key={index}>
          <Film_Flip item={item} />
        </div>
      );
    });
  };
  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  let activeClassDC = dangChieu == true ? "active_Film" : "none_active_Film";
  let activeClassSC = sapChieu == true ? "active_Film" : "none_active_Film";
  return (
    <div>
      <button
        type="button"
        className={` ${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded-full bg-gray-500  text-white mx-2`}

        onClick={() => {
          dispatch({
            type: SET_PHIM_DANG_CHIEU,
          });
        }}
      >
        Phim đang chiếu
      </button>
      <button
        type="button"
        className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded-full bg-gray-500  text-white mx-2`}
        onClick={() => {
          dispatch({
            type: SET_PHIM_SAP_CHIEU,
          });
        }}
      >
        Phim sắp chiếu
      </button>
      <Slider {...settings}>{renderFilms()}</Slider>
    </div>
  );
};
export default MultipleRowSlick;
