import React from 'react';

// Lazy load Giscus to reduce initial bundle size
export default function GiscusComments() {
  const [GiscusComponent, setGiscusComponent] = React.useState<React.ComponentType<any> | null>(null);
  
  React.useEffect(() => {
    // Dynamically import Giscus only when component is mounted
    import('@giscus/react').then(module => {
      setGiscusComponent(() => module.default);
    });
  }, []);
  
  if (!GiscusComponent) {
    return <div className="text-center py-4">Loading comments...</div>;
  }
  
  // Only render Giscus when component is loaded
  return (
    <div className="giscus-wrapper">
      <GiscusComponent
        repo="BahauddinChishte/about-me"
        repoId="R_kgDOHnUndw"
        category="General"
        categoryId="DIC_kwDOHnUnd84CoVpe"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="preferred_color_scheme"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}