import { eventEmitter } from "./EventBus";

export function shootingCollisionHandler() {
  let enemies = [];
  let bullets = [];

  const bulletTracker = (bulletData) => {
    bullets = bulletData;
    checkCollisions();
  };

  const targetMovementTracker = (movementInfo) => {
    enemies = movementInfo.map((enemyInfo) => {
      return {
        enemyX: enemyInfo.enemyContainer.x,
        enemyY: enemyInfo.enemyContainer.y,
        enemyWidth: enemyInfo.enemyContainer.width,
        enemyHeight: enemyInfo.enemyContainer.height,
      };
    });
  };

  const checkCollisions = () => {
    for (let i = bullets.length - 1; i >= 0; i--) {
      const bullet = bullets[i];
      const bulletRect = {
        left: bullet.x,
        top: bullet.y,
        right: bullet.x + bullet.width,
        bottom: bullet.y + bullet.height,
      };

      let collisionDetected = false;

      for (let j = 0; j < enemies.length; j++) {
        const enemy = enemies[j];
        const enemyRect = {
          left: enemy.enemyX,
          top: enemy.enemyY,
          right: enemy.enemyX + enemy.enemyWidth,
          bottom: enemy.enemyY + enemy.enemyHeight,
        };

        if (rectsIntersect(bulletRect, enemyRect)) {
          console.log(
            `Collision detected between bullet and enemy at index ${j}`
          );
          collisionDetected = true;

          break;
        }
      }

      if (collisionDetected) {
        bullets.splice(i, 1);
        break;
      }
    }
  };

  const rectsIntersect = (rectA, rectB) => {
    return (
      rectA.left < rectB.right &&
      rectA.right > rectB.left &&
      rectA.top < rectB.bottom &&
      rectA.bottom > rectB.top
    );
  };

  eventEmitter.on("bulletTracking", bulletTracker);
  eventEmitter.on("enemyMovementTracking", targetMovementTracker);
}
