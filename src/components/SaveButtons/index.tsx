import type { FC } from 'react';
import { useState, useCallback } from 'react';
import GIF from 'gif.js';
import { vis } from '../../../public/wasm/rust';
import type { VisualizerSettingInfo } from '../../types';

type SvgViewerProps = {
  visualizerSettingInfo: VisualizerSettingInfo;
};

const SvgViewer: FC<SvgViewerProps> = ({ visualizerSettingInfo }) => {
  const [animationButtonDescription, setAnimationButtonDescription] = useState(
    'Save as Animation GIF'
  );

  const [animationButtonDisabled, setAnimationButtonDisabled] = useState(false);

  /* eslint-disable */ // JavaScriptを書くことになるので、ESLintを無効化
  const onSavePng = useCallback(() => {
    const ret = vis(visualizerSettingInfo.output, visualizerSettingInfo.turn);
    const svg = new DOMParser()
      .parseFromString(ret.svg2, 'image/svg+xml')
      .getElementById('vis') as unknown as SVGSVGElement;
    if (svg === null) return;
    const canvas = document.createElement('canvas');
    canvas.width = svg.width.baseVal.value;
    canvas.height = svg.height.baseVal.value;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const image = new Image();
    image.onload = function () {
      ctx.drawImage(image, 0, 0);
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'vis.png';
      a.click();
    };
    image.src =
      'data:image/svg+xml;charset=utf-8;base64,' +
      btoa(unescape(encodeURIComponent(ret.svg2)));
  }, [visualizerSettingInfo.output, visualizerSettingInfo.turn]);

  const onSaveGif = useCallback(() => {
    setAnimationButtonDisabled(true);
    const output = visualizerSettingInfo.output;
    const maxTurn = visualizerSettingInfo.maxTurn;
    const step = 1;
    const delay = (step * 8000) / 60;
    const gif = new GIF({
      workers: 2,
      quality: 100,
      workerScript: 'gif.worker.js',
    });
    gif.on('progress', function (p) {
      setAnimationButtonDescription(
        String(Math.round(50 + 50 * p)).padStart(3, ' ') + '% finished'
      );
    });
    function addFrame(t: number) {
      setAnimationButtonDescription(
        String(Math.round((50.0 * t) / maxTurn)).padStart(3, ' ') + '% finished'
      );
      const svgData = vis(output, t).svg2;
      const svg = new DOMParser()
        .parseFromString(svgData, 'image/svg+xml')
        .getElementById('vis') as unknown as SVGSVGElement;
      if (svg === null) return;
      const canvas = document.createElement('canvas');
      canvas.width = svg.width.baseVal.value;
      canvas.height = svg.height.baseVal.value;
      const ctx = canvas.getContext('2d');
      if (ctx === null) return;
      const image = new Image();
      image.onload = function () {
        ctx.drawImage(image, 0, 0);
        if (t == maxTurn) {
          gif.addFrame(canvas, { delay: 3000 });
        } else {
          gif.addFrame(canvas, { delay: delay });
        }
        if (t < maxTurn) {
          addFrame(Math.min(t + step, maxTurn));
        } else {
          gif.on('finished', function (blob) {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'vis.gif';
            a.click();
            window.URL.revokeObjectURL(a.href);

            setAnimationButtonDescription('Save as Animation GIF');
            setAnimationButtonDisabled(false);
          });
          gif.render();
        }
      };
      image.src =
        'data:image/svg+xml;charset=utf-8;base64,' +
        btoa(unescape(encodeURIComponent(svgData)));
    }
    addFrame(0);
  }, [
    visualizerSettingInfo.output,
    visualizerSettingInfo.maxTurn,
    setAnimationButtonDescription,
    setAnimationButtonDisabled,
  ]);
  /* eslint-enable */

  return (
    <>
      <div>
        <input
          type="button"
          id="save_png"
          value="Save as PNG"
          onClick={onSavePng}
        />
        &nbsp;&nbsp;&nbsp;
        <input
          type="button"
          id="save_gif"
          value={animationButtonDescription}
          onClick={onSaveGif}
          disabled={animationButtonDisabled}
        />
      </div>
    </>
  );
};

export default SvgViewer;
