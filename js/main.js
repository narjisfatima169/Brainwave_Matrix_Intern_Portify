(
  function(){
    document.body.classList.add('js')
    const navBtn = document.querySelector(`.nav-btn`)
    const navbar = document.getElementById('main-nav')
    
    window.addEventListener('resize', handleNavAttributes)
    navBtn.addEventListener('click', toggleNavbar)
    toggleNavbar()
    handleNavAttributes()
    function toggleNavbar(){
      let expanded = navbar.classList.contains('--active') ? false : true
      navBtn.setAttribute('aria-expanded', expanded)
      navbar.classList.toggle('--active')
    }
    function handleNavAttributes(){
      if(window.matchMedia(`(min-width: 992px)`).matches)
        navbar.removeAttribute('aria-polite')
      else 
        navbar.setAttribute('aria-polite', 'assertive')
    }
  }
)()