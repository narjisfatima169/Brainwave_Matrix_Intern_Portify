(
  function(){
    const form = document.querySelector(`.form`)
    const passwordBtn = document.querySelector(`.password-btn`)
    const slider = document.querySelector(`.carousel .slider`)
    const btnsList = document.querySelector(`.signup-hero__list`)
    const btnsListDest = [...btnsList.querySelectorAll(`.signup-hero__btn-section`)]
    const images = document.querySelectorAll('.slider .src')
    const maxImagesIndex = images.length
    const SLIDERTIME = 4000
    const autoSlider = window.matchMedia(`(min-width: 1200px)`).matches ? setInterval(moveSlider, SLIDERTIME, "autorun") : undefined
    let index = 0
    let lastBtnIndexActive = 0
    form.addEventListener('submit', verifySubmission)
    passwordBtn.addEventListener('click', togglePassword)
    btnsList.addEventListener('click', moveSlider)
    resetErrors()

    function verifySubmission(event){
      resetErrors()
      event.preventDefault()
      const inputs = form.querySelectorAll('input')
      let flagInvalid = false
      inputs.forEach(element => {
        const value = element.value
        if(element.type === 'text' && value.length <= 2){
          const elementErrorBox = element.nextElementSibling
          const nodeError = createNodeError('The name must contain at least 3 characters')
          elementErrorBox.appendChild(nodeError)
          element.setAttribute('aria-invalid', true)
          flagInvalid = true
        }
        else if(element.type === "email" && (!value.includes('@') || value.length <= 3) ){
          const elementErrorBox = element.nextElementSibling
          const nodeError = createNodeError('The email is not valid')
          elementErrorBox.appendChild(nodeError)
          element.setAttribute('aria-invalid', true)
          flagInvalid = true
        }
        else if(element.type === "password" && value.length < 8){
          const elementErrorBox = element.parentElement.nextElementSibling
          const nodeError = createNodeError('The password must have at least 8 characters')
          elementErrorBox.appendChild(nodeError)
          element.setAttribute('aria-invalid', true)
          flagInvalid = true
        }
        else if(element.type === "checkbox" && !element.checked){
          const elementErrorBox = element.parentElement.parentElement.nextElementSibling
          const nodeError = createNodeError('To continue you must have to accept the Terms and Conditions')
          elementErrorBox.appendChild(nodeError)
          element.setAttribute('aria-invalid', true)
          flagInvalid = true
        }
      })

      if(flagInvalid === false){
        form.submit()
      }
    }
    function createNodeError(text){
      const li = document.createElement('li')
      li.textContent = text
      li.className = `error-box__text`
      return li
    }
    function resetErrors(){
      const errorTexts = form.querySelectorAll('.error-box__text')
      errorTexts.forEach(error => error.remove())
    }
    function togglePassword(){
      let input = passwordBtn.closest('.form-password-box').querySelector("#form__password")
      passwordBtn.classList.toggle('--active')
      if(input.type === "text"){
        input.setAttribute('type', "password")
      }
      else{
        input.setAttribute('type', "text")
      }
    }
    function moveSlider(event){
      const element = event.target || null
      if(event === "autorun"){
        if(index + 1 >= maxImagesIndex){
          index = 0
          slider.classList.add('--no-animation')
        }
        else{
          index++
          slider.classList.remove('--no-animation')
        }
        changeBtnSliderActive()
      }
      else if(element !== null && element.matches(`[data-order]`)){
        index = parseInt(element.getAttribute('data-order'))
        changeBtnSliderActive()
      }
      slider.style = `transform: translateX(${-100 * index}%)`
   }
    
   function changeBtnSliderActive(){
      btnsListDest[lastBtnIndexActive].classList.remove('--active')
      btnsListDest[index].classList.add('--active')
      lastBtnIndexActive = index
   }
  }
)()