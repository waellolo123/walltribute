import React, { useEffect, useState } from "react";
import "./image.css";
import heisen from "../../assets/heisen.jpg";
import { getOne } from "../../utils/data-provider";
import { useParams } from "react-router-dom";

const Image = () => {
  const [image, setimage] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      await getOne("images/one", id).then((res) => {
        setimage(res.data);
      });
    };
    getData();
  }, []);
  return (
    <div className="image">
      <div className="image-box">
        <div className="image-leftBox">
          <img src={`${image?.image}`} alt="" className="img-box" />
          {/* <img src={heisen} alt="" className="img-box"/> */}
        </div>
        <div className="image-rightBox">
          <h2 className="box-name">{image?.title}</h2>
          {/* <h2 className="box-name">Heisenberg</h2> */}
          <h3 className="box-link">
            {/* heisenberg@gmail.com */}
            <a href={image?.sharedLink} style={{textDecoration:'none', color: 'inherit'}} target="_blank">
              {image?.sharedLink}
            </a>
          </h3>
          <p className="box-desc">{image?.description}</p>
          {/* <p className="box-desc">This is a heisen berg image</p> */}
        </div>
      </div>
    </div>
  );
};

export default Image;
