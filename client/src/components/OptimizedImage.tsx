import { OptimizedImageProps, generateImageMetadata, generateImageSrcSet, generateImageSizes } from "@/utils/imageOptimization";

export default function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  width, 
  height, 
  priority = false 
}: OptimizedImageProps) {
  const imageMetadata = generateImageMetadata(src, alt);
  
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? "eager" : imageMetadata.loading}
      decoding={imageMetadata.decoding}
      srcSet={generateImageSrcSet(src)}
      sizes={generateImageSizes()}
    />
  );
}