import type { ImageProps } from 'next/image';
import Image from 'next/image';

const CustomImage = (props: ImageProps) => <Image {...props} />;

export default CustomImage;
