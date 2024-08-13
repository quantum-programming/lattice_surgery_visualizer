import type { FC } from 'react';
import { type VisualizerSettingInfo } from '../../types';

import styles from './index.module.css';

type InputOutputProps = {
  visualizerSettingInfo: VisualizerSettingInfo;
  setVisualizerSettingInfo: React.Dispatch<
    React.SetStateAction<VisualizerSettingInfo>
  >;
};

const InputOutput: FC<InputOutputProps> = ({
  visualizerSettingInfo,
  setVisualizerSettingInfo,
}) => {
  const onChangeOutput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVisualizerSettingInfo((prev) => ({
      ...prev,
      output: e.target.value,
    }));
  };

  return (
    <>
      <div>
        <label>
          Output: <br />
          <textarea
            className={styles.textArea} //eslint-disable-line
            rows={4}
            value={visualizerSettingInfo.output}
            onChange={onChangeOutput}
          ></textarea>
        </label>
      </div>
    </>
  );
};

export default InputOutput;
