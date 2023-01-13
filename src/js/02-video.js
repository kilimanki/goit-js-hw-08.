import videoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new videoPlayer(iframe);

player.on(
  'timeupdate',
  throttle(function (e) {
    const stringTime = JSON.stringify(e);
    localStorage.setItem('videoplayer-current-time', stringTime);
  }),
  1000
);
const parsed = JSON.parse(localStorage.getItem('videoplayer-current-time'));
player
  .setCurrentTime(parsed.seconds)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
