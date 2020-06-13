const apiURL = 'http://multiwpcms.biz.ua/people_checker/index.php?type=read';

let bot;

chrome.tabs.onUpdated.addListener(function (tabId, info) {
  if (info.status === 'complete') {
    chrome.storage.sync.get(['bot'], function (items) {
      bot = items.bot;
    });
  }
});

chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
  chrome.storage.sync.get(['bot'], function (items) {
    bot = items.bot;
  });
});

const form = document.getElementById('form');
const formSubmit = document.querySelector('.formSubmit');
const buttons = document.querySelectorAll('.popupMenuBtn');
const urlInput = document.getElementById('url');
const commentInput = document.getElementById('comment');
const completeWindow = document.querySelector('.popupDoneWindow');
const completeWindowBtn = document.querySelector('.popupDoneWindow__btn');
const formSection = document.querySelector('.formSection');
const listSection = document.querySelector('.listSection');
const usersList = document.querySelector('.usersList');

const inputValues = {
  url: '',
  comment: '',
};

urlInput.addEventListener('input', (e) => (inputValues.url = e.target.value));
commentInput.addEventListener(
  'input',
  (e) => (inputValues.comment = e.target.value)
);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch(
    `http://multiwpcms.biz.ua/people_checker/index.php?type=send&key=tpghmerogime359348fhnskhioewhiuo34iofhiuwehfuieghiueb34b___fgerpigj34oihvgiu434__4-%%&first_name=${bot.first_name}&last_name=${bot.last_name}&href=${bot.href}&link=${inputValues.url}`
  );

  if (res.status === 200) completeWindow.style['visibility'] = 'visible';
});

const listItemTemplate = ({first_name, href, image, second_name}, i) => `
    <li class="user">
        <figure class="userAvatar">
            <img src='${image}' alt="not" />
        <span class="user__index">${i + 1}</span>
        </figure>
        <article class="userInfo">
          <a href='${href}'>
            <h3 class="userInfo__name">${first_name} ${second_name}</h3>
          </a>
        </article>
    </li>
`;

async function getUsersList() {
  const res = await (await fetch(apiURL)).json();

  res.accounts.map((user, i) =>
    usersList.insertAdjacentHTML('beforeend', listItemTemplate(user, i))
  );
}

buttons.forEach((e) =>
  e.addEventListener('click', function () {
    buttons.forEach((btn) => btn.classList.remove('active'));
    this.classList.add('active');
    if (this.dataset.tab === 'form') {
      formSection.style['display'] = 'block';
      listSection.style['display'] = 'none';
    } else {
      formSection.style['display'] = 'none';
      listSection.style['display'] = 'block';
    }
  })
);

completeWindowBtn.addEventListener('click', () => {
  completeWindow.style['visibility'] = 'hidden';
  urlInput.value = '';
  commentInput.value = '';
});

getUsersList();
