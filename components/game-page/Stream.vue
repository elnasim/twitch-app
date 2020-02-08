<template>
  <div class="stream">
    <div
      class="stream__preview"
      style="background-image: url('https://static-cdn.jtvnw.net/previews-ttv/live_user_moonmoon_ow-640x360.jpg')"
    >
      <div class="stream__viewers">1 зрителей</div>
    </div>
    <div class="stream__info">
      <img src="#" class="stream__logo" />
      <div class="stream__info-row">
        <div class="stream__profile-name">Lirik</div>
        <div class="stream__title">Название стрима</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.stream {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
}

.stream__info {
  display: flex;
  padding: 10px;
}

.stream__logo {
  width: 30px;
}

.stream__profile-name {
  color: #ffffff;
}

.stream__title {
  color: #ffffff;
}

.stream__preview {
  background-size: cover;
  background-position: center;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px;
  &::before {
    content: '';
    padding-top: 50%;
    float: left;
  }
}

.stream__viewers {
  color: #ffffff;
}
</style>
