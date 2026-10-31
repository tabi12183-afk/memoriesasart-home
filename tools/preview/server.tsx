import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { MemoriesPortfolio } from '../../packages/components/src/lib/photography/memories-portfolio';
export const render = (pagePath: string) => renderToString(createElement(MemoriesPortfolio, { pagePath }));
