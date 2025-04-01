<!-- 导入文件组件 -->
<template>
  <el-dialog
    :visible.sync="uploadVisible"
    title="导入文件"
    width="600px"
    :lock-scroll="false"
    @close="handleClose"
  >
    <div class="template">
      <!-- 单文件模板 -->
      <template v-if="'url' in downloadTemplate">
        <img :src="templateImg" alt="" />
        <el-link type="primary" :underline="false" :href="downloadTemplate.url">
          {{ downloadTemplate.name }}
        </el-link>
      </template>
      <!-- 多文件模板 -->
      <template v-else-if="'list' in downloadTemplate">
        <el-dropdown trigger="click" :teleported="false">
          <span style="display: flex; align-items: center">
            <img :src="templateImg" alt="" />
            <el-link type="primary" :underline="false">
              {{ downloadTemplate.name }}
            </el-link>
          </span>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in downloadTemplate.list" :key="item.url">
                <el-link :underline="false" :href="item.url">
                  {{ item.name }}
                </el-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </div>

    <div class="upload">
      <el-upload
        drag
        :show-file-list="false"
        action="void"
        :auto-upload="true"
        v-bind="$attrs"
        :http-request="handleHttpRequest"
      >
        <div v-if="uploadInfo.fileName != ''" class="upload-item">
          <div class="image">
            <img v-if="isXlsx" :src="successImg" alt="" />
            <img v-else :src="commonImg" alt="" />
          </div>
          <div class="text">
            <span class="span3">{{ uploadInfo.fileName || '--' }}</span>
          </div>
        </div>
        <div v-else class="upload-item">
          <div class="image">
            <img v-if="isXlsx" :src="beforeImg" alt="" />
            <img v-else :src="commonImg" alt="" />
          </div>
          <div class="text">
            <span class="span2">可直接将待导入的文件拖拽到本区域，或</span>
            <span class="span1">点击上传</span>
          </div>
          <div class="zi">请按模板要求整理导入数据，确保数据的真实性和格式的准确性</div>
        </div>
      </el-upload>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" :loading="importLoading" @click="submitImport">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessage } from 'element-ui';

