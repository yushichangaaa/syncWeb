<template>
  <div class="app-container">
    <el-form ref="formData" :rules="rule" :inline="true" :model="formData" label-width="80px">
      <el-form-item label="任务名称" prop="jobName">
        <el-input v-model="formData.jobName"/>
      </el-form-item>
      <el-form-item label="所在分组" prop="jobGroup">
        <el-input v-model="formData.jobGroup"/>
      </el-form-item>
      <el-form-item label="任务类名" prop="jobClassName">
        <el-input v-model="formData.jobClassName"/>
      </el-form-item>
      <el-form-item label="间隔时间" prop="cronExpression">
        <el-select v-model="formData.cronExpression">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="任务描述" prop="jobDescription">
        <el-input v-model="formData.jobDescription"/>
      </el-form-item>
      <el-form-item style="margin-left: 1170px">
        <el-button type="primary" @click="selectByCondition()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add('formData')">添加任务</el-button>
      </el-form-item>
    </el-form>
    <el-editable
      ref="editable"
      :data.sync="myData"
      :edit-config="{trigger: 'click', mode: 'row',isTabKey: true}"
      element-loading-text="Loading"
      class="manual-table1"
      border
      fit
      highlight-current-row
      style="width: 100%">
      <el-editable-column :edit-render="{name: 'ElInput'}" prop="jobName" align="center" label="任务名称" width="225" show-overflow-tooltip/>
      <el-editable-column :edit-render="{name: 'ElInput'}" prop="jobGroup" align="center" label="所在分组" width="80" show-overflow-tooltip/>
      <el-editable-column :edit-render="{name: 'ElInput'}" prop="jobClassName" align="center" label="任务类名" width="145" show-overflow-tooltip/>
      <el-editable-column
        :edit-render="{name: 'ElSelect', options: options2}"
        prop="cronExpression"
        align="center"
        label="间隔时间"
        width="120"
        show-overflow-tooltip/>
      <el-editable-column align="center" label="任务状态" width="100">
        <template slot-scope="scope">
          <span>{{ myData[scope.$index].jobStatus | formatStatus }}</span>
        </template>
      </el-editable-column>
      <el-editable-column :edit-render="{name: 'ElInput'}" prop="jobDescription" align="center" label="任务描述" width="255" show-overflow-tooltip @click="giveValue(scope.$index)"/>
      <el-editable-column align="center" label="操作" width="350">
        <template slot-scope="scope">
          <el-button :plain="true" type="primary" size="small" @click="runOnce(scope.$index)">执行一次</el-button>
          <el-button :plain="true" type="warning" size="small" @click="edit(scope.row,scope.$index)">修改</el-button>
          <el-button type="danger" size="small" @click="open2(scope.$index)">删除</el-button>
        </template>
      </el-editable-column>
      <el-editable-column class-name="status-col" label="是否暂停" width="90" align="center">
        <template slot-scope="scope">
          <!--<el-tag>{{ myData[scope.$index].jobStatus }}</el-tag>-->
          <span @click="changeStatus(myData[scope.$index].dr,scope.$index);open()"><el-switch v-model="myData[scope.$index].dr" active-color="#13ce66" inactive-color=""/></span>
        </template>
      </el-editable-column>
    </el-editable>
    <el-pagination
      :current-page.sync="page"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="rows"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"/>
  </div>
</template>

