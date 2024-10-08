//html문서를 모두 load한 후에 script코드 실행
addEventListener("load",() => {
  //현재 장치의 상태를 저장(mobile 또는 pc)
  let deviceStatus = '';
  //subSlideUp함수는 모바일 내비게이션 메뉴의 모든 하위 메뉴(.sub)의 maxHeight를 0px로 설정하여 하위 메뉴들을 숨깁니다.
  function subSlideUp(){
    document.querySelectorAll('.mobile_nav .sub').forEach(item => {
      item.style.maxHeight = '0px';
    })
  }

  //reset함수는 모바일 네비게이션 및 관련 ui요소를 초기상태로 돌립니다.
  //reset함수 생성
  function reset(){
    document.querySelector('.mobile_nav').classList.remove('active'); //mobile_nav의 active클래스 제거
    document.querySelector('.transparency').classList.remove('active'); //transparency의 active클래스 제거
    document.querySelector('.container').classList.remove('active');  //continaer의 active클래스 제거
    subSlideUp(); //모든 서브메뉴를 접어줌
  }

  //브라우저 창의 크기가 변경될때 마다 호출되는 리사이즈 이벤트
  window.addEventListener('resize', function(){
    //deviceStatus변수의 창크기가 850px 이하이면 mobile, 이상이면 PC를 할당(삼항연산자 사용)
    deviceStatus = window.innerWidth <= 850 ? 'mobile' : 'pc'

    //모바일 내비게이션이 활성화되어 있다면 reset()함수를 호출하여 초기상태로 되돌린다.
    //active클래스가 추가되어 있어야 초기상태로 되돌린다.
    if(deviceStatus === 'pc' && document.querySelector('.mobile_nav').classList.contains('active')){
      reset();
    }
  })

  //모든 .nav ul요소에 대해 mouseenter와 mouseleave이벤트 리스너를 추가
  document.querySelectorAll('.nav ul').forEach(item => {
    item.addEventListener('mouseenter', () => { //해당 요소에 마우스를 올렸을때(hover)
      if(deviceStatus === 'pc'){  //deviceStatus가 pc일 경우만 실행
        item.classList.add('over'); //ul요소에 over클래스를 추가(height가 185px로 변경)
      }
    })
    item.addEventListener('mouseleave', () => { //해당 요소에 마우스를 땠을때
      if(deviceStatus === 'pc'){
        item.classList.remove('over');  //해당 ul요소에 over클래스를 제거(height가 54px로 변경)
      }
    })
  })

  //mobile_tab에 클릭이벤트를 추가
  document.querySelector('.mobile_tab').addEventListener('click', (e) => {
    e.preventDefault(); //기본 동작방지(a태그 링크 제거)
    //acvite클래스를 추가하여 ui를 표시
    document.querySelector('.mobile_nav').classList.add('active');
    document.querySelector('.container').classList.add('active');
    document.querySelector('.transparency').classList.add('active');
  })
  
  //모바일 내비게이션의 각 링크에 클릭이벤트를 추가
  const links = document.querySelectorAll('.mobile_nav > ul > li > a');
  links.forEach(link => link.addEventListener('click', (e) => {
    if(deviceStatus === 'mobile'){  //deviceStatus가 mobile일 경우 실행
      const submenu = link.nextElementSibling;  //클릭한 요소의 다음 형제요소(.sub)를 선택
      //console.log(submenu); //확인
      let maxHt = getComputedStyle(submenu).maxHeight;  //submenu의 maxHeight값을 maxHt변수에 할당
      if(maxHt === '0px'){
        subSlideUp(); //모든 하위메뉴를 숨깁니다.
        submenu.style.maxHeight = '108px';  //submenu만 펼쳐줍니다.
      }
      else{ //submenu가 펼쳐져 있으면 실행
        submenu.style.maxHeight = '0px';  //submenu를 접어줍니다.
      }
    }
    e.preventDefault(); //링크기능 제거
  }))

  //.transparency를 클릭하면 reset함수를 호출하여 상태를 초기화 합니다
  document.querySelector('.transparency').addEventListener("click", reset);

  //페이지가 로드될 때 현재의 창 크기에 따라 deviceStatus를 설정하기 위해 리사이즈 이벤트를 발생 시킵니다
  //이렇게 하면 페이지가 로드될 때 상태가 초기화 됩니다
  window.dispatchEvent(new Event('resize'));
})