export default {
  name: 'ZydUpload',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    downloadTemplate: {
      type: Object,
      required: true,
    },
    isXlsx: {
      type: Boolean,
      default: true,
    },
    submit: {
      type: Function,
      required: true,
    },
    httpRequest: {
      type: Function,
      default: null,
    },
  },
  data() {
    const templateImg =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqBJREFUWEftV01IFGEYft8ZzbY1TCwJsYPs7I4QeVAiOqR0EcRDBc2uRm6XOkREXbxEh+3QJbAIugX9KEK7c6hTlFJEBEUlRV129gfMfhBFykLdcvd7YsYRpHZ1dtYOwc513udnnvf7vvcbJpfPXu2jZ5rmX4FRyZXy7tSw/7sbKnYDMjFKKNkJkXto4ZkPpWPqPTdc7g1oycOgnG6JSnwsHVUHywbKCZQTKCdQTuD/TMAfTLQTRKfsqb4SH2yccfoVSgmzYNeRD7ULi5mzMmOEfcG4QaAAkXQ+rQcuFjKgaMYAmBq8VfKZd0PKVD4DzeFPddnM3GWAxA7vhpNPbjVl8vH5tUS/IHGJiT+zT4vDmqjEQyldDecDKKFkK0RubKmOntfUqh2zX1MHVk7DVhEYfsPGKED7zTqZuTsRU+/n5Qsa1wEct/gcGTidrMJkbpyIttuEV5nkZysNMEgFcM42OSNvrmsybmz7sS4GrAuIluwAiUdEkO3EoiCElu4jHANIIwITsyCgO603PyjYzmITWCZa7t1qC5WZL6RiamS1GsWtASuJoHEXwMF8Akw0cnSn2hWJsPhnBtq0dM0sZV+DoPwhMlHpqW51spVLSsAUVXvjLdksvyCCx150vyTifQldfenkHCnZgCkSCBk9AhgEWJIkPpGMBm46EbfbWNw2LEQc6DW2iqzEKd0/7VR8XQ0UI7qydl1a4Fb8rwQULb4IogpivpOOqb2lEDvFKkHjNoAwMWfMozhuLmxm+tK4qcpXaIA4JV+rrqVv0jv/81sCoAYmfstK0LgG4JR9pD4losdrkZT0HtQFwh5bL8Itfan6uUzuPRHqSyIuHmx4N25ps35O1Z6JhqxYGGBCuxlN8VxFIJjGmXi0BhX9Y7pv9je+uLYV/lZ3+AAAAABJRU5ErkJggg==';
    const beforeImg =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABICAMAAAB1EdO8AAAAmVBMVEWwtsAAAACiubmwtb6utL+utr6urrmxs8CsrsevtsGqv7+vr6+vtcGut7+tvMP///+4vsewu7/v8PPq7e7Cx9D+/v79/v75+vrV2d60usOwtsCvtr7+/v78/f37+/z4+fnx8vWvuMD2+Pnn6Ozj5enf4ubd4OXIzdO9wsuttL309Pbt7vHQ1NnM0Nb6+vrz9Pbn6ezl6Or////V6vQnAAAAMnRSTlNNAAs3LEEWIQhCDAQlPCL9UhCrn1v58NhyT0cw9Onj0bUey5SLg39hVyjBpmtm3LyXk32G0fUAAAHHSURBVFjD7ddrT/JAEIbhWaClHLSlpYVyBlHAw3t4/v+Pcxc142pcyExiMPH+QCBhroR2WoBMsCQxJwsR3X5EdC0ieN42ERE87xIQPC8geF5G8LyM4HkZwfNCIjxva4U6DByxjkjT1FCblPWpoxQEgKTG1w0m5xEmUPPbiEPTZc//uumXnE28vC02pkV+jR9A1I87HTEeldVeR4yAG361brm6xsQtv94HIivuF0s6tgUWtWQvVgCKIzYH7oibRi67F/3I79NeZCOgHNsnBbARnpFdBSwyGs6QPgoJukuBFa3sg3wvHoC0SDEbygnawFWQghjOAcwz8orbLnv4B20/3ov3/QeQq+4XwwpAtVd8kHoJV64gciDdlih3YuI2BXLn3EuJpxkwqmlfIR3LiOwPUD7ZJ/+sJCP+4vUuUS+ALXGD2GWXoBv78V7wBbJ5PSb+eiUNl31/r+FnPn2Q8c3btbHkJRffO/lSkxJ0my8fLuB75PKI8EkNdnq1ftix+CUu7XdniIjOIzrvi7wmdGxCuiwwVQoW6CmNTkLGJNdXFCgKdXXoGUsYVsR/MlmRE6xoCFY0BCsaghUNwYqSYKUpI1hpr83JngEbtCsvdYRh6AAAAABJRU5ErkJggg==';
    const successImg =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABICAMAAAB1EdO8AAAA3lBMVEUAAAAro3EqpHAro3EqpHArpHEqpHEspHIjomgrpHEqpHAppW8qpHAro24qpHEqpHEhoWkrpHEqpXAqo3AmpnMqpHEqo3IqpHIqo3EponAqpHEqpHArpHEqpHEppW8AmWYrpHEso3ErpHAnonEnnWwktm0rpHH////9/v4xp3Wb1Lw8q3zy+vdXt44upXP4/Prl9O3T7OKn2cSLzbFEr4Ls9/LM6d3G5tl1xKJswJxnvplNs4g2qXne8enb8Oe/5NS1382V0riOzrSByat+yKnu+PTq9vHY7uWv3cmDyqy5CCTLAAAAJnRSTlMAmUkkbYORVxbath/+KdRzC8h/fxTIjGdhUfCsmHs+BeKecDQaB6pDtkMAAAHXSURBVFjD7dfZbtpQFIXhVaY2MTS0oQyZOp/lAcw8JaQZO73/C3X79IKcRLGRtxQRKd8Fgov9S8bbBiOd50Gltv/WVPd084kD3bylmM+dqL2XeYd2XmjnhXZeaOfF6zSdIkRb5tO8StcGvhijSIgCPmkTZVS1iSOYLG8e5zWTRnYCKUpPlti1vgKtXdc3J5GtAFSMq/gMEvHZRJfoDfvTlS4xJG/WnypWDehUXI17iWB8eT431oL8EefZixHJsY0NyFOztmOdAMc7Lu9+IhiS/Z68uSbnOc/I5KccQGCiLv2zXAlx6pMjM5KX/HtxRfpjn91IsVoXTFwbRSIaSGEQGEfJ8oCTkqv+MCFuJRGq7hfRL0lMV4oDiWdMhIpESPqLPvuT3ImlT4ZJ5zJvYtIlh7FZTen38iWC32Q32ey/5Cxf4g/JWyPic3Jxd9hqALWCa70X6wvkwlhLd72KVh1oFF0fHxxI7yYy/82SO4fy3plcapqEWIbzqy34Hdm+xOYn1bXRaj2z7+IlsW3/O5Fif7NE+XHNpHCEA+2TQBOftYk26odVVaJcB+DtfUirlNMcd+oQtvKuqnjIzKpAKCsQygqEsoI83HMEoatUIXSVQ+h4rdZ3ZPkHAm6T3USHcxEAAAAASUVORK5CYII=';
    const commonImg =
      'data:image/png;base64,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';

    return {
      uploadInfo: {
        fileName: '', // 文件名
        uploadUrl: '', // 上传的文件URL
        formFile: null, // 上传的文件对象
        fileType: 'url', // 文件类型
      },
      importLoading: false,
      templateImg,
      beforeImg,
      successImg,
      commonImg,
      uploadVisible: false,
    };
  },
  watch: {
    visible(newVal) {
      console.log(newVal);
      this.uploadVisible = newVal;
    },
    loading(newVal) {
      if (newVal) {
        this.importLoading = newVal;
      }
    },
  },
  methods: {
    /**
     * 拦截文件上传请求, 获取上传文件信息
     * @param file 包含待上传文件的对象
     */
    async handleHttpRequest(file) {
      try {
        if (!this.httpRequest) {
          // 无自定义上传时直接使用原始文件
          this.uploadInfo.fileName = file.file.name;
          this.uploadInfo.formFile = file.file;
          this.uploadInfo.fileType = 'file';
          return;
        }
        // 使用自定义上传方法
        const res = await this.httpRequest({ file: file.file });
        this.uploadInfo.fileName = res?.name || file.file.name;

        if (res?.url) {
          this.uploadInfo.fileType = 'url';
          this.uploadInfo.uploadUrl = res.url;
        } else {
          this.uploadInfo.fileType = 'file';
          this.uploadInfo.formFile = res?.file || file.file;
        }
      } catch (error) {
        console.error('文件上传失败:', error);
        ElMessage.error('文件上传失败,请重试');
      }
    },

    /**
     * 提交导入
     */
    async submitImport() {
      try {
        if (!this.uploadInfo.uploadUrl && !this.uploadInfo.formFile) {
          ElMessage.error('请先选择需要上传的文件');
          return;
        }

        this.$emit('update:loading', true);
        const file =
          this.uploadInfo.fileType === 'file'
            ? this.uploadInfo.formFile
            : this.uploadInfo.uploadUrl;
        await this.submit(file);
      } catch (error) {
        console.error('导入失败:', error);
      } finally {
        this.$emit('update:loading', false);
      }
    },

    /**
     * 重置上传状态
     */
    resetUploadInfo() {
      this.uploadInfo.fileName = '';
      this.uploadInfo.uploadUrl = '';
      this.uploadInfo.formFile = null;
      this.uploadInfo.fileType = 'url';
    },

    // 处理关闭操作
    handleClose() {
      this.resetUploadInfo();
      this.$emit('update:visible', false);
    },

    open() {
      this.$emit('update:visible', true);
    },

    close() {
      this.handleClose();
    },
  },
};
</script>

