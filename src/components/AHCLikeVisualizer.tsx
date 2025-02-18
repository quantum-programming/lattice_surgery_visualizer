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
        '8 6 1',
        '6 6 0',
        '6 8 1',
        '4 6 0',
        '8 2 0',
        '2 6 0',
        '2 8 0',
        '2 4 1',
        '6 2 1',
        '6 8 0',
        '8 6 0',
        '2 8 1',
        '2 6 1',
        '8 4 1',
        '4 8 0',
        '4 8 1',
        '2 4 0',
        '8 2 1',
        '4 4 1',
        '4 2 0',
        '8 8 0',
        '4 4 0',
        '6 4 1',
        '6 2 0',
        '8 8 1',
        '2 2 1',
        '2 2 0',
        '4 6 1',
        '8 4 0',
        '4 2 1',
        '6 6 1',
        '6 4 0',
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
        '96',
        '1',
        '2',
        '19 4 ',
        'H V ',
        '9',
        '4 2 0',
        '5 2 0',
        '5 1 0',
        '5 1 1',
        '6 1 1',
        '6 1 0',
        '7 1 0',
        '8 1 0',
        '8 2 0',
        '1',
        '2',
        '24 7 ',
        'H V ',
        '13',
        '8 8 1',
        '7 8 1',
        '7 7 1',
        '6 7 1',
        '5 7 1',
        '5 6 1',
        '5 5 1',
        '5 5 0',
        '4 5 0',
        '4 5 1',
        '3 5 1',
        '2 5 1',
        '2 4 1',
        '1',
        '2',
        '17 1 ',
        'H V ',
        '8',
        '8 2 1',
        '7 2 1',
        '7 2 0',
        '7 3 0',
        '7 4 0',
        '7 5 0',
        '6 5 0',
        '6 6 0',
        '2',
        '2',
        '24 5 ',
        'H V ',
        '10',
        '8 8 1',
        '7 8 1',
        '7 8 0',
        '7 7 0',
        '6 7 0',
        '5 7 0',
        '4 7 0',
        '3 7 0',
        '2 7 0',
        '2 6 0',
        '2',
        '2',
        '19 16 ',
        'H V ',
        '9',
        '4 2 0',
        '5 2 0',
        '5 3 0',
        '5 3 1',
        '4 3 1',
        '4 3 0',
        '3 3 0',
        '2 3 0',
        '2 4 0',
        '1',
        '2',
        '3 12 ',
        'H V ',
        '6',
        '4 6 0',
        '3 6 0',
        '3 6 1',
        '3 7 1',
        '2 7 1',
        '2 6 1',
        '1',
        '2',
        '21 14 ',
        'H V ',
        '13',
        '4 4 0',
        '3 4 0',
        '3 5 0',
        '2 5 0',
        '1 5 0',
        '1 5 1',
        '1 6 1',
        '1 6 0',
        '1 7 0',
        '2 7 0',
        '3 7 0',
        '4 7 0',
        '4 8 0',
        '3',
        '2',
        '16 17 ',
        'H V ',
        '10',
        '2 4 0',
        '3 4 0',
        '3 4 1',
        '3 3 1',
        '4 3 1',
        '5 3 1',
        '6 3 1',
        '7 3 1',
        '8 3 1',
        '8 2 1',
        '1',
        '2',
        '8 31 ',
        'H V ',
        '6',
        '6 2 1',
        '5 2 1',
        '5 3 1',
        '5 3 0',
        '6 3 0',
        '6 4 0',
        '2',
        '2',
        '14 11 ',
        'H V ',
        '6',
        '4 8 0',
        '3 8 0',
        '3 8 1',
        '3 7 1',
        '2 7 1',
        '2 8 1',
        '4',
        '2',
        '5 17 ',
        'H V ',
        '12',
        '2 6 0',
        '3 6 0',
        '3 6 1',
        '3 5 1',
        '3 4 1',
        '3 3 1',
        '4 3 1',
        '5 3 1',
        '6 3 1',
        '7 3 1',
        '8 3 1',
        '8 2 1',
        '2',
        '2',
        '7 0 ',
        'H V ',
        '11',
        '2 4 1',
        '3 4 1',
        '3 5 1',
        '3 5 0',
        '4 5 0',
        '4 5 1',
        '5 5 1',
        '6 5 1',
        '7 5 1',
        '8 5 1',
        '8 6 1',
        '3',
        '2',
        '11 7 ',
        'H V ',
        '9',
        '2 8 1',
        '1 8 1',
        '1 7 1',
        '1 6 1',
        '1 6 0',
        '1 5 0',
        '1 5 1',
        '2 5 1',
        '2 4 1',
        '5',
        '2',
        '12 5 ',
        'H V ',
        '2',
        '2 6 1',
        '2 6 0',
        '4',
        '2',
        '7 3 ',
        'H V ',
        '8',
        '2 4 1',
        '1 4 1',
        '1 4 0',
        '1 5 0',
        '2 5 0',
        '3 5 0',
        '4 5 0',
        '4 6 0',
        '3',
        '2',
        '30 19 ',
        'H V ',
        '8',
        '6 6 1',
        '5 6 1',
        '5 6 0',
        '5 5 0',
        '5 4 0',
        '5 3 0',
        '4 3 0',
        '4 2 0',
        '4',
        '2',
        '19 29 ',
        'H V ',
        '2',
        '4 2 0',
        '4 2 1',
        '5',
        '2',
        '17 21 ',
        'H V ',
        '8',
        '8 2 1',
        '7 2 1',
        '7 2 0',
        '7 3 0',
        '6 3 0',
        '5 3 0',
        '4 3 0',
        '4 4 0',
        '4',
        '2',
        '11 2 ',
        'H V ',
        '9',
        '2 8 1',
        '3 8 1',
        '3 7 1',
        '3 7 0',
        '4 7 0',
        '4 7 1',
        '5 7 1',
        '6 7 1',
        '6 8 1',
        '6',
        '2',
        '1 17 ',
        'H V ',
        '8',
        '6 6 0',
        '7 6 0',
        '7 6 1',
        '7 5 1',
        '7 4 1',
        '7 3 1',
        '8 3 1',
        '8 2 1',
        '6',
        '2',
        '3 5 ',
        'H V ',
        '9',
        '4 6 0',
        '5 6 0',
        '5 5 0',
        '5 5 1',
        '4 5 1',
        '4 5 0',
        '3 5 0',
        '2 5 0',
        '2 6 0',
        '6',
        '2',
        '12 20 ',
        'H V ',
        '10',
        '2 6 1',
        '3 6 1',
        '3 6 0',
        '3 7 0',
        '4 7 0',
        '5 7 0',
        '6 7 0',
        '7 7 0',
        '8 7 0',
        '8 8 0',
        '5',
        '2',
        '8 2 ',
        'H V ',
        '11',
        '6 2 1',
        '5 2 1',
        '5 3 1',
        '5 4 1',
        '5 5 1',
        '5 6 1',
        '5 6 0',
        '5 7 0',
        '5 7 1',
        '6 7 1',
        '6 8 1',
        '2',
        '2',
        '4 22 ',
        'H V ',
        '6',
        '8 2 0',
        '7 2 0',
        '7 2 1',
        '7 3 1',
        '6 3 1',
        '6 4 1',
        '6',
        '2',
        '2 14 ',
        'H V ',
        '6',
        '6 8 1',
        '5 8 1',
        '5 8 0',
        '5 9 0',
        '4 9 0',
        '4 8 0',
        '7',
        '2',
        '2 22 ',
        'H V ',
        '9',
        '6 8 1',
        '5 8 1',
        '5 7 1',
        '5 6 1',
        '5 6 0',
        '5 5 0',
        '5 5 1',
        '6 5 1',
        '6 4 1',
        '5',
        '2',
        '13 11 ',
        'H V ',
        '13',
        '8 4 1',
        '7 4 1',
        '7 4 0',
        '7 5 0',
        '6 5 0',
        '5 5 0',
        '4 5 0',
        '4 5 1',
        '3 5 1',
        '3 6 1',
        '3 7 1',
        '2 7 1',
        '2 8 1',
        '7',
        '2',
        '14 9 ',
        'H V ',
        '9',
        '4 8 0',
        '3 8 0',
        '3 7 0',
        '3 7 1',
        '4 7 1',
        '4 7 0',
        '5 7 0',
        '6 7 0',
        '6 8 0',
        '7',
        '2',
        '3 18 ',
        'H V ',
        '6',
        '4 6 0',
        '3 6 0',
        '3 6 1',
        '3 5 1',
        '4 5 1',
        '4 4 1',
        '7',
        '2',
        '17 7 ',
        'H V ',
        '11',
        '8 2 1',
        '7 2 1',
        '7 3 1',
        '6 3 1',
        '5 3 1',
        '4 3 1',
        '3 3 1',
        '3 3 0',
        '2 3 0',
        '2 3 1',
        '2 4 1',
        '6',
        '2',
        '10 21 ',
        'H V ',
        '13',
        '8 6 0',
        '9 6 0',
        '9 5 0',
        '8 5 0',
        '7 5 0',
        '7 4 0',
        '7 3 0',
        '6 3 0',
        '5 3 0',
        '5 3 1',
        '4 3 1',
        '4 3 0',
        '4 4 0',
        '8',
        '2',
        '17 8 ',
        'H V ',
        '9',
        '8 2 1',
        '9 2 1',
        '9 1 1',
        '9 1 0',
        '8 1 0',
        '8 1 1',
        '7 1 1',
        '6 1 1',
        '6 2 1',
        '8',
        '2',
        '3 10 ',
        'H V ',
        '9',
        '4 6 0',
        '5 6 0',
        '5 5 0',
        '5 5 1',
        '6 5 1',
        '6 5 0',
        '7 5 0',
        '8 5 0',
        '8 6 0',
        '8',
        '2',
        '19 22 ',
        'H V ',
        '6',
        '4 2 0',
        '5 2 0',
        '5 2 1',
        '5 3 1',
        '6 3 1',
        '6 4 1',
        '7',
        '2',
        '15 12 ',
        'H V ',
        '11',
        '4 8 1',
        '3 8 1',
        '3 9 1',
        '2 9 1',
        '1 9 1',
        '1 8 1',
        '1 8 0',
        '1 7 0',
        '1 7 1',
        '2 7 1',
        '2 6 1',
        '8',
        '2',
        '9 12 ',
        'H V ',
        '8',
        '6 8 0',
        '5 8 0',
        '5 8 1',
        '5 7 1',
        '4 7 1',
        '3 7 1',
        '2 7 1',
        '2 6 1',
        '7',
        '2',
        '16 1 ',
        'H V ',
        '19',
        '2 4 0',
        '1 4 0',
        '1 3 0',
        '1 2 0',
        '1 1 0',
        '1 1 1',
        '2 1 1',
        '2 1 0',
        '3 1 0',
        '4 1 0',
        '5 1 0',
        '5 2 0',
        '5 3 0',
        '6 3 0',
        '7 3 0',
        '7 4 0',
        '7 5 0',
        '6 5 0',
        '6 6 0',
        '8',
        '2',
        '5 4 ',
        'H V ',
        '13',
        '2 6 0',
        '3 6 0',
        '3 5 0',
        '3 4 0',
        '3 3 0',
        '3 3 1',
        '4 3 1',
        '4 3 0',
        '5 3 0',
        '6 3 0',
        '7 3 0',
        '8 3 0',
        '8 2 0',
        '9',
        '2',
        '10 24 ',
        'H V ',
        '6',
        '8 6 0',
        '7 6 0',
        '7 6 1',
        '7 7 1',
        '8 7 1',
        '8 8 1',
        '10',
        '2',
        '10 4 ',
        'H V ',
        '9',
        '8 6 0',
        '7 6 0',
        '7 5 0',
        '7 4 0',
        '7 4 1',
        '7 3 1',
        '7 3 0',
        '8 3 0',
        '8 2 0',
        '8',
        '2',
        '7 14 ',
        'H V ',
        '10',
        '2 4 1',
        '1 4 1',
        '1 4 0',
        '1 5 0',
        '1 6 0',
        '1 7 0',
        '2 7 0',
        '3 7 0',
        '4 7 0',
        '4 8 0',
        '9',
        '2',
        '21 11 ',
        'H V ',
        '8',
        '4 4 0',
        '3 4 0',
        '3 4 1',
        '3 5 1',
        '3 6 1',
        '3 7 1',
        '2 7 1',
        '2 8 1',
        '10',
        '2',
        '24 19 ',
        'H V ',
        '12',
        '8 8 1',
        '7 8 1',
        '7 7 1',
        '6 7 1',
        '5 7 1',
        '5 6 1',
        '5 5 1',
        '5 4 1',
        '5 3 1',
        '4 3 1',
        '4 3 0',
        '4 2 0',
        '8',
        '2',
        '15 1 ',
        'H V ',
        '12',
        '4 8 1',
        '3 8 1',
        '3 8 0',
        '3 9 0',
        '4 9 0',
        '5 9 0',
        '6 9 0',
        '7 9 0',
        '7 8 0',
        '7 7 0',
        '6 7 0',
        '6 6 0',
        '8',
        '2',
        '0 16 ',
        'H V ',
        '18',
        '8 6 1',
        '7 6 1',
        '7 7 1',
        '7 8 1',
        '7 9 1',
        '6 9 1',
        '5 9 1',
        '4 9 1',
        '3 9 1',
        '2 9 1',
        '1 9 1',
        '1 8 1',
        '1 7 1',
        '1 6 1',
        '1 5 1',
        '2 5 1',
        '2 5 0',
        '2 4 0',
        '9',
        '2',
        '16 22 ',
        'H V ',
        '10',
        '2 4 0',
        '1 4 0',
        '1 4 1',
        '1 3 1',
        '2 3 1',
        '3 3 1',
        '4 3 1',
        '5 3 1',
        '6 3 1',
        '6 4 1',
        '11',
        '2',
        '11 4 ',
        'H V ',
        '14',
        '2 8 1',
        '3 8 1',
        '3 8 0',
        '3 7 0',
        '3 6 0',
        '3 5 0',
        '3 4 0',
        '3 3 0',
        '4 3 0',
        '5 3 0',
        '6 3 0',
        '7 3 0',
        '8 3 0',
        '8 2 0',
        '11',
        '2',
        '22 16 ',
        'H V ',
        '8',
        '6 4 1',
        '5 4 1',
        '5 3 1',
        '4 3 1',
        '3 3 1',
        '2 3 1',
        '2 3 0',
        '2 4 0',
        '11',
        '2',
        '18 19 ',
        'H V ',
        '14',
        '4 4 1',
        '3 4 1',
        '3 5 1',
        '2 5 1',
        '1 5 1',
        '1 4 1',
        '1 3 1',
        '1 2 1',
        '1 1 1',
        '2 1 1',
        '3 1 1',
        '4 1 1',
        '4 1 0',
        '4 2 0',
        '12',
        '2',
        '22 16 ',
        'H V ',
        '8',
        '6 4 1',
        '5 4 1',
        '5 4 0',
        '5 3 0',
        '4 3 0',
        '3 3 0',
        '2 3 0',
        '2 4 0',
        '7',
        '2',
        '20 6 ',
        'H V ',
        '11',
        '8 8 0',
        '7 8 0',
        '7 9 0',
        '7 9 1',
        '6 9 1',
        '6 9 0',
        '5 9 0',
        '4 9 0',
        '3 9 0',
        '2 9 0',
        '2 8 0',
        '12',
        '2',
        '4 28 ',
        'H V ',
        '9',
        '8 2 0',
        '7 2 0',
        '7 3 0',
        '7 4 0',
        '7 4 1',
        '7 5 1',
        '7 5 0',
        '8 5 0',
        '8 4 0',
        '9',
        '2',
        '20 14 ',
        'H V ',
        '9',
        '8 8 0',
        '7 8 0',
        '7 7 0',
        '6 7 0',
        '5 7 0',
        '5 7 1',
        '4 7 1',
        '4 7 0',
        '4 8 0',
        '9',
        '2',
        '6 12 ',
        'H V ',
        '8',
        '2 8 0',
        '1 8 0',
        '1 8 1',
        '1 7 1',
        '1 6 1',
        '1 5 1',
        '2 5 1',
        '2 6 1',
        '12',
        '2',
        '18 14 ',
        'H V ',
        '8',
        '4 4 1',
        '3 4 1',
        '3 4 0',
        '3 5 0',
        '3 6 0',
        '3 7 0',
        '4 7 0',
        '4 8 0',
        '12',
        '2',
        '8 19 ',
        'H V ',
        '6',
        '6 2 1',
        '5 2 1',
        '5 2 0',
        '5 1 0',
        '4 1 0',
        '4 2 0',
        '13',
        '2',
        '19 18 ',
        'H V ',
        '6',
        '4 2 0',
        '3 2 0',
        '3 2 1',
        '3 3 1',
        '4 3 1',
        '4 4 1',
        '10',
        '2',
        '21 17 ',
        'H V ',
        '10',
        '4 4 0',
        '5 4 0',
        '5 3 0',
        '5 2 0',
        '5 1 0',
        '6 1 0',
        '7 1 0',
        '8 1 0',
        '8 1 1',
        '8 2 1',
        '11',
        '2',
        '21 23 ',
        'H V ',
        '13',
        '4 4 0',
        '5 4 0',
        '5 5 0',
        '5 5 1',
        '6 5 1',
        '7 5 1',
        '7 4 1',
        '7 3 1',
        '7 2 1',
        '7 2 0',
        '7 1 0',
        '6 1 0',
        '6 2 0',
        '14',
        '2',
        '18 6 ',
        'H V ',
        '8',
        '4 4 1',
        '3 4 1',
        '3 4 0',
        '3 5 0',
        '3 6 0',
        '3 7 0',
        '2 7 0',
        '2 8 0',
        '10',
        '2',
        '12 15 ',
        'H V ',
        '9',
        '2 6 1',
        '1 6 1',
        '1 7 1',
        '1 7 0',
        '2 7 0',
        '2 7 1',
        '3 7 1',
        '4 7 1',
        '4 8 1',
        '11',
        '2',
        '17 12 ',
        'H V ',
        '17',
        '8 2 1',
        '9 2 1',
        '9 2 0',
        '9 3 0',
        '9 3 1',
        '9 4 1',
        '9 5 1',
        '9 6 1',
        '9 7 1',
        '8 7 1',
        '7 7 1',
        '6 7 1',
        '5 7 1',
        '4 7 1',
        '3 7 1',
        '2 7 1',
        '2 6 1',
        '10',
        '2',
        '20 2 ',
        'H V ',
        '6',
        '8 8 0',
        '7 8 0',
        '7 9 0',
        '7 9 1',
        '6 9 1',
        '6 8 1',
        '14',
        '2',
        '19 8 ',
        'H V ',
        '6',
        '4 2 0',
        '5 2 0',
        '5 2 1',
        '5 1 1',
        '6 1 1',
        '6 2 1',
        '11',
        '2',
        '24 0 ',
        'H V ',
        '11',
        '8 8 1',
        '7 8 1',
        '7 9 1',
        '7 9 0',
        '7 8 0',
        '7 7 0',
        '7 6 0',
        '7 5 0',
        '8 5 0',
        '8 5 1',
        '8 6 1',
        '13',
        '2',
        '16 24 ',
        'H V ',
        '12',
        '2 4 0',
        '3 4 0',
        '3 4 1',
        '3 5 1',
        '3 6 1',
        '3 7 1',
        '4 7 1',
        '5 7 1',
        '6 7 1',
        '7 7 1',
        '8 7 1',
        '8 8 1',
        '9',
        '2',
        '5 3 ',
        'H V ',
        '23',
        '2 6 0',
        '3 6 0',
        '3 7 0',
        '3 8 0',
        '3 9 0',
        '4 9 0',
        '5 9 0',
        '6 9 0',
        '7 9 0',
        '8 9 0',
        '8 9 1',
        '9 9 1',
        '9 9 0',
        '9 8 0',
        '9 7 0',
        '9 6 0',
        '9 5 0',
        '8 5 0',
        '7 5 0',
        '6 5 0',
        '5 5 0',
        '4 5 0',
        '4 6 0',
        '12',
        '2',
        '27 20 ',
        'H V ',
        '8',
        '4 6 1',
        '5 6 1',
        '5 6 0',
        '5 7 0',
        '6 7 0',
        '7 7 0',
        '8 7 0',
        '8 8 0',
        '12',
        '2',
        '11 3 ',
        'H V ',
        '8',
        '2 8 1',
        '3 8 1',
        '3 7 1',
        '3 6 1',
        '3 5 1',
        '4 5 1',
        '4 5 0',
        '4 6 0',
        '15',
        '2',
        '18 4 ',
        'H V ',
        '8',
        '4 4 1',
        '5 4 1',
        '5 4 0',
        '5 3 0',
        '6 3 0',
        '7 3 0',
        '8 3 0',
        '8 2 0',
        '16',
        '2',
        '5 4 ',
        'H V ',
        '13',
        '2 6 0',
        '3 6 0',
        '3 5 0',
        '3 4 0',
        '3 3 0',
        '3 3 1',
        '4 3 1',
        '4 3 0',
        '5 3 0',
        '6 3 0',
        '7 3 0',
        '8 3 0',
        '8 2 0',
        '13',
        '2',
        '20 15 ',
        'H V ',
        '8',
        '8 8 0',
        '7 8 0',
        '7 8 1',
        '7 9 1',
        '6 9 1',
        '5 9 1',
        '4 9 1',
        '4 8 1',
        '14',
        '2',
        '24 9 ',
        'H V ',
        '6',
        '8 8 1',
        '7 8 1',
        '7 8 0',
        '7 7 0',
        '6 7 0',
        '6 8 0',
        '14',
        '2',
        '13 15 ',
        'H V ',
        '11',
        '8 4 1',
        '7 4 1',
        '7 4 0',
        '7 5 0',
        '7 5 1',
        '7 6 1',
        '7 7 1',
        '6 7 1',
        '5 7 1',
        '4 7 1',
        '4 8 1',
        '13',
        '2',
        '12 14 ',
        'H V ',
        '8',
        '2 6 1',
        '1 6 1',
        '1 6 0',
        '1 7 0',
        '2 7 0',
        '3 7 0',
        '4 7 0',
        '4 8 0',
        '17',
        '2',
        '1 5 ',
        'H V ',
        '9',
        '6 6 0',
        '5 6 0',
        '5 5 0',
        '4 5 0',
        '3 5 0',
        '3 5 1',
        '2 5 1',
        '2 5 0',
        '2 6 0',
        '15',
        '2',
        '19 17 ',
        'H V ',
        '8',
        '4 2 0',
        '5 2 0',
        '5 2 1',
        '5 1 1',
        '6 1 1',
        '7 1 1',
        '8 1 1',
        '8 2 1',
        '14',
        '2',
        '23 12 ',
        'H V ',
        '12',
        '6 2 0',
        '7 2 0',
        '7 2 1',
        '7 3 1',
        '6 3 1',
        '5 3 1',
        '5 4 1',
        '5 5 1',
        '4 5 1',
        '3 5 1',
        '2 5 1',
        '2 6 1',
        '15',
        '2',
        '9 6 ',
        'H V ',
        '9',
        '6 8 0',
        '5 8 0',
        '5 7 0',
        '4 7 0',
        '3 7 0',
        '3 7 1',
        '2 7 1',
        '2 7 0',
        '2 8 0',
        '14',
        '2',
        '14 0 ',
        'H V ',
        '12',
        '4 8 0',
        '5 8 0',
        '5 8 1',
        '5 9 1',
        '6 9 1',
        '7 9 1',
        '8 9 1',
        '9 9 1',
        '9 8 1',
        '9 7 1',
        '8 7 1',
        '8 6 1',
        '17',
        '2',
        '18 4 ',
        'H V ',
        '8',
        '4 4 1',
        '5 4 1',
        '5 4 0',
        '5 3 0',
        '6 3 0',
        '7 3 0',
        '8 3 0',
        '8 2 0',
        '18',
        '2',
        '1 3 ',
        'H V ',
        '9',
        '6 6 0',
        '7 6 0',
        '7 5 0',
        '7 5 1',
        '6 5 1',
        '6 5 0',
        '5 5 0',
        '4 5 0',
        '4 6 0',
        '16',
        '2',
        '19 0 ',
        'H V ',
        '10',
        '4 2 0',
        '5 2 0',
        '5 2 1',
        '5 3 1',
        '5 4 1',
        '5 5 1',
        '6 5 1',
        '7 5 1',
        '8 5 1',
        '8 6 1',
        '19',
        '2',
        '26 3 ',
        'H V ',
        '9',
        '2 2 0',
        '3 2 0',
        '3 2 1',
        '3 3 1',
        '3 3 0',
        '3 4 0',
        '3 5 0',
        '4 5 0',
        '4 6 0',
        '18',
        '2',
        '18 6 ',
        'H V ',
        '8',
        '4 4 1',
        '3 4 1',
        '3 4 0',
        '3 5 0',
        '3 6 0',
        '3 7 0',
        '2 7 0',
        '2 8 0',
        '18',
        '2',
        '7 5 ',
        'H V ',
        '6',
        '2 4 1',
        '1 4 1',
        '1 4 0',
        '1 5 0',
        '2 5 0',
        '2 6 0',
        '17',
        '2',
        '13 0 ',
        'H V ',
        '9',
        '8 4 1',
        '7 4 1',
        '7 5 1',
        '7 6 1',
        '7 6 0',
        '7 7 0',
        '7 7 1',
        '8 7 1',
        '8 6 1',
        '18',
        '2',
        '2 0 ',
        'H V ',
        '9',
        '6 8 1',
        '5 8 1',
        '5 7 1',
        '5 7 0',
        '6 7 0',
        '6 7 1',
        '7 7 1',
        '8 7 1',
        '8 6 1',
        '19',
        '2',
        '0 4 ',
        'H V ',
        '8',
        '8 6 1',
        '7 6 1',
        '7 6 0',
        '7 5 0',
        '7 4 0',
        '7 3 0',
        '8 3 0',
        '8 2 0',
        '19',
        '2',
        '18 24 ',
        'H V ',
        '11',
        '4 4 1',
        '5 4 1',
        '5 4 0',
        '5 5 0',
        '5 5 1',
        '5 6 1',
        '5 7 1',
        '6 7 1',
        '7 7 1',
        '8 7 1',
        '8 8 1',
        '20',
        '2',
        '0 7 ',
        'H V ',
        '11',
        '8 6 1',
        '7 6 1',
        '7 5 1',
        '6 5 1',
        '5 5 1',
        '4 5 1',
        '3 5 1',
        '3 5 0',
        '2 5 0',
        '2 5 1',
        '2 4 1',
        '18',
        '2',
        '13 11 ',
        'H V ',
        '15',
        '8 4 1',
        '7 4 1',
        '7 3 1',
        '6 3 1',
        '5 3 1',
        '5 3 0',
        '5 4 0',
        '5 4 1',
        '5 5 1',
        '4 5 1',
        '3 5 1',
        '3 6 1',
        '3 7 1',
        '2 7 1',
        '2 8 1',
        '16',
        '2',
        '9 14 ',
        'H V ',
        '9',
        '6 8 0',
        '7 8 0',
        '7 7 0',
        '7 7 1',
        '6 7 1',
        '6 7 0',
        '5 7 0',
        '4 7 0',
        '4 8 0',
        '19',
        '2',
        '2 17 ',
        'H V ',
        '13',
        '6 8 1',
        '7 8 1',
        '7 8 0',
        '7 7 0',
        '8 7 0',
        '9 7 0',
        '9 6 0',
        '9 5 0',
        '9 4 0',
        '9 4 1',
        '9 3 1',
        '8 3 1',
        '8 2 1',
        '20',
        '2',
        '15 2 ',
        'H V ',
        '9',
        '4 8 1',
        '3 8 1',
        '3 7 1',
        '3 7 0',
        '4 7 0',
        '4 7 1',
        '5 7 1',
        '6 7 1',
        '6 8 1',
        '19',
        '2',
        '13 25 ',
        'H V ',
        '13',
        '8 4 1',
        '7 4 1',
        '7 3 1',
        '6 3 1',
        '5 3 1',
        '5 2 1',
        '5 1 1',
        '4 1 1',
        '3 1 1',
        '3 1 0',
        '2 1 0',
        '2 1 1',
        '2 2 1',
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
