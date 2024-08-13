import type { FC } from 'react';

type SvgViewerProps = {
  svgString1: string;
  svgString2: string;
  err: string;
  score: number;
};

const SvgViewer: FC<SvgViewerProps> = ({ svgString1, svgString2, err, score }) => {
  return (
    <>
      <div>score={score} {err && <span style={{ color: "red" }}>({err})</span>}</div>
      <div
        dangerouslySetInnerHTML={{
          __html: svgString1,
        }}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: svgString2,
        }}
      />
    </>
  );
};

export default SvgViewer;
