export default function decorate(block){
  const picture = block.querySelector('picture');
  const link = block.querySelector('a');

  if (!picture || !link) return;

  const url = new URL(link.href);

  const videoId = url.searchParams.get('v') || url.pathname.split('/').pop();

  // Create wrapper div
  const wrapper = document.createElement('div');
  wrapper.className = 'embed-placeholder';

  // Move existing image inside wrapper
  wrapper.appendChild(picture);

  // Create play button
  const playBtn = document.createElement('div');
  playBtn.className = 'play-button';
  wrapper.appendChild(playBtn);

  // Clear block and insert only wrapper
  block.innerHTML = '';
  block.appendChild(wrapper);

  // When clicked → load video
  wrapper.addEventListener('click', function () {
    block.innerHTML = `
      <div style="position:relative; padding-bottom:56.25%; height:0;">
        <iframe
          src="https://www.youtube.com/embed/${videoId}?autoplay=1"
          allow="autoplay; encrypted-media"
          allowfullscreen
          style="position:absolute; top:0; left:0; width:100%; height:100%;">
        </iframe>
      </div>
    `;
  });

}