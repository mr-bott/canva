
import React, { useState, useRef } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import "./canvas.css"; // <-- Import your new styles

const Sticker = ({ src, x, y, id, onDelete }) => {
  const [image] = useImage(src);
  const [pos, setPos] = useState({ x, y });

  return (
    <KonvaImage
      image={image}
      x={pos.x}
      y={pos.y}
      draggable
      onDragEnd={(e) => {
        const newX = Math.round(e.target.x() / 40) * 40;
        const newY = Math.round(e.target.y() / 40) * 40;
        setPos({ x: newX, y: newY });
      }}
      onDblClick={() => onDelete(id)}
      width={300}
      height={250}
    />
  );
};

const Canvas = () => {
  const [stickers, setStickers] = useState([]);
  const stageRef = useRef();

  const stickerImages = [
    "/stickers/tag_mahal.png",
    "/stickers/under.png",
    "/stickers/star.png",
  ];

  const addSticker = (src) => {
    setStickers([
      ...stickers,
      {
        id: Date.now(),
        src,
        x: 100 + Math.random() * 100,
        y: 100 + Math.random() * 100,
      },
    ]);
  };

  const deleteSticker = (id) => {
    setStickers(stickers.filter((s) => s.id !== id));
  };

  const downloadImage = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement("a");
    link.download = "canvas.png";
    link.href = uri;
    link.click();
  };

  return (
    <div className="canvas-wrapper">
      <div className="sticker-buttons">
        {stickerImages.map((src, idx) => (
          <button key={idx} onClick={() => addSticker(src)}>
            <img src={src} alt={`Sticker ${idx}`} />
          </button>
        ))}
      </div>
      <Stage
        width={600}
        height={400}
        ref={stageRef}
        style={{ border: "2px solid #ccc", borderRadius: "8px", background: "#fefefe" }}
      >
        <Layer>
          {stickers.map((s) => (
            <Sticker key={s.id} {...s} onDelete={deleteSticker} />
          ))}
        </Layer>
      </Stage>
      <button className="download-btn" onClick={downloadImage}>
        Download PNG
      </button>
    </div>
  );
};

export default Canvas;