<script type="application/javascript">
const url = 'http://10.10.12.252:8080/api/v1'
export default {
  name: 'App',
  filters: {
    formatStatus(value) {
      const statusMap = {
        'BLOCKED': '运行',
        'COMPLETE': '完成',
        'ERROR': '错误',
        'NONE': '未知',
        'NORMAL': '正常',
        'PAUSED': '暂停'
      }
      return statusMap[value]
    }
  },
  data() {
    var myValidate = (rule, value, callback) => {
      this.$http.post(url + '/valid/cls',
        { clsName: value }, { emulateJSON: true }).then(function(res) {
        if (res.data.code === 0) {
          return callback(new Error('类错误'))
        } else {
          callback()
        }
      })
    }
    return {
      rule: {
        jobName: [{
          required: true,
          message: '请输入任务名称',
          trigger: 'blur'
        }],
        jobGroup: [{
          required: true,
          message: '请输入任务所在分组',
          trigger: 'blur'
        }],
        jobClassName: [{
          required: true,
          message: '请输入任务类名',
          trigger: 'blur'
        }, {
          validator: myValidate,
          trigger: 'blur'
        }],
        cronExpression: [{
          required: true,
          message: '请选择间隔时间',
          trigger: 'change'
        }]
      },
      statusOptions: [{
        value: 'BLOCKED',
        label: '运行'
      }, {
        value: 'COMPLETE',
        label: '完成'
      }, {
        value: 'ERROR',
        label: '错误'
      }, {
        value: 'NONE',
        label: '未知'
      }, {
        value: 'NORMAL',
        label: '正常'
      }, {
        value: 'PAUSED',
        label: '暂停'
      }],
      options2: [{
        value: null,
        label: ''
      }, {
        value: '0 0/5 * * * ? *',
        label: '5分钟'
      }, {
        value: '0 0/10 * * * ? ',
        label: '10分钟'
      }, {
        value: '0 0/30 * * * ? *',
        label: '30分钟'
      }, {
        value: '0 0 * * * ? *',
        label: '60分钟'
      }],
      mmyData: [],
      myData: [],
      mymyData: [],
      formData: {
        jobName: '',
        jobGroup: '',
        cronExpression: '',
        dr: '',
        jobStatus: '',
        jobDescription: '',
        jobClassName: '',
        jobid: ''
      },
      nowIndex: -100,
      count: 0,
      minutes: '',
      selectIndex: 0,
      myListener: 0,
      oldJobName: [],
      oldJobGroup: [],
      code: 0,
      page: 1,
      rows: 5,
      total: 1
    }
  },
  watch: {
    mymyData: function(val, oldVal) {
      this.myData = this.mymyData
    },
    myListener: function() {
      this.selectByCondition()
      setTimeout(() => {
        this.selectByCondition()
      }, 500)
    },
    deep: true
  },
  created() {
    this.selectByCondition()
  },
  methods: {
    handleSizeChange(pageSize) {
      this.rows = pageSize
      this.selectByCondition()
    },
    handleCurrentChange(currentPage) {
      this.page = currentPage
      this.selectByCondition()
    },
    selectByCondition() {
      this.oldJobName = []
      this.oldJobGroup = []
      this.$http.post(url + '/job/queryJob',
        {
          page: this.page,
          rows: this.rows,
          jobName: this.formData.jobName,
          jobGroup: this.formData.jobGroup,
          jobStatus: this.formData.jobStatus,
          cronExpression: this.formData.cronExpression,
          description: this.formData.jobDescription,
          jobClassName: this.formData.jobClassName
        }, { emulateJSON: true })
        .then(function(res) {
          this.code = res.data.code
          this.total = res.data.data.total
          var b = res.data.data.list
          this.mymyData = []
          for (var i = 0; i < b.length; i++) {
            this.oldJobName.push(b[i].jobName)
            this.oldJobGroup.push(b[i].jobGroup)
            if (b[i].cronExpression === null) {
              continue
            } else {
              if (b[i].jobStatus === 'PAUSED') {
                this.mymyData.push({
                  jobName: b[i].jobName,
                  jobGroup: b[i].jobGroup,
                  cronExpression: b[i].cronExpression,
                  dr: false,
                  jobStatus: b[i].jobStatus,
                  jobDescription: b[i].description,
                  jobClassName: this.classOfJob(b[i].jobClassName),
                  jobId: b[i].jobId
                })
              } else {
                this.mymyData.push({
                  jobName: b[i].jobName,
                  jobGroup: b[i].jobGroup,
                  cronExpression: b[i].cronExpression,
                  dr: true,
                  jobStatus: b[i].jobStatus,
                  jobDescription: b[i].description,
                  jobClassName: this.classOfJob(b[i].jobClassName),
                  jobId: b[i].jobId
                })
              }
            }
          }
        }, function(res) {
          alert(res.status + '查询任务失败了')
        })
    },
    myCancel(row) {
      this.addMyListener()
    },
    changeCron(cron) {
      this.$http.post(url + '/job/saveOrUpdate', {
        oldJobName: this.oldJobName[this.selectIndex],
        oldJobGroup: this.oldJobGroup[this.selectIndex],
        jobId: this.myData[this.selectIndex].jobId,
        jobName: this.myData[this.selectIndex].jobName,
        jobGroup: this.myData[this.selectIndex].jobGroup,
        cronExpression: cron,
        description: this.myData[this.selectIndex].jobDescription },
      { emulateJSON: true })
    },
    getSelectIndex(n) {
      this.selectIndex = n
    },
    strSplite(str) {
      var s = str.split(' ')
      var s2 = s[1].split('/')
      if (s2.length === 1) {
        this.minutes = 60
      } else {
        this.minutes = s2[1]
      }
    },
    changeStatus(status, index) {
      if (status) {
        this.myResume(index)
      } else {
        this.myPause(index)
      }
    },
    open(n) {
      setTimeout(() => {
        this.open4()
      }, 500)
    },
    open2(index) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteMsg(index)
        setTimeout(() => {
          this.open3()
        }, 500)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    open3() {
      if (this.code === 20000) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.addMyListener()
      } else {
        this.$message({
          type: 'info',
          message: '删除失败!'
        })
      }
    },
    open4() {
      if (this.code === 20000) {
        this.$message('操作成功')
      } else {
        this.$message('操作失败')
      }
    },
    runOnce(n) {
      this.code = 404
      var name = this.myData[n].jobName
      var group = this.myData[n].jobGroup
      this.$http.post(url + '/job/runJob', { jobName: name, jobGroup: group }, { emulateJSON: true })
        .then(function(res) {
          this.code = res.data.code
        }, function(res) {
          this.code = res.data.code
        })
      this.open()
      this.addMyListener()
    },
    trans(cron) {
      const statusMap2 = {
        '5分钟': '0 0/5 * * * ? *',
        '15分钟': '0 0/15 * * * ? *',
        '30分钟': '0 0/3 * * * ? *',
        '60分钟': '0 0 * * * ? *'
      }
      return statusMap2[cron]
    },
    edit(row, index) {
      this.code = 404
      // var cron = this.trans(this.myData[index].cronExpression)
      this.$http.post(url + '/job/saveOrUpdate', {
        oldJobName: this.oldJobName[index],
        oldJobGroup: this.oldJobGroup[index],
        jobId: this.myData[index].jobId,
        jobName: this.myData[index].jobName,
        jobGroup: this.myData[index].jobGroup,
        description: this.myData[index].jobDescription,
        // cronExpression: cron
        cronExpression: this.myData[index].cronExpression
      },
      { emulateJSON: true }).then(function(res) {
        this.code = res.data.code
      }, function(res) {
        this.code = res.data.code
      })
      setTimeout(() => {
        this.addMyListener()
      }, 500)
      this.open()
    },
    classOfJob(n) {
      var str = n.split('.')
      return str[str.length - 1]
    },
    myResume(n) {
      this.code = 404
      var name = this.myData[n].jobName
      var group = this.myData[n].jobGroup
      this.$http.post(url + '/job/resumeJob', { jobName: name, jobGroup: group }, { emulateJSON: true })
        .then(function(res) {
          this.code = res.data.code
        }, function(res) {
          this.code = res.data.code
        })
      this.addMyListener()
    },
    myPause(n) {
      this.code = 404
      var name = this.myData[n].jobName
      var group = this.myData[n].jobGroup
      this.$http.post(url + '/job/pauseJob', { jobName: name, jobGroup: group }, { emulateJSON: true })
        .then(function(res) {
          this.code = res.data.code
        }, function(res) {
          this.code = res.data.code
        })
      this.addMyListener()
    },
    add(a) {
      this.code = 404
      this.$refs[a].validate((valid) => {
        if (valid) {
          this.$http.post(url + '/job/saveOrUpdate', {
            jobName: this.formData.jobName,
            jobGroup: this.formData.jobGroup,
            jobStatus: this.formData.jobStatus,
            cronExpression: this.formData.cronExpression,
            description: this.formData.jobDescription,
            jobClassName: this.formData.jobClassName },
          { emulateJSON: true }).then(function(res) {
            this.code = res.data.code
          }, function(res) {
            this.code = res.data.code
          })
          this.formData.jobName = ''
          this.formData.jobGroup = ''
          this.formData.cronExpression = ''
          this.formData.jobStatus = ''
          this.formData.jobDescription = ''
          this.formData.jobClassName = ''
          this.addMyListener()
          this.open()
        } else {
          return false
        }
      })
    },
    addMyListener() {
      this.myListener = this.myListener + 1
    },
    deleteMsg(n) {
      this.code = 404
      var name = this.myData[n].jobName
      var group = this.myData[n].jobGroup
      this.$http.post(url + '/job/deleteJob', { oldJobName: name, oldJobGroup: group }, { emulateJSON: true })
        .then(function(res) {
          this.code = res.data.code
        }, function(res) {
          this.code = res.data.code
        })
    },
    addTask() {
      this.count++
    },
    getJobInfos() {
      this.$http.post(url + '/job/queryJob', { page: this.page, rows: this.rows }, { emulateJSON: true }).then(function(res) {
        this.total = res.data.data.total
        var b = res.data.data.list
        this.mymyData = []
        for (var i = 0; i < b.length; i++) {
          this.oldJobName.push(b[i].jobName)
          this.oldJobGroup.push(b[i].jobGroup)
          if (b[i].cronExpression === null) {
            continue
          } else {
            this.strSplite(b[i].cronExpression)
            if (b[i].jobStatus === 'PAUSED') {
              this.mymyData.push({
                jobName: b[i].jobName,
                jobGroup: b[i].jobGroup,
                // cronExpression: this.minutes + '分钟',
                cronExpression: b[i].cronExpression,
                dr: false,
                jobStatus: b[i].jobStatus,
                jobDescription: b[i].description,
                jobClassName: this.classOfJob(b[i].jobClassName),
                jobId: b[i].jobId
              })
            } else {
              this.mymyData.push({
                jobName: b[i].jobName,
                jobGroup: b[i].jobGroup,
                // cronExpression: this.minutes + '分钟',
                cronExpression: b[i].cronExpression,
                dr: true,
                jobStatus: b[i].jobStatus,
                jobDescription: b[i].description,
                jobClassName: this.classOfJob(b[i].jobClassName),
                jobId: b[i].jobId
              })
            }
          }
        }
      }, function(res) {
        alert(res.status + '查询任务出现错误')
      })
    }
  }
}
</script>
