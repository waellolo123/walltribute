import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./upload.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AddImageAction } from "../../redux/actions/imagesActions";

const Upload = () => {
  const { register, handleSubmit } = useForm();
  const errors = useSelector((state) => state.errors.content);
  const structure = useSelector((state) => state.images.structure);
  const payment = useSelector((state) => state.images.payment);
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", data.image[0]);
    formData.append("sharedLink", data.sharedLink);
    formData.append("position", structure);
    dispatch(AddImageAction(formData));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!payment) {
      navigate("/structure");
    }
  }, [payment]);
  return (
    <div className="upload">
      <h2 className="upload-title">Hang up a picture and honor someone</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-upload">
        <div className="upload-container">
          <h3 className="upload-label">Choose Image</h3>
          <label htmlFor="fileInput" className="upload-label choose">
            +
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            {...register("image")}
          />
          {errors.image && <span className="errors-span">{errors.image}</span>}

          <label className="upload-label">Title</label>
          <input
            type="text"
            placeholder="Title"
            className="upload-input"
            {...register("title")}
          />
          {errors.title && <span className="errors-span">{errors.title}</span>}

          <label className="upload-label">Shared link</label>
          <input
            type="text"
            placeholder="Shared link"
            className="upload-input"
            {...register("sharedLink")}
          />
          {errors.sharedLink && (
            <span className="errors-span">{errors.sharedLink}</span>
          )}
          <label className="upload-label">Description</label>
          <textarea
            type="text"
            placeholder="Description"
            className="upload-input"
            {...register("description")}
            rows="5"
          />
          {errors.description && (
            <span className="errors-span">{errors.description}</span>
          )}

          <button className="upload-btn">
            <a
              style={{ color: "inherit", textDecoration: "none" }}
              type="submit"
            >
              Send Your Image
            </a>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
