import React, { useEffect, useState } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
//!Kết nối redux
import { useSelector, useDispatch } from 'react-redux'
import Film from '../../components/Film/Film';
import MultipleRowSlick from '../../components/RSlick/MultipleRowSlick'
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapAction';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';

export default function Home(props) {
    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(layDanhSachPhimAction())
        dispatch(layDanhSachHeThongRapAction())
    }, [])




    return (
        <div>
            <HomeCarousel />
            <section className="text-gray-600 body-font" >
                <div className="container w-11/12 px-5 py-24 mx-auto " >

                    <MultipleRowSlick arrFilm={arrFilm} />

                </div>
            </section>

            <div className="mx-36">
                <HomeMenu heThongRapChieu={heThongRapChieu} />

            </div>
        </div>
    )
}
