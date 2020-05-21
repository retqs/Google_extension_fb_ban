const bot = {
  first_name: '',
  last_name: '',
  href: '',
  img: '',
};

const user = document.querySelector('._2nlw._2nlv');

bot.first_name = user.innerText.split(' ')[0];
bot.last_name = user.innerText.split(' ')[1];
bot.href = user.href;
bot.img = document.querySelector('._11kf.img').src;

chrome.storage.sync.set({bot: bot}, function () {
  console.log('saved -->', bot);
});

window.onpopstate = function () {
  window.location.reload();
};
