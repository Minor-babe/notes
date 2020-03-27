<template>
    <div class="hello">
        <input type="file" name="file">
        <input type="button" value="提交" @click="fileSubmit">
    </div>
</template>

<script>
const FILE_TYPE = ['xls', 'doc', 'ppt', 'docx', 'docx', 'xlsx', 'pptx', 'mp4']
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    fileSubmit: function () {
      let formData = new FormData()
      formData = new window.FormData()
      let file = document.querySelector('input[type=file]').files[0]
      let index = file.name.lastIndexOf('.')
      let type = file.name.substr(index + 1)
      let flag = FILE_TYPE.some((value) => {
        return value.toUpperCase() == type.toUpperCase()
      })
      if (flag) {
        formData.append('file', file)
        this.$http({
          method: 'post',
          url: '/api/media/single',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          console.log(res);
        })
      } else {
        alert('格式不正确')
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
