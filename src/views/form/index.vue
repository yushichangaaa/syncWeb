<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="jobName">
        <el-input v-model="jobName"/>
      </el-form-item>
      <el-form-item label="jobGroup">
        <el-input v-model="jobGroup"/>
      </el-form-item>
      <el-form-item label="cronExpression">
        <el-input v-model="cronExpression"/>
      </el-form-item>
      <el-form-item label="jobStatus">
        <el-select v-model="jobStatus" placeholder="select your jobStatus">
          <el-option label="BLOCKED" value="BLOCKED"/>
          <el-option label="COMPLETE" value="COMPLETE"/>
          <el-option label="ERROR" value="ERROR"/>
          <el-option label="NONE" value="NONE"/>
          <el-option label="NORMAL" value="NORMAL"/>
          <el-option label="PAUSED" value="shanghai"/>
        </el-select>
      </el-form-item>
      <el-form-item label="jobDescription">
        <el-input v-model="jobDescription"/>
      </el-form-item>
      <el-form-item label="jobClassName">
        <el-input v-model="jobClassName"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobName: '',
      jobGroup: '',
      cronExpression: '',
      jobStatus: '',
      jobDescription: '',
      jobClassName: ''
    }
  },
  methods: {
    add() {
      this.$http.post('http://10.10.12.252:8080/api/saveOrUpdate', {
        jobName: this.jobName,
        jobGroup: this.jobGroup,
        jobStatus: this.jobStatus,
        cronExpression: this.cronExpression,
        description: this.jobDescription,
        jobClassName: this.jobClassName },
      { emulateJSON: true })
      this.jobName = ''
      this.jobGroup = ''
      this.cronExpression = ''
      this.jobStatus = ''
      this.jobDescription = ''
      this.jobClassName = ''
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

