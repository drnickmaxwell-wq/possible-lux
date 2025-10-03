import FourKHeroVideo from '@/components/hero/4k-hero-video';
import MinimalHeroVideo from '@/components/layout/hero-video-minimal';
import SplitHeroVideo from '@/components/layout/hero-video-split';

export type HeroVariant = 'video-4k' | 'video-minimal' | 'video-split';

type CommonProps = {
  title: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  videoSrc?: string;
  posterImage?: string;
  className?: string;
};

export default function Hero({
  variant = 'video-4k',
  ...props
}: CommonProps & { variant?: HeroVariant }) {
  switch (variant) {
    case 'video-minimal':
      return <MinimalHeroVideo {...props} />;
    case 'video-split':
      return <SplitHeroVideo {...props} />;
    default:
      // Uses your existing 4K hero component (unchanged brand)
      return (
        <FourKHeroVideo
          title={props.title}
          subtitle={props.subtitle ?? ''}
          ctaText={props.ctaText ?? 'Book Free Consultation'}
          onCtaClick={props.onCtaClick ?? (() => (window.location.href = '/appointments'))}
          videoSrc={props.videoSrc}
          posterImage={props.posterImage}
          className={props.className}
          showControls
        />
      );
  }
}
