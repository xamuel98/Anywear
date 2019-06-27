<template>
  <div>
    <a class="dropdown-item" @click.prevent="onPickFile" style="cursor: pointer;">
      <i class="laptop icon"></i> Upload from your Computer
    </a>
    <input
      type="file"
      style="display: none;"
      ref="fileInput"
      name="file"
      id="file"
      @change="onFilePicked"
    >
  </div>
</template>


<script>
import mime from "mime-types";

export default {
  name: "file-upload",
  data() {
    return {
      file: null,
      authorized: ["image/jpeg", "image/png"]
    };
  },
  methods: {
    onFilePicked(event) {
      let files = event.target.files;
      console.log(files);
      if (files.length === 1) {
        this.file = files[0];
      }
    },
    onPickFile() {
      this.$refs.fileInput.click();

      if (this.file !== null) {
        if (this.isValid(this.file.name)) {
          let metadata = { contentType: mime.lookup(this.file.name) };
          this.$parent.uploadFile(this.file, metadata);
        }
      }
    },
    isValid(filename) {
      let index = this.authorized.indexOf(mime.lookup(filename));
      return index !== -1;
    }
  }
};
</script>


<style scoped>
</style>
