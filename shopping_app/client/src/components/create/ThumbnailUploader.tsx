// ThumbnailUploader.tsx

import { Button, Card, CardMedia } from "@mui/material";
import { useRef } from "react";

type Props = {
  value: File | null;
  onChange: (value: File | null) => void;
};

const ThumbnailUploader = ({
  value,
  onChange
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleBottonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      //파일 한개만 업로드 가능하므로 0번째 요소만
      onChange(event.target.files[0]);
    }
  };

  return (
    <>
      <input type="file" hidden multiple={false} onChange={handleChangeInput} ref={inputRef} />
      <Card sx={{ padding: 2, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        {value && <CardMedia component="img" alt={value.name} height={200} sx={{ objectFit: "contain", marginBottom: 2 }} src={URL.createObjectURL(value)} />}
      </Card>
      <Button variant="contained" onClick={handleBottonClick}>썸네일 업로드</Button>
    </>
  );
}

export default ThumbnailUploader;