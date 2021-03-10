<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">文件上传</h1>
        <p>上传文件将用于内部交流</p>
      </div>
    </div>
    <div class="upload">
      <input
        style="display:none;"
        type="file"
        ref="inputFile"
        @change="fileChange"
        multiple
      />
      <button class="btn btn-lg btn-primary" @click="selectFile">
        Select file
      </button>
      <button
        style="margin-left:60px;"
        class="btn btn-lg btn-primary"
        @click.prevent="uploadFile"
      >
        Upload
      </button>
      <div class="error-messages">{{ result }}</div>
      <div
        style="width: 200px;margin:0 auto;color: #333333;font-weight: 600;text-align: left;"
        v-html="files"
      ></div>
      <img v-if="picUrl != ''" ref="localImg" :src="picUrl" />
      <p />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Upload",
  data: function() {
    return {
      files: "",
      result: "",
      picUrl: ""
    };
  },
  methods: {
    getAxios: function(
      url,
      {
        method = "post",
        timeout = 10000,
        data = {},
        headers = { "Content-Type": "application/json;charset=UTF-8;" },
        dataType = "json"
      }
    ) {
      const config = {
        method: method,
        timeout: timeout,
        url: url,
        baseURL: "",
        data: data,
        headers: headers,
        dataType: dataType
      };
      return axios(config);
    },
    getString(files) {
      var s = "File will be upload: <br>";
      for (var i = 0; i < files.length; i++) {
        s += "&emsp;&emsp;" + files[i].name + "<br>";
      }
      return s;
    },
    fileChange() {
      this.result = "";
      this.files = this.getString(this.$refs.inputFile.files);
      var pURL = window.URL || window.webkitURL;
      this.picUrl = pURL.createObjectURL(this.$refs.inputFile.files[0]);
      // this.$refs.localImg.attr('src', imgURL);
    },
    selectFile: function() {
      // e.preventDefault();
      this.$refs.inputFile.click();
    },
    uploadFile: function() {
      // e.preventDefault();
      console.log("in uploadFile()");
      var formData = new FormData();
      for (var f of this.$refs.inputFile.files /*this.file*/) {
        formData.append("file", f);
      }
      this.getAxios(process.env.VUE_APP_SERVER_URL + "/uploadFile", {
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(response => {
          // console.log(response.data);
          this.result = response.data; // just prevent warning
          this.result = "File upload success.";
          this.files = "";
          // var imgURL = this.$refs.localImg.attr('src');
          var pURL = window.URL || window.webkitURL;
          pURL.revokeObjectURL(this.picUrl);
          this.picUrl = "";
          /*
            "File " +
            response.data.filenames[0] +
            " upload " +
            response.data.status +
            ".";*/
        })
        .catch(err => {
          this.result = err;
          // console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.upload {
  text-align: center;
  margin: 0 auto;
}
</style>
