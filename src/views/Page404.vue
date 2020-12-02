<template>
  <div class="page404">
    <h2>4<span class="zero"></span>4</h2>
    <h3>Stránka nenájdena</h3>
  </div>
</template>


<style lang="scss" scoped>

.page404 {
  @include displayFlex(column, center, center);
  position: relative;
  height: calc(100vh - 25px);
  background: linear-gradient(135deg, #03a9f4, #03a9f4 49.9%, #333 50%, #333 );

  h2 {
    @include displayFlex(row, center, center);
    color: #f3f3f3;
    font-size: 15rem;
    text-shadow:  -25px 25px 40px rgba(0,0,0,0.5),
                  -10px 10px 0px rgba(255,255,255,0.5),
                  -20px 20px 0px rgba(255,255,255,0.2),
                  -30px 30px 0px rgba(255,255,255,0.05);

    .zero {
      position: relative;
      display: inline-block;
      width: 200px;
      height: 200px;
      background: linear-gradient(to bottom, #fff, #777);
      border-radius: 50%;
      margin: 0 15px; 
      box-shadow: -25px 25px 40px rgba(0,0,0,0.5);

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 180px;
        height: 180px;
        background: linear-gradient(to top, #fff, #777);
        border-radius: 50%;
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        // background: linear-gradient(to top, #fff, #777);
        background: linear-gradient(315deg, #03a9f4, #03a9f4 49%, #333 50%,  );
        border-radius: 50%;
        box-shadow: inset 0 0 30px #000000;
        animation: animate 5s linear infinite;
      }
    }
  }

  h3 {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translate(-50%, 0%);
    text-align: center;
    color: #f3f3f3;
    font-size: 3.5rem;
    text-shadow:  -25px 25px 40px rgba(0,0,0,0.5);
    // border: 1px solid red;
  }
}

@keyframes animate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

</style>