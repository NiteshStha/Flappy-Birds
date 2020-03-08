class Menu {
  constructor() {
    this.init();
  }

  init = () => {
    this.background = new Background();
    this.info = new Information(this.background.container);
    this.button = document.createElement('div');
    this.button.style.backgroundImage = 'url(assets/sprites/start-button.png)';
    this.button.style.width = '104px';
    this.button.style.height = '58px';
    this.button.style.position = 'absolute';
    this.button.style.top = '50%';
    this.button.style.left = '50%';
    this.button.style.transform = 'translate(-50%, -50%)';
    this.button.style.backgroundRepeat = 'no-repeat';
    this.button.style.cursor = 'pointer';
    this.button.addEventListener('click', this.start);
    window.addEventListener('keydown', this.start);

    this.background.scene.appendChild(this.button);

    this.score = localStorage.getItem('score') || 0;
    // Reverse the score so that when display each digit using modulus the number is in correct order.
    this.scoreStr = this.score.toString();
    this.bestScore = document.createElement('div');
    this.bestScore.style.position = 'absolute';
    this.bestScore.style.top = '30%';
    this.bestScore.style.left = '50%';
    this.bestScore.style.transform = 'translate(-50%, -50%)';
    this.background.scene.appendChild(this.bestScore);

    // Loop through each digits of the number and append it to the DOM.
    for (let i = 0; i < this.scoreStr.length; i++) {
      const digit = this.scoreStr[i];
      const numSprite = document.createElement('div');
      numSprite.style.display = 'inline-block';
      numSprite.style.backgroundImage = NUMBERS[digit];
      numSprite.style.backgroundRepeat = 'no-repeat';
      numSprite.style.width = `${NUMBER_SPRITE_DIMENSIONS.width}px`;
      numSprite.style.height = `${NUMBER_SPRITE_DIMENSIONS.height}px`;
      this.bestScore.appendChild(numSprite);
    }
  };

  /**
   * Starts the Game.
   */
  start = event => {
    if (
      event.type === 'click' ||
      (event.type === 'keydown' && event.keyCode === KEYCODE_ENTER)
    ) {
      this.button.removeEventListener('click', this.start);
      window.removeEventListener('keydown', this.start);
      document.body.removeChild(this.background.container);
      this.game = new Game();
    }
  };
}
