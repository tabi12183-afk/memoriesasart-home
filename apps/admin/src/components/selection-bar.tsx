import { notNullish } from '~/lib/utils';
import { Button } from './button';

interface SelectionBarProps {
	count: number;
	onChoose: () => void;
	onClear?: () => void;
	disabled?: boolean;
}

export function SelectionBar({ count, onChoose, onClear, disabled = false }: SelectionBarProps) {
	return (
		<div className="flex items-center justify-between shrink-0">
			<p className="text-sm font-medium">
				{count} {count === 1 ? 'item' : 'items'} selected
			</p>
			<div className="flex items-center gap-2">
				{count > 1 && notNullish(onClear) ? (
					<Button type="button" variant="outline" size="sm" onClick={onClear}>
						Clear All
					</Button>
				) : null}
				<Button type="button" size="sm" disabled={disabled} onClick={onChoose}>
					Choose Selected
				</Button>
			</div>
		</div>
	);
}
