'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';
import { cn, notNullish, nullish } from '~/lib/utils';
import { Input } from './input';
import { Field, FieldLabel } from './field';
import { SelectionBar } from './selection-bar';

export interface FileMetadata {
	name: string;
	alt: string;
	tags: string;
}

interface DropzoneProps {
	onFileUpload?: (file: File, metadata: FileMetadata) => void | Promise<void>;
	mediaType?: string;
	multiSelect?: boolean;
	className?: string;
}

interface SelectedFile {
	file: File;
	preview: string;
	id: string;
	metadata: FileMetadata;
}

const acceptByType: Record<string, string> = {
	image: 'image/*',
};

export function Dropzone({ onFileUpload, mediaType = 'image', multiSelect = false, className }: DropzoneProps) {
	const [isDragging, setIsDragging] = useState(false);
	const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	}, []);

	const clearSelectedFiles = useCallback(() => {
		setSelectedFiles((prev) => {
			for (const f of prev) {
				URL.revokeObjectURL(f.preview);
			}
			return [];
		});
	}, []);

	const handleFileInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files;
			if (notNullish(files) && files.length > 0) {
				clearSelectedFiles();
				const sourceFiles = multiSelect ? Array.from(files) : [files[0]!];
				const newFiles: SelectedFile[] = sourceFiles.map((file) => ({
					file,
					preview: URL.createObjectURL(file),
					id: Math.random().toString(36).substring(2, 9),
					metadata: {
						name: file.name.replace(/\.[^/.]+$/, ''),
						alt: '',
						tags: '',
					},
				}));
				setSelectedFiles(newFiles);
			}
			// Reset the input so selecting the same file again re-fires the change event.
			e.target.value = '';
		},
		[clearSelectedFiles, multiSelect],
	);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			setIsDragging(false);

			const files = e.dataTransfer.files;
			if (files.length > 0) {
				clearSelectedFiles();
				const sourceFiles = multiSelect ? Array.from(files) : [files[0]!];
				const newFiles: SelectedFile[] = sourceFiles.map((file) => ({
					file,
					preview: URL.createObjectURL(file),
					id: Math.random().toString(36).substring(2, 9),
					metadata: {
						name: file.name.replace(/\.[^/.]+$/, ''),
						alt: '',
						tags: '',
					},
				}));
				setSelectedFiles(newFiles);
			}
		},
		[clearSelectedFiles, multiSelect],
	);

	const removeFile = (id: string) => {
		setSelectedFiles((prev) => {
			prev.filter((f) => f.id === id).forEach((f) => URL.revokeObjectURL(f.preview));
			return prev.filter((f) => f.id !== id);
		});
	};

	const updateMetadata = (id: string, updates: Partial<FileMetadata>) => {
		setSelectedFiles((prev) => prev.map((f) => (f.id === id ? { ...f, metadata: { ...f.metadata, ...updates } } : f)));
	};

	const uploadAll = async () => {
		/* v8 ignore next -- @preserve */
		if (nullish(onFileUpload)) return;
		try {
			for (const file of selectedFiles) {
				await onFileUpload(file.file, file.metadata);
			}
		} catch {
			// The upload callback surfaces its own errors; keep the selection for retry.
			return;
		}
		clearSelectedFiles();
	};

	const clearAll = () => {
		clearSelectedFiles();
	};

	return (
		<div className={cn('flex flex-col gap-4 flex-1 min-h-0', className)}>
			<SelectionBar
				count={selectedFiles.length}
				onChoose={uploadAll}
				onClear={selectedFiles.length > 1 ? clearAll : undefined}
				disabled={selectedFiles.length === 0 || nullish(onFileUpload)}
			/>
			<div
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				className={cn(
					'border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer shrink-0',
					isDragging
						? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
						: 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500',
				)}
			>
				<input
					type="file"
					accept={acceptByType[mediaType] ?? 'image/*'}
					onChange={handleFileInput}
					className="hidden"
					id="dropzone-file"
					multiple={multiSelect}
				/>
				<label htmlFor="dropzone-file" className="cursor-pointer block text-center">
					<div className="flex flex-col items-center gap-2">
						<div className="p-3 rounded-full bg-muted">
							<Upload className="h-6 w-6 text-muted-foreground" />
						</div>
						<p className="text-sm font-medium">{isDragging ? 'Drop files here' : 'Drag & drop files here'}</p>
						<p className="text-xs text-muted-foreground">or click to browse</p>
					</div>
				</label>
			</div>
			{selectedFiles.length > 0 ? (
				<div className="space-y-2 overflow-y-auto min-h-0 flex-1">
					{selectedFiles.map((file) => (
						<div key={file.id} className="flex flex-col gap-3 p-3 border rounded-lg">
							<div className="flex items-center gap-3">
								<Image
									src={file.preview}
									alt={file.file.name}
									width={48}
									height={48}
									className="h-12 w-12 object-cover rounded"
									unoptimized
								/>
								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium truncate">{file.file.name}</p>
									<p className="text-xs text-muted-foreground">{(file.file.size / 1024).toFixed(1)} KB</p>
								</div>
								<div className="flex items-center gap-2">
									<button
										type="button"
										onClick={() => removeFile(file.id)}
										aria-label={`Remove ${file.file.name}`}
										className="p-1 rounded-full hover:bg-muted transition-colors"
									>
										<X className="h-4 w-4" />
									</button>
								</div>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
								<Field className="space-y-1">
									<FieldLabel className="text-xs">Name</FieldLabel>
									<Input
										type="text"
										value={file.metadata.name}
										onChange={(e) => updateMetadata(file.id, { name: e.target.value })}
										placeholder="Image name"
									/>
								</Field>
								<Field className="space-y-1">
									<FieldLabel className="text-xs">Alt Text</FieldLabel>
									<Input
										type="text"
										value={file.metadata.alt}
										onChange={(e) => updateMetadata(file.id, { alt: e.target.value })}
										placeholder="Description for accessibility"
									/>
								</Field>
								<Field className="space-y-1">
									<FieldLabel className="text-xs">Tags</FieldLabel>
									<Input
										type="text"
										value={file.metadata.tags}
										onChange={(e) => updateMetadata(file.id, { tags: e.target.value })}
										placeholder="e.g., nature, landscape"
									/>
								</Field>
							</div>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
}
