<template>
  <div class="code_preview_container">
    <h4>组件预览及代码展示</h4>
    <div class="code_preview_content">
      <div class="code_preview">
        <slot name="preview">
          <p>组件默认预览内容</p>
        </slot>
      </div>
      <div v-show="isShow">
        <slot name="code">
          <p>组件默认代码内容</p>
        </slot>
      </div>
      <div class="code_show" @click="isShow = !isShow">
        {{ isShow ? '隐藏代码' : '显示代码' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.code_preview_container {
  h4 {
    margin: 55px 0 20px;
    font-weight: 400;
    color: #1f2f3d;
  }
  .code_preview_content {
    border-radius: 4px;
    border: 1px solid #ebebeb;
    .code_preview {
      padding: 24px;
    }
    .code_show {
      height: 40px;
      width: 100%;
      display: flex;
      align-items: center;
      background-color: #fff;
      color: #ccc;
      justify-content: center;
      cursor: pointer;
      border-top: 1px solid #ebebeb;
      border-radius: 4px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      &:hover {
        color: #409eff;
        background-color: #f9fafc;
      }
    }
  }
  ::v-deep {
    summary {
      display: flex;
      width: 100%;
      height: 40px;
      background-color: #f5f5f5;
      justify-content: center;
      color: #1f2f3d;
      font-size: 16px;
      align-items: center;
    }
    .extra-class {
      border-radius: 0;
    }
    .language-vue {
      margin: 0;
    }
  }
}
</style>
