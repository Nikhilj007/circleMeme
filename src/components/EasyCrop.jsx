import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./Crop";
import { useNavigate } from "react-router-dom";

const EasyCrop = ({ image,userId }) => {
  const navigate = useNavigate();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
      //cropped image is a file
      const formData = new FormData();
      formData.append("profile_pic", croppedImage);
      const res = await fetch(
        "https://anonymously.link/backend/api/edit_photo/"+userId,
        {
          method: "POST",
          body: formData,
        }
        );
        // window.location.reload();
        navigate('/user');
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  return (
    <div className="h-[100vh] pt-12">
      
      <div
        className="container mb-28"
        style={{
          display: image === null || croppedImage !== null ? "none" : "block",
        }}
      >
        <div className="crop-container h-full bg-white">
          <Cropper
            image={image}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            zoomSpeed={4}
            maxZoom={3}
            zoomWithScroll={true}
            showGrid={true}
            aspect={3 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
          />
        </div>
        <div className="controls pt-14">
          <label>
            Rotate
            <input 
              type="range" 
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="rotate"
              onChange={(e) => setRotation(Number(e.target.value))}
              className="range accent-slate-700"
            />
          </label>
          <label>
            Zoom
            <input 
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="range accent-slate-700"
            />
          </label>
        </div>
      </div>
      <div className="flex justify-center">
      <button
      className="button w-fit"
        style={{
          display: image === null || croppedImage !== null ? "none" : "block",
        }}
        onClick={showCroppedImage}
      >
        Save
      </button>
      </div>
    </div>
  );
};

export default EasyCrop;