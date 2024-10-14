//변수 생성
  //top버튼 선택
const btn = document.querySelector(".top");

//브라우저 내에서 스크롤 이벤트가 발생했을때
addEventListener('scroll', () => {
  //변수 생성
  let scrollTop = window.scrollY; //스크롤 이동 값
  
  //스크롤 이동 값이 20보다 크면
  if(scrollTop > 20){
    btn.style.display = 'block';  //버튼을 화면에 표시
  }
  else{
    btn.style.display = 'none'; //버튼을 화면에서 제거
  }
});

//버튼을 클릭하면 브라우저 최상단으로 이동
btn.addEventListener('click', (e) => {
  e.preventDefault(); //a태그 링크기능 제거

  //window에 srollTo API를 사용하여 페이지 상단으로 부드럽게 스크롤 이동
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth'  //부드러운 스크롤 이동
  })
})

//스크롤 이동시 member이미지가 나타남
addEventListener("scroll", () => {
  let scrollTop = window.screenY; //스크롤 이동 값
  const works = document.querySelector("#works");
  const member = document.querySelector(".member");

  //브라우저 상단에서 부터 요소의 top위치까지의 거리 + 스크롤 이동 값 = 페이지 최상단에서부터 #works의 top위치까지의 거리
  let worksTop = works.getBoundingClientRect().top + scrollTop;
  
  //스크롤 이동값이 works의 top위치 값보다 커지면 실행
  if(scrollTop > worksTop){
    member.classList.add("on"); //member에 on클래서 추가
  }
  //스크롤 이동값이 works의 top위치보다 작으면 실행
  else{
    member.classList.remove("on");
  }
})