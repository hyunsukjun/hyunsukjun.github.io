(() => {
  const artwork = document.getElementById('home-line-art');
  const toggle = document.querySelector('.motion-toggle');
  const motionPreference = matchMedia('(prefers-reduced-motion: no-preference)');
  if (!artwork.animate || !window.IntersectionObserver || !motionPreference.addEventListener) return;

  const shifts = [0.9, 0.82, 0.74];
  const layers = Array.from(artwork.querySelectorAll('img'));
  let animations = [];
  let visible = false;
  let paused = false;

  const canPlay = () => motionPreference.matches && visible && !document.hidden && !paused;

  function startWave() {
    // Share the rhythm so adjacent bands stay close as the whole drawing moves.
    const strength = 0.9 + Math.random() * 0.28;
    const duration = 3600 + Math.random() * 1400;
    const easing = 'ease-in-out';
    const startTime = document.timeline.currentTime;
    animations = layers.map((image, index) => {
      const animation = image.animate([
        { transform: 'none', easing },
        {
          offset: 0.38,
          transform: `translateX(${shifts[index] * strength}%) scale(${1 + 0.025 * strength}, ${1 + 0.014 * strength})`,
          easing,
        },
        { offset: 0.72, transform: 'translateX(-.22%) scale(1.006, .996)', easing },
        { transform: 'none' },
      ], { duration });
      if (startTime !== null) animation.startTime = startTime;
      return animation;
    });
    const first = animations[0];
    first.onfinish = () => {
      if (animations[0] === first && canPlay()) startWave();
    };
  }

  function updateMotion() {
    const enabled = motionPreference.matches;
    toggle.hidden = !enabled;
    if (!enabled) {
      animations.forEach(animation => animation.cancel());
      animations = [];
    } else if (canPlay()) {
      if (!animations.length || animations[0].playState === 'finished') startWave();
      else animations.forEach(animation => {
        if (animation.playState === 'paused') animation.play();
      });
    } else {
      animations.forEach(animation => {
        if (animation.playState === 'running') animation.pause();
      });
    }
  }

  toggle.addEventListener('click', () => {
    paused = !paused;
    toggle.textContent = paused ? 'Resume motion' : 'Pause motion';
    updateMotion();
  });
  motionPreference.addEventListener('change', updateMotion);
  document.addEventListener('visibilitychange', updateMotion);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updateMotion();
  }).observe(artwork);
})();
