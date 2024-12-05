import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Upload, message } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { useState } from 'react'
import styles from '../employees.module.css'

interface ImageUploadProps {
	value?: string
	onChange?: (value: string) => void
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
	const reader = new FileReader()
	reader.addEventListener('load', () => callback(reader.result as string))
	reader.readAsDataURL(img)
}

const beforeUpload = (file: RcFile) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
	if (!isJpgOrPng) {
		message.error('Можно загрузить только JPG/PNG файлы!')
		return false
	}
	const isLt2M = file.size / 1024 / 1024 < 2
	if (!isLt2M) {
		message.error('Изображение должно быть меньше 2MB!')
		return false
	}
	return true
}

export const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
	const [loading, setLoading] = useState(false)
	const [imageUrl, setImageUrl] = useState<string>(value || '')

	const handleChange: UploadProps['onChange'] = (
		info: UploadChangeParam<UploadFile>
	) => {
		if (info.file.status === 'uploading') {
			setLoading(true)
			return
		}

		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj as RcFile, url => {
				setLoading(false)
				setImageUrl(url)
				onChange?.(url)
			})
		}
	}

	const customRequest = async ({ file, onSuccess }: any) => {
		if (!beforeUpload(file as RcFile)) {
			return
		}

		try {
			setTimeout(() => {
				onSuccess('ok')
			}, 0)
		} catch (error) {
			message.error('Ошибка загрузки файла')
		}
	}

	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Загрузить</div>
		</div>
	)

	const handleRemove = () => {
		setImageUrl('')
		onChange?.('')
		return true
	}

	return (
		<Upload
			name='avatar'
			listType='picture-card'
			className={styles.imageUpload}
			showUploadList={false}
			customRequest={customRequest}
			onChange={handleChange}
			onRemove={handleRemove}
		>
			{imageUrl ? (
				<img
					src={imageUrl}
					alt='avatar'
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
					}}
				/>
			) : (
				uploadButton
			)}
		</Upload>
	)
}
