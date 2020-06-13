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
const hint = document.createElement('div');
const bottomText = document.createElement('div');
const link = document.createElement('a');
link.innerText = 'АнтиФейк'
bottomText.innerText = 'Дані:';
bottomText.style.marginTop = '10px';
bottomText.style.fontWeight = '400'

hint.style.height = '57px';
hint.style.width = '290px';
hint.style.position = 'absolute';
hint.style.background = '#fff'
hint.style.top = '-75px';
hint.style.left = '50%';
hint.style.transform = 'translateX(-50%)'
hint.style.fontSize = '12px'
hint.style.borderRadius = '10px';
hint.style.textAlign = 'center';
hint.style.lineHeight = '14px';
hint.style.color = '#242526';
hint.style.paddingTop = '5px'
hint.style.paddingBottom = '5px'
hint.style.visibility = 'hidden';
hint.style.fontWeight = '400';
hint.style.padding = '5px'

emoji.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 5h2v10h-2v-10zm1 14.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>`;
emoji.style.fill = '#fff';
emoji.style.transform = 'scale(.8)';
emoji.style.display = 'flex';
emoji.style.alignItems = 'center';
emoji.style.position = 'absolute';
emoji.style.left = '0'
user.style.position = 'relative';
info.style.position = 'absolute';
info.style.paddingLeft = '25px';
info.style.paddingTop = '5px';
info.style.paddingBottom = '5px';
info.style.paddingRight = '5px';
info.style.display = 'flex';
info.style.justifyContent = 'center';
info.style.alignItems = 'center';
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
       const rate = res.account[0].rate;

      info.style.borderStyle = 'solid';
      info.style.borderWidth = '1px';
      info.style.color = '#fff';
      info.innerText = `${rate}% бот`;
      info.style.borderColor = '#fff';
      info.style.background = `linear-gradient(170.13deg, #FFD600 12.08%, #FE7A00 87.92%)`;
      hint.innerText = `З ймовірністю ${rate}% цей акаунт є фейковим і агітує за Козловського`
      bottomText.appendChild(link);
hint.appendChild(bottomText);

      info.appendChild(emoji);
      info.appendChild(hint);
      
      info.addEventListener('mouseover',() => hint.style.visibility ='visible')
      info.addEventListener('mouseout',() => hint.style.visibility ='hidden')

      if (rate >= 80) {
        info.addEventListener('mouseover',() => hint.style.visibility ='visible')
      info.addEventListener('mouseout',() => hint.style.visibility ='hidden')
        info.style.borderWidth = '1px';
        info.style.color = '#fff';
        info.innerHTML = `${rate}% бот`;
        info.style.borderColor = '#fff';
        info.style.background = `linear-gradient(170.13deg, #FF8E99 12.08%, #E20015 87.92%)`;
        hint.innerText = `З ймовірністю ${rate}% цей акаунт є фейковим і агітує за Козловського`
        info.appendChild(emoji);
        info.appendChild(hint);
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
