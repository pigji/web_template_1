//JSON 파일에서 항목 가져오기
function loadItems(){
  //fetch함수는 Promise자체를 반환합니다.
  return fetch('data.json')
    .then(res => res.json())
    .then(json => json.items)
}

//주어진 항목으로 목록 업데이트
function displayItems(items){
  const container = document.querySelector(".items"); //ul태그 선택
  //innerHTML속성을 이용하여 container요소 안에 내용을 채워줌
  container.innerHTML = items.map(item => createHTMLString(item)).join('');
  //이때 매개변수로 전달 받은 items는 data.json에 담겨있는 items정보를 참조
  //.map()메소드를 이용하여 items배열에 담겨있는 정보를 순차적으로 전달하여 createHTMLString함수의 인자로 전달하고, join()메소드를 이요하여 모든 요소를 하나의 문자열로 만들어준다.
}

//주어진 데이터 항목에서 HTML 목록 항목 만들기
function createHTMLString(item){
  //return으로 함수를 호출한 곳으로 태그를 작성하여 반환
  //item의 정보를 이용하여 각각의 속성 값과 text로 적용합니다.
  return `
    <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
      <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
  `;
}

//이벤트 리스너가 담겨 있는 함수
function setEveentListeners(items){
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");

  //logo를 클릭하면 displayItems함수를 호출, 인자값으로 items(목록 데이터 전체)를 전달
  logo.addEventListener('click', () => displayItems(items))

  //buttons그룹에 클릭이벤트가 발생하면 onButtonClick함수 호출 인자값으로 event객체와 items(목록 데이터)를 전달
  buttons.addEventListener('click', (event) => onButtonClick(event, items));
}

//아이콘을 클릭했을때 실행될 함수
function onButtonClick(event, items){
  //event.target = 클릭한 요소
  const dataset = event.target.dataset;
  //변수 key에 data-key 속성 값을 할당
  const key = dataset.key;
  //변수 value data-value 속성 값을 할당
  const value = dataset.value;

  //displayItems함수의 인자 값으로 event.target의 data-key값과 items의 프로퍼티 이름이 일치하는 값을 찾고,
  //data-value값과 item의 해당 프로퍼티 값이 일치하는지 확인하여 일치하면 displayItems의 인자로 전달합니다.
  displayItems(items.filter(item => item[key] === value))
}

//loadItems함수 호출
loadItems()
  .then(items => {
    //items배열을 콘솔에 출력
    //console.log(items)
    displayItems(items);  //displayItems함수 호출, items를 인자로 전달
    setEveentListeners(items);  //setEventlisteners함수 호출, items를 인자로 전달
  })
  .catch(console.log);  //이행 거절 시 catch메소드의 인수를 통해 거절 이유를 전달 받음