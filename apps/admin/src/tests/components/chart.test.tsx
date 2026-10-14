import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// recharts' ResponsiveContainer measures the DOM and renders nothing in jsdom;
// swap it for a passthrough so ChartContainer children render.
vi.mock('recharts', async (importOriginal) => ({
	...(await importOriginal<typeof import('recharts')>()),
	ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive">{children}</div>,
}));
import {
	ChartContainer,
	ChartLegendContent,
	ChartStyle,
	ChartTooltipContent,
	type ChartConfig,
} from '~/components/chart';

const config: ChartConfig = {
	revenue: { label: 'Revenue', color: 'var(--chart-1)' },
	themed: { label: 'Themed', theme: { light: '#111', dark: '#eee' } },
	withIcon: { label: 'With icon', icon: () => <svg data-testid="config-icon" /> },
};

const item = (overrides: Record<string, unknown> = {}) => ({
	name: 'revenue',
	dataKey: 'revenue',
	value: 1234,
	color: '#f00',
	payload: { fill: '#0f0' },
	...overrides,
});

const inChart = (children: React.ReactNode) => <ChartContainer config={config}>{children as never}</ChartContainer>;

describe('ChartContainer and ChartStyle', () => {
	it('renders chart chrome with generated color styles', () => {
		const { container } = render(inChart(<span>chart body</span>));
		expect(container.querySelector('[data-chart]')).not.toBeNull();
		const style = container.querySelector('style');
		expect(style?.innerHTML).toContain('--color-revenue');
		expect(style?.innerHTML).toContain('--color-themed: #111;');
		expect(style?.innerHTML).toContain('.dark [data-chart=');
	});

	it('renders no style block when the config has no colors', () => {
		const { container } = render(<ChartStyle id="chart-x" config={{ plain: { label: 'Plain' } }} />);
		expect(container.querySelector('style')).toBeNull();
	});

	it('skips CSS variables when a theme color is empty', () => {
		const { container } = render(
			<ChartStyle id="chart-x" config={{ gapped: { label: 'Gapped', theme: { light: '#abc', dark: '' } } }} />,
		);
		const style = container.querySelector('style')?.innerHTML ?? '';
		expect(style).toContain('--color-gapped: #abc;');
		expect(style).not.toContain('--color-gapped: ;');
	});
});

