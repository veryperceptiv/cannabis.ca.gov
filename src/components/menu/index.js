console.log('wtf');

class CAGOVOverlayNav extends window.HTMLElement {
  connectedCallback () {
    console.log('eh')
    this.menuContentFile = this.dataset.json;
    this.querySelector('.open-menu').addEventListener('click', this.toggleMainMenu.bind(this));
    console.log('expansion listeners call')
    this.expansionListeners(); // everything is expanded by default on big screens
  }

  toggleMainMenu () {
    if (this.querySelector('.hamburger').classList.contains('is-active')) {
      this.closeMainMenu();
    } else {
      this.openMainMenu();
    }
  }

  openMainMenu () {
    this.classList.add('display-menu');
    this.querySelector('.hamburger').classList.add('is-active');
    this.querySelector('.menu-trigger').classList.add('is-fixed');
    var menLabel = this.querySelector('.menu-trigger-label');
    menLabel.innerHTML = menLabel.getAttribute('data-closelabel');
    this.querySelector('#main-menu').setAttribute('aria-hidden', 'false');
    document.addEventListener('keydown', this.escapeMainMenu.bind(this));
    setTimeout(
      function () {
        this.classList.add('reveal-items');
        this.querySelector('#search-site').focus();
      }.bind(this),
      300
    );
  }

  closeMainMenu () {
    this.classList.remove('display-menu');
    this.classList.remove('reveal-items');
    this.querySelector('.hamburger').classList.remove('is-active');
    this.querySelector('.menu-trigger').classList.remove('is-fixed');
    var menLabel = this.querySelector('.menu-trigger-label');
    menLabel.innerHTML =  menLabel.getAttribute('data-openlabel');
    // what should we apply aria-expanded to?
    this.querySelector('#main-menu').setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', this.escapeMainMenu.bind(this));
  }

  escapeMainMenu (event) {
    // Close the menu if user presses escape key.
    if (event.keyCode === 27) { this.closeMainMenu(); }
  }

  expansionListeners () {
    const allMenus = this.querySelectorAll('.js-expandable-mobile');
    console.log(allMenus)
    allMenus.forEach(menu => {
      const nearestMenu = menu.closest('.expanded-menu-section');
      if (nearestMenu) {
        const nearestMenuDropDown = nearestMenu.querySelector('.expanded-menu-dropdown');
        if (nearestMenuDropDown) {
          nearestMenuDropDown.setAttribute('aria-hidden', 'true');
          menu.closest('.expanded-menu-col').setAttribute('aria-expanded', 'false');
        }
      }
      menu.addEventListener('click', function (event) {
        event.preventDefault();
        console.log(this)
        this.closest('.expanded-menu-section').classList.toggle('expanded');
        this.closest('.expanded-menu-col').setAttribute('aria-expanded', 'true');
        const closestDropDown = this.closest('.expanded-menu-section').querySelector('.expanded-menu-dropdown');
        if (closestDropDown) {
          closestDropDown.setAttribute('aria-hidden', 'false');
        }
      });
    });
  }
}
window.customElements.define('cagov-navoverlay', CAGOVOverlayNav);