<style lang="scss" scoped>
.template {
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
}

.upload {
  border: 2px dashed rgba(211, 219, 235, 0.8);
  border-radius: 2px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fbfcff;

  .upload-demo {
    width: 100%;
  }

  .upload-item {
    .image {
      width: 100%;
      height: 72px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 12px;

      img {
        width: 66px;
        height: 100%;
      }
    }

    .text {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.4);

      .span1 {
        color: #2355d8;
        text-decoration: underline;
        text-underline-offset: 4px;
        margin-left: 4px;
      }

      .span3 {
        color: #333333;
      }
    }

    .zi {
      font-size: 12px;
      color: #cad1e0;
    }
  }
}

::v-deep .el-dropdown-menu {
  padding: 0 !important;

  .el-dropdown-menu__item {
    padding: 0 !important;
    --ep-dropdown-menuItem-hover-color: none !important;
    --ep-dropdown-menuItem-hover-fill: none !important;

    .el-link {
      width: 100%;
      height: 100%;
      padding: 15px 20px;
      box-sizing: border-box;
      justify-content: flex-start;

      &:hover {
        background-color: #f5f7fa;
      }

      .el-link__inner {
        color: #606266 !important;
      }
    }
  }
}

::v-deep .el-upload-dragger {
  border: none !important;
  background-color: transparent !important;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 240px;
}

::v-deep .el-link__inner {
  color: #2355d8 !important;
  line-height: 1;
}
::v-deep .el-dialog {
  .el-dialog__header {
    padding: 16px 24px !important;
    .el-dialog__title {
      left: 24px;
    }
  }
  .el-dialog__body {
    padding: 24px !important  ;
  }
  .el-dialog__footer {
    padding: 16px 24px;
    border-top: 1px solid #e4e7ed;
  }
}
</style>
