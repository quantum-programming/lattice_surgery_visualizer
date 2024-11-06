import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { get_max_turn as getMaxTurn, vis } from '../../public/wasm/rust';
import type { VisualizerSettingInfo, VisualizerResult } from '../types';
import Description from './Description';
import FileUploader from './FileUploader';
import InputOutput from './InputOutput';
import SaveButtons from './SaveButtons';
import SvgViewer from './SvgViewer';
import TurnSlider from './TurnSlider';

const AHCLikeVisualizer: FC = () => {
  const [visualizerSettingInfo, setVisualizerSettingInfo] =
    useState<VisualizerSettingInfo>({
      output: [
        '11 11 25 1',
        '1 1',
        '3 1',
        '5 1',
        '7 1',
        '9 1',
        '1 3',
        '3 3',
        '5 3',
        '7 3',
        '9 3',
        '1 5',
        '3 5',
        '5 5',
        '7 5',
        '9 5',
        '1 7',
        '3 7',
        '5 7',
        '7 7',
        '9 7',
        '1 9',
        '3 9',
        '5 9',
        '7 9',
        '9 9',
        '100',
        '2 1 7',
        '19 4',
        'V V',
        '8 2 9 2 8 3 8 4 8 5 8 6 9 6 2 1 9',
        '24 7',
        'H H',
        '6 3 6 4 6 5 6 6 6 7 6 8 7 8 8 8 8 9 2 1 7',
        '17 1',
        'V V',
        '3 2 4 2 4 3 4 4 4 5 4 6 5 6 2 1 17',
        '24 5',
        'H H',
        '2 3 2 4 2 5 2 6 2 7 2 8 2 9 10 9 2 10 3 10 4 10 5 10 6 10 7 10 8 10 9 10 10 10 2 2 9',
        '19 16',
        'H H',
        '2 7 8 7 2 8 3 8 4 8 5 8 6 8 7 8 8 8 2 2 5',
        '3 12',
        'V V',
        '6 2 7 2 6 3 5 4 6 4 2 2 13',
        '21 14',
        'V V',
        '9 6 10 6 10 7 10 8 10 9 3 10 4 10 5 10 6 10 7 10 8 10 9 10 10 10 2 2 1',
        '16 17',
        'H H',
        '4 7 2 1 19',
        '8 20',
        'V V',
        '2 0 3 0 4 0 5 0 6 0 2 1 6 1 0 2 1 2 2 2 6 2 7 2 0 3 0 4 0 5 0 6 0 7 0 8 1 8 2 3 21',
        '14 11',
        'H H',
        '0 0 1 0 2 0 3 0 4 0 5 0 6 0 7 0 8 0 0 1 8 1 0 2 8 2 0 3 8 3 0 4 1 4 2 4 8 4 2 5 8 5 2 2 9',
        '5 17',
        'H H',
        '2 3 2 4 2 5 2 6 3 6 4 6 5 6 6 6 6 7 2 2 5',
        '7 0',
        'V V',
        '1 2 2 2 3 2 4 2 5 2 2 3 3',
        '11 7',
        'H H',
        '4 3 4 4 4 5 2 3 9',
        '12 5',
        'V V',
        '1 2 2 2 3 2 4 2 5 2 6 2 6 3 5 4 6 4 2 4 3',
        '7 3',
        'V V',
        '5 2 6 2 7 2 2 3 9',
        '21 19',
        'V V',
        '8 8 9 8 8 9 3 10 4 10 5 10 6 10 7 10 8 10 2 3 7',
        '19 16',
        'V V',
        '3 6 4 6 5 6 6 6 7 6 8 6 9 6 2 3 3',
        '17 21',
        'V V',
        '3 8 4 8 5 8 2 4 9',
        '11 2',
        'V V',
        '2 0 3 0 4 0 5 0 2 1 2 2 2 3 2 4 3 4 2 4 7',
        '1 17',
        'H H',
        '4 1 4 2 4 3 4 4 4 5 4 6 4 7 2 4 27',
        '3 5',
        'V V',
        '7 0 8 0 8 1 8 2 8 3 0 4 1 4 8 4 0 5 8 5 0 6 8 6 0 7 8 7 0 8 8 8 0 9 8 9 0 10 1 10 2 10 3 10 4 10 5 10 6 10 7 10 8 10 2 4 9',
        '12 20',
        'H H',
        '6 5 6 6 6 7 2 8 3 8 4 8 5 8 6 8 2 9 2 5 3',
        '8 2',
        'H H',
        '6 1 6 2 6 3 2 5 11',
        '4 22',
        'H H',
        '8 1 8 2 8 3 8 4 8 5 8 6 8 7 6 8 7 8 8 8 6 9 2 5 13',
        '2 14',
        'H H',
        '4 0 5 0 6 0 7 0 8 0 9 0 10 0 4 1 10 1 10 2 10 3 10 4 10 5 2 6 9',
        '2 22',
        'H H',
        '4 1 4 2 4 3 4 4 4 5 4 6 4 7 4 8 4 9 2 5 5',
        '13 11',
        'V V',
        '3 4 4 4 5 4 6 4 7 4 2 6 1',
        '14 9',
        'V V',
        '9 4 2 6 7',
        '3 18',
        'V V',
        '7 2 8 2 8 3 8 4 8 5 7 6 8 6 2 5 11',
        '17 7',
        'H H',
        '2 2 3 2 4 2 2 3 4 3 2 4 2 5 2 6 3 6 4 6 4 7 2 5 7',
        '10 21',
        'V V',
        '0 6 1 6 0 7 0 8 1 8 2 8 3 8 2 6 5',
        '17 8',
        'H H',
        '6 3 6 4 6 5 6 6 6 7 2 6 13',
        '3 10',
        'V V',
        '0 0 1 0 2 0 3 0 4 0 5 0 6 0 7 0 0 1 0 2 0 3 0 4 1 4 2 6 5',
        '19 22',
        'H H',
        '8 7 6 8 7 8 8 8 6 9 2 7 13',
        '15 12',
        'V V',
        '4 6 5 6 4 7 0 8 1 8 4 8 0 9 4 9 0 10 1 10 2 10 3 10 4 10 2 7 9',
        '9 12',
        'V V',
        '4 2 5 2 6 2 7 2 8 2 9 2 4 3 4 4 5 4 2 6 7',
        '16 1',
        'H H',
        '2 1 2 2 2 3 2 4 2 5 2 6 2 7 2 7 13',
        '5 4',
        'H H',
        '0 0 1 0 2 0 3 0 4 0 5 0 6 0 7 0 8 0 0 1 8 1 0 2 0 3 2 6 15',
        '10 24',
        'V V',
        '0 6 1 6 0 7 0 8 0 9 0 10 1 10 2 10 3 10 4 10 5 10 6 10 7 10 8 10 9 10 2 8 11',
        '10 4',
        'V V',
        '8 2 9 2 8 3 1 4 2 4 3 4 4 4 5 4 6 4 7 4 8 4 2 7 5',
        '7 14',
        'H H',
        '6 3 6 4 7 4 8 4 8 5 2 7 5',
        '21 11',
        'V V',
        '2 6 3 6 2 7 2 8 3 8 2 7 1',
        '24 19',
        'V V',
        '9 8 2 7 9',
        '15 1',
        'V V',
        '2 2 3 2 2 3 0 4 1 4 2 4 0 5 0 6 1 6 2 8 9',
        '0 16',
        'H H',
        '0 1 0 2 0 3 0 4 0 5 0 6 1 6 2 6 2 7 2 9 9',
        '16 22',
        'V V',
        '3 6 4 6 5 6 6 6 6 7 6 8 6 9 5 10 6 10 2 8 15',
        '11 4',
        'V V',
        '9 0 10 0 10 1 10 2 10 3 10 4 10 5 3 6 4 6 5 6 6 6 7 6 8 6 9 6 10 6 2 9 3',
        '22 16',
        'V V',
        '3 8 4 8 5 8 2 8 1',
        '18 19',
        'H H',
        '8 7 2 10 3',
        '22 16',
        'H H',
        '4 7 4 8 4 9 2 9 7',
        '20 6',
        'H H',
        '2 3 2 4 2 5 2 6 2 7 2 8 2 9 2 9 15',
        '4 15',
        'V V',
        '0 2 1 2 2 2 3 2 4 2 5 2 6 2 7 2 8 2 9 2 0 3 0 4 0 5 0 6 1 6 2 10 13',
        '20 14',
        'V V',
        '6 6 7 6 8 6 9 6 6 7 6 8 6 9 1 10 2 10 3 10 4 10 5 10 6 10 2 9 3',
        '6 12',
        'H H',
        '4 3 4 4 4 5 2 10 9',
        '18 14',
        'V V',
        '9 4 10 4 10 5 10 6 10 7 7 8 8 8 9 8 10 8 2 10 3',
        '21 16',
        'H H',
        '2 7 2 8 2 9 2 11 3',
        '21 22',
        'V V',
        '3 10 4 10 5 10 2 11 1',
        '17 22',
        'V V',
        '5 8 2 9 5',
        '8 19',
        'V V',
        '7 4 8 4 8 5 8 6 9 6 2 11 1',
        '19 18',
        'H H',
        '8 7 2 12 3',
        '21 17',
        'H H',
        '4 7 4 8 4 9 2 12 7',
        '21 23',
        'H H',
        '2 9 6 9 2 10 3 10 4 10 5 10 6 10 2 12 7',
        '18 6',
        'V V',
        '3 4 4 4 4 5 4 6 5 6 6 6 7 6 2 10 7',
        '12 15',
        'H H',
        '4 5 0 6 1 6 2 6 3 6 4 6 0 7 2 13 1',
        '17 12',
        'V V',
        '5 6 2 11 11',
        '20 2',
        'V V',
        '4 2 5 2 4 3 2 4 3 4 4 4 2 5 2 6 2 7 1 8 2 8 2 11 7',
        '19 8',
        'H H',
        '8 3 8 4 8 5 8 6 9 6 10 6 10 7 2 9 19',
        '24 0',
        'H H',
        '2 0 3 0 4 0 5 0 6 0 7 0 8 0 9 0 10 0 2 1 10 1 10 2 10 3 10 4 10 5 10 6 10 7 10 8 10 9 2 11 9',
        '16 24',
        'V V',
        '3 6 4 6 5 6 6 6 6 7 6 8 7 8 8 8 9 8 2 8 7',
        '5 3',
        'H H',
        '6 1 2 2 3 2 4 2 5 2 6 2 2 3 2 13 7',
        '6 20',
        'H H',
        '2 3 2 4 2 5 2 6 2 7 2 8 2 9 2 10 9',
        '11 3',
        'H H',
        '6 1 6 2 6 3 2 4 3 4 4 4 5 4 6 4 2 5 2 13 11',
        '18 4',
        'H H',
        '10 1 10 2 10 3 10 4 10 5 10 6 8 7 10 7 8 8 9 8 10 8 2 14 11',
        '5 4',
        'V V',
        '2 0 3 0 4 0 5 0 6 0 7 0 8 0 9 0 2 1 1 2 2 2 2 13 3',
        '20 15',
        'H H',
        '0 7 0 8 0 9 2 12 7',
        '24 9',
        'V V',
        '8 4 9 4 8 5 8 6 8 7 8 8 9 8 2 14 15',
        '13 15',
        'V V',
        '7 6 8 6 8 7 1 8 2 8 3 8 4 8 8 8 4 9 8 9 4 10 5 10 6 10 7 10 8 10 2 13 5',
        '12 14',
        'V V',
        '5 4 6 4 7 4 8 4 9 4 2 15 3',
        '1 5',
        'H H',
        '2 1 2 2 2 3 2 13 7',
        '19 17',
        'V V',
        '6 6 7 6 8 6 9 6 6 7 5 8 6 8 2 14 5',
        '23 12',
        'V V',
        '5 6 6 6 6 7 6 8 7 8 2 14 7',
        '9 6',
        'V V',
        '3 2 4 2 5 2 6 2 7 2 8 2 9 2 2 14 13',
        '14 0',
        'H H',
        '0 1 0 2 0 3 0 4 1 4 2 4 3 4 4 4 5 4 6 4 7 4 8 4 8 5 2 15 9',
        '18 4',
        'V V',
        '8 2 9 2 8 3 8 4 8 5 8 6 8 7 7 8 8 8 2 15 5',
        '1 3',
        'H H',
        '4 1 6 1 4 2 5 2 6 2 2 15 17',
        '19 0',
        'V V',
        '1 0 2 0 3 0 4 0 5 0 6 0 7 0 8 0 9 0 10 0 10 1 10 2 10 3 10 4 10 5 9 6 10 6 2 16 11',
        '21 3',
        'V V',
        '6 2 7 2 6 3 6 4 6 5 6 6 6 7 3 8 4 8 5 8 6 8 2 15 7',
        '18 6',
        'V V',
        '3 4 4 4 4 5 4 6 5 6 6 6 7 6 2 16 5',
        '7 5',
        'H H',
        '2 2 3 2 4 2 2 3 4 3 2 16 13',
        '13 0',
        'V V',
        '1 0 2 0 3 0 4 0 5 0 6 0 7 0 8 0 8 1 8 2 8 3 7 4 8 4 2 17 5',
        '2 0',
        'H H',
        '2 0 3 0 4 0 2 1 4 1 2 17 11',
        '0 4',
        'H H',
        '0 1 8 1 0 2 1 2 2 2 3 2 4 2 5 2 6 2 7 2 8 2 2 16 1',
        '18 19',
        'H H',
        '8 7 2 18 5',
        '0 7',
        'V V',
        '1 2 2 2 3 2 4 2 5 2 2 17 5',
        '13 11',
        'H H',
        '4 4 5 4 6 4 4 5 6 5 2 15 1',
        '9 14',
        'V V',
        '9 4 2 18 9',
        '2 17',
        'V V',
        '5 0 6 0 6 1 6 2 6 3 6 4 6 5 5 6 6 6 2 19 9',
        '15 2',
        'H H',
        '4 1 4 2 4 3 4 4 4 5 2 6 3 6 4 6 2 7 2 17 9',
        '13 21',
        'H H',
        '8 5 8 6 8 7 4 8 5 8 6 8 7 8 8 8 4 9 2 19 9',
        '7 16',
        'H H',
        '6 3 6 4 6 5 6 6 4 7 6 7 4 8 5 8 6 8 ',
      ].join('\n'),
      turn: 0,
      maxTurn: 2,
    });

  const [visualizerResult, setVisualizerResult] = useState<VisualizerResult>({
    svgString1: '',
    svgString2: '',
    err: '',
    score: 0,
  });

  useEffect(() => {
    try {
      const maxTurn = getMaxTurn(visualizerSettingInfo.output);
      setVisualizerSettingInfo((prev) => ({
        ...prev,
        maxTurn,
        turn: 0,
      }));
    } catch (e) {
      // outputが不正な場合には計算ができない。そのときにはmaxTurnを0にする
      setVisualizerSettingInfo((prev) => ({
        ...prev,
        maxTurn: 0,
        turn: 0,
      }));
    }
  }, [visualizerSettingInfo.output, setVisualizerSettingInfo]);

  useEffect(() => {
    try {
      const ret = vis(visualizerSettingInfo.output, visualizerSettingInfo.turn);
      console.log(ret);
      setVisualizerResult({
        svgString1: ret.svg1,
        svgString2: ret.svg2,
        err: ret.err,
        score: Number(ret.score),
      });
    } catch (e) {
      // visが失敗した場合にはエラーを出力する
      console.log(e);
      let msg = '';
      if (e instanceof Error) {
        msg = e.message;
      }
      setVisualizerResult({
        svgString1: 'invalid input or output',
        svgString2: '',
        err: msg,
        score: 0,
      });
    }
  }, [visualizerSettingInfo.turn, visualizerSettingInfo.output]);

  return (
    <>
      <Description />
      <hr />
      <FileUploader setVisualizerSettingInfo={setVisualizerSettingInfo} />
      <InputOutput
        visualizerSettingInfo={visualizerSettingInfo}
        setVisualizerSettingInfo={setVisualizerSettingInfo}
      />
      <SaveButtons visualizerSettingInfo={visualizerSettingInfo} />
      <TurnSlider
        visualizerSettingInfo={visualizerSettingInfo}
        setVisualizerSettingInfo={setVisualizerSettingInfo}
      />
      <hr />
      <SvgViewer
        svgString1={visualizerResult.svgString1}
        svgString2={visualizerResult.svgString2}
        err={visualizerResult.err}
        score={visualizerResult.score}
      ></SvgViewer>
    </>
  );
};

export default AHCLikeVisualizer;
