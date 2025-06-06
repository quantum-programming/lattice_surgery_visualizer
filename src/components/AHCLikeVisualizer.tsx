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
        '10 10 2',
        '32 18',
        '2 2 0',
        '2 2 1',
        '2 4 0',
        '2 4 1',
        '2 6 0',
        '2 6 1',
        '2 8 0',
        '2 8 1',
        '4 2 0',
        '4 2 1',
        '4 4 0',
        '4 4 1',
        '4 6 0',
        '4 6 1',
        '4 8 0',
        '4 8 1',
        '6 2 0',
        '6 2 1',
        '6 4 0',
        '6 4 1',
        '6 6 0',
        '6 6 1',
        '6 8 0',
        '6 8 1',
        '8 2 0',
        '8 2 1',
        '8 4 0',
        '8 4 1',
        '8 6 0',
        '8 6 1',
        '8 8 0',
        '8 8 1',
        '0 0 0',
        '0 0 1',
        '0 2 0',
        '0 2 1',
        '0 4 0',
        '0 4 1',
        '0 6 0',
        '0 6 1',
        '0 8 0',
        '0 8 1',
        '2 0 0',
        '2 0 1',
        '4 0 0',
        '4 0 1',
        '6 0 0',
        '6 0 1',
        '8 0 0',
        '8 0 1',
        '97 13',
        '2',
        '43 1 ',
        '5',
        '2 2 0 1',
        '2 2 1 1',
        '1 2 1 1',
        '0 2 1 1',
        '0 2 2 1',
        '2',
        '19 4 ',
        '8',
        '0 6 4 1',
        '0 5 4 1',
        '0 5 5 1',
        '0 4 5 1',
        '0 3 5 1',
        '0 3 5 0',
        '0 2 5 0',
        '0 2 6 0',
        '2',
        '24 7 ',
        '14',
        '0 8 2 0',
        '0 7 2 0',
        '0 7 3 0',
        '0 7 4 0',
        '0 7 5 0',
        '0 7 6 0',
        '0 7 7 0',
        '0 6 7 0',
        '0 5 7 0',
        '0 4 7 0',
        '0 3 7 0',
        '0 2 7 0',
        '0 2 7 1',
        '0 2 8 1',
        '2',
        '17 1 ',
        '8',
        '0 6 2 1',
        '0 5 2 1',
        '0 5 3 1',
        '0 4 3 1',
        '0 3 3 1',
        '0 2 3 1',
        '1 2 3 1',
        '1 2 2 1',
        '2',
        '24 5 ',
        '15',
        '1 8 2 0',
        '1 7 2 0',
        '1 7 3 0',
        '1 6 3 0',
        '0 6 3 0',
        '0 5 3 0',
        '0 4 3 0',
        '0 3 3 0',
        '0 3 4 0',
        '0 3 4 1',
        '1 3 4 1',
        '1 3 5 1',
        '1 2 5 1',
        '0 2 5 1',
        '0 2 6 1',
        '2',
        '19 16 ',
        '9',
        '1 6 4 1',
        '1 7 4 1',
        '0 7 4 1',
        '0 7 3 1',
        '0 7 2 1',
        '0 7 1 1',
        '0 6 1 1',
        '0 6 1 0',
        '0 6 2 0',
        '2',
        '3 12 ',
        '10',
        '0 2 4 1',
        '0 1 4 1',
        '0 1 5 1',
        '0 1 5 0',
        '1 1 5 0',
        '1 2 5 0',
        '1 3 5 0',
        '1 4 5 0',
        '0 4 5 0',
        '0 4 6 0',
        '2',
        '21 14 ',
        '7',
        '0 6 6 1',
        '0 5 6 1',
        '0 5 7 1',
        '0 4 7 1',
        '1 4 7 1',
        '1 4 7 0',
        '1 4 8 0',
        '2',
        '16 17 ',
        '8',
        '1 6 2 0',
        '1 5 2 0',
        '0 5 2 0',
        '0 5 1 0',
        '0 5 1 1',
        '1 5 1 1',
        '1 6 1 1',
        '1 6 2 1',
        '2',
        '8 31 ',
        '14',
        '2 4 2 0',
        '2 5 2 0',
        '2 5 3 0',
        '1 5 3 0',
        '1 5 4 0',
        '0 5 4 0',
        '0 5 5 0',
        '0 6 5 0',
        '0 6 5 1',
        '0 7 5 1',
        '0 7 6 1',
        '0 7 7 1',
        '0 8 7 1',
        '0 8 8 1',
        '2',
        '14 11 ',
        '13',
        '2 4 8 0',
        '2 3 8 0',
        '1 3 8 0',
        '0 3 8 0',
        '0 3 8 1',
        '0 3 7 1',
        '0 3 6 1',
        '1 3 6 1',
        '2 3 6 1',
        '2 3 5 1',
        '2 4 5 1',
        '1 4 5 1',
        '1 4 4 1',
        '2',
        '5 17 ',
        '16',
        '1 2 6 1',
        '1 1 6 1',
        '1 1 5 1',
        '1 1 4 1',
        '1 1 4 0',
        '0 1 4 0',
        '0 1 3 0',
        '0 2 3 0',
        '1 2 3 0',
        '1 3 3 0',
        '1 3 3 1',
        '1 4 3 1',
        '1 5 3 1',
        '1 6 3 1',
        '2 6 3 1',
        '2 6 2 1',
        '2',
        '7 0 ',
        '17',
        '1 2 8 1',
        '1 1 8 1',
        '0 1 8 1',
        '0 1 8 0',
        '0 1 7 0',
        '0 1 6 0',
        '1 1 6 0',
        '2 1 6 0',
        '2 1 5 0',
        '2 1 4 0',
        '2 1 3 0',
        '1 1 3 0',
        '1 1 2 0',
        '0 1 2 0',
        '0 1 1 0',
        '0 2 1 0',
        '0 2 2 0',
        '2',
        '11 7 ',
        '15',
        '2 4 4 1',
        '2 5 4 1',
        '1 5 4 1',
        '1 5 5 1',
        '1 5 6 1',
        '1 5 7 1',
        '1 5 8 1',
        '0 5 8 1',
        '0 5 9 1',
        '0 4 9 1',
        '0 3 9 1',
        '0 2 9 1',
        '1 2 9 1',
        '2 2 9 1',
        '2 2 8 1',
        '2',
        '12 5 ',
        '7',
        '1 4 6 0',
        '1 3 6 0',
        '1 3 7 0',
        '1 2 7 0',
        '1 2 7 1',
        '2 2 7 1',
        '2 2 6 1',
        '2',
        '7 3 ',
        '8',
        '3 2 8 1',
        '3 1 8 1',
        '2 1 8 1',
        '2 1 7 1',
        '2 1 6 1',
        '2 1 5 1',
        '2 2 5 1',
        '2 2 4 1',
        '2',
        '30 19 ',
        '10',
        '0 8 8 0',
        '0 7 8 0',
        '0 7 8 1',
        '1 7 8 1',
        '1 7 7 1',
        '1 7 6 1',
        '1 7 5 1',
        '1 6 5 1',
        '2 6 5 1',
        '2 6 4 1',
        '2',
        '19 29 ',
        '8',
        '3 6 4 1',
        '3 7 4 1',
        '2 7 4 1',
        '2 7 5 1',
        '2 8 5 1',
        '1 8 5 1',
        '0 8 5 1',
        '0 8 6 1',
        '2',
        '17 21 ',
        '19',
        '3 6 2 1',
        '3 7 2 1',
        '2 7 2 1',
        '1 7 2 1',
        '1 7 3 1',
        '1 8 3 1',
        '0 8 3 1',
        '0 9 3 1',
        '0 9 4 1',
        '0 9 5 1',
        '0 9 6 1',
        '0 9 7 1',
        '1 9 7 1',
        '1 8 7 1',
        '2 8 7 1',
        '2 7 7 1',
        '2 6 7 1',
        '1 6 7 1',
        '1 6 6 1',
        '2',
        '11 2 ',
        '7',
        '3 4 4 1',
        '3 3 4 1',
        '2 3 4 1',
        '2 3 4 0',
        '2 3 3 0',
        '2 2 3 0',
        '2 2 4 0',
        '2',
        '1 17 ',
        '13',
        '2 2 2 1',
        '2 3 2 1',
        '1 3 2 1',
        '0 3 2 1',
        '0 3 1 1',
        '0 4 1 1',
        '1 4 1 1',
        '2 4 1 1',
        '2 5 1 1',
        '2 6 1 1',
        '3 6 1 1',
        '4 6 1 1',
        '4 6 2 1',
        '2',
        '3 5 ',
        '5',
        '3 2 4 1',
        '3 1 4 1',
        '3 1 5 1',
        '3 2 5 1',
        '3 2 6 1',
        '2',
        '12 20 ',
        '6',
        '2 4 6 0',
        '2 5 6 0',
        '1 5 6 0',
        '1 5 5 0',
        '1 6 5 0',
        '1 6 6 0',
        '2',
        '8 2 ',
        '5',
        '3 4 2 0',
        '3 3 2 0',
        '3 3 3 0',
        '3 2 3 0',
        '3 2 4 0',
        '2',
        '4 22 ',
        '8',
        '2 2 6 0',
        '2 3 6 0',
        '2 3 7 0',
        '2 4 7 0',
        '2 5 7 0',
        '1 5 7 0',
        '1 6 7 0',
        '1 6 8 0',
        '2',
        '2 14 ',
        '18',
        '4 2 4 0',
        '4 1 4 0',
        '3 1 4 0',
        '3 1 5 0',
        '3 1 6 0',
        '3 1 7 0',
        '2 1 7 0',
        '1 1 7 0',
        '1 1 8 0',
        '1 1 9 0',
        '0 1 9 0',
        '0 2 9 0',
        '0 3 9 0',
        '0 4 9 0',
        '1 4 9 0',
        '2 4 9 0',
        '3 4 9 0',
        '3 4 8 0',
        '2',
        '2 22 ',
        '16',
        '5 2 4 0',
        '5 3 4 0',
        '4 3 4 0',
        '3 3 4 0',
        '3 3 5 0',
        '2 3 5 0',
        '2 4 5 0',
        '2 5 5 0',
        '2 6 5 0',
        '2 7 5 0',
        '1 7 5 0',
        '1 7 6 0',
        '1 7 7 0',
        '2 7 7 0',
        '2 6 7 0',
        '2 6 8 0',
        '2',
        '13 11 ',
        '7',
        '2 4 6 1',
        '2 5 6 1',
        '2 5 5 1',
        '3 5 5 1',
        '3 4 5 1',
        '4 4 5 1',
        '4 4 4 1',
        '2',
        '14 9 ',
        '29',
        '4 4 8 0',
        '4 5 8 0',
        '3 5 8 0',
        '2 5 8 0',
        '1 5 8 0',
        '0 5 8 0',
        '0 5 9 0',
        '0 6 9 0',
        '0 7 9 0',
        '0 8 9 0',
        '0 9 9 0',
        '0 9 8 0',
        '0 9 7 0',
        '0 9 6 0',
        '0 9 5 0',
        '0 9 4 0',
        '0 9 3 0',
        '0 9 2 0',
        '0 9 1 0',
        '0 8 1 0',
        '0 7 1 0',
        '1 7 1 0',
        '1 6 1 0',
        '1 5 1 0',
        '1 4 1 0',
        '2 4 1 0',
        '3 4 1 0',
        '3 4 1 1',
        '3 4 2 1',
        '2',
        '3 18 ',
        '12',
        '4 2 4 1',
        '4 3 4 1',
        '4 3 3 1',
        '3 3 3 1',
        '2 3 3 1',
        '2 4 3 1',
        '2 4 3 0',
        '3 4 3 0',
        '3 5 3 0',
        '3 6 3 0',
        '2 6 3 0',
        '2 6 4 0',
        '2',
        '17 7 ',
        '34',
        '5 6 2 1',
        '5 7 2 1',
        '4 7 2 1',
        '4 7 1 1',
        '3 7 1 1',
        '2 7 1 1',
        '1 7 1 1',
        '1 8 1 1',
        '0 8 1 1',
        '0 9 1 1',
        '0 9 2 1',
        '1 9 2 1',
        '1 9 3 1',
        '1 9 4 1',
        '1 9 5 1',
        '1 9 6 1',
        '2 9 6 1',
        '2 9 7 1',
        '2 9 8 1',
        '1 9 8 1',
        '0 9 8 1',
        '0 9 9 1',
        '0 8 9 1',
        '0 7 9 1',
        '0 6 9 1',
        '1 6 9 1',
        '1 5 9 1',
        '1 4 9 1',
        '1 3 9 1',
        '2 3 9 1',
        '3 3 9 1',
        '3 2 9 1',
        '4 2 9 1',
        '4 2 8 1',
        '2',
        '10 21 ',
        '7',
        '2 4 4 0',
        '2 5 4 0',
        '3 5 4 0',
        '3 5 5 0',
        '3 6 5 0',
        '3 6 5 1',
        '3 6 6 1',
        '2',
        '17 8 ',
        '10',
        '6 6 2 1',
        '6 5 2 1',
        '5 5 2 1',
        '4 5 2 1',
        '3 5 2 1',
        '3 5 1 1',
        '3 5 1 0',
        '4 5 1 0',
        '4 4 1 0',
        '4 4 2 0',
        '2',
        '3 10 ',
        '8',
        '5 2 4 1',
        '5 3 4 1',
        '5 3 5 1',
        '4 3 5 1',
        '4 3 5 0',
        '4 4 5 0',
        '3 4 5 0',
        '3 4 4 0',
        '2',
        '19 22 ',
        '21',
        '4 6 4 1',
        '4 7 4 1',
        '4 7 4 0',
        '3 7 4 0',
        '2 7 4 0',
        '2 7 3 0',
        '2 8 3 0',
        '1 8 3 0',
        '1 9 3 0',
        '1 9 4 0',
        '1 9 5 0',
        '1 9 6 0',
        '1 9 7 0',
        '1 9 8 0',
        '1 9 9 0',
        '1 8 9 0',
        '1 7 9 0',
        '1 6 9 0',
        '2 6 9 0',
        '3 6 9 0',
        '3 6 8 0',
        '2',
        '15 12 ',
        '8',
        '1 4 8 1',
        '1 3 8 1',
        '1 3 7 1',
        '2 3 7 1',
        '2 4 7 1',
        '3 4 7 1',
        '3 4 7 0',
        '3 4 6 0',
        '2',
        '9 12 ',
        '28',
        '4 4 2 1',
        '4 3 2 1',
        '3 3 2 1',
        '3 3 1 1',
        '2 3 1 1',
        '1 3 1 1',
        '1 3 1 0',
        '1 2 1 0',
        '1 1 1 0',
        '1 1 1 1',
        '0 1 1 1',
        '0 1 2 1',
        '0 1 3 1',
        '1 1 3 1',
        '2 1 3 1',
        '3 1 3 1',
        '4 1 3 1',
        '4 1 4 1',
        '4 1 5 1',
        '4 1 6 1',
        '3 1 6 1',
        '3 1 7 1',
        '3 2 7 1',
        '3 2 7 0',
        '3 3 7 0',
        '4 3 7 0',
        '4 4 7 0',
        '4 4 6 0',
        '2',
        '16 1 ',
        '15',
        '2 6 2 0',
        '2 7 2 0',
        '3 7 2 0',
        '3 7 3 0',
        '3 7 3 1',
        '3 6 3 1',
        '3 5 3 1',
        '3 4 3 1',
        '4 4 3 1',
        '5 4 3 1',
        '5 3 3 1',
        '5 2 3 1',
        '4 2 3 1',
        '3 2 3 1',
        '3 2 2 1',
        '2',
        '5 4 ',
        '6',
        '4 2 6 1',
        '4 3 6 1',
        '4 3 7 1',
        '4 2 7 1',
        '4 2 7 0',
        '4 2 6 0',
        '2',
        '10 24 ',
        '8',
        '4 4 4 0',
        '4 5 4 0',
        '4 5 3 0',
        '4 6 3 0',
        '4 7 3 0',
        '4 8 3 0',
        '3 8 3 0',
        '3 8 2 0',
        '2',
        '10 4 ',
        '6',
        '6 4 4 0',
        '6 3 4 0',
        '6 3 5 0',
        '5 3 5 0',
        '5 2 5 0',
        '5 2 6 0',
        '2',
        '7 14 ',
        '10',
        '5 2 8 1',
        '5 3 8 1',
        '4 3 8 1',
        '3 3 8 1',
        '3 3 8 0',
        '3 3 9 0',
        '4 3 9 0',
        '4 4 9 0',
        '5 4 9 0',
        '5 4 8 0',
        '2',
        '21 11 ',
        '6',
        '4 6 6 1',
        '4 5 6 1',
        '4 5 5 1',
        '5 5 5 1',
        '5 4 5 1',
        '5 4 4 1',
        '2',
        '24 19 ',
        '13',
        '4 8 2 0',
        '4 9 2 0',
        '3 9 2 0',
        '2 9 2 0',
        '2 9 3 0',
        '2 9 3 1',
        '2 8 3 1',
        '3 8 3 1',
        '4 8 3 1',
        '4 7 3 1',
        '4 6 3 1',
        '5 6 3 1',
        '5 6 4 1',
        '2',
        '15 1 ',
        '39',
        '2 4 8 1',
        '2 5 8 1',
        '2 5 9 1',
        '2 6 9 1',
        '2 7 9 1',
        '1 7 9 1',
        '1 8 9 1',
        '1 9 9 1',
        '2 9 9 1',
        '2 9 9 0',
        '2 9 8 0',
        '2 9 7 0',
        '2 9 6 0',
        '2 9 5 0',
        '2 9 4 0',
        '2 9 4 1',
        '3 9 4 1',
        '3 9 3 1',
        '3 9 2 1',
        '2 9 2 1',
        '2 9 1 1',
        '1 9 1 1',
        '1 9 1 0',
        '1 8 1 0',
        '2 8 1 0',
        '2 7 1 0',
        '2 6 1 0',
        '3 6 1 0',
        '4 6 1 0',
        '5 6 1 0',
        '5 5 1 0',
        '5 4 1 0',
        '5 3 1 0',
        '4 3 1 0',
        '3 3 1 0',
        '3 2 1 0',
        '3 2 1 1',
        '4 2 1 1',
        '4 2 2 1',
        '2',
        '0 16 ',
        '8',
        '4 2 2 0',
        '4 3 2 0',
        '4 3 3 0',
        '4 4 3 0',
        '5 4 3 0',
        '5 5 3 0',
        '5 6 3 0',
        '5 6 2 0',
        '2',
        '16 22 ',
        '13',
        '6 6 2 0',
        '6 7 2 0',
        '5 7 2 0',
        '5 7 3 0',
        '5 7 4 0',
        '5 7 5 0',
        '4 7 5 0',
        '3 7 5 0',
        '3 7 6 0',
        '3 7 7 0',
        '3 6 7 0',
        '4 6 7 0',
        '4 6 8 0',
        '2',
        '11 4 ',
        '14',
        '6 4 4 1',
        '6 5 4 1',
        '5 5 4 1',
        '5 5 4 0',
        '5 5 5 0',
        '4 5 5 0',
        '4 5 6 0',
        '4 5 7 0',
        '5 5 7 0',
        '5 4 7 0',
        '5 3 7 0',
        '5 2 7 0',
        '6 2 7 0',
        '6 2 6 0',
        '2',
        '22 16 ',
        '27',
        '5 6 8 0',
        '5 7 8 0',
        '4 7 8 0',
        '3 7 8 0',
        '3 7 8 1',
        '3 7 7 1',
        '3 7 6 1',
        '3 7 5 1',
        '3 8 5 1',
        '3 8 5 0',
        '3 9 5 0',
        '3 9 4 0',
        '3 9 3 0',
        '4 9 3 0',
        '5 9 3 0',
        '5 9 2 0',
        '5 9 1 0',
        '4 9 1 0',
        '3 9 1 0',
        '3 8 1 0',
        '3 7 1 0',
        '4 7 1 0',
        '5 7 1 0',
        '6 7 1 0',
        '6 6 1 0',
        '7 6 1 0',
        '7 6 2 0',
        '2',
        '18 19 ',
        '8',
        '6 6 4 0',
        '6 7 4 0',
        '6 7 4 1',
        '5 7 4 1',
        '5 7 5 1',
        '5 6 5 1',
        '6 6 5 1',
        '6 6 4 1',
        '2',
        '22 16 ',
        '27',
        '6 6 8 0',
        '6 5 8 0',
        '5 5 8 0',
        '5 5 8 1',
        '4 5 8 1',
        '3 5 8 1',
        '3 5 7 1',
        '3 6 7 1',
        '4 6 7 1',
        '4 7 7 1',
        '4 8 7 1',
        '3 8 7 1',
        '3 9 7 1',
        '3 9 6 1',
        '3 9 5 1',
        '4 9 5 1',
        '4 9 4 1',
        '4 9 3 1',
        '5 9 3 1',
        '5 8 3 1',
        '5 8 3 0',
        '6 8 3 0',
        '6 7 3 0',
        '6 6 3 0',
        '7 6 3 0',
        '8 6 3 0',
        '8 6 2 0',
        '2',
        '20 6 ',
        '24',
        '4 6 6 0',
        '4 7 6 0',
        '4 7 7 0',
        '4 8 7 0',
        '3 8 7 0',
        '3 9 7 0',
        '3 9 8 0',
        '3 9 9 0',
        '3 8 9 0',
        '3 8 9 1',
        '3 7 9 1',
        '3 6 9 1',
        '3 5 9 1',
        '3 4 9 1',
        '4 4 9 1',
        '4 3 9 1',
        '5 3 9 1',
        '5 2 9 1',
        '5 2 9 0',
        '4 2 9 0',
        '3 2 9 0',
        '2 2 9 0',
        '1 2 9 0',
        '1 2 8 0',
        '2',
        '4 28 ',
        '13',
        '7 2 6 0',
        '7 3 6 0',
        '6 3 6 0',
        '5 3 6 0',
        '5 3 6 1',
        '5 3 7 1',
        '5 4 7 1',
        '5 5 7 1',
        '5 6 7 1',
        '5 7 7 1',
        '5 8 7 1',
        '5 8 7 0',
        '5 8 6 0',
        '2',
        '20 14 ',
        '6',
        '5 6 6 0',
        '5 5 6 0',
        '6 5 6 0',
        '6 5 7 0',
        '6 4 7 0',
        '6 4 8 0',
        '2',
        '6 12 ',
        '8',
        '4 2 8 0',
        '4 3 8 0',
        '5 3 8 0',
        '6 3 8 0',
        '6 3 7 0',
        '7 3 7 0',
        '7 4 7 0',
        '7 4 6 0',
        '2',
        '18 14 ',
        '21',
        '7 6 4 0',
        '7 7 4 0',
        '7 7 5 0',
        '6 7 5 0',
        '6 8 5 0',
        '5 8 5 0',
        '4 8 5 0',
        '4 9 5 0',
        '4 9 6 0',
        '4 9 7 0',
        '4 9 8 0',
        '4 9 9 0',
        '4 8 9 0',
        '4 7 9 0',
        '4 6 9 0',
        '4 5 9 0',
        '5 5 9 0',
        '6 5 9 0',
        '6 4 9 0',
        '7 4 9 0',
        '7 4 8 0',
        '2',
        '8 19 ',
        '8',
        '5 4 2 0',
        '5 5 2 0',
        '6 5 2 0',
        '6 5 3 0',
        '6 5 3 1',
        '6 6 3 1',
        '7 6 3 1',
        '7 6 4 1',
        '2',
        '19 18 ',
        '10',
        '8 6 4 1',
        '8 5 4 1',
        '7 5 4 1',
        '7 5 5 1',
        '6 5 5 1',
        '6 5 5 0',
        '6 6 5 0',
        '7 6 5 0',
        '8 6 5 0',
        '8 6 4 0',
        '2',
        '21 17 ',
        '21',
        '5 6 6 1',
        '5 7 6 1',
        '6 7 6 1',
        '6 7 5 1',
        '6 8 5 1',
        '5 8 5 1',
        '5 9 5 1',
        '5 9 4 1',
        '6 9 4 1',
        '6 9 3 1',
        '6 9 2 1',
        '5 9 2 1',
        '4 9 2 1',
        '4 9 1 1',
        '4 8 1 1',
        '5 8 1 1',
        '5 7 1 1',
        '5 6 1 1',
        '6 6 1 1',
        '7 6 1 1',
        '7 6 2 1',
        '2',
        '21 23 ',
        '5',
        '6 6 6 1',
        '6 5 6 1',
        '6 5 7 1',
        '6 6 7 1',
        '6 6 8 1',
        '2',
        '18 6 ',
        '22',
        '9 6 4 0',
        '9 5 4 0',
        '8 5 4 0',
        '7 5 4 0',
        '7 5 3 0',
        '7 4 3 0',
        '6 4 3 0',
        '6 3 3 0',
        '5 3 3 0',
        '5 2 3 0',
        '5 1 3 0',
        '5 1 4 0',
        '5 1 5 0',
        '4 1 5 0',
        '4 1 6 0',
        '4 1 7 0',
        '4 1 8 0',
        '4 1 9 0',
        '5 1 9 0',
        '6 1 9 0',
        '6 2 9 0',
        '6 2 8 0',
        '2',
        '12 15 ',
        '8',
        '8 4 6 0',
        '8 3 6 0',
        '8 3 6 1',
        '7 3 6 1',
        '6 3 6 1',
        '6 3 7 1',
        '6 4 7 1',
        '6 4 8 1',
        '2',
        '17 12 ',
        '25',
        '8 6 2 1',
        '8 5 2 1',
        '7 5 2 1',
        '7 5 1 1',
        '6 5 1 1',
        '5 5 1 1',
        '4 5 1 1',
        '4 4 1 1',
        '4 3 1 1',
        '5 3 1 1',
        '5 2 1 1',
        '5 1 1 1',
        '5 1 2 1',
        '5 1 3 1',
        '5 1 4 1',
        '5 1 5 1',
        '5 2 5 1',
        '6 2 5 1',
        '6 3 5 1',
        '6 4 5 1',
        '6 4 5 0',
        '7 4 5 0',
        '8 4 5 0',
        '9 4 5 0',
        '9 4 6 0',
        '2',
        '20 2 ',
        '27',
        '6 6 6 0',
        '6 7 6 0',
        '6 7 7 0',
        '6 7 8 0',
        '6 7 8 1',
        '5 7 8 1',
        '4 7 8 1',
        '4 7 9 1',
        '4 6 9 1',
        '4 5 9 1',
        '5 5 9 1',
        '5 4 9 1',
        '6 4 9 1',
        '6 3 9 1',
        '6 2 9 1',
        '6 1 9 1',
        '5 1 9 1',
        '4 1 9 1',
        '4 1 8 1',
        '4 1 7 1',
        '5 1 7 1',
        '5 1 6 1',
        '5 1 6 0',
        '6 1 6 0',
        '6 1 5 0',
        '6 2 5 0',
        '6 2 4 0',
        '2',
        '19 8 ',
        '17',
        '9 6 4 1',
        '9 7 4 1',
        '8 7 4 1',
        '7 7 4 1',
        '7 7 3 1',
        '6 7 3 1',
        '6 7 2 1',
        '6 7 1 1',
        '7 7 1 1',
        '7 7 1 0',
        '8 7 1 0',
        '8 6 1 0',
        '8 5 1 0',
        '7 5 1 0',
        '6 5 1 0',
        '6 4 1 0',
        '6 4 2 0',
        '2',
        '24 0 ',
        '18',
        '6 8 2 0',
        '6 9 2 0',
        '6 9 1 0',
        '6 8 1 0',
        '6 8 1 1',
        '7 8 1 1',
        '8 8 1 1',
        '8 7 1 1',
        '8 6 1 1',
        '8 5 1 1',
        '8 4 1 1',
        '7 4 1 1',
        '6 4 1 1',
        '6 3 1 1',
        '6 3 1 0',
        '6 2 1 0',
        '5 2 1 0',
        '5 2 2 0',
        '2',
        '16 24 ',
        '7',
        '9 6 2 0',
        '9 7 2 0',
        '8 7 2 0',
        '7 7 2 0',
        '7 7 3 0',
        '7 8 3 0',
        '7 8 2 0',
        '2',
        '5 3 ',
        '6',
        '6 2 6 1',
        '6 1 6 1',
        '6 1 5 1',
        '7 1 5 1',
        '7 2 5 1',
        '7 2 4 1',
        '2',
        '27 20 ',
        '14',
        '7 8 4 1',
        '7 9 4 1',
        '7 9 4 0',
        '6 9 4 0',
        '5 9 4 0',
        '5 9 5 0',
        '5 9 6 0',
        '5 9 7 0',
        '6 9 7 0',
        '6 8 7 0',
        '7 8 7 0',
        '7 7 7 0',
        '7 6 7 0',
        '7 6 6 0',
        '2',
        '11 3 ',
        '8',
        '7 4 4 1',
        '7 3 4 1',
        '6 3 4 1',
        '6 3 3 1',
        '6 2 3 1',
        '7 2 3 1',
        '8 2 3 1',
        '8 2 4 1',
        '2',
        '18 4 ',
        '17',
        '10 6 4 0',
        '10 7 4 0',
        '9 7 4 0',
        '8 7 4 0',
        '8 7 5 0',
        '8 7 6 0',
        '7 7 6 0',
        '7 7 6 1',
        '7 7 7 1',
        '7 6 7 1',
        '7 5 7 1',
        '7 4 7 1',
        '7 3 7 1',
        '7 2 7 1',
        '7 2 7 0',
        '8 2 7 0',
        '8 2 6 0',
        '2',
        '5 4 ',
        '8',
        '7 2 6 1',
        '7 1 6 1',
        '7 1 6 0',
        '7 1 5 0',
        '7 2 5 0',
        '8 2 5 0',
        '9 2 5 0',
        '9 2 6 0',
        '2',
        '20 15 ',
        '9',
        '8 6 6 0',
        '8 5 6 0',
        '7 5 6 0',
        '7 5 7 0',
        '7 5 8 0',
        '7 5 8 1',
        '7 5 9 1',
        '7 4 9 1',
        '7 4 8 1',
        '2',
        '24 9 ',
        '14',
        '8 8 2 0',
        '8 9 2 0',
        '7 9 2 0',
        '7 9 3 0',
        '7 9 3 1',
        '7 8 3 1',
        '8 8 3 1',
        '8 7 3 1',
        '8 6 3 1',
        '8 5 3 1',
        '7 5 3 1',
        '7 4 3 1',
        '6 4 3 1',
        '6 4 2 1',
        '2',
        '13 15 ',
        '6',
        '7 4 6 1',
        '7 5 6 1',
        '8 5 6 1',
        '8 5 7 1',
        '8 4 7 1',
        '8 4 8 1',
        '2',
        '12 14 ',
        '7',
        '10 4 6 0',
        '10 3 6 0',
        '9 3 6 0',
        '9 3 7 0',
        '8 3 7 0',
        '8 4 7 0',
        '8 4 8 0',
        '2',
        '1 5 ',
        '9',
        '6 2 2 1',
        '6 1 2 1',
        '6 1 3 1',
        '6 1 4 1',
        '7 1 4 1',
        '8 1 4 1',
        '8 1 5 1',
        '8 2 5 1',
        '8 2 6 1',
        '2',
        '19 17 ',
        '6',
        '10 6 4 1',
        '10 5 4 1',
        '9 5 4 1',
        '9 5 3 1',
        '9 6 3 1',
        '9 6 2 1',
        '2',
        '23 12 ',
        '9',
        '8 6 8 1',
        '8 5 8 1',
        '8 5 8 0',
        '8 5 7 0',
        '9 5 7 0',
        '9 4 7 0',
        '10 4 7 0',
        '11 4 7 0',
        '11 4 6 0',
        '2',
        '9 6 ',
        '18',
        '7 4 2 1',
        '7 3 2 1',
        '7 3 2 0',
        '7 3 3 0',
        '7 2 3 0',
        '6 2 3 0',
        '6 1 3 0',
        '6 1 4 0',
        '7 1 4 0',
        '8 1 4 0',
        '8 1 5 0',
        '8 1 6 0',
        '8 1 7 0',
        '7 1 7 0',
        '7 1 8 0',
        '7 1 9 0',
        '7 2 9 0',
        '7 2 8 0',
        '2',
        '14 0 ',
        '16',
        '9 4 8 0',
        '9 3 8 0',
        '8 3 8 0',
        '8 3 8 1',
        '8 3 7 1',
        '9 3 7 1',
        '9 3 6 1',
        '9 3 5 1',
        '8 3 5 1',
        '7 3 5 1',
        '7 3 5 0',
        '7 3 4 0',
        '8 3 4 0',
        '8 3 3 0',
        '8 2 3 0',
        '8 2 2 0',
        '2',
        '18 4 ',
        '8',
        '11 6 4 0',
        '11 5 4 0',
        '10 5 4 0',
        '10 5 5 0',
        '10 4 5 0',
        '10 3 5 0',
        '10 2 5 0',
        '10 2 6 0',
        '2',
        '1 3 ',
        '7',
        '7 2 2 1',
        '7 1 2 1',
        '7 1 3 1',
        '8 1 3 1',
        '9 1 3 1',
        '9 2 3 1',
        '9 2 4 1',
        '2',
        '19 0 ',
        '18',
        '11 6 4 1',
        '11 7 4 1',
        '10 7 4 1',
        '10 7 3 1',
        '9 7 3 1',
        '9 7 3 0',
        '9 6 3 0',
        '9 5 3 0',
        '9 5 2 0',
        '9 5 1 0',
        '9 4 1 0',
        '8 4 1 0',
        '7 4 1 0',
        '7 3 1 0',
        '7 2 1 0',
        '8 2 1 0',
        '9 2 1 0',
        '9 2 2 0',
        '2',
        '26 3 ',
        '16',
        '8 8 4 0',
        '8 9 4 0',
        '8 9 5 0',
        '7 9 5 0',
        '7 9 5 1',
        '7 8 5 1',
        '7 7 5 1',
        '7 6 5 1',
        '8 6 5 1',
        '8 5 5 1',
        '8 4 5 1',
        '9 4 5 1',
        '10 4 5 1',
        '10 3 5 1',
        '10 2 5 1',
        '10 2 4 1',
        '2',
        '18 6 ',
        '31',
        '12 6 4 0',
        '12 7 4 0',
        '11 7 4 0',
        '11 7 5 0',
        '10 7 5 0',
        '9 7 5 0',
        '9 8 5 0',
        '8 8 5 0',
        '8 8 5 1',
        '8 9 5 1',
        '8 9 6 1',
        '7 9 6 1',
        '6 9 6 1',
        '5 9 6 1',
        '4 9 6 1',
        '4 9 7 1',
        '4 9 8 1',
        '4 9 9 1',
        '4 8 9 1',
        '5 8 9 1',
        '5 7 9 1',
        '5 7 9 0',
        '5 6 9 0',
        '6 6 9 0',
        '7 6 9 0',
        '7 5 9 0',
        '8 5 9 0',
        '8 4 9 0',
        '8 3 9 0',
        '8 2 9 0',
        '8 2 8 0',
        '2',
        '7 5 ',
        '8',
        '6 2 8 1',
        '6 1 8 1',
        '6 1 7 1',
        '7 1 7 1',
        '8 1 7 1',
        '8 2 7 1',
        '9 2 7 1',
        '9 2 6 1',
        '2',
        '13 0 ',
        '12',
        '10 4 6 1',
        '10 3 6 1',
        '11 3 6 1',
        '11 3 5 1',
        '11 3 4 1',
        '10 3 4 1',
        '9 3 4 1',
        '9 3 3 1',
        '9 3 3 0',
        '9 2 3 0',
        '10 2 3 0',
        '10 2 2 0',
        '2',
        '2 0 ',
        '13',
        '9 2 4 0',
        '9 1 4 0',
        '9 1 3 0',
        '8 1 3 0',
        '7 1 3 0',
        '7 1 2 0',
        '7 1 1 0',
        '8 1 1 0',
        '9 1 1 0',
        '10 1 1 0',
        '10 2 1 0',
        '11 2 1 0',
        '11 2 2 0',
        '2',
        '0 4 ',
        '16',
        '12 2 2 0',
        '12 1 2 0',
        '11 1 2 0',
        '10 1 2 0',
        '10 1 2 1',
        '10 1 3 1',
        '10 1 4 1',
        '9 1 4 1',
        '9 1 5 1',
        '9 1 6 1',
        '9 1 7 1',
        '9 1 7 0',
        '9 2 7 0',
        '10 2 7 0',
        '11 2 7 0',
        '11 2 6 0',
        '2',
        '18 24 ',
        '11',
        '13 6 4 0',
        '13 5 4 0',
        '12 5 4 0',
        '12 5 3 0',
        '11 5 3 0',
        '10 5 3 0',
        '10 6 3 0',
        '10 7 3 0',
        '10 8 3 0',
        '9 8 3 0',
        '9 8 2 0',
        '2',
        '0 7 ',
        '42',
        '13 2 2 0',
        '13 3 2 0',
        '12 3 2 0',
        '11 3 2 0',
        '10 3 2 0',
        '9 3 2 0',
        '8 3 2 0',
        '8 3 1 0',
        '8 3 1 1',
        '9 3 1 1',
        '9 4 1 1',
        '9 5 1 1',
        '9 6 1 1',
        '9 7 1 1',
        '9 8 1 1',
        '9 9 1 1',
        '8 9 1 1',
        '8 9 2 1',
        '8 9 3 1',
        '8 9 4 1',
        '9 9 4 1',
        '9 9 5 1',
        '9 9 6 1',
        '9 9 7 1',
        '8 9 7 1',
        '7 9 7 1',
        '6 9 7 1',
        '5 9 7 1',
        '5 9 8 1',
        '5 9 9 1',
        '6 9 9 1',
        '6 8 9 1',
        '6 7 9 1',
        '6 6 9 1',
        '7 6 9 1',
        '8 6 9 1',
        '8 5 9 1',
        '8 4 9 1',
        '8 3 9 1',
        '7 3 9 1',
        '7 2 9 1',
        '7 2 8 1',
        '2',
        '13 11 ',
        '5',
        '11 4 6 1',
        '11 5 6 1',
        '11 5 5 1',
        '11 4 5 1',
        '11 4 4 1',
        '2',
        '9 14 ',
        '33',
        '9 4 2 1',
        '9 5 2 1',
        '10 5 2 1',
        '10 5 1 1',
        '10 6 1 1',
        '10 6 1 0',
        '9 6 1 0',
        '9 7 1 0',
        '9 8 1 0',
        '9 9 1 0',
        '9 9 2 0',
        '9 9 3 0',
        '9 9 4 0',
        '9 9 5 0',
        '9 9 6 0',
        '8 9 6 0',
        '7 9 6 0',
        '7 9 7 0',
        '7 9 8 0',
        '6 9 8 0',
        '5 9 8 0',
        '5 9 9 0',
        '5 8 9 0',
        '6 8 9 0',
        '6 7 9 0',
        '7 7 9 0',
        '8 7 9 0',
        '8 6 9 0',
        '9 6 9 0',
        '9 5 9 0',
        '9 4 9 0',
        '10 4 9 0',
        '10 4 8 0',
        '2',
        '2 17 ',
        '8',
        '10 2 4 0',
        '10 3 4 0',
        '10 3 3 0',
        '10 4 3 0',
        '10 4 3 1',
        '10 5 3 1',
        '10 6 3 1',
        '10 6 2 1',
        '2',
        '15 2 ',
        '16',
        '9 4 8 1',
        '9 3 8 1',
        '9 3 9 1',
        '9 2 9 1',
        '8 2 9 1',
        '8 1 9 1',
        '8 1 8 1',
        '8 1 8 0',
        '9 1 8 0',
        '10 1 8 0',
        '10 1 7 0',
        '10 1 6 0',
        '10 1 5 0',
        '11 1 5 0',
        '11 2 5 0',
        '11 2 4 0',
        '2',
        '13 25 ',
        '20',
        '12 4 6 1',
        '12 5 6 1',
        '12 5 7 1',
        '11 5 7 1',
        '10 5 7 1',
        '9 5 7 1',
        '9 6 7 1',
        '8 6 7 1',
        '8 7 7 1',
        '8 7 6 1',
        '8 7 5 1',
        '9 7 5 1',
        '9 8 5 1',
        '10 8 5 1',
        '10 9 5 1',
        '10 9 4 1',
        '10 9 3 1',
        '9 9 3 1',
        '9 8 3 1',
        '9 8 2 1',
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
      console.log('Error in getMaxTurn');
      console.log(e);
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
      console.log('Error in vis');
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
