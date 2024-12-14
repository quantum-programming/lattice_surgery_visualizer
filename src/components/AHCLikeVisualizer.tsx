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
        '25',
        '9 9 2',
        '1 1 0',
        '1 1 1',
        '1 3 0',
        '1 3 1',
        '1 5 0',
        '1 5 1',
        '1 7 0',
        '1 7 1',
        '3 1 0',
        '3 1 1',
        '3 3 0',
        '3 3 1',
        '3 5 0',
        '3 5 1',
        '3 7 0',
        '3 7 1',
        '5 1 0',
        '5 1 1',
        '5 3 0',
        '5 3 1',
        '5 5 0',
        '5 5 1',
        '5 7 0',
        '5 7 1',
        '7 1 0',
        '100',
        '1',
        '2',
        '4 19 ',
        'V V ',
        '8',
        '1 5 0',
        '1 4 0',
        '2 4 0',
        '2 4 1',
        '3 4 1',
        '4 4 1',
        '5 4 1',
        '5 3 1',
        '-1',
        '1',
        '2',
        '7 24 ',
        'H H ',
        '14',
        '1 7 1',
        '2 7 1',
        '2 6 1',
        '3 6 1',
        '4 6 1',
        '4 5 1',
        '4 5 0',
        '4 4 0',
        '4 3 0',
        '4 2 0',
        '5 2 0',
        '6 2 0',
        '6 1 0',
        '7 1 0',
        '-1',
        '1',
        '2',
        '1 17 ',
        'V V ',
        '7',
        '1 1 1',
        '1 0 1',
        '2 0 1',
        '3 0 1',
        '4 0 1',
        '5 0 1',
        '5 1 1',
        '-1',
        '2',
        '2',
        '5 24 ',
        'H H ',
        '12',
        '1 5 1',
        '2 5 1',
        '2 4 1',
        '2 3 1',
        '2 2 1',
        '3 2 1',
        '3 2 0',
        '4 2 0',
        '5 2 0',
        '6 2 0',
        '6 1 0',
        '7 1 0',
        '-1',
        '2',
        '2',
        '16 19 ',
        'H H ',
        '8',
        '5 1 0',
        '4 1 0',
        '4 0 0',
        '4 0 1',
        '4 1 1',
        '4 2 1',
        '4 3 1',
        '5 3 1',
        '-1',
        '1',
        '2',
        '3 12 ',
        'V V ',
        '10',
        '1 3 1',
        '1 4 1',
        '0 4 1',
        '0 5 1',
        '0 6 1',
        '1 6 1',
        '1 6 0',
        '2 6 0',
        '3 6 0',
        '3 5 0',
        '-1',
        '1',
        '2',
        '14 21 ',
        'V V ',
        '10',
        '3 7 0',
        '3 8 0',
        '4 8 0',
        '4 7 0',
        '4 6 0',
        '5 6 0',
        '6 6 0',
        '6 6 1',
        '5 6 1',
        '5 5 1',
        '-1',
        '3',
        '2',
        '16 17 ',
        'H H ',
        '4',
        '5 1 0',
        '4 1 0',
        '4 1 1',
        '5 1 1',
        '-1',
        '1',
        '2',
        '8 20 ',
        'V V ',
        '11',
        '3 1 0',
        '3 2 0',
        '3 2 1',
        '4 2 1',
        '5 2 1',
        '6 2 1',
        '6 3 1',
        '6 4 1',
        '6 4 0',
        '5 4 0',
        '5 5 0',
        '-1',
        '3',
        '2',
        '11 14 ',
        'H H ',
        '8',
        '3 3 1',
        '2 3 1',
        '2 4 1',
        '2 4 0',
        '2 5 0',
        '2 6 0',
        '2 7 0',
        '3 7 0',
        '-1',
        '4',
        '2',
        '5 17 ',
        'H H ',
        '9',
        '1 5 1',
        '2 5 1',
        '2 4 1',
        '2 3 1',
        '2 2 1',
        '3 2 1',
        '4 2 1',
        '4 1 1',
        '5 1 1',
        '-1',
        '2',
        '2',
        '0 7 ',
        'V V ',
        '10',
        '1 1 0',
        '1 2 0',
        '0 2 0',
        '0 3 0',
        '0 3 1',
        '0 4 1',
        '0 5 1',
        '0 6 1',
        '1 6 1',
        '1 7 1',
        '-1',
        '4',
        '2',
        '7 11 ',
        'H H ',
        '9',
        '1 7 1',
        '2 7 1',
        '2 6 1',
        '3 6 1',
        '4 6 1',
        '4 5 1',
        '4 4 1',
        '4 3 1',
        '3 3 1',
        '-1',
        '5',
        '2',
        '5 12 ',
        'V V ',
        '6',
        '1 5 1',
        '1 4 1',
        '2 4 1',
        '2 4 0',
        '3 4 0',
        '3 5 0',
        '-1',
        '5',
        '2',
        '3 7 ',
        'V V ',
        '9',
        '1 3 1',
        '1 2 1',
        '0 2 1',
        '0 3 1',
        '0 4 1',
        '0 5 1',
        '0 6 1',
        '1 6 1',
        '1 7 1',
        '-1',
        '3',
        '2',
        '19 21 ',
        'V V ',
        '3',
        '5 3 1',
        '5 4 1',
        '5 5 1',
        '-1',
        '4',
        '2',
        '16 19 ',
        'V V ',
        '4',
        '5 1 0',
        '5 2 0',
        '5 2 1',
        '5 3 1',
        '-1',
        '5',
        '2',
        '17 21 ',
        'V V ',
        '7',
        '5 1 1',
        '5 2 1',
        '4 2 1',
        '4 3 1',
        '4 4 1',
        '5 4 1',
        '5 5 1',
        '-1',
        '5',
        '2',
        '2 11 ',
        'V V ',
        '6',
        '1 3 0',
        '1 2 0',
        '2 2 0',
        '2 2 1',
        '3 2 1',
        '3 3 1',
        '-1',
        '6',
        '2',
        '1 17 ',
        'H H ',
        '7',
        '1 1 1',
        '2 1 1',
        '2 0 1',
        '3 0 1',
        '4 0 1',
        '4 1 1',
        '5 1 1',
        '-1',
        '6',
        '2',
        '3 5 ',
        'V V ',
        '3',
        '1 3 1',
        '1 4 1',
        '1 5 1',
        '-1',
        '6',
        '2',
        '12 20 ',
        'H H ',
        '3',
        '3 5 0',
        '4 5 0',
        '5 5 0',
        '-1',
        '6',
        '2',
        '2 8 ',
        'H H ',
        '5',
        '1 3 0',
        '2 3 0',
        '2 2 0',
        '2 1 0',
        '3 1 0',
        '-1',
        '2',
        '2',
        '4 22 ',
        'H H ',
        '7',
        '1 5 0',
        '2 5 0',
        '2 6 0',
        '3 6 0',
        '4 6 0',
        '4 7 0',
        '5 7 0',
        '-1',
        '7',
        '2',
        '2 14 ',
        'H H ',
        '7',
        '1 3 0',
        '2 3 0',
        '2 4 0',
        '2 5 0',
        '2 6 0',
        '2 7 0',
        '3 7 0',
        '-1',
        '8',
        '2',
        '2 22 ',
        'H H ',
        '9',
        '1 3 0',
        '2 3 0',
        '2 4 0',
        '2 5 0',
        '2 6 0',
        '3 6 0',
        '4 6 0',
        '4 7 0',
        '5 7 0',
        '-1',
        '6',
        '2',
        '11 13 ',
        'V V ',
        '3',
        '3 3 1',
        '3 4 1',
        '3 5 1',
        '-1',
        '8',
        '2',
        '9 14 ',
        'V V ',
        '12',
        '3 1 1',
        '3 2 1',
        '2 2 1',
        '2 3 1',
        '2 4 1',
        '2 5 1',
        '2 6 1',
        '2 7 1',
        '2 7 0',
        '2 8 0',
        '3 8 0',
        '3 7 0',
        '-1',
        '7',
        '2',
        '3 18 ',
        'V V ',
        '8',
        '1 3 1',
        '1 4 1',
        '2 4 1',
        '3 4 1',
        '3 4 0',
        '4 4 0',
        '5 4 0',
        '5 3 0',
        '-1',
        '7',
        '2',
        '7 17 ',
        'H H ',
        '11',
        '1 7 1',
        '2 7 1',
        '2 6 1',
        '3 6 1',
        '4 6 1',
        '4 5 1',
        '4 4 1',
        '4 3 1',
        '4 2 1',
        '4 1 1',
        '5 1 1',
        '-1',
        '6',
        '2',
        '10 21 ',
        'V V ',
        '6',
        '3 3 0',
        '3 4 0',
        '4 4 0',
        '4 4 1',
        '5 4 1',
        '5 5 1',
        '-1',
        '8',
        '2',
        '8 17 ',
        'H H ',
        '4',
        '3 1 0',
        '4 1 0',
        '4 1 1',
        '5 1 1',
        '-1',
        '8',
        '2',
        '3 10 ',
        'V V ',
        '8',
        '1 3 1',
        '1 2 1',
        '0 2 1',
        '0 2 0',
        '1 2 0',
        '2 2 0',
        '3 2 0',
        '3 3 0',
        '-1',
        '9',
        '2',
        '19 22 ',
        'H H ',
        '8',
        '5 3 1',
        '4 3 1',
        '4 4 1',
        '4 4 0',
        '4 5 0',
        '4 6 0',
        '4 7 0',
        '5 7 0',
        '-1',
        '7',
        '2',
        '12 15 ',
        'V V ',
        '8',
        '3 5 0',
        '3 6 0',
        '4 6 0',
        '4 7 0',
        '4 7 1',
        '4 8 1',
        '3 8 1',
        '3 7 1',
        '-1',
        '9',
        '2',
        '9 12 ',
        'V V ',
        '8',
        '3 1 1',
        '3 2 1',
        '2 2 1',
        '2 3 1',
        '2 3 0',
        '2 4 0',
        '3 4 0',
        '3 5 0',
        '-1',
        '7',
        '2',
        '1 16 ',
        'H H ',
        '8',
        '1 1 1',
        '2 1 1',
        '2 0 1',
        '3 0 1',
        '3 0 0',
        '4 0 0',
        '4 1 0',
        '5 1 0',
        '-1',
        '7',
        '2',
        '4 5 ',
        'H H ',
        '4',
        '1 5 0',
        '0 5 0',
        '0 5 1',
        '1 5 1',
        '-1',
        '9',
        '2',
        '10 24 ',
        'V V ',
        '7',
        '3 3 0',
        '3 2 0',
        '4 2 0',
        '5 2 0',
        '6 2 0',
        '7 2 0',
        '7 1 0',
        '-1',
        '10',
        '2',
        '4 10 ',
        'V V ',
        '5',
        '1 5 0',
        '1 4 0',
        '2 4 0',
        '3 4 0',
        '3 3 0',
        '-1',
        '9',
        '2',
        '7 14 ',
        'H H ',
        '4',
        '1 7 1',
        '2 7 1',
        '2 7 0',
        '3 7 0',
        '-1',
        '7',
        '2',
        '11 21 ',
        'V V ',
        '11',
        '3 3 1',
        '3 2 1',
        '3 2 0',
        '4 2 0',
        '5 2 0',
        '6 2 0',
        '6 3 0',
        '6 4 0',
        '6 4 1',
        '5 4 1',
        '5 5 1',
        '-1',
        '10',
        '2',
        '19 24 ',
        'V V ',
        '6',
        '5 3 1',
        '5 2 1',
        '6 2 1',
        '6 2 0',
        '7 2 0',
        '7 1 0',
        '-1',
        '8',
        '2',
        '1 15 ',
        'V V ',
        '17',
        '1 1 1',
        '1 0 1',
        '2 0 1',
        '3 0 1',
        '4 0 1',
        '5 0 1',
        '6 0 1',
        '6 1 1',
        '6 2 1',
        '6 3 1',
        '6 4 1',
        '6 5 1',
        '6 6 1',
        '5 6 1',
        '4 6 1',
        '3 6 1',
        '3 7 1',
        '-1',
        '8',
        '2',
        '0 16 ',
        'H H ',
        '9',
        '1 1 0',
        '2 1 0',
        '2 0 0',
        '3 0 0',
        '4 0 0',
        '5 0 0',
        '6 0 0',
        '6 1 0',
        '5 1 0',
        '-1',
        '10',
        '2',
        '16 22 ',
        'V V ',
        '9',
        '5 1 0',
        '5 2 0',
        '4 2 0',
        '4 3 0',
        '4 4 0',
        '4 5 0',
        '4 6 0',
        '5 6 0',
        '5 7 0',
        '-1',
        '11',
        '2',
        '4 11 ',
        'V V ',
        '6',
        '1 5 0',
        '1 4 0',
        '2 4 0',
        '2 4 1',
        '3 4 1',
        '3 3 1',
        '-1',
        '11',
        '2',
        '16 22 ',
        'V V ',
        '9',
        '5 1 0',
        '5 2 0',
        '4 2 0',
        '4 3 0',
        '4 4 0',
        '4 5 0',
        '4 6 0',
        '5 6 0',
        '5 7 0',
        '-1',
        '11',
        '2',
        '18 19 ',
        'H H ',
        '4',
        '5 3 0',
        '6 3 0',
        '6 3 1',
        '5 3 1',
        '-1',
        '12',
        '2',
        '16 22 ',
        'H H ',
        '9',
        '5 1 0',
        '4 1 0',
        '4 2 0',
        '4 3 0',
        '4 4 0',
        '4 5 0',
        '4 6 0',
        '4 7 0',
        '5 7 0',
        '-1',
        '7',
        '2',
        '6 20 ',
        'H H ',
        '13',
        '1 7 0',
        '0 7 0',
        '0 8 0',
        '1 8 0',
        '2 8 0',
        '3 8 0',
        '4 8 0',
        '5 8 0',
        '6 8 0',
        '6 7 0',
        '6 6 0',
        '6 5 0',
        '5 5 0',
        '-1',
        '12',
        '2',
        '4 15 ',
        'V V ',
        '6',
        '1 5 0',
        '1 6 0',
        '2 6 0',
        '2 6 1',
        '3 6 1',
        '3 7 1',
        '-1',
        '10',
        '2',
        '14 20 ',
        'V V ',
        '9',
        '3 7 0',
        '3 6 0',
        '3 6 1',
        '4 6 1',
        '4 5 1',
        '4 4 1',
        '5 4 1',
        '5 4 0',
        '5 5 0',
        '-1',
        '10',
        '2',
        '6 12 ',
        'H H ',
        '5',
        '1 7 0',
        '2 7 0',
        '2 6 0',
        '2 5 0',
        '3 5 0',
        '-1',
        '12',
        '2',
        '14 18 ',
        'V V ',
        '11',
        '3 7 0',
        '3 8 0',
        '4 8 0',
        '5 8 0',
        '6 8 0',
        '6 7 0',
        '6 6 0',
        '6 5 0',
        '6 4 0',
        '5 4 0',
        '5 3 0',
        '-1',
        '13',
        '2',
        '16 21 ',
        'H H ',
        '8',
        '5 1 0',
        '4 1 0',
        '4 2 0',
        '4 2 1',
        '4 3 1',
        '4 4 1',
        '4 5 1',
        '5 5 1',
        '-1',
        '14',
        '2',
        '21 22 ',
        'V V ',
        '4',
        '5 5 1',
        '5 6 1',
        '5 6 0',
        '5 7 0',
        '-1',
        '15',
        '2',
        '17 22 ',
        'V V ',
        '10',
        '5 1 1',
        '5 2 1',
        '4 2 1',
        '4 3 1',
        '4 3 0',
        '4 4 0',
        '4 5 0',
        '4 6 0',
        '5 6 0',
        '5 7 0',
        '-1',
        '12',
        '2',
        '8 19 ',
        'V V ',
        '8',
        '3 1 0',
        '3 2 0',
        '2 2 0',
        '2 2 1',
        '3 2 1',
        '4 2 1',
        '5 2 1',
        '5 3 1',
        '-1',
        '13',
        '2',
        '18 19 ',
        'H H ',
        '4',
        '5 3 0',
        '6 3 0',
        '6 3 1',
        '5 3 1',
        '-1',
        '16',
        '2',
        '17 21 ',
        'H H ',
        '7',
        '5 1 1',
        '4 1 1',
        '4 2 1',
        '4 3 1',
        '4 4 1',
        '4 5 1',
        '5 5 1',
        '-1',
        '17',
        '2',
        '21 23 ',
        'H H ',
        '5',
        '5 5 1',
        '4 5 1',
        '4 6 1',
        '4 7 1',
        '5 7 1',
        '-1',
        '14',
        '2',
        '6 18 ',
        'V V ',
        '9',
        '1 7 0',
        '1 6 0',
        '2 6 0',
        '2 5 0',
        '2 4 0',
        '3 4 0',
        '4 4 0',
        '5 4 0',
        '5 3 0',
        '-1',
        '13',
        '2',
        '12 15 ',
        'H H ',
        '6',
        '3 5 0',
        '4 5 0',
        '4 6 0',
        '4 6 1',
        '4 7 1',
        '3 7 1',
        '-1',
        '17',
        '2',
        '12 17 ',
        'V V ',
        '8',
        '3 5 0',
        '3 4 0',
        '4 4 0',
        '4 3 0',
        '4 3 1',
        '4 2 1',
        '5 2 1',
        '5 1 1',
        '-1',
        '11',
        '2',
        '2 20 ',
        'V V ',
        '11',
        '1 3 0',
        '1 2 0',
        '1 2 1',
        '2 2 1',
        '3 2 1',
        '4 2 1',
        '4 3 1',
        '4 4 1',
        '5 4 1',
        '5 4 0',
        '5 5 0',
        '-1',
        '14',
        '2',
        '8 19 ',
        'H H ',
        '6',
        '3 1 0',
        '4 1 0',
        '4 2 0',
        '4 2 1',
        '4 3 1',
        '5 3 1',
        '-1',
        '11',
        '2',
        '0 24 ',
        'H H ',
        '9',
        '1 1 0',
        '2 1 0',
        '2 0 0',
        '3 0 0',
        '4 0 0',
        '5 0 0',
        '6 0 0',
        '6 1 0',
        '7 1 0',
        '-1',
        '14',
        '2',
        '16 24 ',
        'V V ',
        '5',
        '5 1 0',
        '5 0 0',
        '6 0 0',
        '7 0 0',
        '7 1 0',
        '-1',
        '9',
        '2',
        '3 5 ',
        'H H ',
        '5',
        '1 3 1',
        '0 3 1',
        '0 4 1',
        '0 5 1',
        '1 5 1',
        '-1',
        '15',
        '2',
        '6 20 ',
        'H H ',
        '11',
        '1 7 0',
        '2 7 0',
        '2 8 0',
        '3 8 0',
        '4 8 0',
        '5 8 0',
        '6 8 0',
        '6 7 0',
        '6 6 0',
        '6 5 0',
        '5 5 0',
        '-1',
        '12',
        '2',
        '3 11 ',
        'H H ',
        '3',
        '1 3 1',
        '2 3 1',
        '3 3 1',
        '-1',
        '15',
        '2',
        '4 18 ',
        'H H ',
        '11',
        '1 5 0',
        '2 5 0',
        '2 4 0',
        '2 3 0',
        '2 2 0',
        '3 2 0',
        '4 2 0',
        '5 2 0',
        '6 2 0',
        '6 3 0',
        '5 3 0',
        '-1',
        '16',
        '2',
        '4 5 ',
        'V V ',
        '4',
        '1 5 0',
        '1 4 0',
        '1 4 1',
        '1 5 1',
        '-1',
        '16',
        '2',
        '15 20 ',
        'H H ',
        '6',
        '3 7 1',
        '4 7 1',
        '4 6 1',
        '4 6 0',
        '4 5 0',
        '5 5 0',
        '-1',
        '15',
        '2',
        '9 24 ',
        'V V ',
        '8',
        '3 1 1',
        '3 0 1',
        '4 0 1',
        '4 0 0',
        '5 0 0',
        '6 0 0',
        '7 0 0',
        '7 1 0',
        '-1',
        '17',
        '2',
        '13 15 ',
        'V V ',
        '3',
        '3 5 1',
        '3 6 1',
        '3 7 1',
        '-1',
        '18',
        '2',
        '12 14 ',
        'V V ',
        '3',
        '3 5 0',
        '3 6 0',
        '3 7 0',
        '-1',
        '17',
        '2',
        '1 5 ',
        'H H ',
        '7',
        '1 1 1',
        '0 1 1',
        '0 2 1',
        '0 3 1',
        '0 4 1',
        '0 5 1',
        '1 5 1',
        '-1',
        '18',
        '2',
        '17 19 ',
        'V V ',
        '3',
        '5 1 1',
        '5 2 1',
        '5 3 1',
        '-1',
        '19',
        '2',
        '12 23 ',
        'V V ',
        '6',
        '3 5 0',
        '3 6 0',
        '4 6 0',
        '4 6 1',
        '5 6 1',
        '5 7 1',
        '-1',
        '16',
        '2',
        '6 9 ',
        'V V ',
        '10',
        '1 7 0',
        '1 6 0',
        '2 6 0',
        '2 5 0',
        '2 4 0',
        '2 3 0',
        '2 3 1',
        '2 2 1',
        '3 2 1',
        '3 1 1',
        '-1',
        '19',
        '2',
        '0 14 ',
        'H H ',
        '9',
        '1 1 0',
        '2 1 0',
        '2 2 0',
        '2 3 0',
        '2 4 0',
        '2 5 0',
        '2 6 0',
        '2 7 0',
        '3 7 0',
        '-1',
        '17',
        '2',
        '4 18 ',
        'V V ',
        '9',
        '1 5 0',
        '1 4 0',
        '2 4 0',
        '2 3 0',
        '2 2 0',
        '3 2 0',
        '4 2 0',
        '5 2 0',
        '5 3 0',
        '-1',
        '18',
        '2',
        '1 3 ',
        'H H ',
        '5',
        '1 1 1',
        '0 1 1',
        '0 2 1',
        '0 3 1',
        '1 3 1',
        '-1',
        '20',
        '2',
        '0 19 ',
        'V V ',
        '8',
        '1 1 0',
        '1 2 0',
        '2 2 0',
        '2 2 1',
        '3 2 1',
        '4 2 1',
        '5 2 1',
        '5 3 1',
        '-1',
        '19',
        '2',
        '3 21 ',
        'V V ',
        '7',
        '1 3 1',
        '1 4 1',
        '2 4 1',
        '3 4 1',
        '4 4 1',
        '5 4 1',
        '5 5 1',
        '-1',
        '18',
        '2',
        '6 18 ',
        'V V ',
        '9',
        '1 7 0',
        '1 6 0',
        '2 6 0',
        '2 5 0',
        '2 4 0',
        '3 4 0',
        '4 4 0',
        '5 4 0',
        '5 3 0',
        '-1',
        '18',
        '2',
        '5 7 ',
        'H H ',
        '5',
        '1 5 1',
        '0 5 1',
        '0 6 1',
        '0 7 1',
        '1 7 1',
        '-1',
        '21',
        '2',
        '0 13 ',
        'V V ',
        '8',
        '1 1 0',
        '1 2 0',
        '2 2 0',
        '2 3 0',
        '2 3 1',
        '2 4 1',
        '3 4 1',
        '3 5 1',
        '-1',
        '22',
        '2',
        '0 2 ',
        'H H ',
        '5',
        '1 1 0',
        '0 1 0',
        '0 2 0',
        '0 3 0',
        '1 3 0',
        '-1',
        '23',
        '2',
        '0 4 ',
        'H H ',
        '7',
        '1 1 0',
        '0 1 0',
        '0 2 0',
        '0 3 0',
        '0 4 0',
        '0 5 0',
        '1 5 0',
        '-1',
        '21',
        '2',
        '18 19 ',
        'H H ',
        '4',
        '5 3 0',
        '4 3 0',
        '4 3 1',
        '5 3 1',
        '-1',
        '24',
        '2',
        '0 7 ',
        'V V ',
        '10',
        '1 1 0',
        '1 2 0',
        '0 2 0',
        '0 3 0',
        '0 3 1',
        '0 4 1',
        '0 5 1',
        '0 6 1',
        '1 6 1',
        '1 7 1',
        '-1',
        '22',
        '2',
        '11 13 ',
        'H H ',
        '5',
        '3 3 1',
        '2 3 1',
        '2 4 1',
        '2 5 1',
        '3 5 1',
        '-1',
        '20',
        '2',
        '9 14 ',
        'V V ',
        '12',
        '3 1 1',
        '3 0 1',
        '4 0 1',
        '4 1 1',
        '4 1 0',
        '4 2 0',
        '4 3 0',
        '4 4 0',
        '4 5 0',
        '4 6 0',
        '3 6 0',
        '3 7 0',
        '-1',
        '23',
        '2',
        '2 17 ',
        'V V ',
        '8',
        '1 3 0',
        '1 2 0',
        '2 2 0',
        '2 2 1',
        '3 2 1',
        '4 2 1',
        '5 2 1',
        '5 1 1',
        '-1',
        '24',
        '2',
        '2 15 ',
        'H H ',
        '8',
        '1 3 0',
        '2 3 0',
        '2 4 0',
        '2 4 1',
        '2 5 1',
        '2 6 1',
        '2 7 1',
        '3 7 1',
        '-1',
        '23',
        '2',
        '13 21 ',
        'H H ',
        '3',
        '3 5 1',
        '4 5 1',
        '5 5 1',
        '-1',
        '25',
        '2',
        '7 16 ',
        'H H ',
        '12',
        '1 7 1',
        '2 7 1',
        '2 6 1',
        '2 5 1',
        '2 4 1',
        '2 3 1',
        '2 2 1',
        '3 2 1',
        '3 2 0',
        '4 2 0',
        '4 1 0',
        '5 1 0',
        '-1',
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
