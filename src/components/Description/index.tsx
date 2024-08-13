import type { FC } from 'react';

const Description: FC = () => (
  <div>
    <div>
      <h1>
        Visualizer for Lattice Surgery
      </h1>
      This is a visualizer for Lattice Surgery.
      <ul>
        <li>
          <strong>score</strong> is the time to execute the circuit.
        </li>
        <li>
          <strong>tooltip</strong> will show up when you hover over the paths.
        </li>
      </ul>
    </div>
  </div>
);

export default Description;
