'use client';
import LazySection from './components/LazySection/LazySection';

export default function Home() {
  return (
    <>
      <LazySection importFn={() => import('./components/Navbar/Navbar')} />
      <LazySection importFn={() => import('./components/Hero/Hero')} />
      <LazySection importFn={() => import('./components/Features/Features')} />
      <LazySection importFn={() => import('./components/Interface/Interface')} />
      <LazySection importFn={() => import('./components/Testimonials/Testimonials')} />
      <LazySection importFn={() => import('./components/AdminTools/AdminTools')} />
      <LazySection importFn={() => import('./components/Pricing/Pricing')} />
      <LazySection importFn={() => import('./components/CTA/CTA')} />
      <LazySection importFn={() => import('./components/Footer/Footer')} />
    </>
  );
}
