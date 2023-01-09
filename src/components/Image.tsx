import type { ImageProps } from 'next/image';
import Image from 'next/image';

const CustomImage = ({ ...rest }: ImageProps) => <Image {...rest} />;

export default CustomImage;
