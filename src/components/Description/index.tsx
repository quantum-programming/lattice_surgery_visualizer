import type { FC } from 'react';

const Description: FC = () => (
  <div>
    <div>
      <h1>Lattice Surgery Visualizer</h1>
      This is a visualizer for Lattice Surgery.
      <ul>
        <li>
          <strong>tooltip</strong> will show up when you hover over the paths.
        </li>
      </ul>
      GitHub repository:{' '}
      <a href="https://github.com/quantum-programming/lattice_surgery_visualizer">
        <img
          style={{
            width: '25px',
            height: '25px',
            verticalAlign: 'middle',
          }}
          src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
          alt="GitHub"
        />
      </a>
    </div>
  </div>
);

export default Description;
