const bot = {
  first_name: '',
  last_name: '',
  href: '',
  img: '',
};

const user = document.querySelector('._2nlw._2nlv');
const prevUrl = window.location.pathname;
const info = document.createElement('div');
const h1 = document.querySelector('._2nlv');
const emoji = document.createElement('span');

emoji.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 5h2v10h-2v-10zm1 14.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>`;
emoji.style.fill = '#fff';
emoji.style.transform = 'scale(.8)';
user.style.position = 'relative';
info.style.position = 'absolute';

info.style.background = 'black';
info.style.display = 'flex';
info.style.justifyContent = 'center';
info.style.padding = '5px';
info.style.borderRadius = '10px';
info.style.fontSize = '13px';
info.style.top = '50%';
info.style.transform = 'translateY(-50%)';
info.style.right = '-100%';
info.style.width = 'auto';

user.appendChild(info);

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

async function checkUserInBan() {
  try {
    user.style.fontSize = '19px';
    const res = await (
      await fetch(
        `http://multiwpcms.biz.ua/people_checker/index.php?type=get_one&href=${user.href}`
      )
    ).json();

    if (res.account[0] === undefined) {
      info.style.color = '#4dff4d';
      info.style.borderColor = '#4dff4d';
      info.style.borderStyle = 'solid';
      info.style.borderWidth = '1px';
      return (info.innerText = 'Нема в базі');
    } else {
      // const rate = res.account[0].rate;
      const rate = 50;
      info.style.borderStyle = 'solid';
      info.style.borderWidth = '1px';
      info.style.color = '#fff';
      info.innerText = `${rate}% бот`;
      info.appendChild(emoji);
      info.style.borderColor = '#fff';
      info.style.background = '#EEAE27';

      if (rate >= 80) {
        info.style.borderWidth = '1px';
        info.style.color = '#fff';
        info.innerHTML = `$${rate}% бот`;
        info.style.borderColor = '#fff';
        info.style.background = 'linear-gradient(to right,#F04555, #E30318) ';
      }
    }
  } catch (error) {
    console.log(error);
  }
}

checkUserInBan();

window.onload = function () {
  if (!window.location.hash) {
    window.location = window.location + '#loaded';
    window.location.reload();
  }
};
