  // SLIDER
  var left = document.getElementById('left'),
      right = document.getElementById('right'),
      container = document.querySelector('.partners-widget-content'),
      logos = document.querySelectorAll('.reference-image');

  left.addEventListener('click', function () {
    var position = container.getAttribute('data-position'),
        rPos = container.offsetWidth;
    position = Number(position) - (rPos / 5);
    [].forEach.call(logos, function (logo) {
      var akarmi = (Number(logos.length) * (rPos / 5)) - rPos + Number(position);
      if (akarmi >= 0) {
        var newValue = position + 'px';
        logo.style.left = newValue;
        container.setAttribute('data-position', position);
      }
    });
  });

  right.addEventListener('click', function () {
    var position = container.getAttribute('data-position'),
        rPos = container.offsetWidth;
    position = Number(position) + (rPos / 5);
    [].forEach.call(logos, function (logo) {
      if (position <= 0) {
        var newValue = position + 'px';
        logo.style.left = newValue;
        container.setAttribute('data-position', position);
      }
    });
  });





  var changeLabelStyle = function (label) {
    label.classList.remove('hidden');
    label.style.fontSize = '1em';
    label.style.top = '0px';
  };

  var formName = document.querySelector('.contact-form');
  [].forEach.call(formName.querySelectorAll('.input-field'), function (inputField) {
    inputField.addEventListener('focus', function () {
      inputField.setAttribute('placeholder', '');
      var targetLabel = 'label[for='+ inputField.getAttribute('name') +']'
      var label = formName.querySelector(targetLabel);
      changeLabelStyle(label);
    });
  });


    var removeActiveStatus = function (selector) {
      [].forEach.call(document.querySelectorAll(selector), function (item2) {
        item2.classList.remove('active');
      });
    };

    var selectActiveElement = function (item, selector) {
      item.classList.add('active');
      [].forEach.call(document.querySelectorAll(selector), function (element) {
        element.classList.add('off');
      });
      var idName = item.getAttribute('data-name');
      document.getElementById(idName).classList.remove('off');
    };

    [].forEach.call(document.querySelectorAll('.desktop-package-item'), function (item) {
      item.addEventListener('click', function () {
        removeActiveStatus('.desktop-package-item');
        selectActiveElement(item, '.package-details');
      });
    });

    [].forEach.call(document.querySelectorAll('.mobile-package-item'), function (item) {
      item.addEventListener('click', function () {
        removeActiveStatus('.mobile-package-item');
        selectActiveElement(item, '.mobile-package-details');
      });
    });



    var removeActiveMenu = function () {
      [].forEach.call(document.querySelectorAll('.list-element'), function (element) {
        element.classList.remove('active-menu');
      });
    };

    [].forEach.call(document.querySelectorAll('.menu-element'), function (menuItem) {
      menuItem.addEventListener('click', function () {
        removeActiveMenu();
        menuItem.querySelector('.list-element').classList.add('active-menu');
        if (menuItem.getAttribute('data-name') !== 'onlinePrez') {
          document.getElementById('codeField').classList.add('off');
        }
      });
    });

    var modifyActionURL = function () {
      var url = 'http://prvadmin.dev/prezentacio/',
          code = document.getElementById('code').value,
          actionURL = url + code,
          action = document.getElementById('codeForm');
      
      action.setAttribute('action', actionURL);
    };

    var showCode = function (element) {
      var onlinePrez = document.getElementById('codeField');
      onlinePrez.classList.remove('off');
    };




    var menu = document.getElementById('menuKebab');
    var rotate = function(line, degree) {
      [].forEach.call(document.querySelectorAll(line), function(item) {
        item.style.transform = 'rotate(' + degree + ')';
      });
    };

    var hideMiddleLine = function(line) {
      [].forEach.call(document.querySelectorAll(line), function(middle) {
          middle.classList.toggle('off');
      });
    };

    var hamburger = document.querySelector('.hamburger-menu'),
        mobileMenu = document.querySelector('.mobile-menu'),
        mobileElements = document.querySelectorAll('.mobile-element');

    menu.addEventListener('click', function() {
      if (menu.classList.contains('rotated')) {
        rotate('.x-1', '0deg');
        rotate('.x-2', '0deg');
        menu.querySelector('.sanyi').style.marginBottom = '7px';
        mobileMenu.style.top = '100%';
      } else {
        rotate('.x-1', '45deg');
        rotate('.x-2', '-45deg');
        menu.querySelector('.sanyi').style.marginBottom = '13px';
        mobileMenu.style.top = '0';
      }

      hideMiddleLine('.x-m');
      menu.classList.toggle('rotated');
    });

    // Hide mobile menu after click
    [].forEach.call(mobileElements, function (mobileElement) {
      mobileElement.addEventListener('click', function () {
        rotate('.x-1', '0deg');
        rotate('.x-2', '0deg');
        menu.querySelector('.sanyi').style.marginBottom = '7px';
        mobileMenu.style.top = '100%';

        hideMiddleLine('.x-m');
        menu.classList.toggle('rotated');
      })
    });