describe('ChartTooltipContent', () => {
	it('throws when rendered outside a chart', () => {
		vi.spyOn(console, 'error').mockImplementation(() => {});
		expect(() => render(<ChartTooltipContent active payload={[item()] as never} />)).toThrow(
			'useChart must be used within a <ChartContainer />',
		);
		vi.restoreAllMocks();
	});

	it('renders nothing when inactive or empty', () => {
		render(
			inChart(
				<>
					<ChartTooltipContent active={false} payload={[item()] as never} />
					<ChartTooltipContent active payload={[] as never} />
				</>,
			),
		);
		expect(screen.queryByText('1,234')).not.toBeInTheDocument();
	});

	it('shows the configured label and formatted value', () => {
		render(inChart(<ChartTooltipContent active payload={[item()] as never} label="revenue" />));
		expect(screen.getAllByText('Revenue').length).toBeGreaterThan(0);
		expect(screen.getByText('1,234')).toBeInTheDocument();
	});

	it('falls back to the raw label when the config has no label for it', () => {
		render(inChart(<ChartTooltipContent active payload={[item()] as never} label="unknown" />));
		expect(screen.getByText('unknown')).toBeInTheDocument();
	});

	it('falls back through label keys and omits the label when there is nothing to show', () => {
		render(
			inChart(
				<>
					<ChartTooltipContent active payload={[item({ dataKey: undefined, name: undefined })] as never} />
					<ChartTooltipContent active payload={[item({ dataKey: 'unknown', name: undefined })] as never} />
				</>,
			),
		);
		expect(screen.queryByText('Revenue')).not.toBeInTheDocument();
	});

	it('supports label formatters, hidden labels, and custom formatters', () => {
		render(
			inChart(
				<>
					<ChartTooltipContent
						active
						payload={[item()] as never}
						labelFormatter={(value) => `label:${String(value)}`}
					/>
					<ChartTooltipContent active hideLabel payload={[item()] as never} />
					<ChartTooltipContent
						active
						payload={[item()] as never}
						formatter={(value, name) => (
							<span>
								custom {String(name)}={String(value)}
							</span>
						)}
					/>
				</>,
			),
		);
		expect(screen.getByText('label:Revenue')).toBeInTheDocument();
		expect(screen.getByText('custom revenue=1234')).toBeInTheDocument();
	});

	it('renders line and dashed indicators with nested labels', () => {
		render(
			inChart(
				<>
					<ChartTooltipContent active indicator="line" payload={[item()] as never} />
					<ChartTooltipContent active indicator="dashed" payload={[item()] as never} />
				</>,
			),
		);
		expect(screen.getAllByText('1,234')).toHaveLength(2);
	});

	it('renders configured icons, skips none-type items, and stringifies values', () => {
		render(
			inChart(
				<ChartTooltipContent
					active
					hideLabel
					payload={
						[
							item({ name: 'withIcon', dataKey: 'withIcon', value: 'high' }),
							item({ name: 'skipped', type: 'none' }),
							item({ name: 'mystery', dataKey: 'mystery', value: null }),
						] as never
					}
				/>,
			),
		);
		expect(screen.getByTestId('config-icon')).toBeInTheDocument();
		expect(screen.getByText('high')).toBeInTheDocument();
		expect(screen.queryByText('skipped')).not.toBeInTheDocument();
		expect(screen.getByText('mystery')).toBeInTheDocument();
	});

	it('resolves config through payload string keys', () => {
		render(
			inChart(
				<ChartTooltipContent
					active
					hideIndicator
					labelKey="series"
					nameKey="series"
					payload={[item({ series: 'revenue', payload: { series: 'revenue' } })] as never}
				/>,
			),
		);
		expect(screen.getAllByText('Revenue').length).toBeGreaterThan(0);
	});

	it('resolves config from the nested payload when the top level lacks the key', () => {
		render(
			inChart(
				<ChartTooltipContent
					active
					hideIndicator
					nameKey="series"
					hideLabel
					payload={[item({ name: 'x', payload: { series: 'revenue' } })] as never}
				/>,
			),
		);
		expect(screen.getByText('Revenue')).toBeInTheDocument();
	});

	it('gracefully handles non-object payload items', () => {
		render(inChart(<ChartTooltipContent active hideLabel payload={[42] as never} />));
		expect(screen.getByText('undefined')).toBeInTheDocument();
	});
});

describe('ChartLegendContent', () => {
	it('renders nothing without payload', () => {
		render(inChart(<ChartLegendContent />));
		expect(screen.queryByText('Revenue')).not.toBeInTheDocument();
	});

	it('renders legend entries with icons or color swatches', () => {
		render(
			inChart(
				<>
					<ChartLegendContent
						verticalAlign="top"
						payload={
							[
								{ dataKey: 'revenue', value: 'revenue', color: '#f00' },
								{ dataKey: 'withIcon', value: 'withIcon', color: '#00f' },
								{ dataKey: 'gone', value: 'gone', type: 'none' },
							] as never
						}
					/>
					<ChartLegendContent hideIcon payload={[{ dataKey: 'withIcon', value: 'withIcon' }] as never} />
				</>,
			),
		);
		expect(screen.getByText('Revenue')).toBeInTheDocument();
		expect(screen.getAllByText('With icon')).toHaveLength(2);
		expect(screen.queryByText('gone')).not.toBeInTheDocument();
	});

	it('falls back to the payload value when there is no data key', () => {
		render(inChart(<ChartLegendContent payload={[{ value: 'withIcon', color: '#00f' }] as never} />));
		expect(screen.getByText('With icon')).toBeInTheDocument();
	});
});
