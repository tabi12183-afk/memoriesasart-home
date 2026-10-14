'use client';

import { useState } from 'react';
import { MediaLibrary } from '~/components/media-library';
import { MediaGrid } from '~/components/media-grid';

export default function MediaPage() {
	const [refreshKey, setRefreshKey] = useState(0);

	return (
		<div className="px-4 lg:px-6">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">Media Library</h1>
			</div>

			<MediaLibrary showLibraryTab={false} onUpload={() => setRefreshKey((k) => k + 1)} />
			<MediaGrid key={refreshKey} />
		</div>
	);
}
