import { createElement } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { MemoriesPortfolio } from '../../packages/components/src/lib/photography/memories-portfolio';

const root = document.getElementById('photography-preview');
if (root) hydrateRoot(root, createElement(MemoriesPortfolio, { pagePath: root.dataset.pagePath }));
